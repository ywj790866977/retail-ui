const xsData = {
  columns: [
    {
      title: "留货日期",
      dataIndex: "date",
      
      width: 90
    },
    {
      title: "代理商编号",
      className: "agentId",
      dataIndex: "agentId",
      width:110
    },
    {
      title: "代理商名称",
      dataIndex: "agentName",
      width: 110
    },
    {
      title: "销售员",
      dataIndex: "salesName",
      scopedSlots: { customRender: "name" },
      width: 90
    },
    {
      title: "转储日期/匹配开单日期",
      dataIndex: "dumpDate",
      width: 120
    },
    {
      title: "转储单号/货期",
      dataIndex: "dumpId"
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
      width: 100
    },
    {
      title: "数量",
      dataIndex: "count",
      width: 80
    },
    {
      title: "金银牌单价",
      dataIndex: "price1",
      width: 110
    },
    {
      title: "金银牌总价",
      dataIndex: "allprice",
      width: 110
    },
    {
      title: "业绩年份",
      dataIndex: "year",
      width: 100
    },
    {
      title: "备注",
      dataIndex: "remark",
      width: 100
    },
    {
      title: "备注1",
      dataIndex: "remark1",
      width: 100
    },
    {
      title: "备注2",
      dataIndex: "remark2",
      width: 100
    }
  ],
  data: [
    {
      key: "1",
      date: "John Brown",
      agentId: "1001",
      agentName: "jerry",
      salesName: "超哥",
      dumpDate:"2019-10-01",
      dumpId:"123",

    }
  ]
};
export { xsData };
