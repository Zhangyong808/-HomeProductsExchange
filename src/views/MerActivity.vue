<template>
    <div class="view activity-view">
        <div class="block filter-block">
            <div class="content">
                <div class="filter-wrap" v-for="items in businessOptions">
                    <span class="info text--grey">{{items.name}}</span>
                    <el-radio-group v-model="business" class="filter-widget" @change="onBusinessChange">
                        <el-radio-button v-for="item in items.tag" :label="item.id" :key="item.id">{{item.name}}</el-radio-button>
                    </el-radio-group>
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
        <div class="block list-block" v-if="show">
            <div class="content">
                <div class="activity-item-wrap">
                    <div class="item-widget activity-item-widget" :class="{'activity-item-widget--last': index % 3 === 2}" v-for="(item, index) in activityList" :key="item.activity_id" @click="onActivityItemClick(item.activity_id)">
                        <img class="photo-img" :src="item.image" :alt="item.title" />
                        <div class="info-wrap">
                            <span class="sub-info">{{item.title + ' | ' }}<span class="text--grey type">{{item.fav_name}}</span></span>
                            <span class="sub-info detail">了解详情 ></span>
                        </div>
                    </div>
                </div>
                <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="page_size" :total="total" @current-change="onPageChange">
                </el-pagination>
            </div>

        </div>
        <div class="block list-block" v-else>
            <div class="content">
                <div class="activity-item-wrap">
                    <div class="item-widget activity-item-widget" @click="onActivityItemClick(item.activity_id)">
                        <img class="photo-img" :src="activityList.image" :alt="activityList.title" />
                        <div class="info-wrap">
                            <span class="sub-info">{{activityList.title + ' | ' }}<span class="text--grey type">1111</span></span>
                            <span class="sub-info detail">了解详情 ></span>
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
import lsUtil from '../util/lsUtil.js';
import apiUtil from '../util/apiUtil.js';
import VBanner from '../components/Banner.vue';
export default {
    name: 'merActivity',
    components: {
        'v-banner': VBanner
    },
    data() {
        return {
           
            business: [0],
            area: [0],
            joined: 0,
            
            businessOptions: [{ id: 0, text: '不限' }],
            areaOptions: [{ id: 0, text: '不限' }],
            marketId: 0,
            page: 1,
            page_size: 9,
            total: 0,
            activityList: [],
            total: 0,
            show:true
        };
    },
    computed: {
        cityData(){
            return this.$store.state.cityData;
        }
    },
    created() {
        this.marketId = this.$route.query.marketId;
        this.getActivityList(1, '', '');
        this.getMainBusiness()
    },

    methods: {
        onBusinessChange: function(list) {
                this.getShopactivity(list);
                this.show = false;
        },

        onRegionChange: function(list) {
            if (list.indexOf(0) > -1) {
                this.getActivityList(1, this.business.join(','), 0);
            } else {
                this.getActivityList(1, this.business.join(','), list.join(','));
            }
        },

        onPageChange: function(page) {
            const business = this.business.indexOf(0) > -1 ? 0 : this.business.join(',');
            const area = this.area.indexOf(0) > -1 ? 0 : this.area.join(',');

            this.getActivityList(page, business, area);
        },

        getMainBusiness: async function() {
            const { success, msg, res } = await apiUtil.postJSON('v3_activity/marketpc', {
                market_id: this.marketId
            });
            if (success && res.data) {
                const { shoplist } = res.data;
                this.businessOptions = shoplist;
                console.log(this.businessOptions)
            } else {
                this.$message.error(msg);
            }
        },

        getRegion: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`v3_activity/getRegion?city_id=${this.cityData.city_id}`, {});
            if (success && res.data) {
                const { list } = res.data;
                let options = [{ id: 0, text: '不限' }];
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

        getActivityList: async function(page) {
            const { id, lng, lat } = this.cityData;
            page = page || this.page;
            const { success, msg, res } = await apiUtil.postJSON(`v3_activity/index?city_id=${id}&market_id=${this.marketId}&type=2&page=${page}&page_size=${this.page_size}`, {});
            if (success && res.data) {
                this.activityList = res.data.list.list;
                console.log(this.activityList)
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },
        getShopactivity: async function(page) {
            const { id, lng, lat } = this.cityData;
            page = page || this.page;
            const { success, msg, res } = await apiUtil.postJSON(`v3_activity/shopactivity?market_id=${this.marketId}&type=${page}`, {});
            if (success && res.data) {
                this.activityList = res.data;
                console.log(this.activityList)
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },

        onActivityItemClick: function(id) {
            this.$router.push('activityDetail?activityId=' + id);
        }
    }
};
</script>
<style lang="stylus">
.activity-view {
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
            .activity-item-widget {
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

