<template>
	<view>
		<view class="u-flex user-box u-type-primary-light-bg0 u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10 avater-body">
				<oss-upload></oss-upload>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{vuex_user.name}}</view>
				<view class="u-font-14 u-tips-color">邮箱:{{vuex_user.email}}</view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="scan" color="#969799" size="28"></u-icon>
			</view>
			<view class="u-m-l-10 u-p-10">
				<u-icon name="arrow-right" color="#969799" size="28"></u-icon>
			</view>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="setting" title="个人信息" @click='toBaseinfo'></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="heart" title="所有订单" @click='toOrderList'></u-cell-item>
				<u-cell-item icon="star" title="我的收藏" @click='toCollectionList'></u-cell-item>
				<u-cell-item icon="map" title="地址管理" @click='toAddress'></u-cell-item>
			</u-cell-group>
		</view>
		
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="reload" title="退出登录" @click="LoginOut"></u-cell-item>
			</u-cell-group>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic:'https://uviewui.com/common/logo.png',
				show:true
			}
		},
		onLoad() {
			if(this.$u.utails.isLogin()){
				
			}else{
				return false //返回false一下代码将不会执行
			}
			
		},
		methods: {
			toBaseinfo(){//去个人信息页面
				this.$u.route({
					url:'pages/center/baseinfo'
				})
			},
			async LoginOut(){
				// 退出登录
				await this.$u.api.authLoginout()
				// 退出成功提示信息
				this.$u.toast('退出成功')
				// 关闭所有打开的页面并跳转首页
				setTimeout(()=>{
					this.$u.route({
						type:'reLaunch',//跳转类型
						url:'pages/index/index'
					})
					// 清除token及个人信息
					this.$u.vuex('vuex_token',null)
					this.$u.vuex('vuex_user',{})
				},1500)
				
			},
			toCollectionList(){
				uni.navigateTo({
					url:'/pages/center/CollectionList'
				})
			},
			toAddress(){
				uni.navigateTo({
					url:'/pages/address/index'
				})
			},
			toOrderList(){
				uni.navigateTo({
					url:'/pages/orders/orderList'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}
.avater-body{
	width: 70px;
	height: 70px;
}
</style>