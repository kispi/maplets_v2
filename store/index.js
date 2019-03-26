import Vuex from 'vuex'
import bundled from '../store_modules'

const store = () => new Vuex.Store(bundled)
export default store