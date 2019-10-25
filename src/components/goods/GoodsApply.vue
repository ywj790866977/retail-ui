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
        <a-col :span="8" class="update_agent" >
          <div v-if="roles == '销售员'">
            <a-button @click="batchEdit" class="update_btn">批量修改代理商</a-button>
            <a-auto-complete
              :dataSource="searchAgents"
              style="width: 200px"
              @select="onSelect"
              @search="handleSearch"
              placeholder="请输入代理商关键字"
              allowClear
            />
          </div>
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
          
          @change="handleTableChange"
        >
          <template slot="goodsNum" slot-scope="text">
            <!-- <a-input-number  :max="maxNum(record)" v-model="record.goodsNum" @change="changeNum" />
            最大值{{maxNum(record)}}-->
            <span>{{text}}</span>
          </template>
          <template slot="newAgentName" slot-scope="text">
            <a-auto-complete
            
            :dataSource="searchAgents"
            style="width: 150px"
            @select="onSelect"
            @search="handleSearch"
            placeholder="请输入代理商关键字"
            allowClear
            />
            <!-- <div>{{text}}</div> -->
          </template>
        </a-table>
      </div>
      <div class="sub_btn">
        <a-button @click="submit" type="primary" class="submit">提交</a-button>
        <a-button  v-if="roles == '管理员'" @click="turnDown" class="submit">驳回</a-button>
        <a-button @click="cancel" class="cancel">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// const { mapState } = createNamespacedHelpers('goods')
import { salesRow,adminRow } from "@/project/unit/goodsMap";
import { countDown } from "@/project/utils/time";
// import EditableCell from "./compoment/EditableCell";
import { encodeUnicode } from "@/project/utils/tools";
export default {
  name: "goodsApply",
  data() {
    return {
      memo: "",
      columns: [],
      data: [],
      oldData: [],
      agentList: [], // 请求回来的代理商列表
      searchAgents: [], // 查询出来的列表
      selectedAgent: [], //选中的代理商
      selectedData: [],
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
    //获取代理商
    this.$http.get("/goods/app/tmp/left/list").then(res => {
      console.log(res);
      if (res.status == 200) {
        this.agentList = res.list;
      }
    });

    this.columns = this.roles === '管理员'? adminRow : salesRow
  },
  methods: {
    turnDown(){},
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
    maxNum(record) {
      // console.log(record)
      let _oldData = [...this.oldData];
      let target = _oldData.find(item => item.id == record.id);
      return parseInt(target.goodsNum);
    },
    changeNum(value) {
      // console.log(value)
      value;
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    // 批量修改
    batchEdit() {
      if (this.selectedData && this.selectedData.length > 0) {
        //修改
        this.selectedData.forEach(item => {
          item.newAgentName = this.selectedAgent.name;
          item.agentId = this.selectedAgent.aid;
          this.agentList.forEach(data => {
            if (item.id == data.id) {
              data.newAgentName = this.selectedAgent.name;
              data.agentId = this.selectedAgent.aid;
            }
          });
        });
      }
    },
    // 搜索代理商
    handleSearch(value) {
      let patt = RegExp(encodeUnicode(value));
      let list = [];
      this.agentList.forEach(item => {
        if (patt.test(item.name)) {
          list.push(item.name);
        }
      });
      this.searchAgents = list;
    },
    //选择的代理商
    onSelect(value) {
      // console.log("onSelect", value);
      let list = [...this.agentList];
      this.selectedAgent = list.find(item => item.name === value);
      this.searchAgents = [];
    },
    // 修改数量
    updateNum(record, dataIndex, value) {
      console.log(record, dataIndex, value);
    },
    handleTableChange() {},
    // handleChange() {},
    goodsApply() {
      // console.log(this.selectedData)
    },
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
  },
  components: {
    // EditableCell
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
      margin-top: 2rem;
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