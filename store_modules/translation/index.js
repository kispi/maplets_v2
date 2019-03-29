import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import json from '../../assets/translations.json';

let locale = "kr"

export default {
    state: {
        translation: {
            locale,
            texts: json
        }
    },
    getters,
    mutations,
    actions
};