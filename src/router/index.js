import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../pages/Main.vue'
import Home from '../pages/Home'
import User from '../pages/User'
import Mall from '../pages/Mall'

import pageOne from '../pages/Other/pageOne'
import pageTwo from '../pages/Other/pageTwo'

Vue.use(VueRouter)

// 解决路由重复跳转问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        component: Main,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name:'home',
                component: Home
            },
            {
                path: 'user',
                name:'user',
                component: User
            },
            {
                path: 'mall',
                name:'mall',
                component: Mall
            },
            {
                path:'page1',
                name:'page1',
                component:pageOne
            },
            {
                path:'page2',
                name:'page2',
                component:pageTwo
            }
        ]
    },
    {
        path:'/login',
        name:'login',
        component:()=>import('../pages/Login')
    }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
export default router