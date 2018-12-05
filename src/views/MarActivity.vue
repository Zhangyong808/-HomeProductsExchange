<template>
    <div class="view marActivity-view">
        <div class="block bread-block">
            <div class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>

                </el-breadcrumb>
            </div>
        </div>
        <div class="block">
            <div class="content">
                <div class="inner-content marActivity-list">
                    <div class="marActivity-item-wrap">
                        <div class="pic-text-widget--horizontal" :key="item.activity_id" v-for="item in activityList" @click="onActivityItemClick(item.activity_id)">
                            <img class="photo-img" :src="item.image" />
                            <div class="info-wrap">
                                <div class="info text--bold">{{item.title}}</div>
                                <div class="sub-info text--grey main-body">{{item.detail}}</div>
                                <div class="sub-info text--grey meta-data"><span>{{`有效期至：${renderTime(item.end_time)}`}}</span>{{`浏览数：${item.view_total}`}}</div>
                            </div>
                        </div>
                    </div>
                    <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="page_size" :total="total" @current-change="onPageChange">
                </el-pagination>
                </div>
                <div class="inner-content recommend-wrap">
                    <v-recommend/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';
import apiUtil from '../util/apiUtil.js';
import lsUtil from '../util/lsUtil.js';
import VRecommend from '../components/Recommend';
export default {
    name: 'marActivity',
    components: {
        'v-recommend': VRecommend
    },
    data() {
        return {
            marketId: 0,
            page: 1,
            page_size: 6,
            total: 0,
            activityList: [
                
            ]
        };
    },
    computed: {
        cityData(){
            return this.$store.state.cityData;
        }
    },
    created() {
        this.marketId = this.$route.query.marketId;
        this.getActivityList();
    },
    methods: {

        getActivityList: async function(page) {
            const { id, lng, lat } = this.cityData;
            page = page || this.page;
            const { success, msg, res } = await apiUtil.postJSON(`v3_activity/index?city_id=${id}&market_id=${this.marketId}&type=1&page=${page}&page_size=${this.page_size}`, {});
            if (success && res.data) {
                this.activityList = res.data.list.list;
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },

        onActivityItemClick: function(id) {
            this.$router.push('activityDetail?activityId=' + id);
        },

        onPageChange: function(page){
            this.getActivityList(page)
        },

        renderTime: function(string){
            const dataStr = string + '000';
            return moment().format('YYYY-MM-DD', parseInt(dataStr))
        }
    }
};
</script>
<style lang="stylus">
.marActivity-view {
    .block {
        .content {
            display: flex;
            background-color: transparent;

            .inner-content {
                background-color: #fff;
            }

            .inner-content.marActivity-list {
                margin-right: 20px;
                padding: 15px;
                flex: 1;
                text-align: center;

                .pic-text-widget--horizontal {
                    margin-bottom: 20px;
                    .photo-img{
                        width: 335px;
                        height: 148px;
                    }
                    .meta-data {
                        margin-top: 80px;
                        span{
                            margin-right: 30px;
                        }
                    }
                }

                .pic-text-widget--horizontal:last-child {
                    margin-bottom: 60px;
                }
            }

            .inner-content.recommend-wrap {
                width: 360px;
                flex: 0 0 360px;
            }
        }
    }
}
</style>


