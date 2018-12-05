<template>
    <div class="view photoDetail-view">
        <div class="block bread-block">
            <div class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/photo' }">装修美图</el-breadcrumb-item>
                    <span v-if="categoryId==1">
                        <el-breadcrumb-item :to="{ path: '/photoList?category=1' }">家居美图</el-breadcrumb-item>
                        <el-breadcrumb-item>家居美图详情</el-breadcrumb-item>
                    </span>
                    <span v-if="categoryId==2">
                        <el-breadcrumb-item :to="{ path: '/photoList?category=2' }">家居图册</el-breadcrumb-item>
                        <el-breadcrumb-item>家居图册详情</el-breadcrumb-item>
                    </span>
                </el-breadcrumb>
            </div>
        </div>
        <div class="block banner-block">
            <div class="content">
                <swiper :options="photoOption" ref="photoSwiper" class="1">
                    <swiper-slide :key="item.banner_id" v-for="item in photoList">
                            <div class="tag-wrap">
                                <div class="info text--bold">{{categoryId ==1 ? '美图信息' : '相册信息'}}</div>
                                <div>
                                    <span class="tag" v-for="tag in item.tags" :key="tag.id">
                                        <span class="text--grey">{{`${tag.name}：`}}</span>
                                        <span>{{tag.value}}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="banner-img" :style="{background: getBannerBg(item.image), 'background-size':'cover'}"></div>

                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
        </div>
        <div class="block preview-block">
            <div class="content">
                <swiper :options="previewOption">
                    <swiper-slide :key="item.banner_id" v-for="item in previewList">
                        <div class="banner-img" :class="{selected: item.type ==1 && item.banner_id == selectedPhoto}" :style="{background: getBannerBg(item.image), 'background-size':'cover'}" @click="onPreviewClick(item.banner_id, item.type)">
                            <span class="tip" v-if="categoryId==='2'">{{`${item.tip}`}}</span>
                        </div>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
        </div>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import apiUtil from '../util/apiUtil.js';
import VBanner from '../components/Banner.vue';
export default {
    name: 'photoDetail',
    components: {
        'v-banner': VBanner,
        swiper,
        swiperSlide
    },
    data() {
        return {
            categoryId: 0,
            photoId: 0,
            page: 1,
            photoList: [], // 大图列表banner
            photoOption: {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                on: {
                    slideChangeTransitionEnd: () => {
                        const index = this.photoSwiper.activeIndex;
                        this.selectedPhoto = this.photoList[index].banner_id;
                    }
                }
            },
            previewList: [], //小图列表banner
            previewOption: {
                slidesPerView: 'auto',
                // slideToClickedSlide: true,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                lazy: true,
                on: {
                    reachEnd: () => {
                        if (this.previewList.length >= 20) {
                            if (this.categoryId == 1) {
                                this.getPhotoList(this.page + 1);
                            } else {
                                this.getAlbumList(this.page + 1);
                            }
                        }
                    }
                }
            },
            albumList: [], // 缓存相册列表
            selectedAlbum: '',
            selectedPhoto: '',
            image : 0,
        };
    },
    created() {
        const { categoryId, photoId } = this.$route.query;
        this.categoryId = categoryId || '1';
        this.photoId = photoId;
        if (categoryId === '1') {
            this.getPhotoList();
        } else if (categoryId === '2') {
            this.getAlbumList();
        }
    },
    mounted(){
        this.onPreviewClick(this.photoId,1);
    },
    computed: {
        photoSwiper() {
            return this.$refs.photoSwiper.swiper;
        }
    },
    methods: {
        getBannerBg: function(imgUrl) {
            return `url(${imgUrl}) no-repeat center center`;
        },

        getPhotoList: async function(page) {
            page = page || this.page;
            const { success, msg, res } = await apiUtil.postJSON(`picture/list?page=${page}&page_size=20&category_id=1`, {});
            if (success) {
                const { list } = res.data;
                this.photoList = this.photoList.concat(
                    list.map(ele => ({
                        banner_id: ele.picture_id,
                        image: ele.cover,
                        type: 1,
                        tags: ele.tags
                    }))
                );
                this.previewList = this.photoList;
                this.page = page;
                for(var i in this.previewList){
                    if(this.photoId == this.previewList[i].banner_id){
                        this.image = i
                        //console.log(this.image)
                    }
                }
                this.photoSwiper.slideTo(this.image, 500, false);

            } else {
                this.$message.error(msg);
            }
        },

        getAlbumList: async function(page) {
            page = page || this.page;
            const { success, msg, res } = await apiUtil.postJSON(`picture/list?page=${page}&page_size=20&category_id=2`, {});
            if (success) {
                const { list } = res.data;
                this.albumList = this.albumList.concat(
                    list.map(ele => ({
                        banner_id: ele.picture_id,
                        image: ele.cover,
                        type: 2,
                        tip: `${ele.sumimg}张`
                    }))
                );
                if (list.length > 0 && page === 1) {
                    // 首次加载需要自动选中第一本相册
                    this.onAlbumPreviewClick(list[0].picture_id);
                }
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },

        onPreviewClick: function(id, type) {
            if (type === 1) {
                this.onPhotoPreviewClick(id);
            } else if (type === 2) {
                this.onAlbumPreviewClick(id);
            }
        },

        onPhotoPreviewClick: function(id) {
            const index = this.photoList.findIndex(ele => ele.banner_id === id);
            this.selectedPhoto = id;
            this.photoSwiper.slideTo(index, 500, false);
        },

        onAlbumPreviewClick: async function(albumId) {
            const { success, msg, res } = await apiUtil.postJSON(`picture/info?picture_id=${albumId}`, {});
            if (success) {
                const { content, tags } = res.data;
                this.photoList = content.map((ele, index) => ({
                    banner_id: index,
                    image: ele.img,
                    type: 1,
                    tip: `${index + 1}/${content.length}`,
                    tags: tags
                }));
                let previewList = this.albumList.slice(0);
                const index = this.albumList.findIndex(ele => ele.banner_id == albumId);
                previewList.splice(index, 1, ...this.photoList);
                this.previewList = previewList;
                this.selectedAlbum = albumId;
            } else {
                this.$message.error(msg);
            }
        }
    }
};
</script>
<style lang="stylus">
.photoDetail-view {
    .banner-block {
        margin-top: 10px;

        .content {
            height: 636px;
            padding: 0;

            .swiper-container {
                height: 100%;
                .tag-wrap {
                    margin: 20px 0 20px 140px;
                    .info {
                        margin-bottom: 15px;
                    }
                    .tag {
                        border: 1px solid #f2f2f2;
                        margin-left: 20px;
                        padding: 5px;
                    }
                }
                .banner-img {
                    width: 925px;
                    height: 518px;
                    margin: 0 auto;
                }
            }
        }
    }

    .preview-block {
        margin: 40px 0 110px;

        .content {
            height: 55px;
            padding: 0;

            .swiper-container {
                height: 100%;

                .swiper-slide {
                    width: 55px;

                    .banner-img {
                        box-sizing: border-box;
                        position: relative;
                        height: 100%;
                        cursor: pointer;
                        border: 2px solid transparent;

                        .tip {
                            position: absolute;
                            display: block;
                            width: 35px;
                            height: 28px;
                            right: 0;
                            bottom: 0;
                            color: #fff;
                            background-color: #000;
                            font-size: 12px;
                            text-align: center;
                            line-height: 28px;
                        }
                    }

                    .banner-img.selected {
                        border-color: #4cb955;
                    }
                }
            }
        }
    }
}
</style>

