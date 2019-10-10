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
      <h4>用户列表：</h4>
      <a-table
        :columns="columns"
        :dataSource="data"
        bordered
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
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
          <a-select :defaultValue="text" style="width: 120px" @change="updateInfo(record,'role',$event)">
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
import EditableCell from "../components/module/user/EditableCell";
export default {
  name: "userManager",
  data() {
    return {
      columns: [
        { title: "itcode", dataIndex: "username", key: "username" },
        { title: "姓名", dataIndex: "name", key: "name" },
        {
          title: "密码",
          dataIndex: "pwd",
          scopedSlots: { customRender: "pwd" },
          width: "20%",
          key: "pwd"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" },
          key: "status"
        },
        {
          title: "角色",
          dataIndex: "role",
          scopedSlots: { customRender: "role" },
          key: "role"
        },
        {
          title: "更新时间",
          dataIndex: "updateTime",
          scopedSlots: { customRender: "updateTime" },
          key: "updateTime"
        }
      ],
      data: [],

      loading: false,
      pagination: {
        size: "small",
        total: 0,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSize: 5,
        current: 1,
        showTotal: total => `共 ${total} 条`
      }
    };
  },
  created() {
    this.handleTableChange();
  },
  methods: {
    //提示消息
    success(msg) {
      this.$message.success(msg, 10);
    },
    // 根据itcode查询
    onSearch(value) {
      console.log(value);
      // const url = '/retail/user/{um}';
      if(value){
        this.axios.get(`retail/user/${value}`).then(res => {
          console.log(res)
          // this.data = res.data
          // if (res.status == 200) {
          //   this.success("修改密码成功！");
          
          // }
        });
      }
    },
    // 修改密码
    updatePwd(key, dataIndex, value) {
      // console.log(key, dataIndex, value);
      if (value) {
        let params = { username: key, pwd: value };
        this.axios.put(`retail/user/${key}`, { ...params }).then(res => {
          if (res.status == 200) {
            this.success("修改密码成功！");
            const dataSource = [...this.data];
            const target = dataSource.find(item => item.key === key);
            if (target) {
              target[dataIndex] = value;
              this.dataSource = dataSource;
            }
          }
        });
      }
    },
    updateInfo(key,dataIndex,value) {
      if(key[dataIndex] != value){
        let params = { username: key.username, [dataIndex]: value };
        this.axios.put(`retail/user/${key.username}`, { ...params }).then(res => {
          if (res.status == 200) {
            this.success(`修改成功!`);
          }
        });
      }
    },
    handleTableChange() {
      // console.log(pagination);
      // const pager = { ...this.pagination };
      // pager.current = pagination.current;
      // this.pagination = pager;
      const pagination = this.pagination;
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
  }
}
</style>