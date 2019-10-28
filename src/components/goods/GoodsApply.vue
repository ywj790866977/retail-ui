<template>
  <div class="goods_apply">
    <header class="apply_header">
      <a-row>
        <a-col :span="24">
          <h3 class="apply_title">留货申请</h3>
        </a-col>
        <a-col :span="24">
          <p
            class="apply_title by_content"
          >请在【{{clearTime.h}}小时{{clearTime.m}}分{{clearTime.s}}秒】内完成申请，否则启动将自动释放申请内容</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="title">
          <span>销售员:</span>
          {{name}}
        </a-col>
        <a-col :span="8" class="title">
          <span>申请日期:</span>
          {{new Date() | dateFormat("yyyy-MM-dd")}}
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="12" class="apply_msg">
          <span>备注:</span>
          <a-textarea v-if="roles == '销售员'" v-model="memo" placeholder="备注信息" :rows="2" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="6" class="update_agent">
          <h3 class="apply_title by_content">本页面只允许修改数量</h3>
        </a-col>
      </a-row>
      <a-row v-if="roles == '销售员'">
        <a-col :span="6" class="update_agent">
            <a-button @click="batchEdit" class="update_btn">批量修改代理商</a-button>
        </a-col>
        <a-col :span="6" >
            <agent-search :agentName="selectedAgent?selectedAgent.name:''" v-on:change="setSelectedAgent"></agent-search>
        </a-col>
      </a-row>
    </header>
    <div class="apply_body">
      <div class="apply_datas">
        <a-table
          :columns="columns"
          :dataSource="data"
          :rowSelection="rowSelection"
          bordered

          :scroll="{ x: 3200 }"
          @change="handleTableChange"
        >
          <template slot="newGoodsNum" slot-scope="text,record">
            <a-input-number :min="0" :max="parseInt(record['goodsNum'])"  v-model="record['newGoodsNum']" />
          </template>
          <template slot="newAgentName" slot-scope="text,record">
            {{record['newAgentName']}}
            <agent-search :agentName="record['newAgentName']" v-on:change="setRecordAgent($event,record)"></agent-search>
          </template>
        </a-table>
      </div>
      <div class="sub_btn">
        <a-button @click="submit" type="primary" class="submit">提交</a-button>
        <a-button v-if="roles == '管理员'" @click="turnDown" class="submit">驳回</a-button>
        <a-button @click="cancel" class="cancel">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// const { mapState } = createNamespacedHelpers('goods')
import { salesRow, adminRow } from "@/project/unit/goodsMap";
import { countDown } from "@/project/utils/time";
import agentSearch  from "@/components/widget/agentSearch";


export default {
  name: "goodsApply",
  components: { agentSearch },
  data() {
    return {
      memo: "",
      columns: [],
      data: [],
      oldData: [],
      // searchAgents: [], // 查询出来的列表
      selectedAgent: null, //选中的代理商
      selectedData: [],
      updateId:'',
      goodsMax: "",
      clearTime: { h: 0, m: 0, s: 0 },
      intervalNam: 0,
      nowTime: "",
      value: 0
    };
  },
  created() {
    //获取留货数据
    this.$http.get("/goods/left").then(res => {
      // console.log(res);
      if (res.status == 200 && res.item.data) {
        res.item.data.forEach((data, index) => {
          data.newSalesName = this.name;
          data.key = index;
        });
        this.data = [...res.item.data];
        this.oldData = [...res.item.data];
        this.nowTime = res.item.application.appDate || new Date();
        this.countClearData();
      } else {
        this.$message.error("获取数据失败!");
      }
    });

    this.columns = this.roles === "管理员" ? adminRow : salesRow;
  },
  methods: {
    setSelectedAgent(value){
      this.selectedAgent = value;
    },
    setRecordAgent(value,record){
      if(value){
        record['newAgentName'] = value.name;
        record['agentId'] = value.aid;
      }else{
        record['newAgentName'] = "";
        record['agentId'] = "";
      }
    },
    turnDown(){

    },
    //取消
    cancel() {
      let data = [...this.selectedData];
      if (data) {
        this.$http
          .post("goods/app/tmp/left/cancel", { dataList: data })
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              this.$message.success("取消成功！");
              data.forEach(item => {
                this.data.forEach((element, i) => {
                  if (item.id == element.id) {
                    this.data.splice(i, 1);
                  }
                });
              });
            }
          })
          .catch(() => {
            //取消失败
            this.$message.error("取消失败!");
          });
      }
    },
    //提交
    submit() {
      // console.log(this.selectedData);
      let data = [...this.selectedData];
      if (data) {
        data.forEach(item => {
          if (item.newAgentName) {
            item.agentName = item.newAgentName;
          }
          if (item.newSalesName) {
            item.salesName = item.newSalesName;
          }
          if (this.memo) {
            item.memo = this.memo;
          }
        });

        this.$http
          .post("goods/app/tmp/left/submit", { dataList: data })
          .then(res => {
            // console.log(res)
            if (res.status == 200) {
              this.$message.success("提交成功！");
              data.forEach(item => {
                this.data.forEach((element, i) => {
                  if (item.id == element.id) {
                    this.data.splice(i, 1);
                  }
                });
              });
            }
          })
          .catch(() => {
            //
            this.$message.error("提交失败!");
          });
      }
    },
    // 检查产品线
    checkGood() {
      let _data = [...this.selectedData];
      if (_data) {
        _data.forEach(element => {
          this.$http
            .get("", { param: element.id })
            .then(res => {
              if (res.status == 200) {
                //属于
                //  this.$message.success('验证成功！');
                return true;
              }
              if (res.status == 2501) {
                //不属于
                this.$message.error(
                  this.name +
                    "未配置" +
                    element.goodsName +
                    "产品线权限，请联系管理员"
                );
                return false;
              }
            })
            .catch(() => {
              this.$message.error("验证失败");
              return false;
            });
        });
      } else {
        return false;
      }
    },

    // 批量修改
    batchEdit() {

      if (this.selectedAgent && this.selectedData && this.selectedData.length > 0) {
        //修改
        this.selectedData.forEach(item => {
          item.newAgentName = this.selectedAgent.name;
          item.agentId = this.selectedAgent.aid;
        });
      }
    },
    handleTableChange() {},
    // ok 倒计时
    countClearData() {
      let endtime = new Date(this.nowTime);
      endtime = endtime.setMinutes(endtime.getMinutes() + 10);
      this.intervalNam = setInterval(() => {
        this.clearTime = countDown(endtime);
        if (this.clearTime.m <= 0 && this.clearTime.s <= 0) {
          // console.log("结束");
          clearInterval(this.intervalNam);
          this.data = [];
        }
      }, 1000);
    }
  },
  computed: {
    ...mapState("goods", ["goodsData", "test"]),
    ...mapState("user", ["name", "roles"]),

    rowSelection() {
      // const  selectedRowKeys  = this
      const that = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          // selectedRows
          // console.log(
          //   `selectedRowKeys: ${selectedRowKeys}`,
          //   "selectedRows: ",
          //   selectedRows
          // );
          that.selectedData = selectedRows;
          // console.log(that.selectedData)
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.goods_apply {
  background: #fbfbfb;

  border-radius: 5px;
  .apply_header {
    padding: 2rem;
    .title {
      span {
        margin-right: 1rem;
      }
    }
    .by_content {
      color: deepskyblue;
    }
    .apply_title {
      text-align: center;
    }
    .apply_msg {
      margin-top: 1.5rem;
      display: flex;
      span {
        width: 3rem;
        line-height: 3rem;
      }
    }
    .update_agent {
      display: flex;
      .update_btn {
        margin-right: 1rem;
      }
    }
  }
}
.sub_btn {
  padding: 2rem 0;
  text-align: center;
  .submit {
    margin-right: 2rem;
  }
}
</style>
