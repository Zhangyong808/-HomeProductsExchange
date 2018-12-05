<template>
    <div class="view newsDetail-view">
        <div class="block bread-block">
            <div class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/news' }">新闻资讯</el-breadcrumb-item>
                    <el-breadcrumb-item>新闻详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="block">
            <div class="content">
                <div class="inner-content newsDetail">
                    <div class="info text--bold">{{title}}</div>
                    <div class="sub-info text--grey">
                        <span>{{`${update_time} 来源：家品汇`}}</span>
                        <span>{{`浏览数：${readnum}`}}</span>
                    </div>
                    <div class="main-body" v-html="content">

                    </div>
                </div>
                <div class="inner-content photo">
                    <v-recommend />
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
    name: 'newsDetail',
    components: {
        'v-recommend': VRecommend
    },
    data() {
        return {
            newsId: '',
            title: '',
            content: '',
            update_time: '',
            readnum: ''
        };
    },
    created() {
        this.newsId = this.$route.query.newsId;
        this.getNewsDetail();
    },
    methods: {
        getNewsDetail: async function() {
            const { success, msg, res } = await apiUtil.getJSON('news/info', {
                news_id: this.newsId
            });
            if (success && res.data) {
                const { title, content, update_time, readnum } = res.data;
                this.title = title;
                this.content = content;
                this.update_time = update_time;
                this.readnum = readnum;
            } else {
                this.$message.error(msg);
            }
        }
    }
};
</script>
<style lang="stylus">
.newsDetail-view {
    .block {
        .content {
            display: flex;
            background-color: transparent;

            .inner-content {
                background-color: #fff;
            }

            .inner-content.newsDetail {
                margin-right: 20px;
                padding: 20px 60px;
                flex: 1;

                .info {
                    font-size: 24px;
                    margin-bottom: 20px;
                }

                .sub-info {
                    display: flex;
                    justify-content: space-between;
                    line-height: 30px;
                    border-bottom: 1px solid #f2f2f2;
                    margin-bottom: 20px;
                }
            }

            .inner-content.photo {
                width: 360px;
                flex: 0 0 360px;
            }
        }
    }
}
</style>


