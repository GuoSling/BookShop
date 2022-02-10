<template>
	<view>
		<!-- 商品 -->
		<view class="goods-box">
			<view class="goods-item" v-for="(item,index) in goodsList" :key='item.id'>
				<view class="left-bufen">
					<radio @click="changeCheckedItem(index)" :checked="item.is_checked"></radio>
					<image :src="item.goods.cover_url"></image>
				</view>
				<view class="right-bufen">
					<view class="name">{{item.goods.title}}</view>
					<view class="type">类型:{{item.goods.description}}</view>
					<view class="pirce">￥{{item.goods.price}}</view>
					<button @click="deleteCount(index,item.id)">-</button>
					<input type="text" v-model="item.num" :maxlength="2" class="count"/>
					<button @click="addCount(index,item.id)">+</button>
					<text @click="removeGoods(item.goods.title,item.id)">删除</text>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="footer" v-show="goodsList.length > 0">
			<view class="selectAll">
				<radio @click="changeChecked" :checked="isChecked"></radio>
				<view><text>全选</text></view>
			</view>
			<view class="toSettle">
				<text>合计￥{{sumPrice.toFixed(2)}}</text>
				<button @click="toOrders">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isChecked:'',//全选
				goodsList:[],//购物车列表
				arrid:[],//购物车所有商品的id
			}
		},
		async onLoad() {
			if(this.$u.utails.isLogin()){
				const params = {
					include:'goods',
				}
				let res = await this.$u.api.cartsList(params)//获取购物车列表数据
				this.goodsList = res.data
				// 让等于购物车的商品的is_checked为1的变为true
				this.goodsList.forEach(e=>{
					e.is_checked == 1 ? e.is_checked = true : e.is_checked = false
				})
				// 判断是否全选
				let selectCount = 0;
				this.goodsList.forEach(e=>{
					if(e.is_checked == true){
						selectCount += 1;
						console.log(this.goodsList.length)
						if(selectCount == this.goodsList.length){
							this.isChecked = true
						}else{
							this.isChecked = false
						}
					}
				})
				
				this.getSelectAll();//获取购物车中所有商品选中的id
				console.log(this.arrid)
				let cartsids = {
					cart_ids:this.arrid
				}
				 this.selectGoods()
			}
		},
		async onShow() {
			const params = {
				include:'goods',
			}
			let res = await this.$u.api.cartsList(params)//获取购物车列表数据
			this.goodsList = res.data
			// 让等于购物车的商品的is_checked为1的变为true
			this.goodsList.forEach(e=>{
				e.is_checked == 1 ? e.is_checked = true : e.is_checked = false
			})
		},
		computed:{
			sumPrice(){//选中的价格
				let price = 0;
				this.goodsList.forEach((e,value)=>{
					if(e.is_checked == 1){
						price = price +  e.num * e.goods.price
					}
				})
				return price
			},
		},
		methods: {
			getSelectAll(){// 获取全选的id
				this.goodsList.forEach(e=>{
					if(e.is_checked == true){
						this.arrid.push(e.id)
					}
				})
			
			},
			changeChecked(e){//全选
				this.isChecked = !this.isChecked
				this.goodsList.forEach(e=>{
					e.is_checked = this.isChecked
				})
				
				// 获取选中的id
				const aGoodsId = [];
				 // this.goodsList[index].is_checked == true ? aGoodsId.push(this.goodsList[index].id) : ''
				 this.goodsList.forEach(e=>{
					 e.is_checked == true ? aGoodsId.push(e.id) : ''
				 })
				 this.arrid = aGoodsId
				console.log(this.arrid)
				// 调用商品选中接口
				this.selectGoods()
			},
			// 判断是否全选
			changeCheckedItem(index){
				if(this.goodsList[index].is_checked == 1){
					this.goodsList[index].is_checked = 0
					// 单挑商品取消选中
					// 获取选中的id
					const aGoodsId = [];
					 // this.goodsList[index].is_checked == true ? aGoodsId.push(this.goodsList[index].id) : ''
					 this.goodsList.forEach(e=>{
						 e.is_checked == true ? aGoodsId.push(e.id) : ''
					 })
					 this.arrid = aGoodsId
					 console.log(this.arrid)
					 
					 // 调用商品选中接口
					 this.selectGoods()
					 
					console.log(this.goodsList[index].is_checked)
					
				}else{
					this.goodsList[index].is_checked = 1
					// 单条商品选中
					const aGoodsId = [];
					 // this.goodsList[index].is_checked == true ? aGoodsId.push(this.goodsList[index].id) : ''
					 this.goodsList.forEach(e=>{
						 e.is_checked == true ? aGoodsId.push(e.id) : ''
					 })
					 this.arrid = aGoodsId
					 console.log(this.arrid)
					 // 调用商品选中接口
					 this.selectGoods()
					console.log(this.goodsList[index].is_checked)
				}
				this.goodsList.forEach(e=>{
					e.is_checked == 1 ? e.is_checked = true : e.is_checked = false
				})
				
				let selectCount = 0;
				for(var i = 0;i < this.goodsList.length; i++){
					if(this.goodsList[i].is_checked == true){
						selectCount += 1;
						selectCount == this.goodsList.length ? this.isChecked = true : this.isChecked = false
					}
				}
			},
			// 加
			addCount(index,id){
				// this.dataList[index].count >= 1  && this.dataList[index].count <= 98 ? this.dataList[index].count ++ : ''
				const  params = {
					num:1
				}
				this.$u.api.cartsSumChange(id,params)
			},
			// 减
			deleteCount(index,id){
				// this.dataList[index].count <= 1 ? '' :	this.dataList[index].count --
				const  params = {
					num:1
				}
				this.$u.api.cartsSumChange(id,params)
			},
			// 拿到选中的商品
			// toMay(){
			// 	this.dataList.forEach(e=>{
			// 		if(e.isChecked == true){
			// 			console.log(e)
			// 		}else{
			// 			return false
			// 		}
			// 	})
			// },
			async removeGoods(titles,id){
				uni.showModal({
					title:`确定要将${titles}删除吗?`,
					success:(res)=>{
						if(res.confirm){//用户点击了确认按钮
							this.remob(id)
						}
					}
				})
				
			},
			async remob(id){
				await this.$u.api.cartsDelete(id)
				const params = {
					include:'goods',
				}
				let res = await this.$u.api.cartsList(params)
				this.goodsList = res.data
				this.goodsList.forEach(e=>{
					e.is_checked == 1 ? e.is_checked = true : e.is_checked = false
				})
				this.$u.toast("已删除")
			},
			// 商品选中
			selectGoods(){
				let cartsids = {
					cart_ids:this.arrid
				}
				// 商品是否选中
				  this.$u.api.cartsGoodsSelect(cartsids)
			},
			// 去商品预览
			toOrders(){
				uni.navigateTo({
					url:'/pages/orders/orders'
				})
			}
		}
			
	}
</script>
<style scoped lang="scss">
	// 商品样式
	.goods-box{
		margin-bottom: 110rpx;
		.goods-item{
			height: 200rpx;
			margin: 0rpx 0rpx 10rpx 0rpx;
			background-color: #FAFAFF;
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
				text{
					margin-left: 20rpx;
					color: red;
				}
			}
		}
	}
	// 底部样式
	.footer{
		position: fixed;
		bottom: 100rpx;
		width: 100%;
		height: 100rpx;
		background-color: #eee;
		z-index: 9999;
		// 全选
		.selectAll{
			display: inline-block;
			margin-top: 25rpx;
			float: left;
			clear: both;
			margin-right: 250rpx;
			margin-left: 30rpx;
			radio{
				display: inline-block;
			}
			view{
				display: inline-block;
			}
		}
		.toSettle{//去结算
			display: inline-block;
			margin-top: 10rpx;
			position: relative;
			button{
				position: absolute;
				height: 60rpx;
				right: -170rpx;
				width: 150rpx;
				display: inline-block;
				background-color: #F4304F;
				font-size: 24rpx;
				color: white;
			}
			text{
				float: right;
				margin-top: 20rpx;
				float: left;
				clear: both;
			}
		}
	}
</style>