class CommonUtil {
    /**
     * 根据imgUrl获取bannerItem的background值
     */
    static getBannerBg = function (imgUrl) {
        return `url(${imgUrl}) no-repeat center center`;
    }
}

export default CommonUtil;