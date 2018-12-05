<template>
    <div class="comp header-comp" :class="{'header--fixed': headerFixed}">
        <div v-show="!title" class="top-bar bg--grey">
            <div class="content text--bold">
                <span class="wrap address-wrap">
                    <img src="../assets/image/location.png" alt="location" />
                    <span class="city">{{cityData.city_name}}</span>
                    <span class="switch text--green clickable" @click="onChangeCityClick">[切换]</span>
                </span>
                <span class="wrap user-wrap">
                    <span v-if="userInfo.uid" class="btn--action" @click="onMyClick">{{`欢迎您，${userInfo.nickname}`}}</span>
                    <span v-if="!userInfo.uid" class="btn--action login" @click="onLoginClick">登录</span>
                    <span v-if="!userInfo.uid" class="btn--action register" @click="onRegisterClick">注册</span>
                    <span v-if="userInfo.uid" class="btn--action" @click="onLogoutClick">注销</span>
                    <span class="btn--action download" @click="onDownloadAppClick"><a style="text-decoration:none;" href="https://sj.qq.com/myapp/detail.htm?apkName=com.dongfangmeiju.meijuapp">APP下载</a></span>
                    <span class="btn--action merchant" @click="onMerchantClick"><a style="text-decoration:none;" href="https://www.jiapin360.com/market_index/login">商家中心</a></span>
                    <span class="text--green">咨询热线：400-400-4000</span>
                </span>
            </div>
        </div>
        <div class="nav-bar">
            <div class="content">
                <img class="logo" alt="logo" src="../assets/image/logo.png" @click="onEscape" />
                <nav v-show="!title" class="nav">
                    <router-link to="/">首页</router-link>
                    <router-link to="/onlineMarket">网上市场</router-link>
                    <router-link to="/decorationSchool">装修学堂</router-link>
                    <router-link to="/recruit">招商入驻</router-link>
                </nav>
                <span v-show="!!title" class="title">{{title}}</span>
            </div>

        </div>
        <div class="global-mask" v-show="showMask">
            <div class="center-container">
                <v-userform formType="account"/>
                <span class="close-btn" @click="onCenConCancelClick"></span>
            </div>
        </div>
    </div>
</template>
<script>
import apiUtil from '../util/apiUtil.js';
import VUserForm from './UserForm';
export default {
    name: 'VHeader',
    components: {
        'v-userform': VUserForm
    },
    data() {
        return {
            headerFixed: false,
            title: '',
            showMask: false,
            formType: 1, //1-账号登录 2-快捷登录 3-注册
            hotCityList: [],
            allCityList: [],
            selectedCity: '',
            protocalAgree: false,
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
            }
        };
    },
    created() {
        this.getCityByIP();
        this.getCityList();
        return this.$store.dispatch('initFromLs', '');
    },
    computed: {
        cityData() {
            return this.$store.state.cityData;
        },
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    beforeMount() {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    },
    watch: {
        $route(to, from) {
            const path = to.path.substring(1);
            switch (path) {
                case 'register':
                    this.title = '欢迎注册';
                    break;
                case 'findPassword':
                    this.title = '找回密码';
                    break;
                default:
                    this.title = '';
            }
            this.showMask = false;
        }
    },
    methods: {
        onScroll: function() {
            if (!this.title) {
                const scrollY = window.scrollY;
                if (scrollY > 38) {
                    this.headerFixed = true;
                } else {
                    this.headerFixed = false;
                }
            }
        },
        onChangeCityClick: function() {
            this.$router.push('/city');
        },

        getCityByIP: async function() {
            const { success, msg, res } = await apiUtil.getJSON('v3_index/ipcity', {});
            if (success && res.data) {
                const { city_id, city, status, lng, lat } = res.data;
                if (!this.cityData.city_id) {
                    if (status === '0') {
                        this.$message.error('您所在的城市尚未开通，请选择其他城市');
                        this.$router.push('/city');
                    } else {
                        if (!city_id) {
                            this.$message.error('未能获取城市信息，请手动选择城市');
                            this.$router.push('/city');
                        } else {
                            let cityData = res.data;
                            cityData.id = cityData.city_id;
                            this.$store.dispatch('setCityData', cityData);
                        }
                    }
                }
            } else {
                this.$message.error(msg);
            }
        },

        getCityList: async function() {
            const { success, msg, res } = await apiUtil.getJSON('v3_index/getAllRegion', {});
            if (success && res.data) {
                const { hot_city, all_city } = res.data;
                this.hotCityList = hot_city;
                this.allCityList = all_city;
            } else {
                this.$message.error(msg);
            }
        },

        onEscape: function() {
            this.$router.push('/');
        },

        onMyClick: function() {
            this.$router.push('/my');
        },

        onLoginClick: function() {
            this.showMask = true;
        },

        onLogoutClick: function() {
            this.$confirm('您确定要注销吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(async () => {
                    const { success, msg, res } = await apiUtil.postJSON('user/logout', {});
                    if (success && res.data) {
                        this.$message.success('您已成功注销');
                        this.$store.dispatch('clearUserInfo', '');
                        this.$router.push('/');
                    } else {
                        this.$message.error(msg);
                    }
                })
                .catch(() => {});
        },

        onRegisterClick: function() {
            this.showMask = false;
            this.$router.push('/register');
        },

        onDownloadAppClick: function() {},

        onMerchantClick: function() {},

        onForgotPassClick: function() {
            this.showMask = false;

            this.$router.push('/findPassword');
        },

        onFormTypeChange: function(type) {
            this.formType = type;
        },

        submitForm: function() {},

        onCenConCancelClick: function() {
            this.showMask = false;
            this.formType = 1; //1-账号登录 2-快捷登录
            this.accountForm = {
                mobile: '',
                password: ''
            };
        }
    }
};
</script>
<style lang="stylus">
.header-comp {
    box-shadow: 0 4px 12px 3px rgba(0, 0, 0, 0.1);
    z-index: 9;

    .top-bar {
        .content {
            margin: 0 auto;
            width: 1180px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;

            .wrap {
                display: flex;
                align-items: center;
            }

            .address-wrap {
                position: relative;
                height: 100%;
                cursor: default;

                .city {
                    font-size: 16px;
                    margin: 0 5px;
                }

                .city-wrap {
                    position: absolute;
                    padding: 10px;
                    width: 400px;
                    left: 10px;
                    top: 30px;
                    background-color: #fff;
                    border-radius: 4px;
                    display: none;
                    z-index: 999;

                    .filter-widget .el-radio-button__inner {
                        font-size: 14px;
                    }
                }
            }

            .address-wrap:hover {
                .city-wrap {
                    display: block;
                }
            }

            .user-wrap {
                .btn--action {
                    margin-right: 20px;
                    cursor: pointer;
                }
            }
        }
    }

    .nav-bar {
        background-color: #fff;
        font-weight: bold;

        .content {
            margin: 0 auto;
            width: 1180px;
            height: 70px;
            display: flex;
            align-items: center;

            .logo {
                cursor: pointer;
                margin-right: 100px;
            }

            .nav {
                a {
                    margin-right: 100px;
                    color: #2c3e50;
                    font-size: 16px;
                    text-decoration: none;
                }

                a.router-link-exact-active {
                    font-weight: bold;
                    color: #3CB850;
                }
            }
        }
    }

 
}

.header-comp.header--fixed {
    position: fixed;
    top: -40px;
    right: 0;
    left: 0;
}
</style>


