import Vue from 'vue'
import Vuex from 'vuex'

import App from './app/app'
import Api from './services/api'
import Translation from './translation/index'
import User from './user'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        App,
        Api,
        Translation,
        User
    }
})