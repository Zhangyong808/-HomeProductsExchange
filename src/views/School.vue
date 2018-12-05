<template>
    <div class="view school-view">
        <div class="block banner-block">
            <div class="content">
                <v-banner :bannerList="bannerList" :hasNavigation="false" :hasPagination="false"/>
            </div>
        </div>
        <div class="block wiki-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">装修百科</span>
                    </span>
                    <span class="more-widget" @click="onMoreClick('/wiki?type=1')">
                        <span class="sub-text">更多</span>
                        <span class="more-img"></span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="wrap wiki-img-wrap--big">
                        <div v-if="!!wiki[0]" class="wiki-item-widget--show" @click="onWikiItemClick(wiki[0].wiki_id)">
                            <img class="photo-img" :src="wiki[0].img" />
                            <div class="mask"><span class="info">{{wiki[0].title}}</span></div>
                        </div>
                    </div>
                    <div class="wrap wiki-img-wrap">
                        <div v-if="!!wiki[1]" class="wiki-item-widget--show" @click="onWikiItemClick(wiki[1].wiki_id)">
                            <img class="photo-img" :src="wiki[1].img" />
                            <div class="mask"><span class="info">{{wiki[1].title}}</span></div>
                        </div>
                        <div v-if="!!wiki[2]" class="wiki-item-widget--show" @click="onWikiItemClick(wiki[2].wiki_id)">
                            <img class="photo-img" :src="wiki[2].img" />
                            <div class="mask"><span class="info">{{wiki[2].title}}</span></div>
                        </div>
                    </div>
                    <div class="wrap wiki-text-wrap">
                        <div class="info">热门装修</div>
                        <div class="wiki-text-widget" :key="item.wiki_id" v-for="(item, index) in wikiList" @click="onWikiItemClick(item.wiki_id)">
                            <span class="index" :class="{'bg--green':index < 3}">{{index+1}}</span>
                            <span class="sub-info">{{item.title}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block material-block">
            <div class="content">
                <div class="title">
                    <!--https://test.dfmeiju.com.cn/material/list?page=1&page_size=12&category_id=0&type_id=0-->
                    <span>
                        <span class="info">材料百科</span>
                    </span>
                    <span class="more-widget" @click="onMoreClick('/wiki?type=2')">
                        <span class="sub-text">更多</span>
                        <span class="more-img"></span>
                    </span>
                </div>
                <div class="inner-content" style="position: relative;">
                    <div class="wrap wiki-img-wrap">
                        <div v-if="!!materialList[0]" class="wiki-item-widget--show" @click="onMaterialItemClick(materialList[0].material_id)">
                            <img class="photo-img" :src="materialList[0].img" />
                            <div class="mask"><span class="info">{{materialList[0].title}}</span></div>
                        </div>
                    </div>
                    <div class="wrap wiki-img-wrap">
                        <div v-if="!!materialList[1]" class="wiki-item-widget--show" @click="onMaterialItemClick(materialList[1].material_id)">
                            <img class="photo-img" :src="materialList[1].img" />
                            <div class="mask"><span class="info">{{materialList[1].title}}</span></div>
                        </div>
                    </div>

                    <!--相关推荐列表信息-->
                    <ul class="uls">
                        <li v-for="i in materialList.slice(2, 3)" @click="onMaterialItemClick(materialList[2].material_id)">{{i.title}}</li>
                        <li v-for="i in materialList.slice(3, 4)" @click="onMaterialItemClick(materialList[3].material_id)">{{i.title}}</li>
                        <li v-for="i in materialList.slice(4, 5)" @click="onMaterialItemClick(materialList[4].material_id)">{{i.title}}</li>
                        <li v-for="i in materialList.slice(5, 6)" @click="onMaterialItemClick(materialList[5].material_id)">{{i.title}}</li>
                    </ul>
                    <ul class="ulss">
                        <li v-for="i in materialList.slice(6, 7)" @click="onMaterialItemClick(materialList[6].material_id)">{{i.title}}</li>
                        <li v-for="i in materialList.slice(7, 8)" @click="onMaterialItemClick(materialList[7].material_id)">{{i.title}}</li>
                        <li v-for="i in materialList.slice(8, 9)" @click="onMaterialItemClick(materialList[8].material_id)">{{i.title}}</li>
                        <li v-for="i in materialList.slice(9, 10)" @click="onMaterialItemClick(materialList[9].material_id)">{{i.title}}</li>
                    </ul>


                    <div class="wrap meter-wrap">
                        <div class="pic-text-widget--horizontal" :key="item.material_id" v-for="item in material" @click="onMaterialItemClick(item.material_id)">
                            <img class="photo-img" :src="item.img" />
                            <div class="info-wrap">
                                <div class="info text--bold">{{item.title}}</div>
                                 <!--<div class="sub-info time text&#45;&#45;grey">{{item.add_time}}</div>-->
                                <span style="font-size: 12px;color:gray;">{{item.add_time}}</span>
                                <div class="sub-info view text--grey">{{`浏览量：${item.view_total}`}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VBanner from '../components/Banner.vue';
import apiUtil from '../util/apiUtil.js';
export default {
    name: 'school',
    components: {
        'v-banner': VBanner
    },
    data() {
        return {
            bannerList: [],
            wiki: [],
            wikiList: [],
            material: [],
            materialList: [],
        };
    },
    created() {
        this.getSchoolData();
    },
    methods: {
        getSchoolData: async function() {
            const { success, msg, res } = await apiUtil.postJSON('v3_fitment/pcindex', {});
            if (success) {
                console.log(res.data);
                const { banner_pc, wiki, wikilist, material, materiallist } = res.data;
                this.bannerList = [banner_pc];
                this.wiki = wiki;
                this.wikiList = wikilist;
                this.material = material;
                this.materialList = materiallist;
            } else {
                this.$message.error(msg);
            }
        },

        onMoreClick: function(route) {
            this.$router.push(route);
        },

        onWikiItemClick: function(id) {
            this.$router.push('/wikiDetail?wikiId=' + id);
        },

        onMaterialItemClick: function(id) {
            this.$router.push('/wikiDetail?materialId=' + id);
        }
    }
};
</script>
<style lang="stylus">
    .uls{
        /*border: 1px solid red;*/
        position: absolute;
        top: 273px;
        left: -6px;

    }
    .ulss{
        /*border: 1px solid red;*/
        position: absolute;
        left: 375px;
        top: 273px;
    }
    .uls>li,.ulss>li{
        margin-bottom: 10px;
        cursor:pointer;
    }
.school-view {
    .wiki-item-widget--show {
        position: relative;
        width: 100%;
        height: 100%;
        cursor: pointer;

        .photo-img {
            width: 100%;
            height: 100%;
        }

        .mask {
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 55px;
            text-align: center;
            line-height: 55px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.7);
        }
    }

    .banner-block {
        margin-top: 10px;

        .content {
            height: 300px;
            padding: 0;

            .swiper-container {
                height: 100%;

                .banner-img {
                    height: 100%;
                }
            }
        }
    }

    .wiki-block {
        .content {
            .inner-content {
                display: flex;
                padding-left: 20px;

                .wiki-img-wrap--big {
                    width: 500px;
                    height: 380px;
                    flex: 0 0 500px;
                    margin-right: 20px;
                }

                .wiki-img-wrap {
                    width: 240px;
                    height: 380px;
                    flex: 0 0 240px;
                    margin-right: 20px;

                    .wiki-item-widget--show {
                        height: 180px;
                        margin-bottom: 20px;

                        .mask {
                            height: 34px;
                            line-height: 34px;
                        }
                    }

                    .wiki-item-widget--show:last-child {
                        margin-bottom: 0;
                    }
                }

                .wiki-text-wrap {
                    flex: 1;
                    padding: 10px 20px 0 0;

                    .wiki-text-widget {
                        padding: 10px 0;
                        border-bottom: 1px solid #f1f1f1;
                        display: block;
                        cursor: pointer;

                        .index {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            background-color: #D5D5D5;
                            border-radius: 1px;
                            font-size: 16px;
                            color: #999;
                            line-height: 20px;
                            margin-right: 10px;
                            text-align: center;
                        }

                        .index.bg--green {
                            background-color: #3CB850;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }

    .material-block {
        .content {
            .inner-content {
                display: flex;
                padding-left: 20px;
            }

            .wiki-img-wrap {
                width: 360px;
                height: 420px;
                flex: 0 0 360px;
                margin-right: 20px;

                .wiki-item-widget--show {
                    height: 270px;
                    margin-bottom: 20px;
                }
            }

            .meter-wrap {
                .pic-text-widget--horizontal{
                    .photo-img {
                        width: 168px;
                    }

                    .info {
                        white-space: nowrap;
                        width: 200px;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    .sub-info{
                        font-size: 12px;
                        margin-top: 10px;
                    }

                    .sub-info.view {
                        margin-top: 64px;
                    }
                }
                .pic-text-widget--horizontal:not(:last-child){
                    margin-bottom: 10px;
                    
                }
            }
        }
    }
}
</style>

