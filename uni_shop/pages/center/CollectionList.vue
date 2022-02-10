<template>
	<view>
		<view class="goods-box" v-for="item in CollectionList" :key='item.id'>
			<navigator class='goods-item' :url='`/pages/goods/show?id=${item.goods.id}`'>
				<u-image class="u-skeleton-rect" width="100%" height="300rpx" :src="item.goods.cover_url"></u-image>
				<!-- 商品名 -->
				<view class='title u-skeleton-rect'>{{item.goods.title}}</view>
				<!-- 价格及销量 -->
				<view class='u-flex u-row-between'>
					<view class="price u-skeleton-fillet">￥{{item.goods.price}}</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				CollectionList:[],
				pages:1,//分页
				meta:[],
			}
		},
		onLoad() {
		  this.getCollectionList();
		},
		methods: {
			async getCollectionList(params = {}){//获取收藏列表
					let paramsa ={
						page:this.pages
					}
					const res = await this.$u.api.goodCollectionList(paramsa);
					this.CollectionList =  [...this.CollectionList,...res.data]
					this.meta = res.meta.pagination
			},
		},
		onReachBottom(){
			if(this.pages >= this.meta.total_pages){
				
			}else{
				this.pages += 1;
				let params ={
					page:this.pages
				}
				this.getCollectionList(params);
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.goods-box{
		display: inline-block;
		margin-left: 10rpx;
		margin-top: 20rpx;
		.goods-item{
			width: 340rpx;
			height: 390rpx;
			padding-top: 25rpx;
			box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
			margin-bottom: 20rpx;
			padding-bottom: 10rpx;
			margin-left: 15rpx;
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
				display: block;
			}
		}
	}
	
</style>
