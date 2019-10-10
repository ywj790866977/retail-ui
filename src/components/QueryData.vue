<template>
  <div class="page">
    <!-- 表单 -->
    <div class>
      <!-- 1 -->
      <a-row class="row">
        <a-col :span="8" class="all_input">
          <span class="input_text">留货日期:</span>
          <a-range-picker class @change="dateChange" />
        </a-col>
        <a-col :span="8" class="all_input">
          <span class="input_text">代理商编号:</span>
          <a-input />
        </a-col>
        <a-col :span="8" class="all_input">
          <span class="input_text">代理商名称:</span>
          <a-input />
        </a-col>
      </a-row>
      <!-- 2 -->
      <a-row class="row">
        <a-col :span="8" class="all_input">
          <span class="input_text">销售员:</span>
          <a-input />
        </a-col>
        <a-col :span="8" class="all_input">
          <span class="input_text">订货/礼品:</span>
          <a-select defaultValue="lucy" style="width: 100%" @change="handleChange">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="8" class="all_input">
          <span class="input_text">库存地:</span>
          <a-select defaultValue="lucy" style="width: 100%" @change="handleChange2">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <!-- 3 -->
      <a-row class="row">
        <a-col :span="8" class="all_input">
          <span class="input_text">产品线:</span>
          <a-select defaultValue="lucy" style="width: 100%" @change="handleChange3">
            <a-select-option value="jack">Jack</a-select-option>
            <a-select-option value="lucy">Lucy</a-select-option>
            <a-select-option value="disabled" disabled>Disabled</a-select-option>
            <a-select-option value="Yiminghe">yiminghe</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="8" class="all_input">
          <span class="input_text">物料号:</span>
          <a-input placeholder />
        </a-col>
        <a-col :span="8" class="all_input">
          <span class="input_text">货物名称:</span>
          <a-input placeholder />
        </a-col>
      </a-row>
      <!-- 4 -->
      <a-row class="row">
        <a-col :span="8" class="all_input">
          <span class="input_text">转储日期/匹配开单日期:</span>
          <a-input placeholder />
        </a-col>
        <a-col :span="8" class="all_input">
          <span class="input_text">转储单号/货期:</span>
          <a-input placeholder />
        </a-col>
        <a-col :span="8" class="all_input">
          <span class="input_text">是否锁定:</span>
          <a-select defaultValue="是" style="width: 100%" @change="handleChange4">
            <a-select-option value="1">是</a-select-option>
            <a-select-option value="2">否</a-select-option>
            <a-select-option value="0">全部</a-select-option>
          </a-select>
        </a-col>
      </a-row>
      <!-- 5 -->
      <a-row class="row">
        <a-col :span="8" class="all_input">
          <span class="input_text">华为物料号:</span>
          <a-input placeholder />
        </a-col>
      </a-row>
      <a-row class="row">
        <a-col :span="6" :offset="10" class="sub_btn">
          <a-button type="primary" class="search_btn">搜索</a-button>
          <a-button class="reset_btn">重置</a-button>
        </a-col>
      </a-row>
    </div>
    <!-- 展示 -->
    <div class="data_table">
      <a-table
        :columns="columns"
        :dataSource="data"
        :rowSelection="rowSelection"
        bordered
        :scroll="{ x: 2000 }"
      >
        <template slot="name" slot-scope="text">
          <a href="javascript:;">{{text}}</a>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import { xsData } from "../project/unit/dataMap";
export default {
  name: "queryData",
  data() {
    return {
      columns: [],
      data: [],
      startTime: "",
      endTime: ""
    };
  },
  created() {
    let params = {agentId: "100186200"}

    let url = "/retail/data/list";
    this.axios.get(url, {
        params:JSON.stringify(params)
      })
      .then(res => {
        console.log(res);
      });
    this.columns = xsData.columns;
    this.data = xsData.data;
  },
  methods: {
    dateChange(date, dateString) {
      // console.log(date, dateString);
      this.startTime = dateString[0];
      this.endTime = dateString[1];
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleChange2(value) {
      console.log(`selected ${value}`);
    },
    handleChange3(value) {
      console.log(`selected ${value}`);
    },
    handleChange4(value) {
      console.log(`selected ${value}`);
    }
  },
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

<style  scoped>
.page {
  font-size: 1rem;
}
.all_input {
  display: flex;
  align-items: center;
  padding-right: 2rem;
}
.all_input .input_text {
  width: 8rem;
}

.row {
  margin-top: 1rem;
}
.sub_btn .search_btn {
  /* margin-top:2rem; */
  margin-right: 2rem;
}

/* 展示数据 */
.data_table {
  margin-top: 2rem;
}
</style>