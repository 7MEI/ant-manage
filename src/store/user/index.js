import Cookie from 'js-cookie'
export default{
    state:{
        token:''
    },
    mutations:{
        // 将token储存到浏览器
        setToken(state,val){
            state.token = val
            Cookie.set('token',val)
        },
        // 清楚token
        clearToken(state){
            state.token = ''
            Cookie.remove('token')
        },
        // 将token获取出来
        getToken(state){
            state.token = state.token || Cookie.get('token')
        }
        // 清楚
    }
}