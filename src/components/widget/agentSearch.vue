<template>
  <div>
    <a-select
      style="width:100%"
      v-model="agentNameInner"
      allowClear
      showSearch
      placeholder="输入关键字查询"
      optionFilterProp="children"
      @change="handleChange"
      :filterOption="filterOption"
    >
      <a-select-option :value="item.name" v-for="(item) in agentList" :key="item.id">{{item.name}}</a-select-option>
    </a-select>
  </div>
</template>

<script>
export default {
  name: "agentSearch",
  props: {
    change: Event,
    agentName: String
  },
  data() {
    return {
      agentNameInner: this.agentName,
      selectedAgent: null,
      agentList: []
    };
  },
  watch: {
    agentName: function(newName) {
      this.agentNameInner = newName;
    }
  },
  created() {
    //获取代理商
    this.$http.get("/goods/app/tmp/left/list").then(res => {
      // console.log(res);
      if (res.status == 200) {
        this.agentList = res.list;
      }
    });
  },
  methods: {
    handleChange(value) {
      // console.log(`selected ${value}`);
      if (value) {
        let list = [...this.agentList];
        this.selectedAgent = list.find(item => item.name === value);
      } else {
        this.selectedAgent = null;
      }
      this.agentNameInner = value;
      this.$emit("change", this.selectedAgent);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
