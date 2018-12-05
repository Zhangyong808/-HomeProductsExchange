<template>
    <div class="view findPassword-view">
        <div class="center-container ">
            <div class="step-wrap">
                <span class="step-item" :class="{selected: step===1}">1. 填写手机号</span>
                <span class="step-item" :class="{selected: step===2}">2. 设置新密码</span>
                <span class="step-item" :class="{selected: step===3}">3. 设置成功</span>
            </div>
            <div class="info-wrap">
                <div class="text--bold title" v-if="step === 1">注册</div>
                <el-form class="form" v-if="step===1" :model="step1Form" :rules="step1FormRules" ref="step1Form">
                    <el-form-item prop="mobile">
                        <el-input v-model="step1Form.mobile" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(1)">下一步</el-button>
                    </el-form-item>
                </el-form>
                <el-form class="form" v-else-if="step===2" :model="step2Form" :rules="step2FormRules" ref="step2Form">
                    <el-form-item prop="captcha">
                        <el-input v-model="step2Form.captcha" placeholder="验证码">
                            <template slot="append"><img class="input-attached-ele" src="" alt="captcha" /></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input v-model="step2Form.code" placeholder="验证码">
                            <template slot="append"><span class="input-attached-ele text--green">获取验证码</span></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="step2Form.password" placeholder="密码6～12位数字，字母，字符组合"></el-input>
                    </el-form-item>
                    <el-form-item prop="confirm">
                        <el-input v-model="step2Form.confirm" placeholder="请再次输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(2)">提交</el-button>
                    </el-form-item>
                </el-form>
                <div class="pic-text-item--horizontal" v-else-if="step===3">
                    <img class="photo-img" src="" />
                    <div class="info-wrap">
                        <div class="info text--bold">{{`修改密码成功，${tMinus}s后自动跳转到首页`}}</div>
                        <div class="sub-info text--grey">如果您的浏览器没有跳转，请<span class="text--green" @click="onEscapeClick">点击此链接</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'findPassword',
    data() {
        return {
            step: 1,
            step1Form: {
                mobile: ''
            },
            step1FormRules: {
                mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }]
            },
            step2Form: {
                captcha: '',
                code: '',
                password: '',
                confirm: ''
            },
            step2FormRules: {
                captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                confirm: [{ required: true, message: '请再次输入密码', trigger: 'blur' }]
            },
            tMinus: 3
        };
    },
    methods: {
        submitForm: function(step) {
            if (step === 1) {
                this.step = 2;
            } else if (step === 2) {
                // submit
                this.step = 3;
            } else return;
        },

        onTMinusBegin: function(){

        },

        onEscapeClick: function(){
            this.$router.push('/')
        }
    }
};
</script>
<style lang="stylus">
.findPassword-view {
    display: flex;
    justify-content: center;

    .center-container {
        padding: 50px;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.1);
        margin: 110px 0 90px;

        .step-wrap {
            width: 100%;
            height: 32px;
            display: flex;
            align-items: center;
            overflow: hidden;

            .step-item {
                position: relative;
                height: 100%;
                line-height: 32px;
                flex: 1;
                background-color: #999999;
                font-size: 16px;
                color: #fff;
                text-align: center;
            }

            .step-item:not(:last-child)::after {
                position: absolute;
                content: '';
                width: 25px;
                height: 25px;
                box-sizing: border-box;
                border: 2px solid #fff;
                border-left-color: transparent;
                border-bottom-color: transparent;
                right: -11px;
                top: 4px;
                z-index: 1;
                transform: rotate(45deg);
                background-color: inherit;
            }

            .step-item.selected {
                background-color: #3CB850;
            }
        }

        .form-wrap {
            padding: 0;
            width: 325px;
        }
    }
}
</style>

