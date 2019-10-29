<template>
  <div class="components-form-demo-advanced-search">
    <!-- 表单 -->
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24" v-bind:class="{'search-input':!expanded}">
        <a-col :span="8" style="display:block">
          <a-form-item v-bind="formItemLayout" label="申请日期">
            <a-range-picker v-decorator="['range-picker']" />
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`申请类型`">
            <a-select v-decorator="['applicationType']">
              <a-select-option value="留货申请">留货申请</a-select-option>
              <a-select-option value="转储申请">转储申请</a-select-option>
              <a-select-option value="释放申请">释放申请</a-select-option>
              <a-select-option value="锁定申请">锁定申请</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`申请状态`">
            <a-select v-decorator="['applicationState']">
              <a-select-option value="留货申请">驳回</a-select-option>
              <a-select-option value="转储申请">审批中</a-select-option>
              <a-select-option value="释放申请">审批通过</a-select-option>
              <a-select-option value="锁定申请">暂未提交申请</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="8" style="display:block ">
          <a-form-item v-bind="formItemLayout" :label="`销售员`">
            <a-input v-decorator="[`salesName` ]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-divider>
          <a-icon v-on:click="expand" v-if="!expanded" type="down" />
          <a-icon v-on:click="expand" v-if="expanded" type="up" />
        </a-divider>
        <a-col :span="24" :style="{ textAlign: 'center' }">
          <a-button type="primary" html-type="submit">查询</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">重置</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-table
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      bordered
      :scroll="{ x: 1200 }"
      @change="handleTableChange"
    >
      <template slot="appDate" slot-scope="text">{{text | dateFormat}}</template>
    </a-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { applicationRow, formItemLayout } from "@/project/unit/applicationMap";

export default {
  name: "myApplication",
  data() {
    return {
      expanded: false,
      form: this.$form.createForm(this),
      formItemLayout,
      data: [],
      columns: applicationRow.columns,
      pagination: {
        // 分页数据
        // size: "small",  //分页组件大小
        // total: 0,  //总记录数
        showQuickJumper: true,
        showSizeChanger: true,
        pageSize: 10,
        current: 1,
        showTotal: total => `共 ${total} 条`,
        showSizeChange: (current, pageSize) => (this.pageSize = pageSize)
      }
    };
  },
  methods: {
    expand() {
      this.expanded = !this.expanded;
    },
    error(msg) {
      this.$message.error(msg);
    },
    // goodsApply() {
    //   console.log(this.selectedData);
    //   this.$http.post("/data/tmp/left", this.selectedData).then(data => {
    //     // console.log(data);
    //     if (data.status != 200) {
    //       if (data.status == 2506) {
    //         this.$notification["error"]({
    //           message: "还有未完成的留货申请,请完成后再试"
    //         });
    //       } else if (data.status == 2507) {
    //         this.$notification["error"]({
    //           message: "申请数量超过库存数量,提交失败"
    //         });
    //       }
    //     } else {
    //       this.$router.push("/goods");
    //     }
    //   });
    // },
    //提交查询
    handleSearch() {
      this.form.validateFields((error, fieldsValue) => {
        const rangeValue = fieldsValue["range-picker"];
        delete fieldsValue["range-picker"];
        if (rangeValue) {
          fieldsValue.startDate = rangeValue[0].format("YYYY-MM-DD");
          fieldsValue.endDate = rangeValue[1].format("YYYY-MM-DD");
        }
        this.$http
          .get("application/page/list", { params: { ...fieldsValue } })
          .then(data => {
            let items = data.list;
            items.forEach((item, index) => {
              item.key = index;
            });
            this.data = items;
            setTimeout(() => {
              this.handleTableChange(this.pagination);
            }, 1000);
          });
      });
    },
    // 重置
    handleReset() {
      this.form.resetFields();
    },
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
      pager.current = pagination.current || 1;
      this.pagination = pager;
      // pagination.current = pagination.current || 1;
      console.log(pagination.current);
      this.fetch({
        size: pagination.pageSize,
        page: pagination.current
      });
    },
    fetch(params = {}) {
      console.log("params:", params);
      this.loading = true;
      this.$http
        .get("application/page/list", {
          params: {
            ...params
          },
          type: "json"
        })
        .then(data => {
          this.pagination.total = data.pager.total;
          const pager = { ...this.pagination };
          pager.current = this.pagination.current || 1;
          this.pagination = pager;
          // console.log(data.list);
          let items = data.list;
          items.forEach((item, index) => {
            item.key = index + 1;
          });
          this.data = items;
          this.loading = false;
        })
        .catch(err => {
          console.log(err.message);
          this.error("查询申请列表失败！");
          this.loading = false;
        });
    }
  },
  created() {
    this.handleTableChange(this.pagination);
  },
  computed: {
    ...mapState({
      role: state => {
        return state.user.role;
      }
    }),
    isAdmin() {
      return this.role === "管理员";
    }
  }
};
</script>



<style lang="scss" scoped>
// @font-size-base{
//   font-size:.8rem
// }
.ant-divider {
  color: #ccc !important;
  margin: 0 !important;
}
.ant-advanced-search-form {
  // font-size:.8rem;
  padding: 12px;
  background: #fff;
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
      background: #fff;
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
.search-input {
  height: 45px;
  overflow: hidden;
}
</style>
