var localeLoaded = false;

export default {
    async setLocale({
        commit,
        dispatch
    }, payload) {
        if (process.client)
            window.localStorage.setItem("locale", payload)
        return commit('setTranslation', {
            locale: payload
        })
    },
}