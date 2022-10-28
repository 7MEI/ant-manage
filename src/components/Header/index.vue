<template>
  <!-- <div id="hearder-container"> -->
  <a-layout-header class="headerCon">
    <div class="l-contanier">
      <a-icon
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="handleMenu"
    /> 
    <a-breadcrumb  separator='/' style="margin-left:19px">
    <a-breadcrumb-item v-for="item in tags" :key="item.path">
      <router-link :to="item.path">{{item.label}}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
    </div>
  <div>
    <a-dropdown>
      <img
        src="./img/1.jpg"
        alt=""
        class="ant-dropdown-link"
        @click="(e) => e.preventDefault()"
      />
      <a-icon type="down" />
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">个人中心</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="toQuit">退出登录</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
  </a-layout-header>
  <!-- </div> -->
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Header",
  computed: {
    // 菜单展开
    collapsed() {
      return this.$store.state.tab.isCollapse;
    },
    ...mapState({
      tags:state =>state.tab.tabList
    })
  },
  mounted(){
    console.log('tags',this.tags)
  },
  methods: {
    handleMenu() {
      this.$store.commit("ChangeCollapse");
    },
    toQuit(){
      this.$store.commit('clearToken')
      this.$router.push({
        name:'login'
      })
    }
  },
};
</script>

<style>
.headerCon {
  display: flex;
  justify-content: space-between;
  /* line-height: 65px; */
  background: #fff;
  padding: 0 24px;
}
.l-contanier{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.trigger {
  font-size: 19px;
  cursor: pointer;
  transition: color 0.3s;
}
.trigger:hover {
  color: #1890ff;
}
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.headerCon img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>