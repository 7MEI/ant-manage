import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router/index'
import store from './store/index'
import './api/mock'
import http from 'axios'
import moment from 'moment'

moment.locale('zh-cn')
Vue.prototype.$moment = moment
Vue.use(Antd);
Vue.config.productionTip = false
Vue.prototype.$http = http

// 路由守卫
router.beforeEach((to,form,next)=>{
  // 获取token证明已登录
  store.commit('getToken')
  const token = store.state.user.token
  // 当token不存在并且不是在登录页的时候
  if(!token && to.name!=='login'){
    next({name:'login'})
  }else if(token&& to.name === 'login'){
    next({name:'home'})
  }else{
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
