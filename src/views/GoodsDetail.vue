<template>
    <div class="view goodsDetail-view" style="position: relative;">
        <div style="color:gray;width: 70%;left: 128px;top:20px;position: absolute;"><span>{{market_name}}</span><span>&nbsp＞&nbsp</span><span>{{shop_info.name}}</span><span>&nbsp＞&nbsp</span><span>{{name}}</span></div>
        <div style="height: 50px;"></div>
        <div class="block info-block">
            <div class="content">
                <div class="inner-content banner-wrap">
                    <div class="gallery-top" style="margin-left: 10px;">
                        <img class="photo-img" :src='img' alt="" width="200">
                    </div>
                    <!-- swiper2 Thumbs -->
                    <swiper style="margin-left: 10px;" :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs" >
                        <swiper-slide class="photo-img" :key="index" v-for="(item, index) in image_list">
                            <img class="photo-img" :src="item"  @click="click(item)"/>
                        </swiper-slide>

                    </swiper>
                </div>
                <div class="inner-content info-wrap">
                    <div class="info text--bold">{{name}}</div>
                    <div class="sub-info text--grey">{{subname}}</div>
                    <div class="price-wrap bg--grey">
                        <span class="text--grey">价格</span>
                        <span class="discount">{{`¥${discount_price == 0 ? price : discount_price}`}}</span>
                        <span class="price text--grey" v-if="discount_price != 0">{{`¥${price}`}}</span>
                        <span class="stock">
                            <span class="text--grey">库存</span>
                            <span>{{stock}}</span>
                        </span>
                    </div>
                    <div class="sub-info-wrap">
                        <span class="text--grey">店铺名称</span>
                        <span>{{shop_info.name}}</span>
                    </div>
                    <div class="sub-info-wrap">
                        <span class="text--grey">所属市场</span>
                        <span>{{market_name}}</span>
                    </div>
                    <!--显示二维码-->
                    <div style="width: 180px;text-align: center;padding-top: 0;padding-bottom: 3px;">
                        <span class="names" style="background:rgba(60,184,80,1);height: 46px;font-size: 20px;text-align: center;color:#fff;line-height: 46px;display: inline-block;width: 100%;" @mouseover="selectStyle" @mouseout="selecthide"></span>
                       <div class="twoimg" style="border: 1px solid lightgray;padding-bottom: 5px;display: none;">
                           <img style="width:160px;height:160px;" src="../assets/image/two.png" alt="">
                           <br>
                           <span style="color:#3CB850;font-size: 12px;">下载家品汇app领取优惠券</span>
                       </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block detail-block">
            <div class="content">
                <div class="inner-content related-wrap">
                    <div class="head bg--grey">相关推荐</div>
                    <div class="item-widget goods-item-widget goods-item-widget--small" v-for="item in recommendList" :key="item.goods_id" @click="onGoodsItemClick(item.goods_id)">
                        <img class="goods-img" :src="item.image" :alt="item.name" />
                        <div class="info-wrap">
                            <span class="info">{{item.name}}</span>
                        </div>
                        <div class="price-info">{{'￥' + item.price}} <s v-if="item.sale_price" style="color: #ccc">{{'￥' + item.sale_price}}</s></div>
                    </div>
                </div>
                <div class="inner-content detail-wrap">
                    <div class="wrap param-wrap">
                        <div class="head bg--grey">规格参数</div>
                        <div class="sub-param-wrap">
                            <span class="param">{{`品牌：${brand_info.name || ''}`}}</span>
                            <span class="param">{{`分类：${category_name}`}}</span>
                            <span class="param" :key="item.attr_id" v-for="(item) in attr">{{`${item.name}：${item.value}`}}</span>
                        </div>
                    </div>
                    <div class="wrap image-wrap">
                        <div class="head bg--grey">商品详情</div>
                        <div v-html="content"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import apiUtil from '../util/apiUtil.js';
import '../assets/js/jquery-1.11.2.min';
export default {
    name: 'goodsDetail',
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            swiperOptionTop: {
                spaceBetween: 10
            },
            swiperOptionThumbs: {
                spaceBetween: 10,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true
            },
            goodsId: '',
            image_list: [],
            name: '',
            subname: '',
            discount_price: 0,
            price: 0,
            stock: 0,
            shop_info: {},
            market_name: '',
            brand_info: {},
            category_name: '',
            attr: [],
            content: '',
            recommendList: [],
            img :''
        };
    },
    computed: {
        cityData(){
            return this.$store.state.cityData;
        }
    },
    created() {
        this.goodsId = this.$route.query.goodsId;
        this.getGoodsDetail();
        this.getGoodsRecom();
    },
    mounted() {
        this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper;
            const swiperThumbs = this.$refs.swiperThumbs.swiper;
            swiperTop.controller.control = swiperThumbs;
            swiperThumbs.controller.control = swiperTop;
        });
    },
    watch: {
        $route(to, from) {
            const newGoodsId = to.query.goodsId;
            this.goodsId = newGoodsId;
            this.getGoodsDetail();
            this.getGoodsRecom();
        }
    },
    methods: {
        //图片的点击切换事件


        click : function(img){
               this.img=img;
        },

        getGoodsDetail: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`goods/info?goods_id=${this.goodsId}`, {});
            if (success && res.data) {
                const { image_list, name, subname, discount_price, price, stock, shop_info, market_name, brand_info, category_name, attr, content } = res.data;
                this.image_list = image_list || [];
                this.img = this.image_list[0];
                this.name = name;
                this.subname = subname;
                this.discount_price = discount_price;
                this.price = price;
                this.stock = stock;
                this.shop_info = shop_info;
                this.market_name = market_name;
                this.brand_info = brand_info || {};
                this.category_name = category_name;
                this.attr = attr || [];
                this.content = content;
                let names =document.getElementsByClassName("names");
                    //console.log(res.data.list[i]);
                    //判断是否有折扣价格
                    if(this.discount_price == 0){
                        //names.innerHTML = '手机购买';
                        $(".names").html("手机购买");
                    }else{
                        //names.innerHTML = '优惠券';
                        $(".names").html("优惠券");
                    }
            } else {
                this.$message.error(msg);
            }
        },
        selectStyle: function () {
            $(".twoimg").show();

        },
        selecthide: function () {
            $(".twoimg").hide();
        },
        getGoodsRecom: async function() {
            const { success, msg, res } = await apiUtil.getJSON(`goods/recom`, {
                city_id: this.cityData.city_id
            });
            if (success && res.data) {
                const { list } = res.data;
                this.recommendList = list;
            } else {
                this.$message.error(msg);
            }
        },

        onGoodsItemClick: function(id) {
            this.$router.push('goodsDetail?goodsId=' + id);
        }
    }
};

</script>
<style lang="stylus">
.goodsDetail-view {

    background-color: #fff;

    .info-block {
        .content {
            display: flex;

            .banner-wrap {
                width: 750px;
                height: 550px;
                flex: 0 0 750px;
                margin-right: 40px;

                .gallery-top {
                    margin-bottom: 24px;

                    .photo-img {
                        width: 750px;
                        height: 398px;
                    }
                }

                .gallery-thumbs {
                    .photo-img {
                        width: 240px;
                        height: 126px;
                    }
                }
            }

            .info-wrap {
                flex: 1;
                font-size: 14px;

                .info {
                    font-size: 20px;
                    margin-bottom: 10px;
                }

                .sub-info {
                    margin-bottom: 20px;
                }

                .price-wrap {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    margin-bottom: 40px;

                    span {
                        margin-right: 10px;
                    }

                    .discount {
                        font-size: 20px;
                        color: red;
                    }

                    .price {
                        text-decoration: line-through;
                        margin-right: 100px;
                    }
                }

                .sub-info-wrap {
                    padding-left: 10px;
                    margin-bottom: 40px;

                    span {
                        margin-right: 15px;
                    }
                }
            }
        }
    }

    .detail-block {
        .content {
            display: flex;

            .head {
                padding: 10px 30px;
            }

            .related-wrap {
                width: 200px;
                flex: 0 0 200px;
                margin-right: 35px;
                border: 1px solid #f2f2f2;

                .head {
                    text-align: center;
                    margin-bottom: 10px;
                }

                text-align: center;
            }

            .detail-wrap {
                width: 964px;
                flex: 0 0 964px;

                .param-wrap {
                    margin-bottom: 30px;

                    .sub-param-wrap {
                        padding: 20px 15px;
                        border: 1px solid #f2f2f2;

                        .param {
                            display: inline-block;
                            width: 300px;
                            margin-bottom: 20px;
                        }
                    }
                }

                .image-wrap {
                    img {
                        width: 964px;
                    }
                }
            }
        }
    }
}
</style>


