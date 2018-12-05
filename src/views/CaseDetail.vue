<template>
    <div class="view caseDetail-view">
        <div class="block bread-block">
            <div class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">装修美图</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/photoList?category=3' }">精品专题</el-breadcrumb-item>
                    <el-breadcrumb-item>专题详情</el-breadcrumb-item>

                </el-breadcrumb>
            </div>
        </div>
        <div class="block">
            <div class="content">
                <div class="inner-content main-inner-content">
                    <div class="cover-wrap">
                        <img class="photo-img" :src="image" />
                        <div class="cover-info-wrap">
                            <div class="info text--bold">{{title}}</div>
                            <div class="sub-info">{{sub_title}}</div>
                        </div>
                        <div class="info-wrap">
                            <span class="info">
                                <span class="text--grey">收藏：</span>
                                <span>{{fav_total}}</span>
                            </span>
                            <span class="info">
                                <span class="text--grey">浏览量：</span>
                                <span>{{view_total}}</span>
                            </span>
                        </div>
                    </div>
                    <div class="detail-wrap">
                        <div class="detail" v-html="detail"></div>
                    </div>
                </div>
                <div class="inner-content side-inner-content">
                    <div class="decorator-info-wrap">
                        <div class="avatar-wrap">
                            <img class="avatar" :src="decorator_info.avatar"/>
                            <div class="info-wrap">
                                <div class="text--grey">{{decorator_info.name}}</div>
                                <div class="text--bold">{{decorator_info.role}}</div>
                            </div>
                        </div>
                        <div class="sub-info text--bold">{{`${decorator_info.name}的其他作品`}}</div>
                    </div>
                    <div class="case-item-wrap">
                        <div class="item-widget case-item-widget case-item-widget--small" v-for="item in caseList" :key="item.id" @click="caseItemClick(item.case_id)">
                            <img class="photo-img" :src="item.image" />
                            <div class="info-wrap">
                                <span class="info text--bold">{{item.title}}</span>
                                <div class="sub-info text--grey">{{item.sub_title}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import apiUtil from '../util/apiUtil.js';

export default {
    name: 'caseDetail',

    data() {
        return {
            caseId: 0,
            title: '',
            sub_title: '',
            image: '',
            fav_total: 0,
            view_total: 0,
            detail: '',
            content: '',
            decorator_info: {},
            caseList: [],
        };
    },
    created() {
        this.caseId = this.$route.query.caseId;
        this.decoratorId = this.$route.query.decoratorId;
        this.getCaseDetail();
        this.getCaseList();
    },
    watch: {
        $route(to, from) {
            const newCaseId = to.query.caseId;
            this.caseId = newCaseId;
            this.getCaseDetail();
        }
    },
    methods: {
        getCaseDetail: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`decorator/case_info?decorator_id=${this.decoratorId}&case_id=${this.caseId}`, {});
            if (success && res.data) {
                const { title, sub_title, image, fav_total, view_total, detail, decorator_info } = res.data;
                this.title = title;
                this.sub_title = sub_title;
                this.image = image;
                this.fav_total = fav_total;
                this.view_total = view_total;
                this.detail = detail;
                this.decorator_info = decorator_info;
            } else {
                this.$message.error(msg);
            }
        },

        getCaseList: async function(page) {
            // page_size === 6的原因：排除当前case
            const { success, msg, res } = await apiUtil.postJSON(`decorator/case_list?page=1&page_size=3&decorator_id=${this.decorator_info.decorator_id}`, {});
            if (success) {
                const { list } = res.data;
                let caseList = list.filter(ele => ele.case_id != this.caseId);
                if (caseList.length > 5) {
                    caseList.splice(4, 1);
                }
                this.caseList = caseList;
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },

        caseItemClick: function(id){
            this.$router.push(`/caseDetail?caseId=${id}&decoratorId=${this.decoratorId}`);
        }
    }
};
</script>

<style lang="stylus">
.caseDetail-view {
    .block {
        margin-bottom: 30px;

        .content {
            display: flex;
            background-color: transparent;

            .inner-content {
                background-color: transparent;
            }

            .main-inner-content {
                width: 760px;
                flex: 0 0 760px;
                text-align: center;

                .cover-wrap {
                    position: relative;
                    text-align: center;
                    margin-bottom: 30px;
                    .photo-img{
                        display: inline-block;
                        width: 100%;
                        height: 480px;
                    }

                    .cover-info-wrap {
                        position: absolute;
                        left: 30px;
                        bottom: 90px;
                        color: #fff;
                        text-align: left;
                        line-height: 25px;

                        .info {
                            font-size: 18px;
                        }
                    }

                    .info-wrap {
                        background-color: #fff;
                        height: 60px;
                        text-align: left;
                        line-height: 60px;
                        font-size: 16px;
                        .info{
                            margin-left: 30px;
                        }
                    }
                }

                .detail-wrap {
                    background-color: #fff;
                }
            }

            .side-inner-content {
                width: 380px;
                flex: 0 0 360px;
                margin-left: 20px;
                text-align: center;

                .decorator-info-wrap {
                    padding: 10px;
                    box-sizing: border-box;
                    height: 196px;
                    background-color: #fff;
                    text-align: left;
                    .avatar-wrap{
                        display: flex;
                        align-items: center;
                        .avatar{
                            display: inline-block;
                            width: 100px;
                            height: 100px;
                            border-radius: 50px;
                            margin-right: 20px;
                        }
                        .info-wrap{
                            line-height: 30px;
                        }
                    }
                    .sub-info{
                        padding-left: 20px;
                        margin-top: 50px;
                        font-size: 12px;
                    }
                }

                .case-item-wrap {
                    .case-item-widget--small {
                        width: 380px;
                        margin-bottom: 20px;
                        box-sizing: border-box;
                        .photo-img {
                            height: 240px;
                        }

                        .info-wrap {
                            box-sizing: border-box;
                            height: 108px;
                            text-align: center;
                            line-height: 30px;
                            .info {
                                padding: 0;
                                line-height: 0;
                            }

                            .sub-info {
                                
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

