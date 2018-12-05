<template>
    <div class="view photoList-view">
        <div class="block bread-block">
            <div class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/photo' }">装修美图</el-breadcrumb-item>
                    <span v-if="categoryId==1">
                        <el-breadcrumb-item>家居美图</el-breadcrumb-item>
                    </span>
                    <span v-if="categoryId==2">
                        <el-breadcrumb-item>家居图册</el-breadcrumb-item>
                    </span>
                    <span v-if="categoryId==3">
                        <el-breadcrumb-item>精品专题</el-breadcrumb-item>
                    </span>
                </el-breadcrumb>
            </div>
        </div>

        <div class="block filter-block">
            <div class="content">
                <div class="filter-wrap" v-for="filter in filterList" :key="filter.tag_id">
                    <span class="info text--grey">{{filter.name}}</span>
                    <el-radio-group v-model="selectedFilter[filter.ename]" class="filter-widget" @change="value => onFilterChange(value, filter.ename)">
                        <el-radio-button :label="tag.id" v-for="tag in filter.list" :key="tag.id">{{tag.name}}</el-radio-button>
                    </el-radio-group>
                </div>

                <!-- <div class="filter-wrap">
                    <span class="info text--grey">空间</span>
                    <el-radio-group v-model="space" class="filter-widget">
                        <el-radio-button label="0">不限</el-radio-button>
                        <el-radio-button label="1">已加盟</el-radio-button>
                        <el-radio-button label="2">未加盟</el-radio-button>
                    </el-radio-group>
                </div>

                <div class="filter-wrap">
                    <span class="info text--grey">布局</span>
                    <el-radio-group v-model="place" class="filter-widget">
                        <el-radio-button label="0">不限</el-radio-button>
                        <el-radio-button label="1">已加盟</el-radio-button>
                        <el-radio-button label="2">未加盟</el-radio-button>
                    </el-radio-group>
                </div> -->

            </div>

        </div>
        <div class="block list-block">
            <div class="content">
                <div v-if="categoryId === '1'" class="photo-item-wrap waterfall">
                    <div class="item-widget photo-item-widget" :key="item.picture_id" v-for="(item) in photoList" @click="onPhotoItemClick(item.picture_id, 1)">
                        <img class="photo-img" :src="item.cover" />
                    </div>
                </div>
                <div v-else-if="categoryId === '2'" class="photo-item-wrap waterfall">
                    <div class="item-widget album-item-widget" :key="item.picture_id" v-for="(item) in photoList" @click="onPhotoItemClick(item.picture_id, 2)">
                        <img class="photo-img" :src="item.cover" />
                        <div class="info">{{item.title}}</div>
                    </div>
                </div>
                <div v-else-if="categoryId === '3'" class="photo-item-wrap">
                    <div class="item-widget boutique-item-widget" :class="{'boutique-item-widget--last': index % 3 === 2}" :key="item.picture_id" v-for="(item,index) in photoList" @click="onPhotoItemClick(item.picture_id, 3)">
                        <img class="photo-img" :src="item.cover" />
                        <div class="mask">
                            <span class="detail">{{item.detail}}</span>
                        </div>
                        <div class="info text--bold">{{item.title}}</div>
                    </div>
                </div>
                <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="page_size" :total="total" @current-change="onPageChange">
                </el-pagination>
            </div>

        </div>
    </div>
</template>
<script>
import apiUtil from '../util/apiUtil.js';
import VBanner from '../components/Banner.vue';
export default {
    name: 'photoList',
    data() {
        return {
            categoryId: 0,
            selectedFilter: {},
            filterList: [],

            photoList: [],
            page: 1,
            page_size: 18,
            total: 0
        };
    },
    created() {
        this.categoryId = this.$route.query.category;
        const filterName = this.$route.query.filterName;
        const filterValue = this.$route.query.filterValue;
        if (filterName) {
            this.$set(this.selectedFilter, filterName, filterValue);
        }
        this.getFilterList();
        this.getPhotoList();
    },
    methods: {
        getFilterList: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`picture/category`, {});
            if (success && res.data) {
                const category = res.data.find(ele => ele.category_id == this.categoryId);
                if (category) {
                    this.filterList = category.tags;
                    for (const tag of category.tags) {
                        const filterName = this.$route.query.filterName;
                        const filterValue = this.$route.query.filterValue;
                        if (tag.ename === filterName) {
                            //如果从photo页面带着查询条件进入到的本页面，这里需要将对应过滤器的值按照查询条件设好
                            this.$set(this.selectedFilter, tag.ename, filterValue);
                        } else {
                            this.$set(this.selectedFilter, tag.ename, 0);
                        }
                    }
                }
            } else {
                this.$message.error(msg);
            }
        },

        getPhotoList: async function(page) {
            page = page || this.page;
            let queryStr = '';
            for (let prop in this.selectedFilter) {
                if (this.selectedFilter.hasOwnProperty(prop)) {
                    queryStr += `${prop}=${this.selectedFilter[prop]}&`;
                }
            }
            const { success, msg, res } = await apiUtil.postJSON(`picture/list?${queryStr}page=${page}&page_size=${this.page_size}&category_id=${this.categoryId}`, {});
            if (success) {
                const { list, total } = res.data;
                this.photoList = list;
                this.page = page;
                this.total = total;
            } else {
                this.$message.error(msg);
            }
        },
        onPhotoItemClick: function(photoId, categoryId) {
            if (categoryId == 1 || categoryId == 2) {
                this.$router.push(`photoDetail?categoryId=${categoryId}&photoId=${photoId}`);
            } else if (categoryId == 3) {
                this.$router.push(`boutiqueDetail?boutiqueId=${photoId}`);
            } else return;
        },

        onFilterChange: function(value, filterName) {
            this.getPhotoList(1);
        },

        onPageChange: function(page) {
            this.getPhotoList(page);
        }
    }
};
</script>
<style lang="stylus">
.photoList-view {
    .filter-block {
        .content {
            box-sizing: border-box;
            margin: 20px auto 30px;
            border: 1px solid rgba(241, 241, 241, 1);
            padding: 20px 15px;

            .filter-wrap {
                display: flex;
                align-items: center;
            }

            .filter-wrap:not(:last-child) {
                margin-bottom: 20px;
            }

            .info {
                display: inline-block;
                text-align: left;
                width: 80px;
                flex: 0 0 80px;
                font-weight: bold;
            }
        }
    }

    .list-block {
        .content {
            text-align: center;

            .waterfall {
                -webkit-column-count: 3;
                -webkit-column-gap: 10px;
                -webkit-column-fill: auto;
                -moz-column-count: 3;
                -moz-column-gap: 10px;
                -moz-column-fill: auto;
                column-count: 4;
                column-gap: 10px;
                column-fill: auto;

                .photo-item-widget, .album-item-widget {
                    width: auto;
                    height: auto;
                    padding: 5px;
                    margin-bottom: 5px;
                    -webkit-column-break-inside: avoid;
                    -moz-column-break-inside: avoid;
                    column-break-inside: avoid;
                }

                .album-item-widget {
                    .photo-img {
                        height: auto;
                    }
                }
            }

            .boutique-item-widget {
                margin-right: 37px;
                margin-bottom: 20px;

                .photo-img {
                }

                .info {
                    font-size: 20px;
                }
            }

            .boutique-item-widget--last {
                margin-right: 0;
            }
        }
    }
}
</style>