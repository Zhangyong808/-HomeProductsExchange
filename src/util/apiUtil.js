import axios from 'axios';
import config from '../config';
const {api} = config;
const host = !!api.port
    ? `${api.host}:${api.port}/`
    : `${api.host}/`;
class ApiUtil {
    static getJSON = async(url, params = {}, token) => {
        let queryStr = '';
        for (let prop in params) {
            if (!!params[prop]) {
                queryStr += `${prop}=${params[prop]}&`;
            }
        }
        if (!!queryStr) {
            queryStr = `?${queryStr.substr(0, queryStr.length - 1)}`;
        }
        const {
            data: {
                status,
                msg,
                ...res
            }
        } = await axios.get(`${host}${url}${queryStr}`);
        if (status !== 200) {
            return {success: false, msg};
        } else {
            return {success: true, msg, res};
        }
    };

    static postJSON = async(url, params = {}) => {
        const {
            data: {
                status,
                msg,
                ...res
            }
        } = await axios.post(`${host}${url}`, params);
        if (status !== 200) {
            return {success: false, msg};
        } else {
            return {success: true, msg, res};
        }
    };

    static putJSON = async(url, params = {}) => {
        const {
            data: {
                status,
                msg,
                ...res
            }
        } = await axios.put(`${host}${url}`, params);
        if (status !== 200) {
            return {success: false, msg};
        } else {
            return {success: true, msg, res};
        }
    };

    static deleteJSON = async(url, params = {}) => {
        let queryStr = '';
        for (let prop in params) {
            queryStr += `${prop}=${params[prop]}&`;
        }
        if (!!queryStr) {
            queryStr = `?${queryStr.substr(0, queryStr.length - 1)}`;
        }
        const {
            data: {
                status,
                msg,
                ...res
            }
        } = await axios.delete(`${host}${url}${queryStr}`);
        if (status !== 200) {
            return {success: false, msg};
        } else {
            return {success: true, msg, res};
        }
    };
}

export default ApiUtil;
