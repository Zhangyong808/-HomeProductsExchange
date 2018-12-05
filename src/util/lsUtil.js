class LsUtil {
    static cityData = localStorage.getItem('cityData') ? JSON.parse(localStorage.getItem('cityData')) : {};
    static setCityData = function(data) {
        if (data) {
            localStorage.setItem('cityData', JSON.stringify(data));
        }
    };
    static userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    static setUserInfo = function(data) {
        if (data) {
            localStorage.setItem('userInfo', JSON.stringify(data));
        }
    };
}

export default LsUtil;
