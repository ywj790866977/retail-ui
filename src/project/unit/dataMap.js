const xsData = {
  columns: [
    {
      title: "留货日期",
      dataIndex: "saveDate",

      width: 110
    },
    {
      title: "代理商编号",
      className: "agentId",
      dataIndex: "agentId",
      width: 110
    },
    {
      title: "代理商名称",
      dataIndex: "agentName",
      width: 110
    },
    {
      title: "销售员",
      dataIndex: "salesName",
      scopedSlots: { customRender: "salesName" },
      width: 80
    },
    {
      title: "转储日期/匹配开单日期",
      dataIndex: "dumpDate",
      width: 120
    },
    {
      title: "转储单号/货期",
      dataIndex: "dumpId",
      width: 120
    },
    {
      title: "订货/礼品",
      dataIndex: "type",
      width: 100
    },
    {
      title: "库存地",
      dataIndex: "local",
      width: 100
    },
    {
      title: "产品线",
      dataIndex: "produceLine",
      width: 90
    },
    {
      title: "物料号",
      dataIndex: "produceId",
      width: 100
    },
    {
      title: "华为物料号",
      dataIndex: "bomCode",
      width: 110
    },
    {
      title: "货物名称",
      dataIndex: "goodsName",
      width: 200
    },
    {
      title: "数量",
      dataIndex: "goodsNum",
      width: 80
    },
    {
      title: "金银牌单价",
      dataIndex: "unitPrice",
      width: 110
    },
    {
      title: "金银牌总价",
      dataIndex: "sumPrice",
      width: 110
    },
    {
      title: "业绩年份",
      dataIndex: "xjYear",
      width: 100
    },
    {
      title: "备注",
      dataIndex: "memo",
      width: 100
    },
    {
      title: "备注1",
      dataIndex: "memo1",
      width: 100
    },
    {
      title: "备注2",
      dataIndex: "memo2",
      width: 500
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
export { xsData, userMap, formItemLayout, tailFormItemLayout };
