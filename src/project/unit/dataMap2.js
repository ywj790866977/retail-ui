const glData = {
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
        },
        {
            title: "备注3",
            dataIndex: "memo3"
        },
        {
            title: "系统当前批次",
            dataIndex: "nowBatch"
        },
        {
            title: "原始批次",
            dataIndex: "oldBatch"
        },
        {
            title: "备注4",
            dataIndex: "memo4"
        },
        {
            title: "备注5",
            dataIndex: "memo5"
        },
        {
            title: "EB当前批次",
            dataIndex: "EBnowBatch"
        }
    ],
};
export { glData };
