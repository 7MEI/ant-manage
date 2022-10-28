import Cookies from "js-cookie";

export default{
    state:{
        // 控制菜单展开
        isCollapse:false,
        tabList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'home'
            }
        ],
        menu:[]
    },
    mutations:{
        // 展开收起菜单
        ChangeCollapse(state){
            state.isCollapse = !state.isCollapse
        },
        //面包屑的添加
        addTabs(state,val){
            if(val.name !== 'home'){
                state.currentMenu = val;
                // 判断当前菜单是否已经存在面包屑，存在返回下标，不存在返回-1
                const result = state.tabList.findIndex(item=>item.name === val.name)
                if(result === -1){
                    state.tabList.push(val)
                }else{
                    state.currentMenu= val;
                }
            }
        },
        // 关闭tabs
        closeTabs(state,val){
            const result = state.tabList.findIndex(item=> item.name === val.name)
            state.tabList.splice(result,1)
        },
        // 将权限菜单存到cookie
        setMenu(state,val){
            state.menu = val;
            Cookies.set('menu',JSON.stringify(val))
            console.log('存入菜单',val)
        },
        clearMenu(state){
            state.menu = []
            Cookies.remove('menu')
        },
        // 动态生成菜单路由
        addMenu(state,router){
            console.log('很多东西',state,router)
            // 当没有菜单数据时
            if(!Cookies.get('menu')){
                return
            }
            const menu = JSON.parse(Cookies.get('menu'))
            state.menu = menu
            const menuArry = []
            menu.forEach(item=>{
                if(item.children){
                    item.children = item.children.map(item => {
                       item.component = ()=> import(`../../pages/${item.url}`) 
                       return item 
                    })
                    menuArry.push(...item.children)
                }else{
                    item.component = () =>import(`../../pages/${item.url}`)
                    menuArry.push(item)
                }
            });
              // 路由的动态添加
        menuArry.forEach(item => {
            router.addRoute('Main',item)
        })
        },
      
    }
}