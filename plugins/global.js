import {
    store as $store
} from '@/store'
import * as $http from 'axios'
import Vue from 'vue'

export const Translate = {
    install(Vue, options) {
        Vue.prototype.$translate = function(key) {
            return this.$options.filters.translate(key);
        }
    }
};

export const Toast = {
    install(Vue) {
        Vue.prototype.$toast = {
            success: function(message) {
                $store.dispatch("setToast", {
                    message,
                    type: "success"
                })
            },
            error: function(message) {
                $store.dispatch("setToast", {
                    message,
                    type: "error"
                })
            }
        }
    }
};

export const Shake = {
    install(Vue) {
        Vue.prototype.$shake = function(elem) {
            if (elem) {
                elem.classList.add("shake")
                setTimeout(() => {
                    elem.classList.remove("shake")
                }, 500)
            }
        }
    }
}

export const numArray = {
    install(Vue) {
        Vue.prototype.$numArray = function(len) {
            return Array.apply(null, { length: len }).map(Number.call, Number)
        }
    }
};

export const Loading = {
    install(Vue) {
        Vue.prototype.$loading = async function(payload) {
            if (payload === true || payload === false) {
                await $store.dispatch("setLoading", payload);
            }
        }
    }
};

export const ScrollToTop = {
    install(Vue) {
        const scrollToTop = function() {
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        }
        Vue.prototype.$scrollToTop = scrollToTop
    }
}

export const Copy = {
    install(Vue) {
        Vue.prototype.$copy = function(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    }
}

export const IP = {
    install(Vue) {
        Vue.prototype.$ip = function() {
            if (window.ip) {
                return window.ip();
            }
        }
    }
}

export const Api = {
    install(Vue) {
        Vue.prototype.$api = async function(method, endpoint, params, payload) {
            let apiUrl = process.env.VUE_APP_API_URL
            let m = method.toLowerCase()
            if (m === "get") {
                return await $http.get(apiUrl + endpoint, { params })
            }
            if (m === "post") {
                return await $http.post(apiUrl + endpoint, payload)
            }
            if (m === "put") {
                return await $http.put(apiUrl + endpoint, payload)
            }
            if (m === "delete") {
                return await $http.delete(apiUrl + endpoint)
            }
        }
    }
}

Vue.use(Translate)
Vue.use(Toast)
Vue.use(Shake)
Vue.use(numArray)
Vue.use(Loading)
Vue.use(ScrollToTop)
Vue.use(Copy)
Vue.use(IP)
Vue.use(Api)