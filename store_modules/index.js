import Vue from 'vue'
import Vuex from 'vuex'

import App from './app/app'
import Api from './services/api'
import Translation from './translation/index'
import User from './user'

let getters = {};
let state = {};
let actions = {};
let mutations = {};

[App, Api, Translation, User].forEach(obj => {
    Object.keys(obj.state).forEach(key => {
        state[key] = obj.state[key]
    })
    Object.keys(obj.getters).forEach(key => {
        getters[key] = obj.getters[key]
    })
    Object.keys(obj.actions).forEach(key => {
        actions[key] = obj.actions[key]
    })
    Object.keys(obj.mutations).forEach(key => {
        mutations[key] = obj.mutations[key]
    })
})

export default {
    state,
    getters,
    actions,
    mutations
}