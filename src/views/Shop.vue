<template>
    <div class="view shop-view">
        <div class="block banner-block">
            <div class="content">
                <v-banner :bannerList="bannerList" :hasNavigation="false" :hasPagination="false" />
            </div>
        </div>
        <div class="block filter-block">
            <div class="content">
                <div class="filter-wrap">
                    <span class="info text--grey">所属市场</span>
                    <el-radio-group v-model="selectedMarket" class="filter-widget" @change="onMarketChange">
                        <el-radio-button :key="item.id" v-for="item in marketOptions" :label="item.id">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>

                <div class="filter-wrap">
                    <span class="info text--grey">类目</span>
                    <el-radio-group v-model="selectedCategory" class="filter-widget" @change="onCategoryChange">
                        <el-radio-button :key="item.id" v-for="item in categoryOptions" :label="item.id">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>

                <div class="filter-wrap">
                    <span class="info text--grey">分类</span>
                    <el-radio-group v-model="selectedClass" class="filter-widget" @change="onClassChange">
                        <el-radio-button :key="item.id" v-for="item in classOptions" :label="item.id">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>

            </div>

        </div>
        <div class="block list-block">
            <div class="content">
                <div class="shop-item-wrap">
                    <div class="item-widget shop-item-widget" :class="{'shop-item-widget--orange':index % 3 === 1, 'shop-item-widget--grey':index % 3 === 2, 'shop-item-widget--last':index % 3 === 2}" v-for="(item, index) in shopList" :key="(item, index).shop_id" @click="onShopItemClick(item.shop_id)">
                        <div class="info">{{item.name}}</div>
                        <div class="sub-info">{{item.market_name}}</div>
                        <img class="shop-img" :src="item.image" :alt="item.name" />
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
    name: 'shop',
    components: {
        'v-banner': VBanner
    },
    data() {
        return {
            selectedMarket: 0,
            marketOptions: [{ id: 0, text: '不限' }],
            selectedCategory: 0,
            categoryOptions: [{ id: 0, text: '不限' }],
            selectedClass: 0,
            classOptions: [{ id: 0, text: '不限' }],
            bannerList: [],
            page: 1,
            page_size: 12,
            total: 0,
            shopList: []
        };
    },
    created() {
        this.selectedMarket = this.$route.query.marketId || 0;
        this.getCategoryList();
        this.getShopList(this.selectedMarket);
    },
    computed: {
        cityData() {
            return this.$store.state.cityData;
        }
    },
    methods: {
        getShopList: async function(marketId, page, parent_id, categoryId) {
            const { id, lng, lat } = this.cityData;
            page = page || this.page;
            const { success, msg, res } = await apiUtil.getJSON(`shop/list?market_id=${marketId}&page=${page}&page_size=${this.page_size}&city_id=${id}&lng=${lng}&lat=${lat}&parent_id=${parent_id}&category_id=${categoryId}`, {});
            if (success && res.data) {
                this.page = page;
                const { total, list, banner_pc } = res.data;
                this.shopList = list;
                this.total = total;
                this.bannerList = [banner_pc];
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },

        getCategoryList: async function() {
            const { success, msg, res } = await apiUtil.getJSON('v1_shop/pccategory', {
                city_id: this.cityData.id
            });
            if (success && res.data) {
                const { category_list, market } = res.data;
                if (category_list[0] && category_list[0].ename === 'category_id' && Array.isArray(category_list[0].tags)) {
                    this.categoryOptions = this.categoryOptions.concat(
                        category_list[0].tags.map(ele => ({
                            id: ele.id,
                            text: ele.name,
                            tags: ele.tags
                        }))
                    );
                }
                this.marketOptions = this.marketOptions.concat(
                    market.map(ele => ({
                        id: ele.market_id,
                        text: ele.name
                    }))
                );
            } else {
                this.$message.error(msg);
            }
        },

        onPageChange: function(page) {
            this.getShopList(this.selectedMarket, page, this.selectedCategory, this.selectedClass);
        },

        onMarketChange: function(id) {
            this.getShopList(id, 1, this.selectedCategory, this.selectedClass);
        },

        onCategoryChange: function(id) {
            this.getShopList(this.selectedMarket, 1, id, 0);
            if (id == 0) {
                this.classOptions = [{ id: 0, text: '不限' }];
                this.selectedClass = 0;
            } else {
                const selectedCategory = this.categoryOptions.find(ele => ele.id === id);
                if (selectedCategory && Array.isArray(selectedCategory.tags)) {
                    this.classOptions = [{ id: 0, text: '不限' }].concat(selectedCategory.tags.map(ele => ({ id: ele.id, text: ele.name })));
                }
            }
        },

        onClassChange: function(id) {
            this.getShopList(this.selectedMarket, 1, this.selectedCategory, id);
        },

        onShopItemClick: function(id) {
            this.$router.push('shopDetail?id=' + id);
        }
    }
};
</script>
<style lang="stylus">
.shop-view {
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
            .shop-item-widget {
                margin-right: 15px;
                margin-bottom: 20px;
            }

            .shop-item-widget--last {
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