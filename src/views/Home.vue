<template>
	<div class="view home-view">
		<div class="block banner-block">
			<div class="content content--wide">
				<v-banner :bannerList="bannerList" :swiperOption="headerSwiperOption" />

			</div>
		</div>
		<div class="block menu-block bg--grey">
			<div class="content content--wide">
				<div class="menu-item" @click="goAnchor('#anchor-market')" v-if="marketList.length > 0">
					<div>
						<div class="info">网上市场</div>
						<div class="sub-info text--grey">逛遍建材家具市场</div>
					</div>
					<img class="icon" src="../assets/image/market.png" alt="market" />
				</div>
				<div class="menu-item" @click="goAnchor('#anchor-discount')" v-if="discountList.length > 0">
					<div>
						<div class="info">折扣专区</div>
						<div class="sub-info text--grey">最优折扣天天特价</div>
					</div>
					<img class="icon" src="../assets/image/discount.png" alt="discount" />
				</div>
				<div class="menu-item" @click="goAnchor('#anchor-photo')" v-if="photoList.length > 0">
					<div>
						<div class="info">装修美图</div>
						<div class="sub-info text--grey">海量装修风格任选</div>
					</div>
					<img class="icon" src="../assets/image/photo.png" alt="photo" />
				</div>
				<div class="menu-item" @click="goAnchor('#anchor-school')">
					<div>
						<div class="info">装修学堂</div>
						<div class="sub-info text--grey">装修攻略百科大全</div>
					</div>
					<img class="icon" src="../assets/image/school.png" alt="school" />
				</div>
			</div>
		</div>
		<div id="anchor-market" class="block market-block" v-if="marketList.length > 0">
			<div class="content">
				<div class="title">
					<span>
						<img class="indicator" src="../assets/image/indicator.png" alt="indicator" />
						<span class="info text--green">网上市场</span>
						<span class="sub-info text--grey">Online Markets</span>
					</span>
					<span class="more-widget green" @click="onMoreClick('onlineMarket')">
						<span class="sub-text">更多</span>
						<span class="more-img"></span>
					</span>
				</div>
				<div class="inner-content">
					<div class="item-widget market-item-widget" :class="{'market-item-widget--last': index % 3 === 2}" :key="item.market_id" v-for="(item, index) in marketList" @click="onMarketItemClick(item.market_id)">
						<img class="market-img" :src="item.cover_pc" :alt="item.name" />
						<div class="info">{{item.name}}</div>
						<div class="sub-info text--grey">{{`电话：${item.contact}`}}</div>
						<div class="sub-info text--grey">{{`地址：${item.address}`}}</div>
					</div>
				</div>
			</div>
		</div>
		<div id="anchor-discount" class="block discount-block bg--pattern" v-if="discountList.length > 0">
			<div class="content">
				<div class="title">
					<span>
						<img class="indicator" src="../assets/image/indicator.png" alt="indicator" />
						<span class="info text--green">折扣专区</span>
						<span class="sub-info text--grey">Discounted Goods</span>
					</span>
					<span class="more-widget green" @click="onMoreClick('goods?discount=2')">
						<span class="sub-text">更多</span>
						<span class="more-img"></span>
					</span>
				</div>
				<div class="inner-content">
					<div class="slot slot-1" v-if="!!discountList[0]">
						<img class="slot-img" :src="discountList[0].image" @click="onDiscountItemClick(discountList[0].goods_id)" />
					</div>
					<div class="slot slot-2" v-if="!!discountList[1]">
						<img class="slot-img" :src="discountList[1].image" @click="onDiscountItemClick(discountList[1].goods_id)" />
					</div>
					<div class="slot-wrap">
						<div class="slot slot-3" v-if="!!discountList[2]">
							<img class="slot-img" :src="discountList[2].image" @click="onDiscountItemClick(discountList[2].goods_id)" />
						</div>
						<div class="slot-wrap--flex">
							<div class="slot slot-4" v-if="!!discountList[3]">
								<img class="slot-img" :src="discountList[3].image" @click="onDiscountItemClick(discountList[3].goods_id)" />
							</div>
							<div class="slot slot-5" v-if="!!discountList[4]">
								<img class="slot-img" :src="discountList[4].image" @click="onDiscountItemClick(discountList[4].goods_id)" />
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
		<div id="anchor-photo" class="block photo-block" v-if="photoList.length > 0">
			<div class="content">
				<div class="title">
					<span>
						<img class="indicator" src="../assets/image/indicator.png" alt="indicator" />
						<span class="info text--green">装修美图</span>
						<span class="sub-info text--grey">Pictures</span>
					</span>
					<span class="more-widget green" @click="onMoreClick('photo')">
						<span class="sub-text">更多</span>
						<span class="more-img"></span>
					</span>
				</div>
				<div class="inner-content">
					<div class="slot-wrap slot-wrap--flex">
						<div class="slot slot--big slot1">
							<div class="photo-item-widget--show" @click="onPhotoItemClick(photoList[0].category_id,photoList[0].picture_id)">
								<img class="photo-img" :src="photoList[0].cover " />
								<div class="mask">
									<div class="info text--bold">{{photoList[0].title}}</div>
									<div class="sub-info">{{photoList[0].detail}}</div>
								</div>
							</div>

						</div>
						<div class="slot-wrap">
							<div class="slot-wrap--flex">
								<div class="slot slot2">
									<div class="photo-item-widget--show" @click="onPhotoItemClick(photoList[1].category_id,photoList[1].picture_id)">
										<img class="photo-img" :src="photoList[1].cover " />

									</div>
								</div>
								<div class="slot slot3">
									<div class="photo-item-widget--show" @click="onPhotoItemClick(photoList[2].category_id,photoList[2].picture_id)">
										<img class="photo-img" :src="photoList[2].cover " />

									</div>

								</div>
							</div>
							<div class="slot-wrap--flex">
								<div class="slot slot4">
									<div class="photo-item-widget--show" @click="onPhotoItemClick(photoList[3].category_id,photoList[3].picture_id)">
										<img class="photo-img" :src="photoList[3].cover " />
									</div>

								</div>
								<div class="slot slot5">
									<div class="photo-item-widget--show" @click="onPhotoItemClick(photoList[4].category_id,photoList[4].picture_id)">
										<img class="photo-img" :src="photoList[4].cover " />
									</div>

								</div>
							</div>
						</div>
					</div>
					<div class="slot-wrap slot-wrap--flex">
						<div class="slot slot--album slot6">
							<div class="photo-item-widget--show" @click="onPhotoItemClick(photoList[5].category_id,photoList[5].picture_id)">
								<img class="photo-img" :src="photoList[5].cover " />
								<div class="mask">
									<div class="info">{{photoList[5].title}}</div>
								</div>
							</div>

						</div>
						<div class="slot slot--album slot7">
							<div class="photo-item-widget--show" @click="onPhotoItemClick(photoList[6].category_id,photoList[6].picture_id)">
								<img class="photo-img" :src="photoList[6].cover " />
								<div class="mask">
									<div class="info">{{photoList[6].title}}</div>
								</div>
							</div>

						</div>
						<div class="slot slot--album slot8">
							<div class="photo-item-widget--show" @click="onPhotoItemClick(photoList[7].category_id,photoList[7].picture_id)">
								<img class="photo-img" :src="photoList[7].cover " />
								<div class="mask">
									<div class="info">{{photoList[7].title}}</div>
								</div>
							</div>

						</div>
						<div class="slot slot--album slot9">
							<div class="photo-item-widget--show" @click="onPhotoItemClick(photoList[8].category_id,photoList[8].picture_id)">
								<img class="photo-img" :src="photoList[8].cover " />
								<div class="mask">
									<div class="info">{{photoList[8].title}}</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="block company-block bg--pattern" v-if="companyList.length > 0">
			<div class="content">
				<div class="title">
					<span>
						<img class="indicator" src="../assets/image/indicator.png" alt="indicator" />
						<span class="info text--green">装修公司</span>
						<span class="sub-info text--grey">Companies</span>
					</span>
					<span class="more-widget green" @click="onMoreClick('company')">
						<span class="sub-text">更多</span>
						<span class="more-img"></span>
					</span>
				</div>
				<div class="inner-content">
					<div class="item-widget company-item-widget" v-for="item in companyList" :key="item.company_id" @click="onCompanyItemClick(item.company_id)">
						<img class="company-img" :src="item.photo[0]" :alt="item.name" />
						<div class="detail-wrap">
							<div class="info">{{item.name}}</div>
							<div class="sub-info">
								<span class="text--grey">收藏量：</span>
								<span class="text--green fav-total">{{item.fav_total}}</span>
								<span class="text--grey">浏览量：</span>
								<span class="text--green view-total">{{item.view_total}}</span>
							</div>
							<div class="market-name text--grey">{{item.market_name}}</div>
							<img class="avatar-img" :src="item.cover_pc" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="block shop-block" v-if="shopList.length > 0">
			<div class="content">
				<div class="title">
					<span>
						<img class="indicator" src="../assets/image/indicator.png" alt="indicator" />
						<span class="info text--green">店铺精选</span>
						<span class="sub-info text--grey">Selected Shops</span>
					</span>
					<span class="more-widget green" @click="onMoreClick('shop')">
						<span class="sub-text">更多</span>
						<span class="more-img"></span>
					</span>
				</div>
				<div class="inner-content">
					<div class="item-widget shop-item-widget" :class="{'shop-item-widget--orange':index % 3 === 1, 'shop-item-widget--grey':index % 3 === 2}" v-for="(item, index) in shopList" :key="(item, index).shop_id" @click="onShopItemClick(item.shop_id)">
						<div class="info">{{item.shop_name}}</div>
						<div class="sub-info">{{item.market_name}}</div>
						<img class="shop-img" :src="item.image" :alt="item.shop_name" />
					</div>
				</div>
			</div>
		</div>
		<div id="anchor-school" class="block school-block bg--pattern">
			<div class="content">
				<div class="title">
					<span>
						<img class="indicator" src="../assets/image/indicator.png" alt="indicator" />
						<span class="info text--green">装修学堂</span>
						<span class="sub-info text--grey">Decoration School</span>
					</span>
					<span class="more-widget green" @click="onMoreClick('decorationSchool')">
						<span class="sub-text">更多</span>
						<span class="more-img"></span>
					</span>
				</div>
				<div class="inner-content">
					<div class="wrap banner-wrap">
						<swiper :options="wikiBannerOption">
							<swiper-slide :key="item.wiki_id" v-for="item in wikiBannerList">
								<div class="pic-text-widget--vertical" @click="onWikiItemClick(item.wiki_id)">
									<img class="photo-img" :src="item.img" />
									<div class="info-wrap">
										<div class="info text--bold">{{item.title}}</div>
										<div class="sub-info text--grey">{{item.detail}}</div>
									</div>
								</div>
							</swiper-slide>
							<div class="swiper-pagination" slot="pagination"></div>
						</swiper>
					</div>
					<div class="wrap meter-wrap">
						<div class="pic-text-widget--horizontal" :key="item.material_id" v-for="item in wikiMeterList" @click="onMaterialItemClick(item.material_id)">
							<img class="photo-img" :src="item.img" />
							<div class="info-wrap">
								<div class="info text--bold">{{item.title}}</div>
								<div class="sub-info text--grey">{{item.detail}}</div>
							</div>
						</div>
					</div>
					<div class="wrap pic-wrap">
						<img class="photo-img" :key="item.wiki_id" v-for="item in wikiPicList" :src="item.img" @click="onWikiItemClick(item.wiki_id)" />
					</div>
				</div>
			</div>
		</div>
		<div class="block news-block">
			<div class="content">
				<div class="title">
					<span>
						<img class="indicator" src="../assets/image/indicator.png" alt="indicator" />
						<span class="info text--green">新闻资讯</span>
						<span class="sub-info text--grey">News</span>
					</span>
					<span class="more-widget green" @click="onMoreClick('news')">
						<span class="sub-text">更多</span>
						<span class="more-img"></span>
					</span>
				</div>
				<div class="inner-content">
					<div class="wrap banner-wrap">
						<swiper :options="wikiBannerOption">
							<swiper-slide :key="item.news_id" v-for="item in newsBannerList">
								<div class="news-item-widget--show" @click="onNewsItemClick(item.news_id)">
									<img class="photo-img" :src="item.image " />
									<div class="mask">
										<div class="info">{{item.title}}</div>
									</div>
								</div>
							</swiper-slide>
							<div class="swiper-pagination" slot="pagination"></div>
						</swiper>
					</div>
					<div class="wrap meter-wrap">
						<div class="pic-text-widget--horizontal" :key="item.news_id" v-for="item in newsPicList" @click="onNewsItemClick(item.news_id)">
							<img class="photo-img" :src="item.image" />
							<div class="info-wrap">
								<div class="info text--bold">{{item.title}}</div>
								<div class="sub-info text--grey">{{item.detail}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="block join-block">
			<div class="content content--wide" @click="onJoinBannerClick"></div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import apiUtil from '../util/apiUtil.js';
import lsUtil from '../util/lsUtil.js';
import VBanner from '../components/Banner.vue';
export default {
    name: 'home',
    components: {
        'v-banner': VBanner,
        swiper,
        swiperSlide
    },
    data() {
        return {
            bannerList: [],
            marketList: [],
            discountList: [],
            photoList: [],
            companyList: [],
            shopList: [],
            headerSwiperOption: {
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                }
            },
            wikiBannerList: [],
            wikiBannerOption: {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            wikiMeterList: [],
            wikiPicList: [],
            newsBannerList: [],
            newsPicList: []
        };
    },
    computed: {
        cityData() {
            return this.$store.state.cityData;
        },
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    created() {
        this.getIndex(this.cityData);
    },
    watch: {
        cityData(newData, oldData) {
            if (!!newData) {
                this.getIndex(newData);
            }
        },
        $route(to, from) {
            debugger
        }
    },
    methods: {
        goAnchor: function(selector) {
            const anchor = this.$el.querySelector(selector);
            document.getElementById('html').scrollTop = anchor.offsetTop - 170;
        },

        getIndex: async function(cityData) {
            const { id, lng, lat } = cityData;
            const { success, msg, res } = await apiUtil.getJSON('v3_index/index', {
                city_id: id,
                lng,
                lat
            });
            if (success) {
                const { banner_pc, market, discount_pc, picture_pc, company_pc, shop_pc, wiki_pc, toutiao } = res.data;
                this.bannerList = banner_pc;
                this.marketList = market.list.list.slice(0, 3);
                this.discountList = discount_pc.list.slice(0, 5);
                this.photoList = picture_pc.slice(0, 9);
                this.companyList = company_pc.slice(0, 4);
                console.log(this.companyList);
                this.shopList = shop_pc.list.slice(0, 3);
                this.wikiBannerList = wiki_pc.banner;
                this.wikiMeterList = wiki_pc.meter;
                this.wikiPicList = wiki_pc.pic;
                this.newsBannerList = toutiao.list.slice(0, 3);
                this.newsPicList = toutiao.list.slice(3);
            } else {
            }
        },

        onMarketItemClick: function(id) {
            this.$router.push('marketDetail?id=' + id);
        },

        onDiscountItemClick: function(id) {
            this.$router.push('goodsDetail?goodsId=' + id);
        },

        onPhotoItemClick: function(categoryId, id) {
            if (categoryId == 3) {
                this.$router.push(`boutiqueDetail?boutiqueId=${id}`);
            } else {
                this.$router.push(`photoDetail?categoryId=${categoryId}&photoId=${id}`);
            }
        },

        onCompanyItemClick: function(id) {
            this.$router.push(`companyDetail?companyId=${id}`);
        },

        onShopItemClick: function(id) {
            this.$router.push('shopDetail?id=' + id);
        },

        onWikiItemClick: function(id) {
            this.$router.push('wikiDetail?wikiId=' + id);
        },

        onMaterialItemClick: function(id) {
            this.$router.push('wikiDetail?materialId=' + id);
        },

        onNewsItemClick: function(id) {
            this.$router.push('newsDetail?newsId=' + id);
        },

        onMoreClick: function(route) {
            this.$router.push(route);
        },

        onJoinBannerClick: function() {
            this.$router.push('/recruit');
        }
    }
};
</script>
<style lang="stylus">
.home-view {
	.block {
		.content {
			background-color: transparent !important;
			padding: 25px 0;
			text-align: center;

			.inner-content {
				.slot-wrap--flex {
					display: flex;
				}
			}
		}
	}

	.banner-block {
		.content {
			width: 100%;
			max-width: 1920px;
			height: 500px;
			padding: 0;
		}
	}

	.menu-block {
		.content {
			padding: 25px;

			.menu-item {
				position: relative;
				display: inline-block;
				padding: 27px;
				width: 315px;
				height: 135px;
				background-color: #fff;
				box-sizing: border-box;
				text-align: left;
				transition: all 0.3s;
				cursor: pointer;

				.icon {
					position: absolute;
					top: 27px;
					right: 27px;
				}

				.info {
					font-size: 24px;
					font-weight: bold;
					margin: 10px 0;
				}

				.sub-info {
					letter-spacing: 3.6px;
					font-size: 16px;
				}
			}

			.menu-item:not(:last-child) {
				margin-right: 15px;
			}

			.menu-item:hover {
				box-shadow: 5px 9px 11px 0 rgba(0, 0, 0, 0.2);
			}
		}
	}

	.market-block {
		.content {
			.inner-content {
				.market-item-widget:not(:last-child) {
					margin-right: 20px;
				}
			}
		}
	}

	.discount-block {
		.content {
			.inner-content {
				display: flex;

				.slot {
					background-color: #fff;

					.slot-img {
						display: block;
						width: 100%;
						height: 100%;
						cursor: pointer;
						transition: all 0.3s;
					}
				}

				.slot:hover {
					box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
				}

				.slot-1 {
					width: 200px;
					height: 400px;
					margin-right: 20px;
				}

				.slot-2 {
					width: 460px;
					height: 400px;
				}

				.slot-3 {
					width: 500px;
					height: 190px;
					margin-left: 20px;
				}

				.slot-4, .slot-5 {
					width: 240px;
					height: 190px;
					margin: 20px 0 0 20px;
				}
			}
		}
	}

	.photo-block {
		.content {
			.inner-content {
				.slot {
					width: 285px;
					height: 215px;
					background-color: #111;
					margin: 0 20px 20px 0;
					cursor: pointer;
					transition: all 0.3s;

					.photo-item-widget--show {
						position: relative;
						width: 100%;
						height: 100%;

						.photo-img {
							display: block;
							width: 100%;
							height: 100%;
						}
					}
				}

				.slot:hover {
					box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
				}

				.slot--big {
					width: 590px;
					height: 450px;

					.mask {
						position: absolute;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						padding: 0 54px;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						opacity: 0;
						background-color: rgba(0, 0, 0, 0.5);
						color: #fff;
						transition: all 0.3s;

						.info {
							font-size: 20px;
							margin-bottom: 30px;
						}

						.sub-info {
							line-height: 25px;
						}
					}
				}

				.slot--big:hover {
					.mask {
						opacity: 0.8;
					}
				}

				.slot--album {
					.mask {
						position: absolute;
						right: 0;
						bottom: 0;
						left: 0;
						height: 55px;
						line-height: 55px;
						color: #fff;
						text-align: center;
						background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
						transition: all 0.3s;
						opacity: 0;

						.info {
							font-size: 20px;
						}
					}
				}

				.slot--album:hover {
					.mask {
						opacity: 1;
					}
				}

				.slot-wrap--flex {
					.slot:last-child {
						margin-right: 0;
					}
				}
			}
		}
	}

	.company-block {
		.content {
			.inner-content {
				.company-item-widget:not(:last-child) {
					margin-right: 20px;
				}
			}
		}
	}

	.shop-block {
		.content {
			.shop-item-widget:not(:last-child) {
				margin-right: 15px;
			}
		}
	}

	.school-block {
		.content {
			height: 495px;

			.inner-content {
				display: flex;

				.wrap:not(:last-child) {
					margin-right: 20px;
				}

				.banner-wrap {
					width: 380px;
					flex: 0 0 380px;

					.sub-info{
						text-align: left;
						margin-top: 10px;
						line-height: 20px;
						letter-spacing: 3px;
					}
				}

				.meter-wrap {
					flex: 1;

					.pic-text-widget--horizontal {
						.photo-img {
							max-width: 0;
							max-height: 0;
						}

						.info-wrap {
							.sub-info {
								display: none;
								font-size: 12px;
								line-height: 20px;
								opacity: 0;
							}
						}
					}

					.pic-text-widget--horizontal:hover {
						.photo-img {
							max-width: 187px;
							max-height: 126px;
						}

						.info-wrap {
							.sub-info {
								display: inline-block;
								opacity: 1;
							}
						}
					}

					.pic-text-widget--horizontal:not(:last-child) {
						margin-bottom: 18px;
					}
				}

				.pic-wrap {
					width: 300px;
					flex: 0 0 300px;

					.photo-img {
						display: block;
						width: 100%;
						height: 180px;
						margin-bottom: 20px;
						cursor: pointer;
					}

					.photo-img:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}

	.news-block {
		.content {
			.inner-content {
				display: flex;

				.wrap:not(:last-child) {
					margin-right: 20px;
				}

				.banner-wrap {
					width: 650px;
					flex: 0 0 650px;

					.news-item-widget--show {
						position: relative;
						width: 650px;
						height: 320px;
						cursor: pointer;

						.photo-img {
							display: block;
							width: 100%;
							height: 100%;
						}

						.mask {
							position: absolute;
							right: 0;
							bottom: 0;
							left: 0;
							height: 55px;
							line-height: 55px;
							color: #fff;
							text-align: center;
							background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
							transition: all 0.3s;
							opacity: 0;

							.info {
								font-size: 20px;
							}
						}
					}

					.news-item-widget--show:hover {
						.mask {
							opacity: 1;
						}
					}
				}

				.meter-wrap {
					flex: 1;

					.pic-text-widget--horizontal {
						.photo-img {
							width: 200px;
							height: 150px;
						}
					}

					.pic-text-widget--horizontal:not(:last-child) {
						margin-bottom: 18px;
					}
				}
			}
		}
	}

	.join-block {
		.content {
			height: 200px;
			background: url('../assets/image/join.png') no-repeat center center;
			cursor: pointer;
		}
	}
}
</style>

