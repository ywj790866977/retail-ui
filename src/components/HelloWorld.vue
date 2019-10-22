<template>
  <div class="hello">
    <h1>{{ name }}</h1>
    <!-- <input type="text" v-model="keyWord" @input="SET_NAME(keyWord)" /> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import { CommonService } from "../api/common";
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      keyWord: ""
    };
  },
  created() {
    this.$http({
      method:'get',
      url:'retail/user/info',
    }).then(res=>{
      this.SET_NAME(res.name);
      this.SET_ROLES(res.role);
    })
    console.log(this.name)
  },
  methods: {
    ...mapMutations("user", ["SET_NAME", "SET_ROLES"])
  },
  computed: {
    ...mapState("user", ["name", "roles"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
