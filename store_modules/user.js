const newUser = _ => {
    return {
        authToken: null,
        world: null,
        nickname: null,
        selectedChatType: null,
        lastChatWith: null,
    }
}

const state = {
    user: newUser()
}

const getters = {
    user(state) {
        return state.user
    }
}

const actions = {
    async setUser({
        commit,
        dispatch
    }, payload) {
        return commit('setUser', payload)
    },
    async removeUser({
        commit
    }) {
        return commit('setUser')
    }
}

const mutations = {
    setUser(state, payload) {
        if (payload === undefined) {
            state.user = newUser();
            return
        }

        Object.keys(state.user).forEach(key => {
            if (payload[key]) {
                state.user[key] = payload[key]
            }
        })
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}