<template>
	<view class="u-skeleton">
		<!-- 轮播图 -->
		<u-swiper :list="slides" name="img_url" height="320"></u-swiper>
		<!-- tab选项卡 -->
		<view class="u-text-center u-m-20">
			<u-tabs :list="sortList" bar-width='100' item-width='150' :current="current" @change="changeSort"></u-tabs>
		</view>
		<!-- 商品布局 -->
		<view class="wrap">
			<u-row gutter="16">
				<u-col span="6" v-for="(goods,index) in goodsList.length !== 0 ? goodsList : 4" :key="index">
					<!-- 引入goods_cart组件 并传参-->
					<goods_cart :goods='goods'></goods_cart>
				</u-col>
			</u-row>
		</view>
		<!-- 骨架屏 -->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sortList: [{
						name: '默认'
					},
					{
						name: '销量'
					},
					{
						name: '推荐'
					},
					{
						name: '最新'
					}
				],
				current: 0, //tab选项下表
				slides:[],//轮播图
				goodsList:[],//商品
				page:1,//分页
				loading:true,//骨架屏
			}
		},
		onLoad() {
			this.getDate();
		},
		methods: {
			changeSort(event) {
				this.current = event
				// 切换tabs显示骨架屏
				this.loading = true
				// 让商品数组为空
				 this.goodsList = [];
				 // 重新调用方法
				 this.getDate();
				 this.page = 1;
			},
			// 请求首页数据
			async getDate(){
					this.loading = false//拿到数据隐藏骨架屏
					// res是服务器反馈过来的数据
					const params = {
						page:this.page,
					}
					// 判断选则的选项卡，
					if(this.current == 1) {
						params.sales = 1
					}
					// 这些if等同于上面的if
					if(this.current == 2) params.recommend = 1
					if(this.current == 3) params.new = 1
					const res = await this.$u.api.index(params)
					this.slides = res.slides
					// 合并两个数组
					this.goodsList = [...this.goodsList,...res.goods.data]
			}
		},
		// uniapp的触底触发该事件
		onReachBottom() {
			this.page = this.page + 1;
			this.getDate();
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
