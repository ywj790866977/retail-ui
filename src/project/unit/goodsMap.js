const  
  salesRow = [
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
      scopedSlots: { customRender: "agentName" },
      width: 110
    },
    {
      title: "更改后代理商",
      dataIndex: "newAgentName",
      scopedSlots: { customRender: "newAgentName" },
      width: 110
    },
    {
      title: "销售员",
      dataIndex: "salesName",
      scopedSlots: { customRender: "salesName" },
      width: 80
    },
    {
      title: "更改后销售员",
      dataIndex: "newSalesName",
      scopedSlots: { customRender: "newSalesName" },
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
      width: 140
    },
    {
      title: "数量",
      dataIndex: "goodsNum",
      scopedSlots: { customRender: 'goodsNum' },
      width: 100  
    },
    {
      title: "更改后数量",
      dataIndex: "newGoodsNum",
      scopedSlots: { customRender: 'newGoodsNum' },
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
  ]



  const  
  adminRow = [
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
      scopedSlots: { customRender: "agentName" },
      width: 110
    },
    {
      title: "更改后代理商",
      dataIndex: "newAgentName",
      scopedSlots: { customRender: "newAgentName" },
      width: 110
    },
    {
      title: "销售员",
      dataIndex: "salesName",
      scopedSlots: { customRender: "salesName" },
      width: 80
    },
    {
      title: "更改后销售员",
      dataIndex: "newSalesName",
      scopedSlots: { customRender: "newSalesName" },
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
      width: 140
    },
    {
      title: "数量",
      dataIndex: "goodsNum",
      scopedSlots: { customRender: 'goodsNum' },
      width: 100  
    },
    {
      title: "更改后数量",
      dataIndex: "newGoodsNum",
      scopedSlots: { customRender: 'newGoodsNum' },
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
    },
    {
      title: "当前批次",
      dataIndex: "pici",
      width: 100
    },
    {
      title: "原始批次",
      dataIndex: "pici2",
      width: 100
    },
    {
      title: "备注4",
      dataIndex: "memo4",
      width: 100
    },
    {
      title: "备注5",
      dataIndex: "memo5",
      width: 100
    },
    
  ]

export {
  salesRow,
  adminRow
}