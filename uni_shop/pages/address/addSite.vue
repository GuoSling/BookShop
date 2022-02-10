<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收货人</view>
				<input type="text" placeholder-class="line" v-model="info.name"  placeholder="请填写收货人姓名" />
			</view>
			<view class="item">
				<view class="left">手机号码</view>
				<input type="text" placeholder-class="line" v-model="info.phone" placeholder="请填写收货人手机号" />
			</view>
			<view class="item" @tap="showRegionPicker">
				<view class="left">所在地区</view>
				<input disabled type="text" placeholder-class="line"  :value='info.province + info.city +  info.county'  placeholder="请选择省市区" />
			</view>
			<view class="item address">
				<view class="left">详细地址</view>
				<textarea type="text" placeholder-class="line" v-model="info.address" placeholder="街道、楼牌等" />
			</view>
		</view>
		<view class="bottom">
			<view class="default">
				<view class="left">
					<view class="set">设置默认地址</view>
					<view class="tips">提醒：每次下单会默认推荐该地址</view>
				</view>
				<view class="right"><switch color="red" @change="setDefault"/></view>
			</view>
		</view>
		<u-button type="text" style="background-color: #EE0014; color: white;"  ripple size="default" @click='getInfo'>添加</u-button>
		<u-picker mode="region" ref="uPicker" v-model="show" @confirm='confirm'></u-picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			info:{
				name:'',//姓名
				phone:'',//手机
				address:'',//详细地址
				province:'',//省
				city:'',//市
				county:'',//区县
				is_default:'',//是否默认
			}
		};
	},
	onShow() {
		
	},
	onLoad() {
		const page =  getCurrentPages()
		console.log(page[0].route)
		console.log(page[1].route)
		console.log(page[2].route)
	},
	methods: {
		setDefault(event) {
			this.info.is_default = event.detail.value
			this.info.is_default == true ? this.info.is_default = 1 : this.info.is_default = '';
			console.log(this.info.is_default)
		},
		showRegionPicker() {
			this.show = true;
		},
		confirm(event){
			this.info.province =  event.province.label
			this.info.city =  event.city.label
			this.info.county =  event.area.label
		},
		async getInfo(){
			if(this.info.is_default == 1){
				await this.$u.api.address(this.info)
				this.$u.toast('添加成功')
				let addressList = await this.$u.api.addressList()
				addressList.data.forEach(address=>{
					address.is_default == 1 ?  uni.setStorageSync('addressId',address.id) : ''
				})
				setTimeout(()=>{
					uni.navigateBack({
					    delta: 1
					});
				},500)
			}
			if(this.info.is_default == ''){
				let params = {
					name:this.info.name,//姓名
					phone:this.info.phone,//手机
					address:this.info.address,//详细地址
					province:this.info.province,//省
					city:this.info.city,//市
					county:this.info.county,//区县
				}
				await this.$u.api.address(params)
				this.$u.toast('添加成功')
				setTimeout(()=>{
					uni.redirectTo({
						url:'/pages/address/index'
					})
				},500)
			}
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.wrap {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 22rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
			}
		}
		
		.address {
			padding: 20rpx 0;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 40rpx;
		padding-right: 0;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 160rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: solid 2rpx $u-border-color;
			line-height: 64rpx;
			.tips {
				font-size: 24rpx;
			}
			.right {
			}
		}
	}
}
</style>
