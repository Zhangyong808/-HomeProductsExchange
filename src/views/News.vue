<template>
    <div class="view news-view">
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
                <div class="inner-content news-list">
                    <div class="news-item-wrap">
                        <div class="pic-text-widget--horizontal" :key="item.news_id" v-for="item in newsList" @click="onNewsItemClick(item.news_id)">
                            <img class="photo-img" :src="item.image" />
                            <div class="info-wrap">
                                <div class="info text--bold">{{item.title}}</div>
                                <div class="sub-info text--grey main-body">{{item.detail}}</div>
                                <div class="sub-info text--grey meta-data"><span>{{`${item.add_time}`}}</span>{{`浏览数：${item.click}`}}</div>
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
import apiUtil from '../util/apiUtil.js';
import lsUtil from '../util/lsUtil.js';
import VRecommend from '../components/Recommend';
export default {
    name: 'news',
    components: {
        'v-recommend': VRecommend
    },
    data() {
        return {
            page: 1,
            page_size: 6,
            total: 0,
            newsList: [
                
            ]
        };
    },
    created() {
        this.getNewsList();
    },
    methods: {

        getNewsList: async function(page) {
            page = page || this.page;
            const { success, msg, res } = await apiUtil.getJSON(`news/list`, {
                page,
                page_size: this.page_size
            });
            if (success) {
                const { list, total } = res.data;
                this.newsList = list;
                this.page = page;
                this.total = total;
            } else {
                this.$message.error(msg);
            }
        },

        onNewsItemClick: function(id) {
            this.$router.push('newsDetail?newsId=' + id);
        },

        onPageChange: function(page){
            this.getNewsList(page)
        }
    }
};
</script>
<style lang="stylus">
.news-view {
    .block {
        .content {
            display: flex;
            background-color: transparent;

            .inner-content {
                background-color: #fff;
            }

            .inner-content.news-list {
                margin-right: 20px;
                padding: 15px;
                flex: 1;
                text-align: center;

                .pic-text-widget--horizontal {
                    margin-bottom: 20px;
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


