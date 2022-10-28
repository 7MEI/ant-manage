<template>
  <div class="tabs">
    <a-tag 
    v-for="item in tags"
    :key="item.path"
    :closable="item.name == 'home'?false:true"
    :color="$route.name === item.name  ? '#108ee9' : 'blue'"
     @close="log(item)"
     @click="changeMenu(item)">
     {{item.label}}
    </a-tag>
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex';
export default {
name:'Tabs',
computed:{
...mapState({
    tags:state=>state.tab.tabList
})
},
methods:{
    ...mapMutations({
        close:'closeTabs'
    }),
    // 删除tags
    log(item) {
    //   获取删除tabs的下标
    const index = this.tags.findIndex(i => i.name === item.name)
    this.close(item)
    // 当删除的tab不是当前展示的菜单时
    if(item.path !== this.$route.path){
        return;
    }
    // // 当删除的tab是最后一个tab时
    if(index === this.tags.length - 1){
        this.$router.push({
            path:this.tags[index-1].name
        })
    }else{
        this.$router.push({
            path:this.tags[index-1].name
        })
    }
    },
    // 改变tabs
    changeMenu(item){
      
        this.$router.push({path:item.path})
        console.log('chuxiansha',item.path,this.$route.path)
    }
   
},
}
</script>

<style scope>
.tabs{
    margin: 20px 0 0 52px;
}
</style>