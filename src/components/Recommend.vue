<template>
    <div class="comp recommend-comp">
        <div class="wrap pic-wrap">
            <div class="title">
                <span class="text--bold">
                    家居美图
                </span>
                <span class="more-widget green" @click="onMoreClick('photo')">
                    <span class="sub-text">更多</span>
                    <span class="more-img"></span>
                </span>
            </div>
            <div class="content" style="width: 328px;">
                <div class="slot-wrap">
                    <div class="slot slot1">
                        <img class="photo-img" :src="picList[0] ? picList[0].cover : ''" @click="onPhotoItemClick(picList[0].picture_id, picList[0].category_id)" />
                    </div>
                    <div class="slot-wrap slot-wrap--verticle">
                        <div class="slot slot2"><img class="photo-img" :src="picList[1] ? picList[1].cover : ''" @click="onPhotoItemClick(picList[1].picture_id, picList[1].category_id)" /></div>
                        <div class="slot slot3"><img class="photo-img" :src="picList[2] ? picList[2].cover : ''" @click="onPhotoItemClick(picList[2].picture_id, picList[2].category_id)" /></div>
                    </div>
                </div>
                <div class="slot-wrap">
                    <div class="slot slot4"><img class="photo-img" :src="picList[3] ? picList[3].cover : ''" @click="onPhotoItemClick(picList[3].picture_id, picList[3].category_id)" /></div>
                    <div class="slot slot5"><img class="photo-img" :src="picList[4] ? picList[4].cover : ''" @click="onPhotoItemClick(picList[4].picture_id, picList[4].category_id)" /></div>
                    <div class="slot slot6"><img class="photo-img" :src="picList[5] ? picList[5].cover : ''" @click="onPhotoItemClick(picList[5].picture_id, picList[5].category_id)" /></div>
                </div>
            </div>
        </div>
        <div class="wrap wiki-wrap">
            <div class="title">
                <span class="text--bold">
                    热门百科
                </span>
                <span class="more-widget green" @click="onMoreClick('wiki')">
                    <span class="sub-text">更多</span>
                    <span class="more-img"></span>
                </span>
            </div>
            <div class="content">
                <div class="pic-text-widget--horizontal" :key="item.material_id" v-for="item in wikiList" @click="onWikiItemClick(item.material_id)">
                    <img class="photo-img" :src="item.img" />
                    <div class="info-wrap">
                        <div class="info text--bold">{{item.title}}</div>
                        <div class="sub-info text--grey">{{item.add_time}}</div>
                        <!--<span>{{item.add_time}}</span>-->
                        <div class="meta-info text--grey">
                            <span>{{`浏览数：${item.view_total}`}}</span>
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
    name: 'recommend',
    data() {
        return {
            picList: [],
            wikiList: []
        };
    },
    created() {
        this.getRecommend();
    },
    
    methods: {
        getRecommend: async function() {
            const { success, msg, res } = await apiUtil.getJSON('news/newsright', {});
            if (success && res.data) {
                const { pic, wiki } = res.data;
                this.picList = pic.slice(0, 6);
                this.wikiList = wiki.slice(0, 4);
            } else {
                this.$message.error(msg);
            }
        },

        onPhotoItemClick: function(photoId, categoryId) {
            if (categoryId === 3) {
                this.$router.push(`boutiqueDetail?boutiqueId=${photoId}`);
            } else {

                this.$router.push(`photoDetail?categoryId=${categoryId}&photoId=${photoId}`);
            }
        },

        onWikiItemClick: function(id) {
            this.$router.push('wikiDetail?wikiId=' + id);
        },

        onMoreClick: function(route){
            this.$router.push(route)
        }
    }
};
</script>
<style lang="stylus">
.recommend-comp {
    box-sizing: border-box;
    padding: 16px;

    .wrap {
        .title {
            margin-bottom: 0;
            padding-bottom: 10px;
            border-bottom: 1px solid #f2f2f2;
        }
    }

    .pic-wrap {
        .content {
            display: flex;
            flex-direction: column;

            .slot-wrap {
                display: flex;
                margin-bottom: 5px;

                .slot {
                    .photo-img {
                        display: block;
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                    }
                }

                .slot1 {
                    width: 217px;
                    height: 165px;
                    flex: 0 0 217px;
                    margin-right: 5px;
                }

                .slot2, .slot3 {
                    width: 106px;
                    height: 80px;
                    flex: 0 0 80px;
                    flex: 1;
                }

                .slot2 {
                    margin-bottom: 5px;
                }

                .slot4, .slot5, .slot6 {
                    width: 106px;
                    height: 80px;
                    margin-right: 5px;
                }

                .slot6 {
                    margin-right: 0;
                }
            }

            .slot-wrap--verticle {
                flex-direction: column;
            }

            .slot-wrap:last-child {
                margin-bottom: 0;
            }
        }
    }

    .wiki-wrap {
        .content {
            width: 100%;
            display: block !important;
            .pic-text-widget--horizontal{

                margin-bottom: 15px;
                .photo-img {
                    display: inline-block;
                    width: 104px;
                    height: 78px;
                    flex: 0 0 104px;
                    margin-right: 10px;
                }
                .info-wrap {
                    .info{
                        width: 220px;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .sub-info {
                        height: 40px;
                    }
                    .meta-info{
                        font-size: 12px;
                        span{
                            margin-right: 20px
                        }
                    }
                }
            }
        }
    }
}
</style>


