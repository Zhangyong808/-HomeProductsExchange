<template>
    <div class="view my-view">
        <div class="block">
            <div class="content">
                <div class="inner-content menu">
                    <div class="title">个人中心</div>
                    <div class="menu-title text--green text--bold">账号设置</div>
                    <div class="menu-item clickable" :class="{'active':page===1}" @click="onMenuItemClick(1)">个人信息</div>
                    <div class="menu-item clickable" :class="{'active':page===2}" @click="onMenuItemClick(2)">修改密码</div>
                    <div class="menu-item clickable" :class="{'active':page===3}" @click="onMenuItemClick(3)">账号绑定</div>
                </div>
                <div class="inner-content page-wrap">

                    <div class="page page1" v-if="page===1">
                        <div class="title">个人信息</div>
                        <div class="page-inner-wrap">
                            <el-form class="form" :model="userForm" :rules="userFormRules" ref="userForm" label-width="110px">
                                <el-form-item label-width="40px">
                                    <el-upload action="" :show-file-list="false" :before-upload="beforeAvatarUpload" :http-request="onAvatarUpload">
                                        <img class="avatar clickable" :src="userForm.avatar" />
                                    </el-upload>
                                </el-form-item>
                                <el-form-item label="用户名：">
                                    <span>{{userInfo.mobile}}</span>
                                </el-form-item>
                                <el-form-item prop="nickname" label="昵  称：">
                                    <el-input v-model="userForm.nickname" placeholder="请输入2-20字符昵称" />
                                </el-form-item>
                                <el-form-item prop="sex" label="性  别：">
                                    <el-radio-group v-model="userForm.sex">
                                        <el-radio label="0">保密</el-radio>
                                        <el-radio label="1">男</el-radio>
                                        <el-radio label="2">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item prop="city" label="地  点：">
                                    <el-col :span="11">
                                        <el-form-item prop="province_id">
                                            <el-select v-model="userForm.province_id" placeholder="选择省" @change="onProvinceChange">
                                                <el-option :label="item.name" :value="item.id" v-for="item in provList" :key="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col class="line invisible" :span="2">{{'-'}}</el-col>
                                    <el-col :span="11">
                                        <el-form-item prop="city_id">
                                            <el-select v-model="userForm.city_id" placeholder="选择市县">
                                                <el-option :label="item.name" :value="item.id" v-for="item in cityList" :key="item.id"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="page page2" v-if="page===2">
                        <div class="title">修改密码</div>
                        <div class="page-inner-wrap">
                            <el-form class="form" :model="passwordForm" :rules="passwordFormRules" ref="passwordForm" label-width="50px">

                                <el-form-item prop="oldPass">
                                    <el-input v-model="passwordForm.oldPass" placeholder="原始密码"></el-input>
                                </el-form-item>
                                <el-form-item prop="password">
                                    <el-input v-model="passwordForm.password" placeholder="密码6～12位数字，字母，字符组合"></el-input>
                                </el-form-item>
                                <el-form-item prop="confirm">
                                    <el-input v-model="passwordForm.confirm" placeholder="确认密码"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm">保存</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="page page3" v-if="page===3">
                        <div class="title">账号绑定</div>
                        <div class="page-inner-wrap">
                            <img class="icon-img" />
                            <span class="info">手机号</span>
                            <span class="info">{{this.userInfo.mobile}}</span>
                            <el-button @click="onChangeClick" type="primary">更改</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="global-mask" v-show="showMask">
            <div class="center-container">
                <div class="step-wrap">
                    <span class="step-item" :class="{selected: step===1}">1. 原手机号验证</span>
                    <span class="step-item" :class="{selected: step===2}">2. 绑定手机号</span>
                    <span class="step-item" :class="{selected: step===3}">3. 完成</span>
                </div>
                <div class="info-wrap">
                    <div class="text--bold title" v-if="step === 1">原手机号验证</div>
                    <div class="text--bold title" v-if="step === 2">更换手机号</div>
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
                            <div class="info text--bold">{{`修改绑定手机号成功，${tMinus}s后自动跳转到首页`}}</div>
                            <div class="sub-info text--grey">如果您的浏览器没有跳转，请<span class="text--green" @click="onEscapeClick">点击此链接</span></div>
                        </div>
                    </div>
                </div>
                <span class="close-btn" @click="onCenConCancelClick"></span>

            </div>
        </div>
    </div>
</template>

<script>
import apiUtil from '../util/apiUtil.js';
import config from '../config';

export default {
    name: 'my',
    data() {
        return {
            host: '',
            page: 1, //1-个人信息 2-修改密码 3-账号绑定,
            provList: [],
            cityList: [],
            userForm: {
                avatar: '',
                nickname: '',
                sex: '0',
                province_id: '',
                city_id: ''
            },
            userFormRules: {},
            passwordForm: {
                oldPass: '',
                password: '',
                confirm: ''
            },
            passwordFormRules: {},
            captchaImg: '',
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
            tMinus: 3,
            showMask: false
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    created() {
        this.getProvices();
        const { api } = config;
        const host = !!api.port ? `${api.host}:${api.port}/` : `${api.host}/`;
        this.host = host;
    },
    mounted() {
        if (this.userInfo.uid) {
            const { avatar, nickname, province_id, city_id, sex } = this.userInfo;
            this.userForm = {
                avatar,
                nickname,
                sex: sex + '',
                province_id: province_id + '',
                city_id: city_id + ''
            };
        }
    },
    methods: {
        getProvices: async function() {
            const { success, msg, res } = await apiUtil.getJSON(`v3_user/city`, {});
            if (success) {
                this.provList = res.data;
            } else {
                this.$message.error(msg);
            }
        },

        onProvinceChange: function(province_id) {
            this.getCities(province_id);
        },

        getCities: async function(pid) {
            const { success, msg, res } = await apiUtil.getJSON(`v3_user/citychild`, {
                pid
            });
            if (success) {
                this.cityList = res.data;
            } else {
                this.$message.error(msg);
            }
        },

        onMenuItemClick: function(page) {
            this.page = page;
            if (page === 2) {
                this.getCaptcha();
            }
        },

        getCaptcha: function() {
            this.captchaImg = '';
            this.captchaImg = `${this.host}/captcha?t=${Math.random()}`;
        },

        beforeAvatarUpload: function(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isSmall = file.size / 1024 / 1024 < 1.5;

            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是JPG或PNG格式');
            }
            if (!isSmall) {
                this.$message.error('上传头像图片大小不能超过1.5MB!');
            }
            return (isJPG || isPNG) && isSmall;
        },

        onAvatarUpload: function(file) {
            const reader = new FileReader();
            if (file && file.file) {
                reader.readAsDataURL(file.file);
                reader.onload = () => {
                    const result = reader.result;
                    const index = result.indexOf('base64,');
                    this.submitAvatar(result.substring(index + 7));
                };
                reader.onerror = error => {
                    this.$message.error(error);
                };
            }
        },

        submitAvatar: async function(image) {
            const { success, msg, res } = await apiUtil.postJSON(`upload/base64`, {
                image
            });
            if (success && res.data) {
                this.userForm.avatar = res.data.image;
            } else {
                this.$message.error(msg);
            }
        },

        submitForm: function() {
            if (this.page === 1) {
                this.submitUserInfo();
            } else if (this.page === 2) {
                this.submitChangePass();
            }
        },

        submitUserInfo: async function() {
            const { nickname, province_id, city_id, sex, avatar } = this.userForm;
            let params = {
                province_id,
                city_id,
                sex,
                avatar,
                ticket: this.userInfo.ticket
            };
            if(nickname !== this.userInfo.nickname){
                params.nickname = nickname;
            }
            const { success, msg, res } = await apiUtil.postJSON(`user/setting`, params);
            if (success) {
                this.$message.success('保存成功');
                this.$store.dispatch('setUserInfo', Object.assign({}, this.userInfo, this.userForm));
            } else {
                this.$message.error(msg);
            }
        },

        submitChangePass: async function() {
            const { oldPass, password } = this.passwordForm;
            const { success, msg, res } = await apiUtil.postJSON(`user/changePassword`, {
                old_password: oldPass,
                new_password: password,
                ticket: this.userInfo.ticket
            });
            if (success) {
                this.$message.success('密码已修改，请重新登录');
                this.$store.dispatch('clearUserInfo', '');
                this.$router.push('/register?formType=account');
            } else {
                this.$message.error(msg);
            }
        },
        onChangeClick: function() {
            this.showMask = true;
        },

        onCenConCancelClick: function() {
            this.showMask = false;
        }
    }
};
</script>

<style lang="stylus">
.my-view {
    .block {
        .content {
            display: flex;
            background-color: transparent;

            .inner-content {
                background-color: #fff;
            }

            .inner-content.menu {
                width: 232px;
                height: 255px;
                flex: 0 0 232px;
                margin-right: 15px;
                box-sizing: border-box;

                .title {
                    margin: 0 20px;
                    padding: 20px 0;
                    border-bottom: 1px solid #f2f2f2;
                }

                .menu-title {
                    margin: 20px 0 10px 15px;
                }

                .menu-item {
                    font-size: 14px;
                    margin: 25px 0;
                    padding-left: 10px;
                    border-left: 6px solid transparent;
                }

                .menu-item.active {
                    border-left-color: #3CB850;
                }
            }

            .inner-content.page-wrap {
                flex: 1;
                min-height: 580px;
                margin-bottom: 200px;

                .title {
                    padding: 15px 50px;
                    border-bottom: 1px solid #f2f2f2;
                }

                .page {
                    .form {
                        width: 422px;

                        .el-form-item {
                            margin-bottom: 16px;

                            .el-form-item__label {
                                font-weight: bold;
                            }
                        }
                    }
                }

                .page1 {
                    .avatar {
                        display: block;
                        width: 100px;
                        height: 100px;
                        border-radius: 50px;
                    }
                }

                .page3 {
                    .page-inner-wrap {
                        display: flex;
                        align-items: center;
                        padding-left: 75px;

                        .icon-img {
                            display: inline-block;
                            width: 50px;
                            height: 50px;
                            margin-right: 15px;
                        }

                        .info {
                            margin-right: 95px;
                        }
                    }
                }
            }
        }
    }

    .global-mask {
        .center-container {
            padding: 50px;
            flex-direction: column;
            align-items: center;
            box-shadow: 0px 4px 12px 4px rgba(0, 0, 0, 0.1);

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
}
</style>


