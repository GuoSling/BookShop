<template>
	<view class="wrap u-rela">
		<template>

			<!-- 商品信息展示 -->
			<view class="goods-show ">
				<!-- 图片展示 -->
				<view class="u-text-center">
					<image mode="heightFix" :src="goodsInfo.cover_url"></image>
				</view>
				<view class="u-p-20">
					<!-- 商品基本信息 -->
					<view class="base-info ">
						<text class="title u-font-40">{{goodsInfo.title}}</text>
						<view class="u-flex u-row-between u-m-t-20 u-m-b-20">
							<text class="price u-font-32">￥{{goodsInfo.price}}</text>
							<text class="small">库存:{{goodsInfo.sales}}</text>
							<text class="small">销量:{{goodsInfo.collects_count}}</text>
						</view>
					</view>
					<!-- tabs组件 -->
					<u-tabs :list="tabsList" :is-scroll="false" :current="curren" @change="tabsChange"></u-tabs>
					<view class="u-p-b-80">
						<!-- 商品详情区 -->
						<view v-if="curren==0" class="">
							<u-parse :html="goodsInfo.details"></u-parse>
						</view>
						<!-- 商品评论区 -->
						<template v-if="curren==1">
							<template v-if="goodsInfo.comments.length">
								<view class="comment" v-for="(res, index) in commentList" :key="index">
									<view class="left">
										<image :src="res.user.avatar_url" mode="aspectFill"></image>
									</view>
									<view class="right">
										<view class="top">
											<view class="name">{{ res.user.name }}</view>
											<view class="like" :class="{ highlight: res.isLike }">
												<view class="num">{{ res.star }}</view>
												<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a">
												</u-icon>
											</view>
										</view>
										<view class="content">{{ res.content }}</view>
										<view class="reply-box">
											<view class="text">{{ res.reply }}</view>
										</view>
										<view class="bottom">
											{{ res.created_at }}
										</view>
									</view>
								</view>
							</template>
							<template v-else>
								<u-empty mode="message" text="该商品暂无评论" icon="http://cdn.uviewui.com/uview/empty/car.png"></u-empty>
							</template>
						</template>
						<!-- 商品推荐区 -->
						<template v-if="curren==2">
							<u-row gutter="16">
								<u-col span="6" v-for="(goods,index) in goodsList" :key="index">
									<goods_cart :goods="goods"></goods_cart>
								</u-col>
							</u-row>
						</template>
					</view>
				</view>
			</view>
			<!-- 提交订单栏 -->
			<view class="navigation">
				<view class="left">
					<view class="item" @click="Collect">
						<u-icon v-if="isCollect" name="heart-fill" :size="40" color="#ff007f"></u-icon>
						<u-icon v-else name="heart" :size="40" color="red"></u-icon>
						<view class="text u-line-1">{{isCollect ?"已收藏":"收藏"}}</view>
					</view>
					<view class="item" @click="toCart">
						<u-badge bgColor="#2979ff" :count='cartCount' :is-center="true"></u-badge>
						<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">购物车</view>
					</view>
				</view>
				<view class="right">
					<u-button @click="cartsAdd" class="cart btn" :ripple="true" type="primary">加入购物车</u-button>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsInfo: [], //商品的信息
				goodsList: [], // 推荐商品
				tabsList: [{
					name: '商品详情'
				}, {
					name: '商品评论',
					count: 0
				}, {
					name: '推荐商品'
				}],
				curren: 0,
				commentList: [], //商品的评论
				goodsId: null, //商品的id
				isCollect: 0, //是否收藏
				cartCount: null, //购物车数量

			}
		},
		onLoad(option) {
			this.goodsId = option.id
			// 获取商品基本信息
			this.getBaseInfo()
			// 请求购物车数量
			this.cartCountLength()
		},
		methods: {
			// 获取商品信息接口
			async getBaseInfo() {
				const res = await this.$u.api.goodsinfo(this.goodsId)
				this.goodsInfo = res.goods //商品信息
				this.commentList = res.goods.comments //商品评论
				this.goodsList = res.like_goods //推荐商品
				this.tabsList[1].count = res.goods.comments.length
				this.isCollect = res.goods.is_collect
			},
			// 切换tabs
			tabsChange(index) {
				this.curren = index
			},
			// 收藏节流
			collect() {
				this.$u.throttle(this.collectNot, 1500)
			},
			async Collect() { //收藏和取消收藏
				if (this.$u.utails.isLogin()) {
					await this.$u.api.goodCollection(this.goodsId)
					if (this.isCollect == 1) {
						this.isCollect = 0
					} else {
						this.isCollect = 1
					}
					this.$u.toast(this.isCollect ? '收藏成功' : '取消成功')
				}
			},
			// 添加购物车
			async cartsAdd() {
				if (this.$u.utails.isLogin()) {
					const params = {
						goods_id: this.goodsId,
					}
					const res = await this.$u.api.cartsAdd(params)
					this.cartCountLength()
				}
			},
			//购物车数量
			async cartCountLength() {
				const res = await this.$u.api.cartsList()
				this.cartCount = res.data.length; //购物车数量
			},
			toCart() {
				if(this.$u.utails.isLogin()){
					this.$u.route({
						type: 'switchTab',
						url: 'pages/cart/cart'
					})
				}
			},
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		height: 90vh;

		.loading {
			text-align: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.goods-show {
			.base-info {

				.title,
				.price {
					font-weight: bolder;
				}

				.price {
					color: rgb(209, 45, 58);
				}
			}

			.comment {
				display: flex;
				padding: 30rpx;

				.left {
					image {
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						background-color: #f2f2f2;
					}
				}

				.right {
					flex: 1;
					padding-left: 20rpx;
					font-size: 30rpx;

					.top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 10rpx;

						.name {
							color: #5677fc;
						}

						.like {
							display: flex;
							align-items: center;
							color: #9a9a9a;
							font-size: 26rpx;

							.num {
								margin-right: 4rpx;
								color: #9a9a9a;
							}
						}

						.highlight {
							color: #5677fc;

							.num {
								color: #5677fc;
							}
						}
					}

					.content {
						margin-bottom: 10rpx;
					}

					.reply-box {
						background-color: rgb(242, 242, 242);
						border-radius: 12rpx;
						text-indent: 1em;

						.item {
							padding: 20rpx;
							border-bottom: solid 2rpx $u-border-color;

							.username {
								font-size: 24rpx;
								color: #999999;
							}
						}

						.all-reply {
							padding: 20rpx;
							display: flex;
							color: #5677fc;
							align-items: center;

							.more {
								margin-left: 6rpx;
							}
						}
					}

					.bottom {
						margin-top: 20rpx;
						display: flex;
						font-size: 24rpx;
						color: #9a9a9a;

						.reply {
							color: #5677fc;
							margin-left: 10rpx;
						}
					}
				}
			}
		}

		// min-height: 100vh;
		.navigation {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			border: solid 2rpx #f2f2f2;
			background-color: #ffffff;
			padding: 16rpx 0;
			justify-content: space-between;

			.left {
				flex: 3;
				display: flex;
				font-size: 20rpx;
				justify-content: space-around;

				.item {
					position: relative;
					text-align: center;
				}
			}

			.right {
				flex: 9;
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
					background-color: #2979ff;
					margin-right: 30rpx;
				}

				.buy {
					background-color: #ff7900;
				}
			}
		}
	}
</style>
