<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎注册</view>
			<input class="u-border-bottom" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" v-model="name" placeholder="请输入昵称" />
			<input class="u-border-bottom" type="password" v-model="onePassword" placeholder="请输入密码" />
			<input class="u-border-bottom" type="password" v-model="towPassword" placeholder="请确认密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
			<view class="alternative">
				<!-- <view class="password">注册</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email:'',
				name:'',
				onePassword:'',
				towPassword:''
			}
		},
		computed:{
			inputStyle() {
				let style = {};
				// this.$u.email是uview内的方法来判断该内容是否是邮箱
				if (this.$u.test.email(this.email) && this.name) {
					if(this.onePassword === this.towPassword){
						style.color = "#fff";
						style.backgroundColor = this.$u.color['warning'];
					}else{
							this.$u.toast('两次密码不一致')
					}
					
				}
				return style;
			}
		},
		methods: {
				async submit(){
					if(this.$u.test.email(this.email) && this.onePassword === this.towPassword && this.name){
						const params = {
							name:this.name,
							email:this.email,
							password:this.onePassword,
							password_confirmation:this.towPassword
						}
						const res = await this.$u.api.authRegister(params)
						console.log(res)
						
					}else{
						
						
					}
			}
		}
	}
</script>

<style scoped lang="scss">
	.wrap {
		font-size: 28rpx;
	
	.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 30rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
