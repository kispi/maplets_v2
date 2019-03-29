// initial state
const state = {
    background: process.client ? window.localStorage.getItem('background') : 'show',
    chat: process.client ? window.localStorage.getItem('chat') : 'hide',
    selectedArcaneRiverArea: process.client ? window.localStorage.getItem('selectedArcaneRiverArea') : 'vanishing_road',
    users: [],
    userWhisperedToMe: null
}

// getters
const getters = {
    selectedArcaneRiverArea(state) {
        return state.selectedArcaneRiverArea
    },
    chat(state) {
        return state.chat
    },
    background(state) {
        return state.background
    },
    users(state) {
        return state.users
    },
    userWhisperedToMe(state) {
        return state.userWhisperedToMe
    }
}

// actions
const actions = {}

// mutations
const mutations = {
    chat(state, payload) {
        if (["show", "hide"].indexOf(payload) === -1) {
            return
        }
        state.chat = payload
        if (process.client)
            window.localStorage.setItem('chat', state.chat)
    },
    background(state, payload) {
        if (["show", "hide"].indexOf(payload) === -1) {
            return
        }
        state.background = payload
        if (process.client)
            window.localStorage.setItem('background', state.background)
    },
    updateUsersList(state, payload) {
        if (!payload) {
            return
        }
        state.users = payload
    },
    setUserWhisperedToMe(state, payload) {
        if (!payload) {
            return
        }
        state.userWhisperedToMe = payload
    },
    setArcaneRiverArea(state, payload) {
        if (payload === undefined) {
            return
        }
        state.selectedArcaneRiverArea = payload.value
        window.localStorage.setItem('selectedArcaneRiverArea', state.selectedArcaneRiverArea)
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}