<template>
	<view>
		<!-- 地址 -->
		<view class="address">
			<view class="items" v-if="address.length > 0" @click="toAddressList">
				<view class="top">
					<view class="name">{{address[0].name}}</view>
					<view class="phone">{{address[0].phone}}</view>
					<view class="tag">
					</view>
				</view>
				<view class="bottom">
					{{address[0].province}}-{{address[0].city}}-{{address[0].county}} {{address[0].address}}
				</view>
			</view>
			
			<view class="items" v-else>
				<navigator url="../address/index" class="top" style="height: 100rpx;">
					<u-cell-item icon="map" title="请添加默认收货地址"></u-cell-item>
					<view class="tag">
					</view>
				</navigator>
			</view>
		</view>
		<!-- 商品 -->
		<view class="goods-box">
			<view class="goods-item" v-for="(item,index) in goodsList" :key='item.id'>
				<view class="left-bufen">
					<image :src="item.goods.cover_url"></image>
				</view>
				<view class="right-bufen">
					<view class="name">{{item.goods.title}}</view>
					<view class="pirce">￥{{item.goods.price}}</view>
					<view style="margin-left: 470rpx;">
						<text>X</text>
						<text>{{item.num}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="navigation">
			<view class="left">
				<view class="item">
					<text style="font-weight: 700;font-size: 35rpx; ">合计:</text>
					<text style="color:#E04C5C ;font-size: 35rpx; font-weight: 600;"  class="text u-line-1">￥{{priceCount.toFixed(2)}}</text>
				</view>
			</view>
			<view class="right">
				<u-button class="cart btn" :ripple="true" type="primary">确认订单并支付</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:[],
				address:[],
			}
		},
		 async onLoad() {
			await this.getOrder();
			 this.getAddressDefault();
		},
		async onShow() {
			await this.getOrder();
			this.getAddressDefault();
		},
		methods: {
			// 获取默认地址
			getAddressDefault(){
				const  addressId = uni.getStorageSync('addressId')
				this.address =  this.address.filter(address=>{
					return address.id == addressId
				})
			},
			// 获取订单数据及默认地址
			async getOrder(){
				const res = await this.$u.api.orders()
					 this.goodsList = res.carts
					 this.address = res.address
			},
			toAddressList(){
				uni.navigateTo({
					url:'/pages/address/index'
				})
			}
		},
		computed:{
			priceCount(){
				let price = 0;
				this.goodsList.forEach(goods=>{
					price += goods.num * goods.goods.price
				})
				return price
			}
		}
	}
</script>

<style lang="scss" scoped>
// 商品样式
	.goods-box{
		padding-bottom: 100rpx;
		padding-top: 130rpx;
		.goods-item{
			height: 200rpx;
			margin: 0rpx 0rpx 10rpx 0rpx;
			background-color: #FAFAFA;
			.left-bufen{
				margin-top: 20rpx;
				display: inline-block;
				radio{
					margin-left: 30rpx;
					margin-top: 50rpx;
					float: left;
					clear: both;
				}
				image{
					display: inline-block;
					width: 150rpx;
					height: 150rpx;
					margin-left: 50rpx;
				}
			}
			.right-bufen{
				display: inline-block;
				.name{
					margin-left: 15rpx;
					margin-bottom: 20rpx;
					width: 400rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.pirce{
					display: inline-block;
					margin-right: 100rpx;
					margin-left: 10rpx;
					float: left;
					clear: both;
					color: #E6002A;
				}
				.type{
					margin-left: 20rpx;
					margin-bottom: 10rpx;
					font-size: 14rpx;
					color: #C0C4CC;
				}
				.count{
					display: inline-block;
					width: 40rpx;
				}
				button{
					display: inline-block;
					font-size: 20rpx;
					height: 40rpx;
					width: 60rpx;
					margin: 5rpx;
				}
				text:{
					margin-left: 500rpx;
					color: red;
				}
			}
		}
	}
	// 底部样式
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		position: fixed;
		bottom: 20rpx;
		margin-left: 300rpx;
		view:nth-child(1){
			margin-right: 100rpx;
		}
		view:nth-child(2){
			height: 100rpx;
			background-color: aqua;
		}
	}
	.navigation {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 120rpx;
		display: flex;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 0;
		justify-content: space-between;
	
		.left {
			flex: 3;
			display: flex;
			font-size: 30rpx;
			justify-content: space-around;
	
			.item {
				margin-top: 20rpx;
				position: relative;
				text-align: center;
				margin-left: 60rpx;
			}
		}
	
		.right {
			flex: 3;
			display: flex;
			font-size: 28rpx;
			justify-content: flex-end;
			align-items: center;
			.btn {
				text-align: center;
				line-height: 66rpx;
				width: 90%;
				border-radius: 10rpx;
				color: #ffffff;
			}
	
			.cart {
				background-color:#E90028;
				margin-right: 30rpx;
				border-radius: 34rpx;
			}
	
			.buy {
				background-color: #ff7900;
			}
		}
	}
	.items {
		position: fixed;
		z-index: 99999;
		background-color: #F8F9F9;
		width: 100%;
		padding: 5rpx 20rpx;
		border-bottom: 1rpx solid #DEE1E6;
		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;
			.phone {
				margin-left: 60rpx;
			}
			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;
				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color:rgb(49, 145, 253);
				}
				.red{
					background-color:red
				}
			}
		}
		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
		}
	}
</style>
