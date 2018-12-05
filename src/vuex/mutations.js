import * as types from './mutation-types.js';

export default {
    [types.SET_CITYDATA](state, data) {
        state.cityData = data;
        window.localStorage.setItem('cityData', JSON.stringify(state.cityData));
    },

    [types.SET_USERINFO](state, data) {
        state.userInfo = data;
        window.localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
    },

    [types.CLEAR_USERINFO](state, data) {
        state.userInfo = {};
        window.localStorage.removeItem('userInfo');
    },

    [types.INIT_FROM_LS] (state, info) {
        state.cityData = !!window.localStorage.getItem('cityData') ? JSON.parse(window.localStorage.getItem('cityData')) : {}
        state.userInfo = !!window.localStorage.getItem('userInfo') ? JSON.parse(window.localStorage.getItem('userInfo')) : {}
    }
};
