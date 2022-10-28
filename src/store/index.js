import Vuex from 'vuex'
import Vue from 'vue'
import tab from './tab/index'
import user from './user/index'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab,
        user
    }
})