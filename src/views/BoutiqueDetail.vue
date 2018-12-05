<template>
    <div class="view boutiqueDetail-view">
        <div class="block bread-block">
            <div class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/photo' }">装修美图</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/photoList?category=3' }">精品专题</el-breadcrumb-item>
                    <el-breadcrumb-item>专题详情</el-breadcrumb-item>

                </el-breadcrumb>
            </div>
        </div>
        <div class="block">
            <div class="content">
                <div class="inner-content main-inner-content">
                    <div class="title">
                        {{title}}
                    </div>
                    <div class="detail text--grey">
                        {{detail}}
                    </div>
                    <div class="boutique-item-wrap">
                        <div class="item-widget boutique-item-widget boutique-item-widget--big" v-for="item in content" :key="item.id">
                            <img class="photo-img" :src="item.img" />
                            <div class="info">{{item.info}}</div>
                        </div>
                    </div>
                </div>
                <div class="inner-content side-inner-content">
                    <div class="info text--bold">更多专题</div>
                    <div class="boutique-item-wrap">
                        <div class="item-widget boutique-item-widget boutique-item-widget--small" v-for="item in boutiqueList" :key="item.id" @click="onBoutiqueItemClick(item.picture_id)">
                            <img class="photo-img" :src="item.cover" />
                            <div class="info-wrap">
                                <span class="info text--bold">{{item.title}}</span>
                                <div class="sub-info text--grey">{{item.detail}}</div>
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
    name: 'boutiqueDetail',

    data() {
        return {
            boutiqueId: 0,
            title: '',
            detail: '',
            content: [],
            boutiqueList: [],
            page: 1
        };
    },
    created() {
        this.boutiqueId = this.$route.query.boutiqueId;
        this.getBoutiqueDetail();
        this.getBoutiqueList();
    },
    watch: {
        $route(to, from) {
            const newBoutiqueId = to.query.boutiqueId;
            this.boutiqueId = newBoutiqueId;
            this.getBoutiqueDetail();
            this.getBoutiqueList();
        }
    },
    methods: {
        getBoutiqueDetail: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`picture/info?picture_id=${this.boutiqueId}`, {});
            if (success) {
                const { title, detail, content } = res.data;
                this.title = title;
                this.detail = detail;
                this.content = content.map((ele, index) => ({
                    id: index,
                    img: ele.img,
                    info: ele.info
                }));
            } else {
                this.$message.error(msg);
            }
        },

        getBoutiqueList: async function(page) {
            page = page || this.page;
            // page_size === 6的原因：排除当前boutique
            const { success, msg, res } = await apiUtil.postJSON(`picture/list?page=${page}&page_size=6&category_id=3`, {});
            if (success) {
                const { list } = res.data;
                let boutiqueList = list.filter(ele => ele.picture_id != this.boutiqueId);
                if (boutiqueList.length > 5) {
                    boutiqueList.splice(4, 1);
                }
                this.boutiqueList = boutiqueList;

                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },

        onBoutiqueItemClick: function(id){
            this.$router.push(`boutiqueDetail?boutiqueId=${id}`);
        }
    }
};
</script>

<style lang="stylus">
.boutiqueDetail-view {
    .block {
        margin-bottom: 30px;

        .content {
            display: flex;
            background-color: transparent;

            .inner-content {
                background-color: #fff;
            }

            .main-inner-content {
                flex: 1;
                text-align: center;
                padding-top: 40px;

                .title {
                    display: inline-block;
                    font-size: 34px;
                    font-weight: bold;
                    line-height: 65px;
                    padding: 0 10px;
                    border-bottom: 1px solid #3CB850;
                }

                .detail {
                    width: 608px;
                    padding-left: 105px;
                    text-align: left;
                    font-size: 24px;
                    line-height: 30px;
                    margin-bottom: 30px;
                }

                .boutique-item-wrap {
                    .boutique-item-widget--big {
                        width: 608px;
                        height: 452px;
                        cursor: default;
                        margin-bottom: 35px;

                        .photo-img {
                            height: 382px;
                        }

                        .info {
                            height: 70px;
                            line-height: 70px;
                            color: #666;
                            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
                        }
                    }

                    .boutique-item-widget--big:hover {
                        box-shadow: none;
                    }
                }
            }

            .side-inner-content {
                width: 360px;
                flex: 0 0 360px;
                margin-left: 20px;
                text-align: center;

                .info {
                    text-align: left;
                    padding: 20px;
                }

                .boutique-item-wrap {
                    .boutique-item-widget--small {
                        width: 320px;
                        height: 281px;
                        margin-bottom: 20px;

                        .photo-img {
                            height: 180px;
                        }

                        .info-wrap {
                            box-sizing: border-box;
                            height: 102px;
                            box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.1);
                            text-align: left;
                            padding: 15px;

                            .info {
                                padding: 0;
                                line-height: 0;
                            }

                            .sub-info {
                                height: 52px;
                                overflow: hidden;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 3;
                                font-size: 12px;
                                line-height: 18px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

