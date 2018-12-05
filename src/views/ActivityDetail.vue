<template>

    <div class="view activityDetail-view">
        <div class="block bread-block">
            <div class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/merActivity' }">商家活动</el-breadcrumb-item>

                </el-breadcrumb>
            </div>
        </div>
        <div class="block">
            <div class="content">
                <img :src="image.image" v-for="image in imgList" :key="image.id" />
            </div>
        </div>
    </div>

</template>
<script>
import apiUtil from '../util/apiUtil.js';
export default {
    name: 'activityDetail',
    data() {
        return {
            imgList: []
        };
    },
    created() {
        this.activityId = this.$route.query.activityId;
        this.getActivityDetail();
    },
    methods: {
        getActivityDetail: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`v3_activity/detail?activity_id=${this.activityId}`, {});
            if (success && res.data) {
                const { list } = res.data;
                if (!Array.isArray(list) || list.length === 0) {
                    this.$message.error('无法查询到该活动的详细信息');
                } else {
                    this.imgList = list;
                }
            } else {
                this.$message.error(msg);
            }
        }
    }
};
</script>

<style lang="stylus">
.activityDetail-view {
    .block {
        .content {
            text-align: center;
        }
    }
}
</style>



