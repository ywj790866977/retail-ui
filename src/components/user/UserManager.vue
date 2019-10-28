<template>
  <div>
  <!-- 头 -->
    <div class="search-header">
      <a-form layout="inline" class="search">
        <a-form-item label="itcode:" has-feedback>
          <a-input-search placeholder="请输入itcode" @search="onSearch" />
        </a-form-item>
      </a-form>
    </div>
    <div class="row-clear">
    </div>

    <div class="user_manager">
    <!-- 展示数据 -->
    <div class="data-table">
      <div class="data-top">
        <h4 class="pull-left">用户列表：</h4>
        <a-button class="pull-right" type="primary" icon="plus" @click="showUserModal">新增用户</a-button>
        <a-modal title="新增用户" :visible="visible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
          <div>
            <a-form :form="form" @submit="handleOk">
              <a-form-item v-bind="dialogFormItemLayout" label="itCode" has-feedback>
                <a-input v-decorator="['username',{rules:[{required: true, message: '请输入itCode!',}]}]" />
              </a-form-item>
              <a-form-item  v-bind="dialogFormItemLayout" label="姓名" has-feedback>
                <!-- <span slot="label" >
                    姓名&nbsp;
                    <a-tooltip title="真实姓名?">
                      <a-icon type="question-circle-o" />
                    </a-tooltip>
                  </span>-->
                <a-input v-decorator="['name',{rules: [{ required: true, message: '请输入真实姓名!', whitespace: true }]}]" />
              </a-form-item>
              <a-form-item v-bind="dialogFormItemLayout" label="密码" has-feedback>
                <a-input v-decorator="['pwd',{rules: [{required: true, message: '请输入密码 !',}, {validator: validateToNextPassword,}]}]" type="password" />
              </a-form-item>

              <a-form-item v-bind="dialogFormItemLayout" label="启用" has-feedback>
                <a-select v-decorator="['status', {rules: [{ required: true, message: '请选择用户状态！' }]}]" placeholder="请选择用户状态">
                  <a-select-option value="1">是</a-select-option>
                  <a-select-option value="0">否</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item v-bind="dialogFormItemLayout" label="角色" has-feedback>
                <a-select v-decorator="['role',{rules: [{ required: true, message: '请选择用户角色!' }]}]" placeholder="请选择角色">
                  <a-select-option value="管理员">管理员</a-select-option>
                  <a-select-option value="销售员">销售员</a-select-option>
                </a-select>
              </a-form-item>
              <!-- <a-form-item v-bind="tailFormItemLayout">
                  <a-button type="primary" html-type="submit">Register</a-button>
                </a-form-item>-->
            </a-form>
          </div>
        </a-modal>

        <div class="clearfix"></div>
      </div>

      <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination" :loading="loading" @change="handleTableChange" :rowKey="data.id">
        <template slot="name" slot-scope="text">
          <a href="javascript:;">{{text}}</a>
        </template>
        <template slot="pwd" slot-scope="text, record">
          <edit-password :text="text" @change="updatePwd(record.username, 'pwd', $event)" />
        </template>
        <template slot="status" slot-scope="text,record">
          <a-select :defaultValue="text == 1? '启用': '未启用'" style="width: 120px" @change="updateInfo(record,'status',$event)">
            <a-select-option value="1">启用</a-select-option>
            <a-select-option value="0">未启用</a-select-option>
          </a-select>
        </template>
        <template slot="role" slot-scope="text,record">
          <a-select :defaultValue="text =='管理员'? '管理员': '销售员'" style="width: 120px" @change="updateInfo(record,'role',$event)">
            <a-select-option value="管理员">管理员</a-select-option>
            <a-select-option value="销售员">销售员</a-select-option>
          </a-select>
        </template>
        <template slot="updateTime" slot-scope="text">{{text | dateFormat}}</template>
      </a-table>
    </div>
  </div>
</div>
</template>

<script>
import EditPassword from "./component/EditPassword";
import {
  userMap,
  dialogFormItemLayout,
  tailFormItemLayout
} from "@/project/unit/dataMap.js";

export default {
  name: "userManager",
  mounted(){
    this.$store.dispatch("setMainheader",{});
  },
  data() {
    return {
      columns: [], // 列名
      data: [], // 实际数据
      loading: false,
      visible: false,
      confirmLoading: false,
      ispwd: false,
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
      },
      confirmDirty: false,
      autoCompleteResult: [],
      dialogFormItemLayout,
      tailFormItemLayout
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.columns = userMap.columns;
    this.handleTableChange(this.pagination);
  },
  methods: {
    // #### 提示消息
    success(msg) {
      this.$message.success(msg, 10);
    },
    error(msg) {
      this.$message.error(msg);
    },

    // ####  新增用户
    // 提交方法
    //校验密码
    validateToNextPassword(rule, value, callback) {
      let tag = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{1,8}$/.test(value);
      if (value && !tag) {
        callback("格式错误，请输入不超过8位字符数字的组合!");
      }
      callback();
    },
    //显示模态框
    showUserModal() {
      this.visible = true;
    },
    //确认按钮
    handleOk() {
      this.confirmLoading = true;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // console.log("表单内容: ", values);
          this.$http.post("user", { ...values})
            .then(() => {
              this.visible = false;
              this.confirmLoading = false;
              this.form.resetFields();
              this.success("新增用户成功!");
              // this.form.resetFields();
              setTimeout(() => {
                this.handleTableChange(this.pagination);
              }, 1000);
            })
            .catch(() => {
              this.error("新增用户失败！");
              this.confirmLoading = false;
            });
        }
      });
    },
    //取消按钮
    handleCancel() {
      this.visible = false;
      this.form.resetFields();
    },

    //  ######## 展示
    // 根据itcode查询
    onSearch(value) {
      if (value) {
        this.loading = true;
        this.$http
          .get(`user/${value}`)
          .then(data => {
            let list = [];
            list.push(data.item);
            this.data = list;
            this.pagination.total = 1;
            this.loading = false;
          })
          .catch(() => {
            this.error("查询失败");
            this.loading = false;
          });
      } else {
        this.handleTableChange(this.pagination);
      }
    },
    // 修改密码
    updatePwd(key, dataIndex, obj) {
      // console.log(key, dataIndex, obj);
      if (obj.status) {
        this.loading = true;
        let params = {
          username: key,
          pwd: obj.value
        };

        this.$http
          .put(`user/${key}`, { ...params
          })
          .then(() => {
            this.success("修改密码成功！");
            const dataSource = [...this.data];
            const target = dataSource.find(item => item.key === key);
            if (target) {
              target[dataIndex] = obj.value;
              this.dataSource = dataSource;
            }
            this.loading = false;
          })
          .catch(() => {
            this.error("修改密码失败！");
            this.loading = false;
          });
      } else {
        this.error("密码格式不正确！");
      }
    },
    // 修改属性
    updateInfo(key, dataIndex, value) {
      if (key[dataIndex] != value) {
        let params = {
          username: key.username,
          [dataIndex]: value
        };
        this.loading = true;
        this.$http
          .put(`user/${key.username}`, { ...params
          })
          .then(() => {
            key[dataIndex] = value
            this.success(`修改成功!`);
            this.loading = false;
          })
          .catch(() => {
            this.error("修改失败！");
            this.loading = false;
          });
      }
    },
    // 分页显示
    handleTableChange(pagination) {
      const pager = { ...this.pagination
      };
      pager.current = pagination.current || 1;
      this.pagination = pager;
      this.fetch({
        size: pagination.pageSize,
        page: pagination.current
      });
    },
    fetch(params = {}) {
      // console.log("params:", params);
      this.loading = true;
      this.$http
        .get("user/list", {
          params: {
            ...params
          },
          type: "json"
        })
        .then(data => {

          this.pagination.total = data.pager.total;
          let items = data.list;
          items.forEach((item, index) => {
            item.key = index + 1;
          });
          this.data = items;
          this.loading = false;
        })
        .catch(() => {
          this.error("查询用户列表失败！");
          this.loading = false;
        });
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
  },
  components: {
    EditPassword
  }
};
</script>

<style lang="scss" scoped>
.user_manager{
    // font-size: .8rem;
    background: #fff;
    padding: 0.5rem 1rem;
    border-radius: 0 0 5px 5px;
    .data-top{
      margin:0.5rem 0;
    }
}
</style>
