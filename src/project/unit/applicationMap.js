const applicationRow = {
  columns: [
    {
      title: "申请日期",
      dataIndex: "appDate",
      scopedSlots: { customRender: "appDate" },
      key: "appDate"
    },
    {
      title: "销售员",
      dataIndex: "salesName",
    },
    {
      title: "申请类型",
      dataIndex: "appType",
    },
    {
      title: "申请状态",
      dataIndex: "state",
    },
  ]
}
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

export {
  applicationRow, formItemLayout
}