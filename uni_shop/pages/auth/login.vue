<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录悦读商城</view>
			<input class="u-border-bottom" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">忘记密码</view>
				<view class="issue">
					<navigator url="register">
						注册
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				email: '',
				password: ''
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				// this.$u.email是uview内的方法来判断该内容是否是邮箱
				if (this.$u.test.email(this.email) && this.password) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			async submit() {
				if (!this.$u.test.email(this.email) || !this.password) return
				const params = {
					email: this.email,
					password: this.password
				}
				// 声明变量接收登录成功服务器返回的数据
				const loginRes = await this.$u.api.authLogin(params)
				console.log(loginRes)
				// 登录成功存储token
				this.$u.vuex('vuex_token', loginRes.access_token)
				// 请求用户信息
				const userInfo = await this.$u.api.userInfo();
				// 登录成功存储用户信息
				this.$u.vuex('vuex_user', userInfo)
				// 获取本地存储
				const backUrl = uni.getStorageSync('back_url') || 'pages/index/index'
				this.$u.toast('登入成功')
				// 登入成功跳转来源页
				setTimeout(() => {
					this.$u.route({
						type: 'reLaunch',
						url: backUrl,
					})
				}, 1500)
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	.u-border-bottom {
		height: 60rpx;
		margin-bottom: 30rpx !important;
	}

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
				margin-bottom: 10rpx;
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
