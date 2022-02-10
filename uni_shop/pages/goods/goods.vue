<template>
	<view class="u-wrap">
		<view class="u-search-box">
			<u-search placeholder="日照香炉生紫烟" v-model="keyword" @search="searchText" @clear="clearText"></u-search>
		</view>
		<view class="u-menu-wrap">
			<!-- 分类左 -->
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<block v-for="(title,index) in categories" :key="title.id">
					<view v-for="item in title.children" :key="item.id" class="u-tab-item" :class="[current==item.id ? 'u-tab-item-active' : '']"
					:data-current="item.id" @tap.stop="swichMenu(item.id)">
						<text class="u-line-1">{{item.name}}</text>
					</view>
				</block>
			</scroll-view>
			<!-- 右边 -->
			<block>
				<block>
					<scroll-view scroll-y class="right-box" @scrolltolower='scrollFooter'>
						<view class="page-view">
							<view class="class-item">
								<view class="item-title">
									<text></text>
								</view>
								<view  class="item-container" v-if="goodsList.length">
									<navigator class="thumb-box u-p-b-30 u-p-t-30 u-m-45" v-for="(goods, index1) in goodsList" :key="index1"  :url="'/pages/goods/show'+goods.id">
										<image class="item-menu-image" :src="goods.cover_url" mode=""></image>
										<view class="item-menu-name " style=" width: 250rpx; text-align: center;">{{goods.title}}</view>
									</navigator>   
								</view>
								<u-empty v-else mode="list" text="该分类暂无商品" icon="http://cdn.uviewui.com/uview/empty/car.png"> </u-empty>
							</view>
						</view>
					</scroll-view>
				</block>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				scrollTop: 0, //tab标题的滚动条位置
				current: 2, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
				classifyData:[],
				categories:[],
				keyword:'',//搜索值
				page:1,//分页
				lastDate:false
			}
		},
		computed: {
			
		},
		onLoad() {
			this.getGoodsList()
		},
		methods: {
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 获取数据
			async getGoodsList(){
				const params = {
					page:this.page,
					title:this.keyword,
					category_id:this.current
				}
				const res = await this.$u.api.goodsList(params)
				this.categories = res.categories
				this.goodsList = [...this.goodsList,...res.goods.data]
				this.lastDate = res.goods.next_page_url
				console.log(this.lastDate)
			},
			// 点击左边的栏目切换
			async swichMenu(id) {
				if(id == this.current) return ;
				this.current = id;
				this.page = 1
				this.getGoodsList()
				this.goodsList = []
			},

			// 搜索
			searchText(){
				this.page = 1
				this.getGoodsList()
			},
			// 清除
			clearText(){
				this.getGoodsList()
			},
			scrollFooter(){
				if(this.lastDate){
					this.page = this.page + 1
					this.getGoodsList()
					console.log(this.page)
				}
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
</style>
