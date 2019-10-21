<template>
  <div class="components-form-demo-advanced-search page">
    <!-- 表单 -->
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
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
              <a-select-option value="china">China</a-select-option>
              <a-select-option value="usa">U.S.A</a-select-option>
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
              <a-select-option value="china">China</a-select-option>
              <a-select-option value="usa">U.S.A</a-select-option>
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
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" label="是否锁定" has-feedback>
            <a-select v-decorator="['isLock']">
              <a-select-option value="0">是</a-select-option>
              <a-select-option value="1">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`华为物料号`">
            <a-input v-decorator="[`bomCode` ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <div class="search-result-list">
      <div class="operating_btns">
        <a-button type="default" class="btn_item"  @click="goodsApply">留货</a-button>
         <a-button type="default" class="btn_item">转储</a-button>
          <a-button type="default" class="btn_item">释放</a-button>
          <a-button type="default" class="btn_item">锁定</a-button>
          <a-button type="default" class="btn_item">取消锁定</a-button>
      </div>
      <a-table
        :columns="columns"
        :dataSource="data"
        :rowSelection="rowSelection"
        bordered
        :scroll="{ x: 2200 }"
      >
        <!-- <template slot="name" slot-scope="text">
          <a href="javascript:;">{{text}}</a>
        </template> -->
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { xsData, formItemLayout } from "@/project/unit/dataMap";

export default {
  name: "queryData",
  data() {
    return {
      expand: false,
      form: this.$form.createForm(this),
      formItemLayout,
      columns: xsData.columns,
      data: [],
      selectedData:[]
    };
  },
  created() {
  },
  methods: {
    ...mapMutations('goods',[
      'SET_GOODSDATAS'
    ]),
    goodsApply(){
      this.SET_GOODSDATAS(this.selectedData)
      this.$router.push("/goods")
    },
    //提交查询
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, fieldsValue) => {
        // if (!error) {
        // console.log(fieldsValue);
        const rangeValue = fieldsValue["range-picker"];
        delete fieldsValue["range-picker"]
        if (rangeValue) {
         fieldsValue.startDate =  rangeValue[0].format("YYYY-MM-DD");
         fieldsValue.endDate =  rangeValue[1].format("YYYY-MM-DD")
        }
        
        this.$http.get('retail/data/list',{ params: {...fieldsValue}}).then(res=>{
          if(res.status ==200){
            let items = res.data.items;
            items.forEach((item, index) => {
              item.key = index;
            });
            this.data = items
          }
        })
      });
    },
    // 重置
    handleReset() {
      this.form.resetFields();
    }
  },
  computed: {
    count() {
      return this.expand ? 11 : 7;
    },
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

.ant-advanced-search-form {
  // font-size:.8rem;
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  .ant-form-item {
    display: flex;
  }
  .ant-form-item-control-wrapper {
    flex: 1;
  }
}

.components-form-demo-advanced-search {
  font-size: .8rem;
  .ant-form {
    max-width: none;
  }
  .search-result-list {
    margin-top: 16px;
    border-radius: 6px;
    .operating_btns{
      background: #fbfbfb;
      text-align: center;
      padding:.6rem;
      border-radius: 5px;
      .btn_item{
        margin-left: 1rem;
      }
    }
  }
}
</style>