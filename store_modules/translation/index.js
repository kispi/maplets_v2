import getters from './getters';
import mutations from './mutations';
import actions from './actions';

import texts from '../../assets/translations/index';

let locale = "kr"

export default {
    state: {
        translation: {
            locale,
            texts
        }
    },
    getters,
    mutations,
    actions
};