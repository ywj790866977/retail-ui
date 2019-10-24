<template>
  <div class="dump_apply">
    <header class="apply_header">
      <a-row>
        <a-col :span="24">
          <h3 class="apply_title">转储申请</h3>
        </a-col>
        <a-col :span="24">
          <p
            class="apply_title by_content"
          >请在【{{clearTime.h}}小时{{clearTime.m}}分{{clearTime.s}}秒】内完成申请，否则启动将自动释放申请内容</p>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="title">
          <span>销售员:</span>{{name}}
        </a-col>
        <a-col :span="8" class="title">
          <span>申请日期:</span>2019-7-25
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12" class="apply_msg">
          <span>备注:</span>
          <a-textarea placeholder="备注信息" :rows="2" />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8" class="update_agent">
          <a-button class="update_btn">批量修改转储日期</a-button>
          <a-input allowClear />
        </a-col>
          <a-col :span="8" class="update_agent">
          <a-button class="update_btn">批量修改转储地</a-button>
          <a-input allowClear />
        </a-col>
      </a-row>
    </header>
    <div class="apply_body">
      <div class="apply_datas">
        <a-table
          :columns="columns"
          :dataSource="data"
          :rowSelection="rowSelection"
          bordered
          :scroll="{ x: 2200 }"
        >
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState} from "vuex";
// const { mapState } = createNamespacedHelpers('goods')
import { xsData } from "@/project/unit/dataMap";
import { countDown } from "@/project/utils/time";
export default {
  name: "dumpApply",
  data() {
    return {
      columns: xsData.columns,
      data: [],
      selectedData: [],
      clearTime: { h: 0, m: 0, s: 0 },
      intervalNam: 0
    };
  },
  created() {
    this.data = this.goodsData;
    this.countClearData()
    console.log(this.name)
  },
  methods: {
    dumpApply() {
      // console.log(this.selectedData)
    },
    countClearData() {
      let endtime = new Date();
      endtime = endtime.setMinutes(endtime.getMinutes() + 10);
      this.intervalNam = setInterval(() => {
        this.clearTime = countDown(endtime);
        if (this.clearTime.s <= 0) {
          console.log("结束");
          clearInterval(this.intervalNam);
          this.data = [];
        }
      }, 1000);
    }
  },
  computed: {
    ...mapState("dump", ["goodsData"]),
    rowSelection() {
      // const  selectedRowKeys  = this
      // const that = this;
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          // selectedRows
          console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
          );
          // that.selectedData = selectedRows
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.dump_apply {
  background: #fbfbfb;

  border-radius: 5px;
  .apply_header {
    padding: 2rem;
    .title {
      span {
        margin-right: 1rem;
      }
    }
    .by_content {
      color: deepskyblue;
    }
    .apply_title {
      text-align: center;
    }
    .apply_msg {
      margin-top: 1.5rem;
      display: flex;
      span {
        width: 3rem;
        line-height: 3rem;
      }
    }
    .update_agent {
      display: flex;
      margin-top: 2rem;
      .update_btn {
        margin-right: 1rem;
      }
    }
  }
}
</style>