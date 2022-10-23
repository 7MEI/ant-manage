<template>
  <div id="hearder-container">
     <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="handleMenu"
        />
      </a-layout-header>
  </div>
</template>

<script>
export default {
name:"Header",
data(){
    return{
         collapsed: false,
    }
},
methods:{
  handleMenu(){
    this.$store.commit('ChangeCollapse')
  }
}
}
</script>

<style>
#hearder-container.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}
 #hearder-container .trigger:hover {
    color: #1890ff;
  }
 #hearder-container .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>