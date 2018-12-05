<template>
	<div class="view merchant-view">
		<div class="block">
			<div class="content">
				<img src="../assets/image/merchant_bg.jpg" />
				<div class="info-wrap">
					<div class="info text--bold">欢迎加入家品汇</div>
					<el-form class="form" :model="joinForm" :rules="joinFormRules" ref="joinForm">
						<el-form-item prop="marketName">
							<el-input id="pla" v-model="joinForm.marketName" placeholder="商家名称"></el-input>
						</el-form-item>
						<el-form-item>
							<el-col :span="8">
								<el-select class="pro" v-model="joinForm.region" placeholder="省／市">

								</el-select>
							</el-col>
							<el-col :span="8">
								<el-select v-model="joinForm.region" placeholder="市／地区">

								</el-select>
							</el-col>
							<el-col :span="8">
								<el-select v-model="joinForm.region" placeholder="县／市">

								</el-select>
							</el-col>
						</el-form-item>

						<el-form-item prop="contact">
							<el-input v-model="joinForm.contact" placeholder="联系人"></el-input>
						</el-form-item>
						<el-form-item prop="phone">
							<el-input v-model="joinForm.phone" placeholder="联系电话"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm('joinForm')">立即加入</el-button>
						</el-form-item>
					</el-form>
					<div class="sub-info">或拨打 400-100-100</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import '../assets/js/jquery-3.2.1.min'
    import apiUtil from '../util/apiUtil.js';

    export default {
    name: 'merchant',
    data() {
        return {
            joinForm: {},
            joinFormRules: {},
			arr_pro:[]
        };
    },
    created() {
        this.getpro();
    },

    methods: {
        //获取省
        getpro(){
            let that = this
            $.ajax({
                type: "GET",
                url: "https://test.dfmeiju.com.cn/v3_user/city",
                dataType: "json",
                success: function(res){
                    //console.log(res.data[0].name);
                    for(let i=0;i<res.data.length;i++){
                        that.arr_pro.push(res.data[i].name);
//                        $(".pro").html(that.arr_pro[i] + "<br>");
					}

                    //console.log(that.arr_pro);
                },
                error: function(){

                }
            });
		},

        submitForm: async function (joinForm) {
//            const {id, lng, lat} = this.cityData;
//            const {success, msg, res} = await apiUtil.getJSON('v3_user/joinmarket', {
//                market_id: this.marketId,
//                type

//            });
            if (success) {
                //   this.shopActBannerList = [res.data];
            } else {
                this.$message.error(msg);
            }
        }
    },
	    mounted(){
		let recruitType = this.$route.query.recruitType;
        if(recruitType == 1){
            let pla = document.getElementById("pla").setAttribute("placeholder","市场名称");
		}else if(recruitType == 2){
            let pla = document.getElementById("pla").setAttribute("placeholder","商家名称");
		}

	    }
	};
</script>
<style lang="stylus">
.merchant-view {
	.block {
		.content {
		    img{width: 100%;}

			.info-wrap {
				text-align: center;
				padding: 70px 0;
				background-color: #979797;

				.info {
					font-size: 24px;
					color: #fff;
					margin-bottom: 60px;
				}

				.form {
					display: inline-block;
					width: 430px;

			
				}

				.sub-info {
					color: #fff;
				}
			}
		}
	}
}
</style>

