<template>
  <div class="goods_apply">
    <header class="apply_header">
      <a-row >
        <a-col :span="24">
          <h3 class="apply_title">留货申请</h3>
        </a-col>
        <a-col :span="24">
          <p class="apply_title by_content">请在【00小时09分56秒】内完成申请，否则启动将自动释放申请内容</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="title">
          <span>销售员:</span>王天枢
        </a-col>
        <a-col :span="8" class="title">
          <span>申请日期:</span>2019-7-25
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="apply_msg">
          <span >备注:</span>
          <a-textarea placeholder="备注信息" :rows="2" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="update_agent">
          <a-button class="update_btn">批量修改代理商</a-button>
          <a-input  allowClear />
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
        :scroll="{ x: 2200 }"
      >
        <!-- <template slot="name" slot-scope="text">
          <a href="javascript:;">{{text}}</a>
        </template> -->
      </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { xsData, } from "../../project/unit/dataMap";
export default {
  name: "goodsApply",
  data() {
    return {
      
      columns: xsData.columns,
      data: []
    };
  },
  created() {},
  computed: {
    rowSelection() {
      // const  selectedRowKeys  = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
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
.goods_apply{
  background: #fbfbfb;
  
  border-radius: 5px;
  .apply_header{
    padding:2rem;
    .title{
      span{
      margin-right: 1rem;
      }
      
    }
    .by_content{
      color:deepskyblue
    }
    .apply_title{
      text-align: center;
    }
    .apply_msg{
      margin-top:1.5rem;
      display: flex;
      span{
        width: 3rem;
        line-height: 3rem;
      }
    }
    .update_agent{
      display:flex;
      margin-top:2rem;
      .update_btn{
        margin-right: 1rem;
      }
    }
  }
}
</style>