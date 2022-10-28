<template>
  <!-- <div id="sider-container"> -->
  <a-layout-sider
    v-model="collapsed"
    :trigger="null"
    collapsible
    class="sider-con"
  >
    <div class="logo">
      <h1>{{ collapsed ? "系统" : "xxxx管理系统" }}</h1>
    </div>
    <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
      <a-menu-item
        @click="changeMenu(item)"
        v-for="item in noChildren"
        :key="item.path"
        :index="item.path + ''"
      >
        <a-icon :type="item.icon" />
        <span>{{ item.label }}</span>
      </a-menu-item>
      <a-sub-menu v-for="item1 in hasChildren" :key="item1.label">
        <span slot="title">{{ item1.label }}</span>
        <a-menu-item
          @click="changeMenu(item2)"
          v-for="item2 in item1.children"
          :key="item2.path"
        >
          <a-icon :type="item2.icon"></a-icon>
          {{ item2.label }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
  <!-- </div> -->
</template>

<script>
export default {
  name: "Sider",
  data() {
    return {
      menuData: [],
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
    collapsed() {
      return this.$store.state.tab.isCollapse;
    },
    // menuData() {
    //   console.log("菜单被修改", this.$store.state.tab.menu);
    //   return this.$store.state.tab.menu;
    // },
  },
 created(){
this.getMenuData();
 },
 mounted(){
  this.getMenuData();
 },
  methods: {
    changeMenu(item) {
      this.$router.push(item.path);
      this.$store.commit("addTabs", item);
    },
    getMenuData(){
      this.menuData = this.$store.state.tab.menu
      console.log('页面被创建时',  this.menuData)
    }
     // menuData() {
    //   console.log("菜单被修改", this.$store.state.tab.menu);
    //   return this.$store.state.tab.menu;
    // },
  },
};
</script>

<style scoped>
.sider-con {
  width: auto;
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
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
  display: flex;
  justify-content: center;
}
.logo h1 {
  color: aliceblue;
  font-family: "宋体";
  line-height: 32px;
  font-size: 16px;
}
</style>