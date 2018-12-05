<template>
    <div class="view market-view">
        <div class="block banner-block">
            <div class="content">
                <v-banner :bannerList="bannerList" :hasNavigation="false" :hasPagination="false"></v-banner>
            </div>
        </div>
        <div class="block filter-block">
            <div class="content">
                <div class="filter-wrap">
                    <span class="info text--grey">主营业务</span>
                    <el-checkbox-group v-model="businessInf" class="filter-widget--multiple" @change="onBusinessInfChange">
                        <el-checkbox-button label="0">不限</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="business" class="filter-widget--multiple" @change="onBusinessChange">
                        <el-checkbox-button v-for="item in businessOptions" :label="item.id" :key="item.id">{{item.text}}</el-checkbox-button>
                    </el-checkbox-group>
                </div>

                <div class="filter-wrap">
                    <span class="info text--grey">区域</span>
                    <el-checkbox-group v-model="regionInf" class="filter-widget--multiple" @change="onRegionInfChange">
                        <el-checkbox-button label="0">不限</el-checkbox-button>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="area" class="filter-widget--multiple" @change="onRegionChange">
                        <el-checkbox-button v-for="item in areaOptions" :label="item.id" :key="item.id">{{item.text}}</el-checkbox-button>
                    </el-checkbox-group>
                </div>

                <!-- <div class="filter-wrap">
                    <span class="info text--grey">是否加盟</span>
                    <el-radio-group v-model="joined" class="filter-widget">
                        <el-radio-button label="0">不限</el-radio-button>
                        <el-radio-button label="1">已加盟</el-radio-button>
                        <el-radio-button label="2">未加盟</el-radio-button>
                    </el-radio-group>
                </div> -->

            </div>

        </div>
        <div class="block list-block">
            <div class="content">
                <div class="market-item-wrap">
                    <div class="item-widget market-item-widget" :key="item.market_id" v-for="item in marketList" @click="onMarketItemClick(item.market_id)">
                        <img class="market-img" :src="item.cover_pc" :alt="item.name" />
                        <div class="info">{{item.name}}</div>
                        <div class="sub-info text--grey">{{`电话：${item.contact}`}}</div>
                        <div class="sub-info text--grey">{{`地址：${item.address}`}}</div>
                    </div>
                </div>
                <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="page_size" :total="total" @current-change="onPageChange">
                </el-pagination>
            </div>

        </div>
    </div>
</template>
<script>
import lsUtil from '../util/lsUtil.js';
import apiUtil from '../util/apiUtil.js';
import VBanner from '../components/Banner.vue';
export default {
    name: 'market',
    components: {
        'v-banner': VBanner
    },
    data() {
        return {
            business: [],
            businessInf: ['0'],
            area: [],
            regionInf: ['0'],
            joined: 0,
            page: 1,
            page_size: 12,
            businessOptions: [{ id: '0', text: '不限' }],
            areaOptions: [{ id: '0', text: '不限' }],

            bannerList: [],
            marketList: [],
            total: 0
        };
    },
    computed: {
        cityData() {
            return this.$store.state.cityData;
        }
    },
    created() {
        this.getMainBusiness();
        this.getRegion();
        this.getMarketList(1, '', '');
    },

    methods: {
        onBusinessChange: function(list) {
            this.businessInf = [];
            this.getMarketList(1, list.join(','), this.area.join(','));
        },

        onBusinessInfChange: function(list) {
            if (list.indexOf('0') > -1) {
                this.business = [];
                this.getMarketList(1, '0', this.area.join(','));
            } else {
                this.businessInf = ['0'];
            }
        },

        onRegionChange: function(list) {
            this.regionInf = [];
            this.getMarketList(1, this.business.join(','), list.join(','));
        },

        onRegionInfChange: function(list) {
            if (list.indexOf('0') > -1) {
                this.area = [];
                this.getMarketList(1, this.business.join(','), '0');
            } else {
                this.regionInf = ['0'];
            }
        },

        onPageChange: function(page) {
            const business = this.business.indexOf(0) > -1 ? 0 : this.business.join(',');
            const area = this.area.indexOf(0) > -1 ? 0 : this.area.join(',');

            this.getMarketList(page, business, area);
        },

        getMainBusiness: async function() {
            const { success, msg, res } = await apiUtil.postJSON('v3_market/getMainBusiness', {});
            if (success && res.data) {
                const { list } = res.data;
                let options = [];
                options = options.concat(
                    list.map(ele => ({
                        id: ele.tag_id,
                        text: ele.tag_name
                    }))
                );
                this.businessOptions = options;
            } else {
                this.$message.error(msg);
            }
        },

        getRegion: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`v3_market/getRegion?city_id=${this.cityData.city_id}`, {});
            if (success && res.data) {
                const { list } = res.data;
                let options = [];
                options = options.concat(
                    list.map(ele => ({
                        id: ele.id,
                        text: ele.name
                    }))
                );
                this.areaOptions = options;
            } else {
                this.$message.error(msg);
            }
        },

        getMarketList: async function(page, businessIds, regionIds) {
            const { id, lng, lat } = this.cityData;
            page = page || this.page;
            const { success, msg, res } = await apiUtil.postJSON(`v3_market/choose?city_id=${id}&lng=${lng}&lat=${lat}&business_id=${businessIds}&region_id=${regionIds}&page=${page}&page_size=${this.page_size}`, {});
            if (success) {
                const { banner_pc, list } = res.data;
                this.bannerList = [banner_pc];
                this.marketList = list.list;
                this.total = parseInt(list.total);
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },

        onMarketItemClick: function(id) {
            this.$router.push('marketDetail?id=' + id);
        }
    }
};
</script>
<style lang="stylus">
.market-view {
    .banner-block {
        margin-top: 10px;

        .content {
            height: 300px;
            padding: 0;

            .swiper-container {
                height: 100%;
            }

            .banner-img {
                width: 100%;
                height: 100%;
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
                font-weight: bold;
            }
        }
    }

    .list-block {
        .content {
            .market-item-widget {
                display: inline-block;
                margin: 6px 10px 18px;
                border: 1px solid rgba(241, 241, 241, 1);
            }

            .el-pagination {
                text-align: center;
                margin: 64px 0 160px;
            }
        }
    }
}
</style>

