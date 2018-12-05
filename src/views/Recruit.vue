<template>
    <div class="view recruit-view">
        <div class="center-container">
            <div class="img-wrap">
                <img src="../assets/image/form_bg.png" />
            </div>
            <div class="info-wrap">
                <div class="title text--green text--bold">家品汇招募中心</div>
                <div class="nav">
                    <span class="nav-item" :class="{selected: recruitType===1}" @click="onRecruitTypeChange(1)">市场招募</span>
                    <span class="nav-item" :class="{selected: recruitType===2}" @click="onRecruitTypeChange(2)">商家招募</span>
                </div>
                <div class="body-wrap">
                    <img :src="recruitType === 1 ? merchantImg : brandImg" @click="onContactClick"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiUtil from '../util/apiUtil.js';
export default {
    name: 'recruit',
    data() {
        return {
            protocalAgree: false,
            recruitType: 1, //1-市场招募 2-商家招募
            brandImg: '',
            merchantImg: '',
        };
    },
    created(){
        this.getImage();
    },
    methods: {
        getImage: async function(){
            const { success, msg, res } = await apiUtil.getJSON('v3_index/plan', {});
            if (success && res.data) {
                this.merchantImg = res.data[0].image;
                this.brandImg = res.data[1].image
            } else {
                this.$message.error(msg);
            }
        },

        onRecruitTypeChange: function(type) {
            this.recruitType = type;
        },

        onContactClick: function() {
            this.$router.push('merchant?recruitType=' + this.recruitType);
        }
    }
};
</script>
<style lang="stylus">
.recruit-view {
    display: flex;
    justify-content: center;
    align-items: center;

    .center-container {
        margin: 110px 0 90px;

        .body-wrap {
            box-sizing: border-box;
            width: 308px;
            height: 342px;
            box-shadow: 0px 4px 12px 0px rgba(60, 184, 80, 0.1);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                cursor: pointer;
            }
        }
    }
}
</style>

