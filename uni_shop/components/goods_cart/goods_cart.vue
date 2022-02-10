<template>
	<navigator class='goods-item' :url='`/pages/goods/show?id=${goods.id}`'>
		<u-image class="u-skeleton-rect" width="100%" height="300rpx" :src="goods.cover_url"></u-image>
		<!-- 商品名 -->
		<view class='title u-skeleton-rect'>{{goods.title}}</view>
		<!-- 价格及销量 -->
		<view class='u-flex u-row-between'>
			<view class="price u-skeleton-fillet">￥{{goods.price}}</view>
			<view class="sales u-skeleton-fillet">销量:{{goods.collects_count}}</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		// 接收传递过来的的数据
		props:['goods'],
		methods: {
			
		},
		mounted() {
		}
	}
</script>

<style lang="scss">
	.goods-item{
		padding-top: 25rpx;
		box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
		margin-bottom: 20rpx;
		padding-bottom: 10rpx;
		.title{
			margin: 10rpx 0rpx;
			font-weight: 500;
			margin-left: 25rpx;
		}
		.price{
			margin-left: 25rpx;
			font-size: 27rpx;
			color: #ff2b0f;
		}
		.sales{
			margin-right: 25rpx;
			font-size: 27rpx;
			color: #888;
		}
	}
</style>
