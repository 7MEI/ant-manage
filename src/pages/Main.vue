<template>
  <div class="main-container">
    <a-layout>
      <a-layout-sider><Sider></Sider></a-layout-sider>
      <a-layout>
        <header><Header></Header></header>
        <a-layout-content class="con">  <router-view></router-view></a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sider from "../components/Sider/index.vue";
import Header from "../components/Header";
export default {
  name: "Main",
  components: {
    Sider,
    Header,
  },
  props: {
    msg: String,
  },
  mounted(){
 console.log("mainma")
}
};
</script>


<style scoped>
.main-container {
  width: 100%;
  height: 100%;
}
.a-layout-sider {
  width: 100%;
  height: 100%;
}
.con{
  width: 100%;
  height: 100%;
  background-color: rgb(239, 236, 236);
  padding: 50px;
}
</style>
