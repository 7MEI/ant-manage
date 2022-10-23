export default{
    state:{
        // 控制菜单展开
        isCollapse:false
    },
    mutations:{
        ChangeCollapse(state){
            state.isCollapse = !state.isCollapse
        }
    }
}