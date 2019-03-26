import * as $http from 'axios'

export default async function(method, endpoint, params, payload) {
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