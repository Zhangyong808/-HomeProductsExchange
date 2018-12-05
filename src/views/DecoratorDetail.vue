<template>
    <div class="view decoratorDetail-view">
        <div class="block bread-block">
            <div class="content">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: `/companyDetail?companyId=${this.companyId}` }">装修公司详情</el-breadcrumb-item>
                    <el-breadcrumb-item>设计师</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="block header-block">
            <div class="content" :style="{'background': `url(${bannerImg}) no-repeat center/100%`}">
                <img class="avatar-img" :src="decoratorInfo.avatar" />
                <div class="info">{{decoratorInfo.name}}</div>
                <div class="sub-info">
                    <span>{{marks}}</span>
                </div>
                <div class="info-wrap">
                    <div class="info-wrap__sub-info">
                        <span>浏览量</span>
                        <span>{{decoratorInfo.view_total}}</span>
                    </div>
                    <div class="info-wrap__sub-info">
                        <span>关注</span>
                        <span>{{decoratorInfo.fav_total}}</span>
                    </div>
                    <div class="info-wrap__sub-info">
                        <span>成交</span>
                        <span>{{decoratorInfo.deal_total}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="block info-block">
            <div class="content">
                <div class="title">
                    <span>
                        <span class="info">设计师信息</span>
                    </span>
                </div>
                <div class="inner-content">
                    <div class="info">{{decoratorInfo.info}}</div>
                    <div class="sub-info-container">
                        <div class="sub-info-wrap sub-info-wrap--left">
                            <div class="sub-info">
                                <span class="text--grey">从业年限</span>
                                <span>{{`${decoratorInfo.year}年`}}</span>
                            </div>
                            <div class="sub-info">
                                <span class="text--grey">所属公司</span>
                                <span>{{decoratorInfo.company_name}}</span>
                            </div>
                        </div>
                        <div class="sub-info-wrap sub-info-wrap--right">
                            <div class="sub-info">
                                <span class="text--grey">所属市场</span>
                                <span>{{decoratorInfo.market_name}}</span>
                            </div>
                            <div class="sub-info">
                                <span class="text--grey">擅长风格</span>
                                <span>{{styles}}</span>
                            </div>
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
                    <div class="item-widget case-item-widget" :class="{'case-item-widget--last': index % 3 === 2}" :key="item.case_id" v-for="(item, index) in caseList" @click="onCaseItemClick(item.case_id, decoratorInfo.decorator_id)">
                        <img class="photo-img" :src="item.image" />
                        <div class="info-wrap">
                            <div class="info">{{item.title}}</div>
                            <div class="sub-info text--grey">{{item.sub_title}}</div>
                        </div>
                        <div class="mask">
                            <span class="detail">{{item.detail_title}}</span>
                            <span class="avatar-wrap">
                                <img class="avatar-img" :src="decoratorInfo.avatar" />
                                <span class="info">{{decoratorInfo.name}}</span>
                            </span>
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
    name: 'decoratorDetail',
    data() {
        return {
            companyId: 0,
            decoratorId: 0,
            bannerImg: '',
            decoratorInfo: {},
            marks: '',
            styles: '',
            caseList: []
        };
    },
    created() {
        this.decoratorId = this.$route.query.decoratorId;
        this.companyId = this.$route.query.companyId;
        this.getDecoratorDetail();
    },
    methods: {
        getDecoratorDetail: async function() {
            const { success, msg, res } = await apiUtil.postJSON(`decorator/info?decorator_id=${this.decoratorId}`, {});
            if (success) {
                const { decorator_info, banner_pc, decorator_case } = res.data;
                if (decorator_info) {
                    this.decoratorInfo = decorator_info;
                    this.marks = decorator_info.designer_mark_data.map(ele => ele.name).join('|');
                    this.styles = decorator_info.style_data.map(ele => ele.name).join(',');
                    this.caseList = decorator_case.list;
                }
                this.bannerImg = banner_pc.image;
            } else {
                this.$message.error(msg);
            }
        },

        onCaseItemClick: function(caseId, decoratorId) {
            this.$router.push(`/caseDetail?caseId=${caseId}&decoratorId=${decoratorId}`);
        }
    }
};
</script>

<style lang="stylus">
.decoratorDetail-view {
    .block {
        margin-bottom: 20px;

        .content {
            background-color: transparent;
        }
    }

    .header-block {
        .content {
            background-color: rgba(0, 0, 0, 0.2);
            text-align: center;
            color: #fff;
            font-weight: bold;
            padding: 25px;

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

    .info-block {
        .content {
            .inner-content {
                padding: 20px 30px;

                .info {
                    font-size: 18px;
                    line-height: 25px;
                    margin-bottom: 15px;
                }

                .sub-info-container {
                    display: flex;

                    .sub-info-wrap {
                        flex: 1;
                        margin-right: 100px;

                        .sub-info {
                            display: flex;
                            padding: 15px 0;
                            align-items: center;
                            justify-content: space-between;
                            border-bottom: 1px solid #f2f2f2;
                        }
                    }
                }
            }
        }
    }

    .case-block {
        .content {
            .case-item-widget {
                margin-right: 30px;
                margin-bottom: 20px;
            }

            .case-item-widget--last {
                margin-right: 0;
            }
        }
    }
}
</style>

