import VueMoment from 'vue-moment'
import Vue from 'vue'
import api from './api'

export const Translate = {
    install(Vue, options) {
        Vue.prototype.$translate = function(key) {
            return this.$options.filters.translate(key);
        }
    }
};

export const Loading = {
    install(Vue) {
        Vue.prototype.$loading = function(show) {
            $nuxt.$emit('onSetLoading', show)
        }
    }
}

export const Toast = {
    install(Vue) {
        let emitToast = function(msg, bgClass) {
            $nuxt.$emit('onToast', {
                message: msg,
                class: bgClass
            })
        }
        Vue.prototype.$toast = {
            success(msg) {
                emitToast(msg, "bgm-accent")
            },
            error(msg) {
                emitToast(msg, "bgm-danger")
            },
            warning(msg) {
                emitToast(msg, "bgm-warning")
            }
        }
    }
}

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
        Vue.prototype.$api = api
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
Vue.use(VueMoment)