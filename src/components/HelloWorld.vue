<template>
  <div class="hello">
    <h1>{{ name }}</h1>
    <!-- <input type="text" v-model="keyWord" @input="SET_NAME(keyWord)" /> -->
    <router-link to="/query">query</router-link>
    <router-link to="/goods">goods</router-link>
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
    
  },
  methods: {
    ...mapMutations("user", ["SET_NAME", "SET_ROLES"]),
    // ...mapActions('user',['setInfo'])
  },
  computed: {
    ...mapState('user', ["name", "roles"])
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
