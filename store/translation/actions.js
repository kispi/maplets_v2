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

    async loadLocale({
        commit,
        dispatch
    }, locale) {
        if (localeLoaded) {
            return;
        }
        localeLoaded = true;
        if (!locale) {
            locale = process.client ? window.localStorage.getItem("locale") : "kr"
        }
        return commit('setTranslation', {
            locale
        })
    },
}