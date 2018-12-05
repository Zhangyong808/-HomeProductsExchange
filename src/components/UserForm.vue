<template>
    <div class="comp userForm-comp">
        <div class="img-wrap">
            <img src="../assets/image/form_bg.png" />
        </div>
        <div class="info-wrap">
            <div class="nav" v-show="currentForm!=='registerForm'">
                <span class="nav-item" :class="{selected: currentForm==='accountForm'}" @click="onCurrentFormChange('accountForm')">账号登录</span>
                <span class="nav-item" :class="{selected: currentForm==='fastForm'}" @click="onCurrentFormChange('fastForm')">快捷登录</span>
            </div>
            <div class="title text--bold" v-show="currentForm==='registerForm'">注册</div>
            <el-form class="form" :model="accountForm" :rules="accountFormRules" ref="accountForm" v-show="currentForm==='accountForm'">
                <el-form-item prop="mobile">
                    <el-input v-model="accountForm.mobile" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="accountForm.password" type="password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="protocalAgree">我已阅读并同意<span class="text--green">《家品汇用户服务协议》</span></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('accountForm')" :disabled="!protocalAgree">登录</el-button>
                </el-form-item>
            </el-form>
            <el-form class="form" :model="fastForm" :rules="fastFormRules" ref="fastForm" v-show="currentForm==='fastForm'">
                <el-form-item prop="mobile">
                    <el-input v-model="fastForm.mobile" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                    <el-input v-model="fastForm.password" placeholder="验证码">
                        <template slot="append"><img class="input-attached-ele clickable" :src="captchaImg" alt="captcha" @click="getCaptcha" /></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="fastForm.code" placeholder="验证码">
                        <template slot="append"><span class="input-attached-ele text--green">获取验证码</span></template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="protocalAgree">我已阅读并同意<span class="text--green">《家品汇用户服务协议》</span></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('fastForm')" :disabled="!protocalAgree">登录</el-button>
                </el-form-item>
            </el-form>
            <el-form class="form" :model="registerForm" :rules="registerFormRules" ref="registerForm" v-show="currentForm==='registerForm'">
                <el-form-item prop="mobile">
                    <el-input v-model="registerForm.mobile" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="captcha">
                    <el-input v-model="registerForm.captcha" placeholder="验证码">
                        <template slot="append"><img class="input-attached-ele clickable" :src="captchaImg" alt="captcha" @click="getCaptcha" /></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="registerForm.code" placeholder="验证码">
                        <template slot="append"><span class="input-attached-ele text--green clickable" @click="getCode('reg')">{{countingDown !== 0 ? `重新获取（${countingDown}秒）`:'获取验证码'}}</span></template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="registerForm.password" type="password" placeholder="密码6～12位数字，字母，字符组合"></el-input>
                </el-form-item>
                <el-form-item prop="confirm">
                    <el-input v-model="registerForm.confirm" type="password" placeholder="请再次输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="protocalAgree">我已阅读并同意<span class="text--green">《家品汇用户服务协议》</span></el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('registerForm')" :disabled="!protocalAgree">注册</el-button>
                </el-form-item>
            </el-form>
            <div class="sub-btn-wrap" v-show="currentForm!=='registerForm'">
                <span class="sub-btn text--grey" @click="onRegisterClick">免费注册</span>
                <span class="sub-btn text--grey" @click="onForgotPassClick">忘记密码</span>
            </div>
            <div class="sub-btn-wrap" v-show="currentForm==='registerForm'">
                <span class="sub-btn text--grey" @click="onToLoginClick">去登录</span>
            </div>
            <div class="third-btn-wrap" v-show="currentForm!=='registerForm'">
                <span class="sub-title">第三方登录</span>

                <div class="third-btn-sub-wrap">

                    <span class="third-btn">
                        <img src="../assets/image/qq.png" />
                    </span>
                    <span class="third-btn">
                        <img src="../assets/image/wechat.png" />
                    </span>
                    <span class="third-btn">
                        <img src="../assets/image/weibo.png" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiUtil from '../util/apiUtil.js';
import config from '../config';
export default {
    name: 'userForm',
    props: {
        formType: {
            default: function() {
                return 'register';
            }
        }
    },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                const regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
                if (!regExp.test(this[this.currentForm].password)) {
                    callback(new Error('密码6～12位数字，字母，字符组合'));
                } else {
                    callback();
                }
            }
        };
        const validateConfirm = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this[this.currentForm].password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            host: '',
            captchaImg: '',
            countingDown: 0,
            currentForm: 'registerForm', //1-账号登录 2-快捷登录 3-注册
            accountForm: {
                mobile: '',
                password: ''
            },
            accountFormRules: {
                mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            fastForm: {
                mobile: '',
                captcha: '',
                code: ''
            },
            fastFormRules: {
                mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }],
                captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
            registerForm: {
                mobile: '',
                captcha: '',
                code: '',
                password: '',
                confirm: ''
            },
            registerFormRules: {
                mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' }],
                captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
                password: [{ validator: validatePass, trigger: 'blur' }],
                confirm: [{ validator: validateConfirm, trigger: 'blur' }]
            },
            protocalAgree: false
        };
    },
    created() {
        const { api } = config;
        const host = !!api.port ? `${api.host}:${api.port}/` : `${api.host}/`;
        this.host = host;
        const formType = this.formType;
        if (formType === 'fast') {
            this.currentForm = 'fastForm';
        } else if (formType === 'account') {
            this.currentForm = 'accountForm';
        } else {
            this.currentForm = 'registerForm';
        }
        this.getCaptcha();
    },
    methods: {
        getCaptcha: function() {
            this.captchaImg = `${this.host}/captcha?t=${Math.random()}`;
        },

        getCode: async function(type) {
            const { success, msg, res } = await apiUtil.postJSON(`user/getpcMobileCode?code=${this[this.currentForm].captcha}&mobile=${this[this.currentForm].mobile}&type=${type}`, {
                // code: `${this[this.currentForm].captcha}`,
                // mobile: `${this[this.currentForm].mobile}`,
                // type
            });
            if (success) {
                this.countingDown = 60;
                const timer = setInterval(() => {
                    this.countingDown--;
                    if (this.countingDown === 0) {
                        clearInterval(timer);
                    }
                }, 1000);
            } else {
                this.$message.error(msg);
            }
        },

        onRegisterClick: function() {
            if (this.$route.path === '/register') {
                this.currentForm = 'registerForm';
            } else {
                this.$router.push('/register')
            }
        },
        onForgotPassClick: function() {
            this.$router.push('/findPassword');
        },

        onCurrentFormChange: function(form) {
            this.currentForm = form;
        },

        onToLoginClick: function() {
            this.currentForm = 'accountForm';
        },

        submitForm: function() {
            this.$refs[this.currentForm].validate(valid => {
                if (valid) {
                    if (this.currentForm === 'accountForm') {
                        this.submitAccountForm();
                    } else if (this.currentForm === 'fastForm') {
                    } else if (this.currentForm === 'registerForm') {
                        this.submitRegisterForm();
                    } else return;
                } else {
                    return false;
                }
            });
        },

        submitRegisterForm: async function() {
            const { mobile, password, code } = this.registerForm;
            const { success, msg, res } = await apiUtil.postJSON(`user/register?mobile=${mobile}&password=${password}&code=${code}`, {});
            if (success) {
                this.$router.push('/');
            } else {
                this.$message.error(msg);
            }
        },

        submitAccountForm: async function() {
            const { mobile, password } = this.accountForm;
            const { success, msg, res } = await apiUtil.postJSON(`user/login`, {
                username: mobile,
                password
            });
            if (success && res.data) {
                this.$store.dispatch('setUserInfo', res.data);
                this.$router.push('/');
                if (this.$route.path === '/') {
                    window.location.reload();
                }
            } else {
                this.$message.error(msg);
            }
        },

        submitFastForm: async function() {
            const { mobile, code } = this.accountForm;
            const { success, msg, res } = await apiUtil.postJSON(`user/mobileCodeLogin?mobile=${mobile}&code=${code}`, {});
            if (success && res.data) {
                this.$store.dispatch('setUserInfo', res.data);
                this.$router.push('/');
                if (this.$route.path === '/') {
                    window.location.reload();
                }
            } else {
                this.$message.error(msg);
            }
        },

        onLoginClick: function() {}
    }
};
</script>
<style lang="stylus">
.userForm-comp {
    width: 100%;
    height: 100%;
    display: flex;
}
</style>


