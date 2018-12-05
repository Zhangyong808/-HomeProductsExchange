<template>
    <div class="view wiki-view">

        <div class="block filter-block">
            <div class="content">
                <div class="filter-wrap">
                    <span class="info text--grey">类目</span>
                    <el-radio-group v-model="selectedCategory" class="filter-widget" @change="onCategoryChange">
                        <el-radio-button :key="item.id" v-for="item in categoryOptions" :label="item.id">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>

                <div class="filter-wrap">
                    <span class="info text--grey">分类</span>
                    <el-radio-group v-model="selectedType" class="filter-widget" @change="onTypeChange">
                        <el-radio-button :key="item.id" v-for="item in typeOptions" :label="item.id">{{item.text}}</el-radio-button>
                    </el-radio-group>
                </div>

            </div>

        </div>
        <div class="block list-block">
            <div class="content">
                <div class="inner-content wiki-list">
                    <div class="wiki-item-wrap">
                        <div class="pic-text-widget--horizontal" :key="item.id" v-for="item in wikiList" @click="onWikiItemClick(item.id)">
                            <img class="photo-img" :src="item.img" />
                            <div class="info-wrap">
                                <div class="info text--bold">{{item.title}}</div>
                                <div class="sub-info text--grey main-body">{{item.add_time}}</div>
                                <div class="sub-info text--grey meta-data">{{`浏览数：${item.view_total}`}}</div>
                            </div>
                        </div>
                    </div>
                    <el-pagination background layout="prev, pager, next" :current-page="page" :page-size="page_size" :total="total" @current-change="onPageChange">
                    </el-pagination>
                </div>
                <div class="inner-content recommend-wrap">
                    <v-recommend />
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import lsUtil from '../util/lsUtil.js';
import apiUtil from '../util/apiUtil.js';
import VRecommend from '../components/Recommend';
export default {
    name: 'wiki',
    components: {
        'v-recommend': VRecommend
    },
    data() {
        return {
            selectedCategory: 0,
            selectedType: 0,
            type: 1, //1-fitment 2-material
            bannerList: [],
            categoryOptions: [],
            typeOptions: [],
            page: 1,
            page_size: 12,
            total: 0,
            wikiList: []
        };
    },
    created() {
        this.type = this.$route.query.type;
        if (this.type == 2) {
            this.getMaterialCategorys();
            this.getMaterialLists();
        } else if((this.type == 1)){
            this.getFitmentCategory();
            this.getFitmentList();
        }
    },

    methods: {
        getFitmentCategory: async function() {
            const { success, msg, res } = await apiUtil.postJSON('wiki/category', {});
            if (success && res.data) {
                this.categoryOptions = [{ id: 0, text: '不限' }].concat(
                    res.data.map(ele => ({
                        id: ele.category_id,
                        text: ele.name,
                        types: ele.types
                    }))
                );
            } else {
                this.$message.error(msg);
            }
        },
        getMaterialCategorys: async function() {
            const { success, msg, res } = await apiUtil.postJSON('wiki/category', {});
            if (success && res.data) {
                this.categoryOptions = [{ id: 0, text: '不限' }].concat(
                    res.data.map(ele => ({
                        id: ele.category_id,
                        text: ele.name,
                        types: ele.types
                    }))
                );
            } else {
                this.$message.error(msg);
            }
        },
        getFitmentList: async function(page, categoryId, typeId) {
            page = page || this.page;
            const { success, msg, res } = await apiUtil.postJSON(`wiki/list?page=${page}&page_size=${this.page_size}&category_id=${categoryId}&type_id=${typeId}`, {});
            if (success && res.data) {
                const { list, banner_pc, total } = res.data;
                this.wikiList = list.map(ele => {
                    ele.id = ele.wiki_id;
                    return ele;
                });
                this.total = total;
                this.bannerList = banner_pc;
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },
        getMaterialLists: async function(page, categoryId, typeId) {
            page = page || this.page;
            const { success, msg, res } = await apiUtil.postJSON(`material/list?page=${page}&page_size=${this.page_size}&category_id=${categoryId}&type_id=${typeId}`, {});
            if (success && res.data) {
                const { list, banner_pc, total } = res.data;
                this.wikiList = list.map(ele => {
                    ele.id = ele.wiki_id;
                    return ele;
                });
                this.total = total;
                this.bannerList = banner_pc;
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },

        getMaterialCategory: async function() {
            const { success, msg, res } = await apiUtil.getJSON('material/category', {});
            if (success && res.data) {
                this.categoryOptions = res.data.map(ele => ({
                    id: ele.category_id,
                    text: ele.name,
                    types: ele.types
                }));
            } else {
                this.$message.error(msg);
            }
        },

        getMaterialList: async function(page, categoryId, typeId) {
            page = page || this.page;
            const { success, msg, res } = await apiUtil.getJSON(`material/list?page=${page}&page_size=${page_size}&category_id=${categoryId}&type_id=${typeId}`, {});
            if (success && res.data) {
                const { list } = res.data;
                this.wikiList = list.map(ele => {
                    ele.id = ele.material_id;
                    return ele;
                });
                this.page = page;
            } else {
                this.$message.error(msg);
            }
        },

        onCategoryChange: function(id) {
            const category = this.categoryOptions.find(ele => ele.id === id);
            if (id !== 0) {
                this.typeOptions = [{ id: 0, text: '不限' }].concat(
                    category.types.map(ele => ({
                        id: ele.type_id,
                        text: ele.name
                    }))
                );
            } else {
                this.typeOptions = [{ id: 0, text: '不限' }];
            }

            this.selectedType = 0;
            if (this.type === '2') {
                this.getMaterialList(1, this.selectedCategory, this.selectedType);
            } else {
                this.getFitmentList(1, this.selectedCategory, this.selectedType);
            }
        },

        onTypeChange: function(id) {
            if (this.type === '2') {
                this.getMaterialList(1, this.selectedCategory, id);
            } else {
                this.getFitmentList(1, this.selectedCategory, id);
            }
        },

        onPageChange: function(page) {
            if (this.type === '2') {
                this.getMaterialList(page, this.selectedCategory, this.selectedType);
            } else {
                this.getFitmentList(page, this.selectedCategory, this.selectedType);
            }
        },

        onWikiItemClick: function(id) {
            if (this.type === '2') {
                this.$router.push('wikiDetail?materialId=' + id);
            } else {
                this.$router.push('wikiDetail?wikiId=' + id);
            }
        }
    }
};
</script>
<style lang="stylus">
.wiki-view {
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
                width: 70px;
                flex: 0 0 70px;
                font-weight: bold;
            }
        }
    }

    .list-block {
        .content {
            display: flex;
            background-color: transparent;

            .inner-content {
                background-color: #fff;
            }

            .inner-content.wiki-list {
                margin-right: 20px;
                padding: 15px;
                flex: 1;
                text-align: center;

                .pic-text-widget--horizontal {
                    margin-bottom: 20px;

                    .sub-info {
                        font-size: 12px;
                        margin-top: 30px;
                    }
                }

                .pic-text-widget--horizontal:last-child {
                    margin-bottom: 60px;
                }

                .el-pagination {
                    text-align: center;
                    margin: 64px 0 160px;
                }
            }

            .inner-content.recommend-wrap {
                width: 360px;
                flex: 0 0 360px;
            }
        }
    }
}
</style>

