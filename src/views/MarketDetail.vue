<template>
    <div class="view marketDetail-view">
        <div class="block info-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">{{marketInfo.name}}</span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="banner-wrap">
                        <v-banner :bannerList="bannerList" :swiperOption="swiperOption" />
                    </div>
                    <div class="info-wrap">
                        <div class="sub-title">市场简介</div>
                        <div>
                            <div class="sub-info-wrap intro">
                                <div class="sub-info-title text--green">市场简介</div>
                                <div class="sub-info-text">{{marketInfo.short_info}}</div>
                                <div class="text--green all"><span @click="onViewAllClick">查看全文</span></div>
                            </div>
                            <div class="sub-info-wrap">
                                <div class="sub-info-title text--green">服务电话</div>
                                <div class="sub-info-text">{{marketInfo.contact}}</div>
                            </div>
                            <div class="sub-info-wrap">
                                <div class="sub-info-title text--green">市场地址</div>
                                <div class="sub-info-text">{{marketInfo.address}}</div>
                            </div>
                            <div class="sub-info-wrap">
                                <div class="sub-info-title text--green">营业时间</div>
                                <div class="sub-info-text" v-for="(time, index) in marketInfo.businessTimeList" :key="index">{{time}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block market-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">市场活动</span>
                    </span>
                    <span class="more-widget" @click="onMoreClick('marActivity')">
                        <span class="sub-text">更多</span>
                        <span class="more-img"></span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="wrap banner-wrap">
                        <swiper :options="newsBannerOption">
                            <swiper-slide :key="item.activity_id" v-for="item in marActBannerList">
                                <div class="news-item-widget--show" @click="onMarketActBannerClick(item)">
                                    <img class="photo-img" :src="item.image " />
                                    <div class="mask">
                                        <div class="info">{{item.title}}</div>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="wrap meter-wrap">
                        <div class="pic-text-widget--horizontal" :key="item.activity_id" v-for="item in marketActList" @click="onMarketActMeterClick(item)">
                            <img style="height: 94.5px;" class="photo-img" :src="item.image" />
                            <div class="info-wrap">
                                <div class="info text--bold">{{item.title}}</div>
                                <div class="sub-info text--grey">{{item.detail}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block merchant-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">商家活动</span>
                    </span>
                    <span class="more-widget" @click="onMoreClick('merActivity')">
                        <span class="sub-text">更多</span>
                        <span class="more-img"></span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="wrap banner-wrap">
                        <swiper :options="newsBannerOption">
                            <swiper-slide :key="item.activity_id" v-for="item in shopActBannerList">
                                <div class="news-item-widget--show" @click="onMarketActBannerClick(item)">
                                    <img class="photo-img" :src="item.image " />
                                    <div class="mask">
                                        <div class="info">{{item.title}}</div>
                                        <div class="info">了解详情 ></div>
                                    </div>
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="wrap category-wrap">
                        <div :key="index" v-for="(category, index) in shopActList">
                            <div class="info">{{category.name}}</div>
                            <div class="type-wrap">
                                <span class="sub-info text--grey" :key="type.id" v-for="type in category.tag" @click="getShopActivity(type.id)">{{type.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block shop-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">店铺精选</span>
                    </span>
                    <span class="more-widget" @click="onMoreClick('shop')">
                        <span class="sub-text">更多</span>
                        <span class="more-img"></span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="item-widget shop-item-widget" :class="{'shop-item-widget--orange':index % 3 === 1, 'shop-item-widget--grey':index % 3 === 2,'shop-item-widget--last': index % 3 === 2}" v-for="(item, index) in shopList" :key="item.shop_id" @click="onShopItemClick(item.shop_id)">
                        <div class="info">{{item.shop_name}}</div>
                        <div class="sub-info">{{item.market_name}}</div>
                        <img class="shop-img" :src="item.image" :alt="item.shop_name" />
                    </div>
                </div>
            </div>
        </div>
        <div class="block goods-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">商品精选</span>
                    </span>
                    <span class="more-widget" @click="onMoreClick('goods')">
                        <span class="sub-text">更多</span>
                        <span class="more-img"></span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="item-widget goods-item-widget" :class="{'goods-item-widget--last': index % 3 === 2}" v-for="(item, index) in goodsList" :key="item.goods_id" @click="onGoodsItemClick(item.goods_id)"  @mouseover="selectStyle(index)" @mouseout="selecthide(index)">
                        <img class="goods-img" :src="item.image" :alt="item.name" />
                        <img v-if="item.sale_price" src="../assets/image/Group.png" alt="" style="position: absolute; width:50px; height:50px; top:32px;right: 33px;">
                        <div class="style_div" style="width: 75px;height: 20px;position: absolute;top: 45px;left: 33px;background: #fff;text-align: left;color: #f22e2e;border-radius:0 10px 10px 0;display: none;line-height: 20px;">{{'￥' + item.sale_price}}</div>
                        <img class="style_img" src="../assets/image/quan.png" alt="" style="position: absolute; width:20px; height:20px; bottom:40px;left: 33px;display: none">
                        <span class="style_img4" style="position: absolute; width:300px; height:70px; bottom:7px;left: 50px;background-color: #fff;line-height: 60px;display: none;">暂无活动</span>
                        <span class="style_img5" style="position: absolute; width:245px; height:70px; bottom:7px;left: 69px;background-color: #fff;line-height: 60px;display: none">优惠券</span>
                        <div class="info-wrap style_div3" style="display: none;">
                            <span class="sub-info">优惠券</span>
                        </div>
                        <div class="info-wrap style_div1" style="height: 30px;font-size: 18px;line-height: 30px;display: flex;justify-content: center;">
                            <span class="sub-info" v-if="item.shop_name">{{item.shop_name+'┃'}}</span>
                            <span class="info" style="font-size: 18px;">{{item.name}}</span>
                        </div>
                        <div class="price-info style_div2">{{'￥' + item.sale_price}}<s class="saleprice" v-if="item.sale_price" style="color: #ccc">{{'￥' + item.price}}</s></div>

                    </div>
                </div>
            </div>
        </div>
        <div class="global-mask" v-show="maskShow">
            <div class="center-container center-container--small">
                <div class="info-wrap">
                    <div class="info text--bold">市场简介</div>
                    <div class="sub-info text--grey" v-html="marketInfo.info"></div>
                </div>
                <span class="close-btn" @click="onCenConCancelClick"></span>
            </div>

        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import apiUtil from '../util/apiUtil.js';
import lsUtil from '../util/lsUtil.js';
import VBanner from '../components/Banner.vue';
import '../assets/js/jquery-1.11.2.min'
export default {
    name: 'marketDetail',
    components: {
        'v-banner': VBanner,
        swiper,
        swiperSlide
    },
    data() {
        return {
            marketId: 0,
            bannerList: [],
            swiperOption: {
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                }
            },
            marActBannerList: [],
            newsBannerOption: {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            marketInfo: {},
            marketActList: [],
            shopActBannerList: [],
            shopActList: [],
            shopList: [],
            goodsList: [],
            maskShow: false,
            style_show:true
        };
    },
    created() {
        this.marketId = this.$route.query.id;
        this.getMarketDetail();
        this.getMarketActivity();
    },
    computed: {
        cityData() {
            return this.$store.state.cityData;
        }
    },
    methods: {
        getMarketDetail: async function() {
            const { lng, lat } = this.cityData;
            const { success, msg, res } = await apiUtil.getJSON('v3_market/index', {
                market_id: this.marketId,
                lng,
                lat
            });
            if (success && res.data) {
                console.log(res.data);
                const { banner, market_info, shop_data, goods_data } = res.data;
                this.bannerList = banner;
                market_info.businessTimeList = market_info.business_time.split(';');
                market_info.info = market_info.info.replace(/↵/g,'\n\r')
                this.marketInfo = market_info;
                this.shopList = shop_data.list.list.slice(0, 3);
                this.goodsList = goods_data.list.list.slice(0, 6);
                //console.log(goods_data)
                //console.log(this.marketInfo.info)
            } else {
                this.$message.error(msg);
            }
        },

        getMarketActivity: async function() {
            const { id, lng, lat } = this.cityData;
            const { success, msg, res } = await apiUtil.getJSON('v3_activity/marketpc', {
                market_id: this.marketId
            });
            if (success && res.data) {
                const { marketbanner, marketlist, shopbanner, shoplist } = res.data;
                this.marActBannerList = marketbanner;
                this.marketActList = marketlist;
                this.shopActBannerList = shopbanner;
                let shopActList = [];
                for (const prop in shoplist) {
                    if (shoplist.hasOwnProperty(prop)) {
                        const obj = shoplist[prop];
                        shopActList.push(obj);
                    }
                }
                this.shopActList = shopActList;
            } else {
                this.$message.error(msg);
            }
        },

        getShopActivity: async function(type) {
            const { id, lng, lat } = this.cityData;
            const { success, msg, res } = await apiUtil.getJSON('v3_activity/shopactivity', {
                market_id: this.marketId,
                type
            });
            if (success) {
                this.shopActBannerList = [res.data];
            } else {
                this.$message.error(msg);
            }
        },

        onMarketActBannerClick: function(data) {
            this.$router.push('/activityDetail?activityId=' + data.activity_id);
        },

        onMarketActMeterClick: function(data) {
            this.marActBannerList = [data];
        },

        onShopItemClick: function(id) {
            this.$router.push('shopDetail?id=' + id);
        },

        onGoodsItemClick: function(id) {
            this.$router.push('goodsDetail?goodsId=' + id);
        },

        onViewAllClick: function() {
            this.maskShow = true;
        },

        onCenConCancelClick: function() {
            this.maskShow = false;
        },

        onMoreClick: function(route) {
            this.$router.push(`/${route}?marketId=${this.marketId}`);
        },
        selectStyle: function (i) {
            $(".style_div").eq(i).show();
            $(".style_img").eq(i).show();
            if (this.goodsList[i].sale_price == 0){
                $(".style_img4").eq(i).show();
            }else{
                $(".style_img5").eq(i).show();
            }
        },
        selecthide: function (i) {
            $(".style_div").eq(i).hide();
            $(".style_img").eq(i).hide();
            $(".style_img4").eq(i).hide();
            $(".style_img5").eq(i).hide();
        }
    }
}
</script>

<style lang="stylus">
.marketDetail-view {
    .block {
        background-color: #fff;
    }

    .block:last-child {
        margin-bottom: 95px;
    }

    .info-block {
        .content {
            .inner-content {
                display: flex;

                .banner-wrap {
                    width: 750px;
                    flex: 0 0 750px;
                    height: 450px;
                    margin-right: 80px;
                }

                .info-wrap {
                    box-sizing: border-box;
                    flex: 1;
                    height: 450px;
                    border: 1px solid rgba(213, 213, 213, 1);

                    .sub-title {
                        text-align: center;
                        border-bottom: 1px solid rgba(213, 213, 213, 1);
                        line-height: 40px;
                    }

                    .sub-info-wrap {
                        box-sizing: border-box;
                        padding: 12px;

                        .sub-info-title {
                            font-size: 14px;
                            font-weight: bold;
                            margin-bottom: 12px;
                        }

                        .sub-info-text {
                            line-height: 19px;
                            font-size: 14px;
                            letter-spacing: 1px;
                            color: rgba(153, 153, 153, 1);
                            padding-left: 6px;
                            margin-bottom: 8px;
                        }
                    }

                    .sub-info-wrap.intro {
                        .sub-info-text {
                            height: 76px;
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 4;
                        }

                        .all {
                            font-size: 12px;
                            text-align: right;
                            cursor: pointer;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
    }

    .market-block {
        .content {
            .inner-content {
                display: flex;

                .wrap:not(:last-child) {
                    margin-right: 20px;
                }

                .banner-wrap {
                    width: 710px;
                    flex: 0 0 710px;
                    margin-right: 30px;

                    .news-item-widget--show {
                        position: relative;
                        width: 710px;
                        height: 320px;
                        cursor: pointer;

                        .photo-img {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }

                        .mask {
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            height: 55px;
                            line-height: 55px;
                            color: #fff;
                            text-align: center;
                            background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
                            transition: all 0.3s;
                            opacity: 0;

                            .info {
                                font-size: 20px;
                            }
                        }
                    }

                    .news-item-widget--show:hover {
                        .mask {
                            opacity: 1;
                        }
                    }
                }

                .meter-wrap {
                    flex: 1;

                    .pic-text-widget--horizontal {
                        .photo-img {
                            width: 213px;
                            height: 96px;
                        }
                    }

                    .pic-text-widget--horizontal:not(:last-child) {
                        margin-bottom: 18px;
                    }
                }
            }
        }
    }

    .merchant-block {
        .content {
            .inner-content {
                display: flex;

                .wrap:not(:last-child) {
                    margin-right: 20px;
                }

                .banner-wrap {
                    width: 710px;
                    flex: 0 0 710px;
                    margin-right: 30px;

                    .news-item-widget--show {
                        position: relative;
                        width: 710px;
                        height: 400px;
                        cursor: pointer;

                        .photo-img {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }

                        .mask {
                            position: absolute;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            height: 55px;
                            line-height: 55px;
                            color: #fff;
                            text-align: center;
                            background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
                            transition: all 0.3s;
                            opacity: 0;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            padding: 0 10px;

                            .info {
                                font-size: 20px;
                            }
                        }
                    }

                    .news-item-widget--show:hover {
                        .mask {
                            opacity: 1;
                        }
                    }
                }

                .category-wrap {
                    flex: 1;
                    padding: 20px 0;

                    .info {
                        font-size: 18px;
                        margin-bottom: 10px;
                    }

                    .type-wrap {
                        padding: 0 0px 10px 40px;
                    }

                    .sub-info {
                        margin-right: 40px;
                        line-height: 30px;
                        cursor: pointer;
                    }

                    .sub-info:hover {
                        color: #4cb955 !important;
                    }
                }
            }
        }
    }

    .shop-block {
        .content {
            .shop-item-widget {
                margin-right: 15px;
                margin-bottom: 20px;
            }

            .shop-item-widget--last {
                margin-right: 0;
            }
        }
    }

    .goods-block {
        .content {
            .goods-item-widget {
                margin-right: 15px;
                margin-bottom: 20px;
                /*position relative;*/

            }

            .goods-item-widget--last {
                margin-right: 0;
            }
        }
    }

    .global-mask {
        .center-container {
            position: absolute;
            margin: auto;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: #fff;

            .info {
                font-size: 24px;
                margin-bottom: 20px;
            }

            .sub-info {
                line-height: 25px;
                text-align: left;
            }
        }
    }
}
.show{
    display block
}
.none{
    display none
}
</style>

