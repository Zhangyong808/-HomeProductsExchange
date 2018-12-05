<template>
    <div class="view shopDetail-view">
        <div class="block info-block">
            <div class="content">
                <div style="margin-bottom: 20px;color:gray;"><span>{{shop_info.market_name}}</span>&nbsp＞&nbsp</span><span>{{shop_info.name}}</span></div>
                <div class="inner-content">
                    <div class="banner-wrap">
                        <v-banner :bannerList="bannerList" :swiperOption="swiperOption" />
                    </div>
                    <div class="info-wrap">
                        <div class="info text--bold">{{shop_info.name}}</div>
                        <div class="sub-info category text--green text--bold">{{shop_info.category_name}}</div>
                        <div class="sub-info market"><span class="text--grey">所属市场：</span>{{shop_info.market_name}}</div>
                        <div class="sub-info address"><span class="text--grey">详细地址：</span>{{shop_info.address}}</div>
                        <div class="sub-info contact"><span class="text--grey">联系电话：</span>{{shop_info.contact}}</div>
                        <!--显示二维码-->
                        <div style="width: 180px;text-align: center;padding-top: 0;padding-bottom: 3px;">
                            <span class="names" style="background:rgba(60,184,80,1);height: 46px;font-size: 20px;text-align: center;color:#fff;line-height: 46px;display: inline-block;width: 100%;" @mouseover="selectStyle" @mouseout="selecthide">手机购买</span>
                            <div class="twoimg" style="border: 1px solid lightgray;padding-bottom: 5px;display: none;">
                                <img style="width:160px;height:160px;" src="../assets/image/two.png" alt="">
                                <br>
                                <span style="color:#3CB850;font-size: 12px;">下载家品汇app领取优惠券</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block goods-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">全部商品</span>
                    </span>
                    <span class="more-widget" @click="onMoreClick('/goods?shopId='+shopId)">
                        <span class="sub-text">更多</span>
                        <span class="more-img"></span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="item-widget goods-item-widget" :class="{'goods-item-widget--last': index % 3 === 2}" v-for="(item, index) in goodsList" :key="item.goods_id" @click="onGoodsItemClick(item.goods_id)">
                        <img class="goods-img" :src="item.image" :alt="item.name" />
                        <div class="info-wrap">
                            <span class="sub-info" v-if="item.brand_name">{{item.brand_name + ' | '}}</span>
                            <span class="info">{{item.name}}</span>
                        </div>
                        <div class="price-info">{{'￥' + item.sale_price}}<s v-if="item.sale_price" style="color: #ccc">{{'￥' + item.price}}</s></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block discount-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">折扣专区</span>
                    </span>
                    <span class="more-widget" @click="onMoreClick('/goods?discount=2&shopId='+shopId)">
                        <span class="sub-text">更多</span>
                        <span class="more-img"></span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="item-widget goods-item-widget" :class="{'goods-item-widget--last': index % 3 === 2}" v-for="(item, index) in discountList" :key="item.id" @click="onGoodsItemClick(item.goods_id)">
                        <img class="goods-img" :src="item.image" :alt="item.name" />
                        <div class="info-wrap">
                            <span class="sub-info" v-if="item.brand_name">{{item.brand_name + ' | '}}</span>
                            <span class="info">{{item.name}}</span>
                        </div>
                        <div class="price-info">{{'￥' + item.price}}<s v-if="item.sale_price" style="color: #ccc">{{'￥' + item.sale_price}}</s></div>
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
                    <div class="item-widget activity-item-widget" :class="{'activity-item-widget--last': index % 3 === 2}" v-for="(item, index) in activityList" :key="item.activity_id" @click="onActivityItemClick(item.activity_id)">
                        <img class="photo-img" :src="item.image" :alt="item.title" />
                        <div class="info-wrap">
                            <span class="sub-info">{{item.title + ' | ' }}<span class="text--grey type">{{item.fav_name}}</span></span>
                            <span class="sub-info detail">了解详情 ></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiUtil from '../util/apiUtil.js';
import lsUtil from '../util/lsUtil.js';
import VBanner from '../components/Banner.vue';
export default {
    name: 'shopDetail',
    components: {
        'v-banner': VBanner
    },
    data() {
        return {
            
            shopId: 0,
            bannerList: [],
            swiperOption: {
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                }
            },
            shop_info: {},
            marketInfo: {},

            goodsList: [],
            discountList: [],
            activityList: []
        };
    },
    computed: {
        cityData(){
            return this.$store.state.cityData;
        }
    },
    created() {

        this.shopId = this.$route.query.id;
        this.getShopDetail();
        this.getGoodsShortListByShop();
        this.getDiscountListByShop();
        this.getActivityListByShop();
    },
    methods: {
        selectStyle: function () {
            $(".twoimg").show();

        },
        selecthide: function () {
            $(".twoimg").hide();
        },
        getShopDetail: async function() {
            const { lng, lat } = this.cityData;
            const { success, msg, res } = await apiUtil.getJSON('shop/info', {
                shop_id: this.shopId
            });
            if (success) {
                const { shop_info } = res.data;
                this.shop_info = shop_info;
                this.bannerList = shop_info.image_list.map((ele, index) => ({
                    banner_id: index,
                    image: ele
                }));
                // this.shopList = shop_data.list.list;
                // this.goodsList = goods_data.list.list;
            } else {
                this.$message.error(msg);
            }
        },

        getGoodsShortListByShop: async function() {
            const { id, lng, lat } = this.cityData;
            const { success, msg, res } = await apiUtil.postJSON(`v3_coupons/pccoupon?page_size=6&page=1&shop_id=${this.shopId}&city_id=${id}`, {});
            if (success && res.data) {
                const { list } = res.data;
                this.goodsList = list;
            } else {
                this.$message.error(msg);
            }
        },

        getDiscountListByShop: async function() {
            const { id, lng, lat } = this.cityData;
            const { success, msg, res } = await apiUtil.postJSON(`v3_coupons/pccoupon?page_size=6&page=1&shop_id=${this.shopId}&city_id=${id}&type_id=2`, {});
            if (success && res.data) {
                const { list } = res.data;
                this.discountList = list;
            } else {
                this.$message.error(msg);
            }
        },

        getActivityListByShop: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`shop/activity?shop_id=${this.shopId}`, {});
            if (success) {
                const { active_info } = res.data;

                this.activityList = active_info;
            } else {
                // this.$message.error(msg);
            }
        },

        onGoodsItemClick: function(id) {
            this.$router.push('goodsDetail?goodsId=' + id);
        },

        onActivityItemClick: function(id) {
            this.$router.push('/activityDetail?activityId=' + id);
        },

        onMoreClick: function(route){
            this.$router.push(route);
        }
    }
};

</script>

<style lang="stylus">
.shopDetail-view {
    background-color: #fff;

    .block {
        margin-bottom: 30px;
    }

    .block:last-child {
        padding-bottom: 95px;
    }

    .info-block {
        .content {
            .inner-content {
                display: flex;

                .banner-wrap {
                    width: 750px;
                    flex: 0 0 750px;
                    height: 450px;
                    margin-right: 40px;
                }

                .info-wrap {
                    box-sizing: border-box;
                    flex: 1;

                    .info {
                        font-size: 28px;
                        margin-bottom: 15px;
                    }

                    .sub-info {
                        line-height: 25px;
                        margin-bottom: 15px;
                    }

                    .sub-info.category {
                        border-bottom: 1px solid #f2f2f2;
                    }
                }
            }
        }
    }

    .goods-block {
        .content {
            .inner-content {
                .goods-item-widget {
                    margin: 0 15px 20px 0;
                }

                .goods-item-widget--last {
                    margin-right: 0;
                }
            }
        }
    }

    .discount-block {
        .content {
            .inner-content {
                .goods-item-widget {
                    margin: 0 15px 20px 0;
                }

                .goods-item-widget--last {
                    margin-right: 0;
                }
            }
        }
    }

    .merchant-block {
    }
}
</style>

