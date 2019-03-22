import Vue from 'vue'

const state = () => ({
    board: null,
    articles: null,
    article: null,
})

const getters = {
    board: state => state.board,
    articles: state => state.articles,
    article: state => state.article,
}

const actions = {
    async loadBoard({ commit }) {
        try {
            const resp = await Vue.prototype.$api(
                "get",
                "boards/2"
            );
            return commit('setBoard', resp.data.data)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async loadArticles({ commit }, payload) {
        try {
            const resp = await Vue.prototype.$api(
                "get",
                "articles",
                payload
            );
            return commit('setArticles', resp.data.data)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    async loadArticle({ commit, dispatch }, payload) {
        if (!payload || parseInt(payload) === NaN) {
            return commit('setArticle', null)
        }
        try {
            const resp = await Vue.prototype.$api("get", "articles/" + payload)
            return commit('setArticle', resp.data.data)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}

// mutations
const mutations = {
    async setBoard(state, payload) {
        state.board = payload
    },
    async setArticles(state, payload) {
        state.articles = payload
    },
    async setArticle(state, payload) {
        state.article = payload

        if (payload && state.articles) {
            let found = state.articles.find(a => a.id === payload.id)
            if (found) {
                found.views = payload.views
            }
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}