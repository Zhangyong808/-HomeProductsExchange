<template>
    <div class="view wikiDetail-view">
        <div class="block">
            <div class="content">
                <div class="inner-content wikiDetail" style="width: 70%;">
                    <div class="info text--bold">{{title}}</div>
                    <div class="sub-infos text--grey">{{update_time}}</div>
                    <div class="sub-info text--grey">
                        <span>{{` 来源：家品汇`}}</span>
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
    name: 'wikiDetail',
    components: {
        'v-recommend': VRecommend
    },
    data() {
        return {
            wikiId: '',
            materialId: '',
            title: '',
            content: '',
            update_time: '',
            readnum: ''
        };
    },
    created() {
        this.wikiId = this.$route.query.wikiId;
        this.materialId = this.$route.query.materialId;
        if (!!this.wikiId) {
            this.getWikiDetail();
        } else if (!!this.materialId) {
            this.getMaterialDetail();
        } else {
            this.$message.error('缺少查询参数');
        }
    },
    watch: {
        $route(to, from) {
            const newWikiId = to.query.wikiId;
            this.wikiId = newWikiId;
            this.getWikiDetail();
        }
    },
    methods: {
        getWikiDetail: async function() {
            const { success, msg, res } = await apiUtil.getJSON('wiki/info', {
                wiki_id: this.wikiId
            });
            if (success && res.data) {
                console.log(res.data);
                const { title, content, update_time, view_total } = res.data;
                this.title = title;
                this.content = content;
                this.update_time = update_time;
                this.readnum = view_total;
            } else {
                this.$message.error(msg);
            }
        },

        getMaterialDetail: async function() {
            const { success, msg, res } = await apiUtil.getJSON('material/info', {
                material_id: this.materialId
            });
            if (success && res.data) {
                const { title, content, update_time, view_total } = res.data;
                this.title = title;
                this.content = content;
                this.update_time = update_time;
                this.readnum = view_total;
            } else {
                this.$message.error(msg);
            }
        }
    }
};
</script>
<style lang="stylus">
.wikiDetail-view {
    .block {
        .content {
            display: flex;
            background-color: transparent;

            .inner-content {
                background-color: #fff;
            }

            .inner-content.wikiDetail {
                margin-right: 20px;
                padding: 20px 60px;
                flex: 1;
                img{width: 100%;}
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
.sub-infos {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
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


