<template>
    <div class="comp banner-comp">
        <swiper :options="bannerOption">
            <swiper-slide :key="item.banner_id" v-for="item in bannerList">
                <div class="banner-img" :class="{'clickable': !!item.jump_url}" :style="{background: getBannerBg(item.image), 'background-size':'cover'}" @click="onBannerItemClick(item.jump_url)"></div>
            </swiper-slide>
            <div v-if="hasPagination" class="swiper-pagination" slot="pagination"></div>
            <div v-if="hasNavigation" class="swiper-button-prev" slot="button-prev"></div>
            <div v-if="hasNavigation" class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
    name: 'banner',
    components: {
        swiper,
        swiperSlide
    },
    props: {
        bannerList: {
            required: true,
            default: function() {
                return [];
            }
        },
        swiperOption: {
            default: function() {
                return {
                    
                };
            }
        },
        hasPagination: {
            default: function() {
                return true;
            }
        },
        hasNavigation: {
            default: function() {
                return true;
            }
        }
    },
    data() {
        return {
            bannerOption: {
                slidesPerView: 1,
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        };
    },
    created() {
        this.bannerOption = Object.assign({}, this.bannerOption, this.swiperOption)
    },
    methods: {
        getBannerBg: function(imgUrl) {
            return `url(${imgUrl}) no-repeat center center`;
        },

        onBannerItemClick: function(url) {
            if (!!url) {
                window.open(url, '_blank');
            }
        }
    }
};
</script>
<style lang="stylus">
.banner-comp {
    height: 100%;

    .swiper-container {
        height: 100%;

        .banner-img {
            height: 100%;
        }

        .banner-img.clickable{
            cursor: pointer
        }
    }
}
</style>
