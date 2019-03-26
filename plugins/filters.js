import * as $store from '@/store'
import Vue from 'vue'

export const translate = (key) => {
    let t = $store.default().getters.translation
    const locale = t.locale;
    return (t.texts[key] || {})[locale] || key;
}

export const formatDate = (value, format) => {
    if (value) {
        let d = Vue.prototype.$moment(String(value))
        if (format) {
            return d.format(format) // || "YYYY-MM-DD HH:mm:ss")
        }
        // Show time only if it's today.
        let now = Vue.prototype.$moment()
        if (d.format("YYYY-MM-DD") === now.format("YYYY-MM-DD")) {
            return d.format("HH:mm:ss")
        }
        // Show month and day only if it's this year.
        if (d.format("YYYY") === now.format("YYYY")) {
            return d.format("MM-DD HH:mm:ss")
        }
        // Otherwise, show year, month, day.
        return d.format("YYYY-MM-DD")
    }
}

export const currency = (value, decimalCount) => {
    const digitsRegex = /(\d{3})(?=\d)/g
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) return ''
    decimalCount = decimalCount || 0
    const valueStr = Math.abs(value).toFixed(decimalCount)
    const integer = decimalCount ?
        valueStr.slice(0, -1 - decimalCount) :
        valueStr
    const i = integer.length % 3
    const head = i > 0 ?
        (integer.slice(0, i) + (integer.length > 3 ? ',' : '')) :
        ''
    const decimals = decimalCount ?
        valueStr.slice(-1 - decimalCount) :
        ''
    const sign = value < 0 ? '-' : ''
    return sign + head + integer.slice(i).replace(digitsRegex, '$1,') + decimals
}

export const ipFront = ip => {
    if (!ip) {
        return
    }
    return ip.split(".").slice(0, 2).join(".")
}

export const hasNicknameError = (nickname) => {
    if (!nickname) {
        return "ERROR_NICKNAME_REQUIRED"
    }

    let numAlphaNumeric = 0
    let numKor = 0
    nickname.split("").forEach(c => {
        if (/^[a-zA-Z0-9]+$/.test(c)) {
            numAlphaNumeric++;
        }
        if (/^[가-힣]+$/.test(c)) {
            numKor++;
        }
    })

    if (numAlphaNumeric + numKor * 2 > 12) {
        return "ERROR_NICKNAME_EXCEEDED"
    }

    if (nickname !== nickname.trim() ||
        !/^[a-zA-Z0-9|가-힣]+$/.test(nickname)) {
        return "ERROR_NICKNAME_INVALID"
    }
    return false
}

export const alphaNumeric = s => {
    return s.split("").every(c => /^[a-zA-Z0-9가-힣]+$/.test(c))
}

Vue.filter('translate', translate)
Vue.filter('formatDate', formatDate)
Vue.filter('currency', currency)
Vue.filter('ipFront', ipFront)
Vue.filter('hasNicknameError', hasNicknameError)
Vue.filter('alphaNumeric', alphaNumeric)