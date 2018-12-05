<template>
    <div class="view photo-view">
        <div class="block banner-block">
            <div class="content">
                <v-banner :bannerList="bannerList" :hasNavigation="false" :hasPagination="false"></v-banner>
            </div>
        </div>
        <div class="block boutique-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">精品专题</span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="banner-wrap" :style="{background: `url(${activeBoutique.cover}) no-repeat center/100%`, backgroundSize: 'cover'}">
                        <div class="filter" :class="{sliding: isSliding}" :style="{background: `url(${activeBoutique.cover}) no-repeat center/100%`, backgroundSize: 'cover'}"></div>
                        <swiper :options="boutiqueBannerOptions" class="" ref="boutiqueSwiper">
                            <swiper-slide :key="item.picture_id" v-for="item in boutiqueList">
                                <img class="photo-img" :src="item.cover" @click="onPhotoItemClick(item.picture_id,3)" />
                            </swiper-slide>
                        </swiper>
                        <div class="info-wrap">
                            <div class="info text--bold">{{activeBoutique.title}}</div>
                            <div class="sub-info">{{activeBoutique.detail}}</div>
                        </div>
                    </div>
                    <span class="more-btn text--bold" @click="onMoreClick(3)">更多美图</span>
                </div>

            </div>

        </div>
        <div class="block photo-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">家居美图</span>
                    </span>
                    <span>
                        <span class="tag" v-for="item in photoTags" :key="item.id" @click="onTagClick(item.ename, item.id, 1)">{{item.name}}</span>
                        <span class="more-widget" @click="onMoreClick(1)">
                            <span class="sub-text">更多</span>
                            <span class="more-img"></span>
                        </span>
                    </span>

                </div>
                <div class="inner-content">
                    <div class="item-widget photo-item-widget" :class="{'photo-item-widget--last': index % 4 ===3}" :key="item.picture_id" v-for="(item, index) in photoList" @click="onPhotoItemClick(item.picture_id,1)">
                        <img class="photo-img" :src="item.cover" />

                    </div>
                </div>
            </div>
        </div>
        <div class="block album-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">精品图册</span>
                    </span>
                    <span>
                        <span class="tag" v-for="item in albumTags" :key="item.id" @click="onTagClick(item.ename, item.id, 2)">{{item.name}}</span>
                        <span class="more-widget" @click="onMoreClick(2)">
                            <span class="sub-text">更多</span>
                            <span class="more-img"></span>
                        </span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="item-widget album-item-widget" :class="{'album-item-widget--last': index % 4 ===3}" :key="item.picture_id" v-for="(item, index) in albumList" @click="onPhotoItemClick(item.picture_id,2)">
                        <img class="photo-img" :src="item.cover" />
                        <div class="info">{{item.title}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import lsUtil from '../util/lsUtil.js';
import apiUtil from '../util/apiUtil.js';
import VBanner from '../components/Banner.vue';
export default {
    name: 'photo',
    components: {
        swiper,
        swiperSlide,
        'v-banner': VBanner
    },
    data() {
        return {
            isSliding: false,
            bannerList: [],
            activeBoutique: {},
            boutiqueList: [],
            boutiqueBannerOptions: {
                slidesPerView: 'auto',
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                on: {
                    slideChangeTransitionStart: () => {
                        this.isSliding = true;
                    },
                    slideChangeTransitionEnd: () => {
                        const index = this.boutiqueSwiper.activeIndex;
                        this.activeBoutique = this.boutiqueList[index];
                        this.isSliding = false;
                    }
                }
            },
            photoList: [],
            albumList: [],
            photoTags: [],
            albumTags: []
        };
    },
    created() {
        this.getShortList();
    },
    computed: {
        boutiqueSwiper() {
            return this.$refs.boutiqueSwiper.swiper;
        }
    },
    methods: {
        getShortList: async function() {
            const { success, msg, res } = await apiUtil.postJSON('picture/pcindex', {});
            if (success) {
                const { banner_pc, atlas, pic, special, tag_atlas, tag_special } = res.data;
                this.bannerList = [banner_pc];
                this.photoList = pic;
                this.albumList = atlas;
                this.boutiqueList = special;
                this.activeBoutique = special[0] || {};
                this.photoTags = tag_special;
                this.albumTags = tag_atlas;
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

        onMoreClick: function(category) {
            this.$router.push('photoList?category=' + category);
        },

        onTagClick: function(tagName, tagValue, categoryId) {
            this.$router.push(`photoList?filterName=${tagName}&filterValue=${tagValue}&category=${categoryId}`);
        }
    }
};
</script>
<style lang="stylus">
.photo-view {
    .block {
        .content {
            background-color: transparent;

            .title {
                .tag {
                    margin-right: 10px;
                    cursor: pointer;
                }
            }
        }
    }

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

    .boutique-block {
        .content {
            .inner-content {
                text-align: center;
                .banner-wrap {
                    position: relative;
                    box-sizing: border-box;
                    height: 672px;
                    padding-top: 50px;
                    overflow: hidden;

                    .filter {
                        content: '';
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        filter: blur(10px);
                        margin: -30px;
                        transition: all 0.3s;
                    }

                    .filter.sliding {
                        filter: blur(50px);
                    }

                    .info-wrap {
                        display: inline-block;
                        position: absolute;
                        width: 432px;
                        height: 120px;
                        left: 50%;
                        right: 0;
                        bottom: -120px;
                        margin-left: -216px;
                        z-index: 2;
                        color: #fff;
                        transition: all 0.3s;
                        opacity: 0;

                        .info {
                            text-align: center;
                            font-size: 20px;
                            margin-bottom: 20px;
                        }

                        .sub-info{
                            text-align: left;
                            height: 96px;
                            line-height: 25px;
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 4;
                        }
                    }

                    .swiper-container {
                        height: 420px;

                        .swiper-wrapper {
                            align-items: center;

                            .swiper-slide {
                                width: 750px;
                                max-height: 420px;
                                transition: all 0.3s;
                                box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);

                                .photo-img {
                                    width: 100%;
                                    height: 100%;
                                    cursor: pointer;
                                }
                            }

                            .swiper-slide-next, .swiper-slide-prev {
                                max-height: 336px;
                            }
                        }
                    }
                }

                .banner-wrap:hover {
                    .info-wrap {
                        bottom: 60px;
                        opacity: 1;
                    }
                }

                .more-btn {
                    display: inline-block;
                    width: 180px;
                    height: 70px;
                    text-align: center;
                    line-height: 70px;
                    border: 1px solid #000;
                    font-size: 20px;
                    margin-top: 40px;
                    cursor: pointer;
                }
            }
        }
    }

    .photo-block {
        .content {
            .photo-item-widget {
                margin-right: 29px;
                margin-bottom: 24px;
            }

            .photo-item-widget.photo-item-widget--last {
                margin-right: 0px;
            }
        }
    }

    .album-block {
        .content {
            .album-item-widget {
                margin-right: 29px;
                margin-bottom: 24px;
            }

            .album-item-widget.album-item-widget--last {
                margin-right: 0px;
            }
        }
    }
}
</style>

