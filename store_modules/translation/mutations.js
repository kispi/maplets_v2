export default {
    setLocale(state, payload) {
        if (!payload) {
            return
        }

        if (payload !== undefined) {
            state.translation.locale = payload
            if (process.client)
                window.localStorage.setItem("locale", payload)
        }
    },
};