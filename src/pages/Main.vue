<template>
  <div class="main-container">
    <a-layout>
      <a-layout-sider><Sider></Sider></a-layout-sider>
      <a-layout>
        <header><Header></Header></header>
        <Tabs></Tabs>
        <a-layout-content class="con">  <router-view></router-view></a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Sider from "../components/Sider/index.vue";
import Header from "../components/Header";
import Tabs from '../components/Tabs'
export default {
  name: "Main",
  components: {
    Sider,
    Header,
    Tabs,
  },
  props: {
    msg: String,
  },
};
</script>


<style scoped>
.main-container {
  width: 100%;
  height: 100%;
}
.con{
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px 50px;
}
</style>
