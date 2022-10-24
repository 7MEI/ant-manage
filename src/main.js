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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
