const xsData = {
  columns: [
    {
      title: "留货日期",
      dataIndex: "saveDate"
    },
    {
      title: "代理商编号",
      className: "agentId",
      dataIndex: "agentId"
    },
    {
      title: "代理商名称",
      dataIndex: "agentName"
    },
    {
      title: "销售员",
      dataIndex: "salesName",
      scopedSlots: { customRender: "name" }
    },
    {
      title: "转储日期/匹配开单日期",
      dataIndex: "dumpDate"
    },
    {
      title: "转储单号/货期",
      dataIndex: "dumpId"
    },
    {
      title: "订货/礼品",
      dataIndex: "type"
    },
    {
      title: "库存地",
      dataIndex: "local"
    },
    {
      title: "产品线",
      dataIndex: "produceLine"
    },
    {
      title: "物料号",
      dataIndex: "produceId"
    },
    {
      title: "华为物料号",
      dataIndex: "bomCode"
    },
    {
      title: "货物名称",
      dataIndex: "goodsName"
    },
    {
      title: "数量",
      dataIndex: "goodsNum"
    },
    {
      title: "金银牌单价",
      dataIndex: "unitPrice"
    },
    {
      title: "金银牌总价",
      dataIndex: "sumPrice"
    },
    {
      title: "业绩年份",
      dataIndex: "xjYear"
    },
    {
      title: "备注",
      dataIndex: "memo"
    },
    {
      title: "备注1",
      dataIndex: "memo1"
    },
    {
      title: "备注2",
      dataIndex: "memo2"
    }
  ],
};

const userMap = {
  columns: [
    { title: "itcode", dataIndex: "username", key: "username" },
    { title: "姓名", dataIndex: "name", key: "name" },
    {
      title: "密码",
      dataIndex: "pwd",
      scopedSlots: { customRender: "pwd" },
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
  ]
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const dialogFormItemLayout = {
  labelCol: {
    xs: { span: 5 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 12 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};
export { xsData, userMap, formItemLayout, tailFormItemLayout,dialogFormItemLayout };
