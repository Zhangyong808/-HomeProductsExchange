<template>
    <div class="view company-view">
        <div class="block bread-block">
            <div class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>装修公司</el-breadcrumb-item>

                </el-breadcrumb>
            </div>
        </div>
        <div class="block banner-block">
            <div class="content">
                <v-banner :bannerList="bannerList" :hasNavigation="false" :hasPagination="false" />
            </div>
        </div>
        <div class="block filter-block">
            <div class="content">
                <div class="filter-wrap">
                    <span class="info text--grey">装修户型</span>
                    <el-radio-group v-model="houseType" class="filter-widget" @change="onHouseTypeClick">
                        <el-radio-button :label="item.id" :key="item.id" v-for="item in houseTypeOptions">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>

                <div class="filter-wrap">
                    <span class="info text--grey">服务保障</span>
                    <el-radio-group v-model="service" class="filter-widget" @change="onServiceClick">
                        <el-radio-button :label="item.id" :key="item.id" v-for="item in serviceOptions">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </div>

        <div class="block sort-block">
            <div class="content">
                <div class="sort-wrap">
                    <el-radio-group v-model="sort" class="sort-widget" @change="onSortClick">
                        <el-radio-button :label="item.id" :key="item.id" v-for="item in sortOptions">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>
            </div>
        </div>

        <div class="block list-block">
            <div class="content">
                <div class="item-wrap">
                    <div class="item-widget company-item-widget" :class="{'company-item-widget--last': index % 4 === 3}" v-for="(item, index) in companyList" :key="item.company_id" @click="onCompanyItemClick(item.company_id)">
                        <img class="company-img" :src="item.photo[0]" />
                        <div class="detail-wrap">
                            <div class="info">{{item.name}}</div>
                            <div class="sub-info">
                                <span class="text--grey">收藏量：</span>
                                <span class="text--green fav-total">{{item.fav_total}}</span>
                                <span class="text--grey">浏览量：</span>
                                <span class="text--green view-total">{{item.view_total}}</span>
                            </div>
                            <div class="market-name text--grey">{{item.market_name}}</div>
                            <img class="avatar-img" :src="item.avatar" />
                        </div>
                    </div>
                </div>
                <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="page_size" :total="total" @current-change="onPageChange">
                </el-pagination>
            </div>

        </div>
    </div>
</template>
<script>
import apiUtil from '../util/apiUtil.js';
import VBanner from '../components/Banner.vue';

export default {
    name: 'company',
    components: {
        'v-banner': VBanner
    },
    data() {
        return {
            
            page: 1,
            page_size: 8,
            total: 0,
            categoryId: 0,
            houseType: 0,
            houseTypeOptions: [{ id: 0, text: '不限' }],
            service: 0,
            serviceOptions: [{ id: 0, text: '不限' }],
            sort: 0,
            sortOptions: [{ id: 0, text: '默认' }],
            companyList: [],
            bannerList: []
        };
    },
    computed: {
        cityData() {
            return this.$store.state.cityData;
        }
    },
    created() {
        this.getCompanyCategory();
        this.getCompanyList();
    },
    methods: {
        getCompanyCategory: async function() {
            const { city_id, lat, lng } = this.cityData;
            const { success, msg, res } = await apiUtil.postJSON(`company/category?&city_id=${city_id}&lat=${lat}&lng=${lng}`, {});
            if (success && res.data) {
                const { category_list, order_list } = res.data;
                const houseTypes = category_list.find(ele => ele.ename === 'house_type');
                if (houseTypes) {
                    this.houseTypeOptions = this.houseTypeOptions.concat(
                        houseTypes.list.map(ele => ({
                            id: ele.id,
                            text: ele.name
                        }))
                    );
                }
                const services = category_list.find(ele => ele.ename === 'service');
                if (services) {
                    this.serviceOptions = this.serviceOptions.concat(
                        services.list.map(ele => ({
                            id: ele.id,
                            text: ele.name
                        }))
                    );
                }
                this.sortOptions = this.sortOptions.concat(
                    order_list.list.map(ele => ({
                        id: ele.id,
                        text: ele.name
                    }))
                );
            } else {
                this.$message.error(msg);
            }
        },

        getCompanyList: async function(page, layout, service, order) {
            page = page || this.page;
            const { success, msg, res } = await apiUtil.postJSON(`company/list?page=${page}&page_size=${this.page_size}&city_id=${this.cityData.id}&layout=${layout}&service=${service}&order=${order}`, {});
            if (success) {
                const { list, total, banner_pc } = res.data;
                this.companyList = list;
                this.bannerList = [banner_pc];
                this.total = total;
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },
        onCompanyItemClick: function(companyId) {
            this.$router.push(`companyDetail?companyId=${companyId}`);
        },

        onHouseTypeClick: function(data) {
            this.getCompanyList(1, data, this.service, this.sort);
        },

        onServiceClick: function(data) {
            this.getCompanyList(1, this.houseType, data, this.sort);
        },

        onSortClick: function(data) {
            this.getCompanyList(1, this.houseType, this.service, data);
        },

        onPageChange: function(page) {
            this.getCompanyList(page, this.houseType, this.service, this.sort);
        }
    }
};
</script>
<style lang="stylus">
.company-view {
    .block {
        margin-bottom: 20px;
    }

    .banner-block {
        .content {
            height: 300px;
            box-sizing: border-box;
            padding: 0;
        }
    }

    .filter-block {
        .content {
            .filter-wrap:not(:last-child) {
                margin-bottom: 20px;
            }
        }
    }

    .list-block {
        .content {
            background-color: transparent;
            text-align: center;

            .item-wrap {
                .company-item-widget {
                    margin-right: 20px;
                    margin-bottom: 24px;
                }

                .company-item-widget--last {
                    margin-right: 0;
                }
            }
        }
    }
}
</style>