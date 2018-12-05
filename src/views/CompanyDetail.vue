<template>
    <div class="view companyDetail-view">
        <div class="block bread-block">
            <div class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/company' }">装修公司</el-breadcrumb-item>
                    <el-breadcrumb-item>装修公司详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="block header-block">
            <div class="content" :style="{'background': `url(${bannerImg}) no-repeat center/100%`}">
                <img class="avatar-img" :src="avatar" />
                <div class="info">{{name}}</div>
                <div class="sub-info">
                    <img src="" />
                    <span>{{address}}</span>
                </div>
                <div class="info-wrap">
                    <div class="info-wrap__sub-info">
                        <span>浏览量</span>
                        <span>{{viewTotal}}</span>
                    </div>
                    <div class="info-wrap__sub-info">
                        <span>关注</span>
                        <span>{{favTotal}}</span>
                    </div>
                    <div class="info-wrap__sub-info">
                        <span>成交</span>
                        <span>{{dealTotal}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="block info-block">
            <div class="content">
                <div class="inner-content banner-wrap">
                    <div class="gallery-top" style="">
                        <img class="photo-img" :src='img' alt="" width="200">
                    </div>

                    <!-- swiper2 Thumbs -->
                    <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                        <swiper-slide class="photo-img" :key="index" v-for="(item, index) in photoList">
                            <img class="photo-img" :src="item" @click="click(item)"/>
                        </swiper-slide>

                    </swiper>

                </div>
                <div class="inner-content info-wrap">
                    <div class="sub-title">装修公司简介</div>
                    <div>
                        <div class="sub-info-wrap intro">
                            <div class="sub-info-title text--green">公司简介</div>
                            <div class="sub-info-text">{{detail}}</div>
                            <div class="text--green all"><span @click="onViewAllClick">查看全文</span></div>
                        </div>
                        <div class="sub-info-wrap">
                            <div class="sub-info-title text--green">服务区域</div>
                            <div class="sub-info-text">{{serviceArea}}</div>
                        </div>
                        <div class="sub-info-wrap">
                            <div class="sub-info-title text--green">公司资质</div>
                            <div class="sub-info-text">无</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block decorator-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">设计师团队</span>
                    </span>
                    <!-- <span class="more-widget">
                        <span class="sub-text">更多设计师</span>
                        <span class="more-img"></span>
                    </span> -->
                </div>
                <div class="inner-content">
                    <div class="item-widget decorator-item-widget" :class="{'decorator-item-widget--last': index % 2 === 1}" :key="item.decotator_id" v-for="(item, index) in decoratorList" @click="onDecoratorItemClick(item.decorator_id)">
                        <img class="avatar-img" :src="item.avatar" />
                        <div class="info-wrap">
                            <div class="info">{{item.name}}</div>
                            <div class="sub-info text--grey">{{item.sub_info}}</div>
                        </div>
                        <div class="sub-title">{{item.info}}</div>
                        <div class="style-wrap">
                            <img class="style-img" :key="style.id" v-for="style in item.style_data" :src="style.icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block case-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">设计师案例</span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="item-widget case-item-widget" :class="{'case-item-widget--last': index % 3 === 2}" :key="item.case_id" v-for="(item, index) in caseList" @click="onCaseItemClick(item.case_id, item.decorator_info.decorator_id)">
                        <img class="photo-img" :src="item.image" />
                        <div class="info-wrap">
                            <div class="info">{{item.title}}</div>
                            <div class="sub-info text--grey">{{item.sub_title}}</div>
                        </div>
                        <div class="mask">
                            <span class="detail">{{item.detail}}</span>
                            <span class="avatar-wrap">
                                <img class="avatar-img" :src="item.decorator_info.avatar" />
                                <span class="info">{{item.decorator_info.name}}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="global-mask" v-show="maskShow">
            <div class="center-container center-container--small">
                <div class="info-wrap">
                    <div class="info text--bold">市场简介</div>
                    <div class="sub-info text--grey">{{detail}}</div>
                </div>
                <span class="close-btn" @click="onCenConCancelClick"></span>
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
    name: 'companyDetail',
    components: {
        swiper,
        swiperSlide
    },
    mounted() {
        this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper;
            const swiperThumbs = this.$refs.swiperThumbs.swiper;
            swiperTop.controller.control = swiperThumbs ;
            swiperThumbs.controller.control = swiperTop;
        });
    },
    data() {
        return {
            swiperOptionTop: {
                spaceBetween: 10
            },
            swiperOptionThumbs: {
                spaceBetween: 10,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true
            },
            maskShow: false,
            bannerImg: '',
            companyId: '',
            avatar: '',
            bgImage: '',
            name: '',
            address: '',
            viewTotal: 0,
            favTotal: 0,
            dealTotal: 0,
            photoList: [],
            decoratorList: [],
            caseList: [],
            serviceArea: '',
            detail: '',
            img :''
        };
    },
    created() {
        this.companyId = this.$route.query.companyId;
        this.getCompanyDetail();
    },
    methods: {
        click : function(img){
            this.img=img;
        },

        getCompanyDetail: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`company/pc_company?company_id=${this.companyId}`, {});
            if (success) {
                const { company_info, banner_pc, designer_case, designer_list } = res.data;
                if (company_info) {
                    const { avatar, bg_image, name, address, view_total, fav_total, deal_total, photo, service_area, detail } = company_info;
                    this.avatar = avatar;
                    this.name = name;
                    this.address = address;
                    this.viewTotal = view_total;
                    this.favTotal = fav_total;
                    this.dealTotal = deal_total;
                    this.photoList = photo;
                    this.img = this.photoList[0];
                    this.serviceArea = service_area;
                    this.detail = detail;
                }
                this.decoratorList = designer_list.map(ele => {
                    ele.style_data = ele.style_data.slice(0, 3);
                    ele.sub_info = `${ele.year}年设计经验 擅长${ele.style_data.map(ele=>ele.name).join('/')}`
                    return ele;
                });
                this.caseList = designer_case.list;
                this.bannerImg = banner_pc.image;
            } else {
                this.$message.error(msg);
            }
        },

        onDecoratorItemClick: function(id) {
            this.$router.push(`decoratorDetail?decoratorId=${id}&companyId=${this.companyId}`);
        },

        onViewAllClick: function() {
            this.maskShow = true;
        },

        onCenConCancelClick: function() {
            this.maskShow = false;
        },

        onCaseItemClick: function(caseId, decoratorId) {
            this.$router.push(`/caseDetail?caseId=${caseId}&decoratorId=${decoratorId}`);
        }
    }
};
</script>

<style lang="stylus">
.companyDetail-view {
    .block {
        margin-bottom: 20px;

        .content {
            background-color: transparent;
        }
    }

    .info-block {
        .content {
            display: flex;

            .banner-wrap {
                width: 750px;
                height: 550px;
                flex: 0 0 750px;
                margin-right: 40px;

                .gallery-top {
                    margin-bottom: 24px;

                    .photo-img {
                        width: 750px;
                        height: 398px;
                    }
                }

                .gallery-thumbs {
                    .photo-img {
                        width: 240px;
                        height: 126px;
                    }
                }
            }

            .info-wrap {
                box-sizing: border-box;
                flex: 1;
                height: 400px;
                border: 1px solid rgba(213, 213, 213, 1);

                .sub-title {
                    text-align: center;
                    border-bottom: 1px solid rgba(213, 213, 213, 1);
                    line-height: 40px;
                }

                .sub-info-wrap {
                    box-sizing: border-box;
                    padding: 12px;

                    .sub-info-title {
                        font-size: 14px;
                        font-weight: bold;
                        margin-bottom: 12px;
                    }

                    .sub-info-text {
                        line-height: 19px;
                        font-size: 14px;
                        letter-spacing: 1px;
                        color: rgba(153, 153, 153, 1);
                        padding-left: 6px;
                        margin-bottom: 12px;
                    }
                }

                .sub-info-wrap.intro {
                    .sub-info-text {
                        height: 76px;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 4;
                    }

                    .all {
                        font-size: 12px;
                        text-align: right;
                        cursor: pointer;
                        font-weight: bold;
                    }
                }
            }
        }
    }

    .header-block {
        .content {
            background-color: rgba(0, 0, 0, 0.2);
            text-align: center;
            color: #fff;
            font-weight: bold;
            padding: 25px;
            box-sizing: border-box;

            .avatar-img {
                display: inline-block;
                width: 120px;
                height: 90px;
                margin-bottom: 18px;
            }

            .info {
                font-size: 18px;
                margin-bottom: 15px;
            }

            .sub-info {
                font-size: 16px;
                margin-bottom: 20px;
            }

            .info-wrap {
                box-sizing: border-box;
                padding: 0 50px;
                display: flex;
                margin: 0 auto;
                width: 590px;
                height: 66px;
                justify-content: center;
                background-color: rgba(19, 19, 19, 0.5);

                .info-wrap__sub-info {
                    padding: 5px 0;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-around;
                }
            }
        }
    }

    .decorator-block {
        .content {
            .inner-content {
                margin-top: 60px;

                .decorator-item-widget {
                    margin-right: 40px;
                }

                .decorator-item-widget--last {
                    margin-right: 0;
                }
            }
        }

        margin-bottom: 20px;
    }

    .case-block {
        .content {
            .case-item-widget {
                margin-right: 30px;
            }

            .case-item-widget--last {
                margin-right: 0;
            }
        }
    }

    .global-mask {
        .center-container {
            position: absolute;
            margin: auto;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: #fff;

            .info {
                font-size: 24px;
                margin-bottom: 20px;
            }

            .sub-info {
                line-height: 25px;
                text-align: left;
            }
        }
    }
}
</style>

