import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../pages/Home'
import User from '../pages/User'
import Mall from '../pages/Mall'
import Main from '../pages/Main.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        component: Main,
        redirect: 'home',
        children: [
            {
                path: 'home',
                component: Home
            },
            {
                path: 'user',
                component: User
            },
            {
                path: 'mall',
                component: Mall
            }
        ]
    }

    // {
    //     path: '/',
    //     component: () => import('../pages/Main.vue'),
    //     redirect:'home',
    //     children: [
    //         {
    //             path: 'home',
    //             component: Home
    //         },
    //         {
    //             path: 'user',
    //             component: User
    //         },
    //         {
    //             path: 'mall',
    //             component: Mall
    //         }
    //     ]
    // }
]
const router = new VueRouter({
    mode: 'history',
    routes
})
export default router