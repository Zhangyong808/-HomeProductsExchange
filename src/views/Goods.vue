<template>
    <div class="view goods-view">
        <div class="block banner-block">
            <div class="content">
                <v-banner :bannerList="bannerList" :hasNavigation="false" :hasPagination="false" />
            </div>
        </div>
        <div class="block filter-block">
            <div class="content">
                <div v-if="!isDiscountPage" class="filter-wrap">
                    <span class="info text--grey">折扣</span>
                    <el-radio-group v-model="discount" class="filter-widget" @change="onDiscountChange">
                        <el-radio-button label="0">不限</el-radio-button>
                        <el-radio-button label="1">普通商品</el-radio-button>
                        <el-radio-button label="2">折扣商品</el-radio-button>
                    </el-radio-group>
                </div>

                <div class="filter-wrap">
                    <span class="info text--grey">推荐</span>
                    <el-radio-group v-model="selectedCategory" class="filter-widget" @change="onCategoryChange">
                        <el-radio-button :key="item.id" v-for="item in categoryOptions" :label="item.id">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>

                <div class="filter-wrap">
                    <span class="info text--grey">分类</span>
                    <el-radio-group v-model="selectedType" class="filter-widget" @change="onTypeChange">
                        <el-radio-button :key="item.id" v-for="item in typeOptions" :label="item.id">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>

            </div>

        </div>
        <div class="block list-block">
            <div class="content">
                <div class="goods-item-wrap">
                    <div class="item-widget goods-item-widget" :class="{'goods-item-widget--last': index % 3 === 2}" v-for="(item, index) in goodsList" :key="item.id" @click="onGoodsItemClick(item.goods_id)">
                        <img class="goods-img" :src="item.image" :alt="item.name" />
                        <div class="info-wrap">
                            <span class="sub-info" v-if="item.brand_name">{{item.brand_name + ' | '}}</span>
                            <span class="info">{{item.name}}</span>
                        </div>
                        <div class="price-info">{{'￥' + item.price}}</div>
                    </div>
                </div>
                <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="page_size" :total="total" @current-change="onPageChange"></el-pagination>

            </div>

        </div>
    </div>
</template>
<script>
import lsUtil from '../util/lsUtil.js';
import apiUtil from '../util/apiUtil.js';
import VBanner from '../components/Banner.vue';
export default {
    name: 'goods',
    components: {
        'v-banner': VBanner
    },
    data() {
        return {
            
            marketId: undefined,
            shopId: undefined,
            discount: 0,
            selectedCategory: 0,
            selectedType: 0,
            categoryOptions: [],
            typeOptions: [],
            page: 1,
            page_size: 12,
            total: 0,
            bannerList: [],
            goodsList: [],
            isDiscountPage: false //是否为折扣商品页面，决定是否隐藏折扣商品过滤器
        };
    },
    computed: {
        cityData(){
            return this.$store.state.cityData;
        }
    },
    created() {
        // this.cityData = lsUtil.cityData;
        this.getCategoryList();
        this.discount = this.$route.query.discount || 0;
        if(this.discount == 2){
            this.isDiscountPage = true;
        }
        this.marketId = this.$route.query.marketId || undefined;
        this.shopId = this.$route.query.shopId || undefined
        this.getGoodsList(1, this.discount, 0, 0);
        this.getMarket(1, this.discount, 0, 0);
    },

    methods: {
        getCategoryList: async function() {
            const { success, msg, res } = await apiUtil.getJSON('goods/category', {});
            if (success) {
                const list = res.data;
                if (Array.isArray(list)) {
                    let options = [{ id: 0, text: '不限', types: [] }];
                    this.categoryOptions = options.concat(
                        list.map(ele => ({
                            id: ele.category_id,
                            text: ele.name,
                            types: ele.types.map(item => ({
                                id: item.type_id,
                                text: item.name
                            }))
                        }))
                    );
                }
            } else {
                this.$message.error(msg);
            }
        },
        getMarket: async function(){
            const {lng, lat } = this.cityData;
            const { success, msg, res } = await apiUtil.postJSON(`v3_market/index?market_id=${this.marketId}&lng=${lng}&lat=${lat}`, {});
            if (success && res.data) {
                const { banner } = res.data;
                //this.bannerList = banner;
            } else {
                this.$message.error(msg);
            }
        },
        getGoodsList: async function(page, discount, categoryId, typeId) {
            const { city_id, lng, lat } = this.cityData;
            page = page || this.page;
            const { success, msg, res } = await apiUtil.postJSON(`v3_coupons/pccoupon?market_id=${this.marketId}&shop_id=${this.shopId}&page_size=${this.page_size}&page=${page}&type_id=${discount}&parent_id=${categoryId}&category_id=${typeId}&city_id=${city_id}`, {});
            if (success && res.data) {
                const { list, banner_pc, total } = res.data;
                this.bannerList = [banner_pc];
                //console.log(this.bannerList);
                this.goodsList = list;
                this.total = total;
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },

        onDiscountChange: function(id) {
            this.getGoodsList(1, id, this.selectedCategory, this.selectedType);
        },

        onCategoryChange: function(id) {
            const category = this.categoryOptions.find(ele => ele.id === id);
            let options = [{ id: 0, text: '不限' }];
            this.typeOptions = options.concat(category.types);
            this.getGoodsList(1, this.discount, id, 0);
        },

        onTypeChange: function(id) {
            this.getGoodsList(1, this.discount, this.selectedCategory, id);
        },

        onPageChange: function(page) {
            this.getGoodsList(page, this.discount, this.selectedCategory, this.selectedType);
        },

        onGoodsItemClick: function(id) {
            this.$router.push('goodsDetail?goodsId=' + id);
        }
    }
};
</script>
<style lang="stylus">
.goods-view {
    .banner-block {
        margin-top: 10px;

        .content {
            height: 300px;
            padding: 0;

            .swiper-container {
                height: 100%;

                .banner-img {
                    height: 100%;
                }
            }
        }
    }

    .filter-block {
        .content {
            box-sizing: border-box;
            margin: 20px auto 30px;
            border: 1px solid rgba(241, 241, 241, 1);
            padding: 20px 15px;

            .filter-wrap {
                display: flex;
                align-items: center;
            }

            .filter-wrap:not(:last-child) {
                margin-bottom: 20px;
            }

            .info {
                display: inline-block;
                text-align: left;
                width: 70px;
                flex: 0 0 70px;
                font-weight: bold;
            }
        }
    }

    .list-block {
        .content {
            .goods-item-widget {
                display: inline-block;
                border: 1px solid rgba(241, 241, 241, 1);
                margin: 0 15px 20px 0;
            }

            .goods-item-widget--last {
                margin-right: 0;
            }

            .el-pagination {
                text-align: center;
                margin: 64px 0 160px;
            }
        }
    }
}
</style>

