<template>
  <div class="user_manager">
    <!-- 头 -->
    <div class="manager_header">
      <h3 class="manager_title">账户管理</h3>
      <div class="serarch">
        <span>itcode:</span>
        <a-input-search placeholder="请输入itcode" @search="onSearch" enterButton />
      </div>
    </div>
    <!-- 展示数据 -->
    <div class="data_table">
      <div class="data_top">
        <h4>用户列表：</h4>
        <a-button type="primary">Primary</a-button>
      </div>

      <a-table
        :columns="columns"
        :dataSource="data"
        bordered
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :rowKey="data.id"
      >
        <template slot="name" slot-scope="text">
          <a href="javascript:;">{{text}}</a>
        </template>
        <template slot="pwd" slot-scope="text, record">
          <editable-cell :text="text" @change="updatePwd(record.username, 'pwd', $event)" />
        </template>
        <template slot="status" slot-scope="text,record">
          <a-select
            :defaultValue="text == 1? '启用': '未启用'"
            style="width: 120px"
            @change="updateInfo(record,'status',$event)"
          >
            <a-select-option value="1">启用</a-select-option>
            <a-select-option value="0">未启用</a-select-option>
          </a-select>
        </template>
        <template slot="role" slot-scope="text,record">
          <a-select
            :defaultValue="text"
            style="width: 120px"
            @change="updateInfo(record,'role',$event)"
          >
            <a-select-option value="管理员">管理员</a-select-option>
            <a-select-option value="销售员">销售员</a-select-option>
          </a-select>
        </template>
        <template slot="updateTime" slot-scope="text">{{text | dateFormat}}</template>
      </a-table>
    </div>
  </div>
</template>

<script>
import EditableCell from './component/EditableCell'
import { userMap }  from '../../project/unit/dataMap.js'
export default {
  name: "userManager",
  data() {
    return {
      columns: [], // 列名
      data: [], // 实际数据
      loading: false,
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
  created() {
    this.columns = userMap.columns;
    this.handleTableChange(this.pagination);
  },
  methods: {
    //提示消息
    success(msg) {
      this.$message.success(msg, 10);
    },
    error(msg) {
      this.$message.error(msg);
    },
    // 根据itcode查询
    onSearch(value) {
      if (value) {
        this.loading = true;
        this.axios
          .get(`retail/user/${value}`)
          .then(res => {
            if (res.status == 200) {
              let _data = [];
              res.data.key = 1;
              _data.push(res.data);
              this.data = _data;
              this.pagination.total = 1;
              this.loading = false;
            }
          })
          .catch(() => {
            this.error("查询失败");
            this.loading = false;
          });
      }
    },
    // 修改密码
    updatePwd(key, dataIndex, value) {
      // console.log(key, dataIndex, value);
      if (value) {
        let params = { username: key, pwd: value };
        this.loading = true;
        this.axios
          .put(`retail/user/${key}`, { ...params })
          .then(res => {
            if (res.status == 200) {
              this.success("修改密码成功！");
              const dataSource = [...this.data];
              const target = dataSource.find(item => item.key === key);
              if (target) {
                target[dataIndex] = value;
                this.dataSource = dataSource;
              }
              this.loading = false;
            }
          })
          .catch(() => {
            this.error("修改密码失败！");
            this.loading = false;
          });
      }
    },
    updateInfo(key, dataIndex, value) {
      if (key[dataIndex] != value) {
        let params = { username: key.username, [dataIndex]: value };
        this.loading = true;
        this.axios
          .put(`retail/user/${key.username}`, { ...params })
          .then(res => {
            if (res.status == 200) {
              this.success(`修改成功!`);
              this.loading = false;
            }
          })
          .catch(() => {
            this.error("修改失败！");
            this.loading = false;
          });
      }
    },
    handleTableChange(pagination) {
      const pager = { ...this.pagination };
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
      this.axios
        .get("retail/user/list", {
          params: {
            ...params
          },
          type: "json"
        })
        .then(res => {
          if (res.status == 200) {
            const pagination = { ...this.pagination };
            pagination.total = res.data.total;
            let items = res.data.items;
            items.forEach((item, index) => {
              item.key = index;
            });
            this.data = items;
            this.loading = false;
            this.pagination = pagination;
          }
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
    EditableCell
  }
};
</script>

<style lang="scss" scoped>
.user_manager {
  font-size: 1rem;
  .manager_header {
    .manager_title {
      text-align: center;
    }
    .serarch {
      display: flex;
      width: 30%;
    }
  }

  .data_table {
    margin-top: 2rem;
    .data_top{

      display: flex;
      justify-content: space-between
      
    }
  }
}
</style>