<template>
  <div class="components-form-demo-advanced-search">
    <!-- 表单 -->
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24" v-bind:class="{'search-input':!expanded}">
        <a-col :span="8" style="display:block">
          <a-form-item v-bind="formItemLayout" label="留货日期">
            <a-range-picker v-decorator="['range-picker']" />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`代理商编号`">
            <a-input v-decorator="[`agentId` ]" />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`代理商名称`">
            <a-input v-decorator="[`agentName` ]" />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`销售员`">
            <a-input v-decorator="[`salesName` ]" />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" label="订货/礼品" has-feedback>
            <a-select v-decorator="['type']">
              <a-select-option value="订货/超期">订货/超期</a-select-option>
              <a-select-option value="订货/超期/锁死">订货/超期/锁死</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`库存地`">
            <a-input v-decorator="[`local` ]" />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" label="产品线" has-feedback>
            <a-select v-decorator="['produceLine']">
              <a-select-option value="安全">安全</a-select-option>
              <a-select-option value="存储">存储</a-select-option>
              <a-select-option value="接入">接入</a-select-option>
              <a-select-option value="企业通信">企业通信</a-select-option>
              <a-select-option value="数据中心能源">数据中心能源</a-select-option>
              <a-select-option value="视频监控">视频监控</a-select-option>
              <a-select-option value="数通">数通</a-select-option>
              <a-select-option value="云软件">云软件</a-select-option>
              <a-select-option value="智能计算">智能计算</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`物料号`">
            <a-input v-decorator="[`produceId` ]" />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`货物名称`">
            <a-input v-decorator="[`goodsName` ]" />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`转储期日期`">
            <a-input v-decorator="[`dumpDate` ]" />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`转储单号/货期`">
            <a-input v-decorator="[`dumpId` ]" />
          </a-form-item>
        </a-col>
        <a-col v-show="flag" :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`是否删除物料`">
            <a-select v-decorator="['isDeleteBomCode']">
              <a-select-option value="0">是</a-select-option>
              <a-select-option value="1">否</a-select-option>
              <a-select-option value="2">全部</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-show="flag" :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`是否更改批次`">
            <a-select v-decorator="['isModifyBatch']">
              <a-select-option value="0">是</a-select-option>
              <a-select-option value="1">否</a-select-option>
              <a-select-option value="2">全部</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-show="flag" :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout"  label="是否锁定">
            <a-select v-decorator="['isLock']">
              <a-select-option value="0">是</a-select-option>
              <a-select-option value="1">否</a-select-option>
              <a-select-option value="2">全部</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col v-show="flag" :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`是否在EB中已更改`">
            <a-select v-decorator="['isModifyEB']">
              <a-select-option value="0">是</a-select-option>
              <a-select-option value="1">否</a-select-option>
              <a-select-option value="2">全部</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`华为物料号`">
            <a-input v-decorator="[`bomCode` ]" />
          </a-form-item>
        </a-col>
        <a-col v-show="flag" :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`更改后批次`">
            <a-input v-decorator="[`nowBatch` ]" />
          </a-form-item>
        </a-col>
        <a-col v-show="flag" :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`数量是否为负`">
            <a-select v-decorator="['isNegativeNum']">
              <a-select-option value="0">是</a-select-option>
              <a-select-option value="1">否</a-select-option>
              <a-select-option value="2">全部</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-divider> <a-icon v-on:click="expand" v-if="!expanded" type="down" />  <a-icon  v-on:click="expand" v-if="expanded" type="up" /> </a-divider>
        <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      :columns="columns"
      :dataSource="data"
      :rowSelection="rowSelection"
      bordered
      :scroll="{ x: 3200 }"
    >
      <!-- <template slot="name" slot-scope="text">
          <a href="javascript:;">{{text}}</a>
      </template>-->
    </a-table>
    <div class="search-result-list">
      <div class="operating_btns">
        <a-button type="default" class="btn_item select_self_btn">已选中的数据</a-button>
        <a-button type="default" class="btn_item" @click="goodsApply">留货</a-button>
        <a-button type="default" class="btn_item" @click="dumpApply">转储</a-button>
        <a-button type="default" class="btn_item" @click="releaseApply">释放</a-button>
        <a-button type="default" class="btn_item">锁定</a-button>
        <a-button type="default" class="btn_item">取消锁定</a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :dataSource="selectedData"
      :rowSelection="rowSelection"
      bordered
      :scroll="{ x: 3200 }"
    ></a-table>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
// import { mapState } from "vuex";
import { xsData, formItemLayout } from "@/project/unit/dataMap";
import { glData } from "@/project/unit/dataMap2";

export default {
  name: "queryData",
  data() {
    return {
      expanded: false,
      form: this.$form.createForm(this),
      formItemLayout,
      roles: "管理员",
      columns: [],
      data: [],
      selectedData: [],
      flag: false
    };
  },
  created() {
    this.flag = this.roles === "管理员";
    this.columns = this.flag ? glData.columns : xsData.columns;
  },
  methods: {
    ...mapMutations("goods", ["SET_GOODSDATAS","SET_GOODSTIEM"]),
    goodsApply() {
      // console.log(this.selectedData);
      this.$http.post("/data/tmp/left", this.selectedData).then(data => {
        // console.log(data);
        if (data.status != 200) {
          if (data.status == 2506) {
            this.$notification["error"]({
              message: "还有未完成的留货申请,请完成后再试"
            });
            
          } else if (data.status == 2507) {
            this.$notification["error"]({
              message: "申请数量超过库存数量,提交失败"
            });
          }
        } else {
          this.$router.push("/goods");
          this.SET_GOODSTIEM(new Date())
        }
      });
    },
    dumpApply() {
      this.SET_GOODSDATAS(this.selectedData);
      this.$router.push("/dump");
    },
    releaseApply() {
      this.SET_GOODSDATAS(this.selectedData);
      this.$router.push("/release");
    },
    //提交查询
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, fieldsValue) => {
        // if (!error) {
        // console.log(fieldsValue);
        const rangeValue = fieldsValue["range-picker"];
        delete fieldsValue["range-picker"];
        if (rangeValue) {
          fieldsValue.startDate = rangeValue[0].format("YYYY-MM-DD");
          fieldsValue.endDate = rangeValue[1].format("YYYY-MM-DD");
        }
        // console.log({ ...fieldsValue });
        this.$http
          .get("/data/list", { params: { ...fieldsValue } })
          .then(data => {
            let items = data.list;
            items.forEach((item, index) => {
              item.key = index;
            });
            this.data = items;
          });
      });
    },
    // 重置
    handleReset() {
      this.form.resetFields();
    }
  },
  computed: {
    // ...mapState("user", ["name", "roles"]),

    rowSelection() {
      // const  selectedRowKeys  = this;
      const that = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(
          //   `selectedRowKeys: ${selectedRowKeys}`,
          //   "selectedRows: ",
          //   selectedRows
          // );
          that.selectedData = selectedRows;
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
// @font-size-base{
//   font-size:.8rem
// }
.ant-divider{
  color:#ccc!important;
  margin:0!important;
}
.ant-advanced-search-form {
  // font-size:.8rem;
  padding: 12px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  .ant-form-item {
    display: flex;
    margin-bottom: 5px;
  }
  .ant-form-item-control-wrapper {
    flex: 1;
  }
}

.components-form-demo-advanced-search {
  font-size: 14px;
  .ant-form {
    max-width: none;
  }
  .search-result-list {
    margin-top: 16px;
    border-radius: 6px;
    .operating_btns {
      background: #fbfbfb;
      text-align: center;
      padding: 0.6rem;
      border-radius: 5px;
      .btn_item {
        margin-left: 1rem;
      }
    }
  }
}


.select_self_btn {
  float: left;
}

.myfont {
  font-size: 5px;
}
.search-input{
  height: 45px;
  overflow: hidden;
}

</style>
