import * as types from './mutation-types';

export default {
    setCityData({ commit }, data) {
        commit(types.SET_CITYDATA, data);
    },
    setUserInfo({ commit }, data){
        commit(types.SET_USERINFO, data);
    },
    clearUserInfo({ commit }, data){
        commit(types.CLEAR_USERINFO, data);
    },
    initFromLs({ commit }, data){
        commit(types.INIT_FROM_LS, data);
    }
};
