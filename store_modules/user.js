let storedUser
if (process.client) {
    storedUser = window.localStorage.getItem('user')
}

if (storedUser) {
    storedUser = JSON.parse(storedUser)
}

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
    user: storedUser || newUser()
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
}

const mutations = {
    setUser(state, payload) {
        if (payload === undefined) {
            return
        }
        Object.keys(state.user).forEach(key => {
                if (payload[key])
                    state.user[key] = payload[key]
            })
            // window.localStorage.setItem('user', JSON.stringify(state.user))
    },
    removeUser(state) {
        state.user = newUser();
        window.localStorage.removeItem("user")
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}