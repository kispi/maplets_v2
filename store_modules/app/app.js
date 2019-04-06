// initial state
const state = {
    background: 'show',
    chat: 'hide',
    users: [],
    userWhisperedToMe: null
}

// getters
const getters = {
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
    },
    background(state, payload) {
        if (["show", "hide"].indexOf(payload) === -1) {
            return
        }
        state.background = payload
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
}

export default {
    state,
    getters,
    actions,
    mutations
}