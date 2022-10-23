<template>
  <div id="sider-container">
    <a-layout-sider v-model="collapsed" :trigger="null" >
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item @click="changeMenu(item)" v-for="item in noChildren" :key="item.path"  :index="item.path + ''">
          <a-icon type="user" />
          <span>{{item.label}}</span>
        </a-menu-item>
         <a-sub-menu  v-for="item1 in hasChildren" :key="item1.label">
            <span slot="title"><a-icon type="user" />{{item1.label}}</span>
            <a-menu-item @click="changeMenu(item2)" v-for="item2 in item1.children" :key="item2.path">
             {{item2.label}}
            </a-menu-item>
          </a-sub-menu>
      </a-menu>
    </a-layout-sider>
  </div>
</template>

<script>
export default {
  name: "Sider",
  data() {
    return {
      menuData: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/mall",
          name: "mall",
          label: "商品管理",
          icon: "video-play",
          url: "mall/mall",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "User/User",
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "other/pageOne.vue",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "other/pageTwo.vue",
            },
          ],
        },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    // 菜单展开
    collapsed(){
      return this.$store.state.tab.isCollapse
    }
  },
methods:{
  changeMenu(item){
    this.$router.push(item.path)
   
  }
}
};
</script>

<style scoped>

#sider-container.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
#sider-container .trigger:hover {
  color: #1890ff;
}
#sider-container .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>