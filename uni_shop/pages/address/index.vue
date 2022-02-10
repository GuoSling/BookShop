<template>
	<view>
		<!-- 从个人中心进入 -->
		<view v-if="pages == 'pages/center/index'" style="padding-bottom: 100rpx;">
			<u-swipe-action class="item"
			:index="index" v-for="(item, index) in addressList" 
			:show="item.show"
			:key="item.id" @click.self="click" @open="open" :options="options">
				<view class="top">
					<view class="name">{{ item.name }}</view>
					<view class="phone">{{ item.phone }}</view>
					<view class="tag">
						<text v-if="item.is_default == 1">{{tag.tagText}}默认</text>
					</view>
				</view>
				<view class="bottom">
					{{item.province}} {{item.city}} {{item.county}} {{item.address}}
					<u-icon style="margin-right: 20rpx;" @click="addressDetails(index)" name="edit-pen" :size="40" color="#999999"></u-icon>
				</view>
			</u-swipe-action>
		</view>
		<!-- 从订单列表进入 -->
		<view v-if="pages == 'pages/cart/cart'" style="padding-bottom: 100rpx;">
			<u-swipe-action class="item" :index="index" v-for="(item, index) in addressList" :show="item.show" :key="item.id" >
				<view @click="addressDetails2(index)" :class="[active == index ? 'active' : '']">
					<view class="top">
						<view class="name">{{ item.name }}</view>
						<view class="phone">{{ item.phone }}</view>
						<view class="tag">
							<text v-if="item.is_default == 1">{{tag.tagText}}默认</text>
						</view>
					</view>
					<view class="bottom">
						{{item.province}} {{item.city}} {{item.county}} {{item.address}}
							<view @click.stop="addressDetails(index)" >
								<u-icon  style="margin-right: 20rpx;"  name="edit-pen" :size="40" color="#999999"></u-icon>
							</view>
					</view>
				
				</view>
			</u-swipe-action>
		</view>
		<view style="background-color: #000000;">
			<view class="addSite" @tap="toAddSite">
				<view class="add">
					<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收货地址
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			disabled: false,
			btnWidth: 180,
			pages:'',//上个页面的地址
			show: false,
			options: [
				{
					text: '默认',
					style: {
						backgroundColor: '#007aff',
					}
				},
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			],
			addressList:[],//地址列表
			tag: [
				{
					tagText: ''
				}
			],
			active:0,
		};
	},
	onLoad() {
		this.getAddress();
		this.addressList.forEach((address,index)=>{
			if(address.is_default == 1){
				this.active = index
			}
		})
	},
	async onShow() {
		const page =  getCurrentPages().shift()
		this.pages = page.route
		await this.getAddress()
		this.addressList.forEach((address,index)=>{
			if(address.is_default == 1){
				this.active = index
			}
		})
		console.log(this.addressList)
	},
	methods: {
		async getAddress(){
			let res =  await this.$u.api.addressList();
			res.data.forEach(address=>{
				address.show = false
			})
			this.addressList = res.data
		},
		toAddSite(){
			uni.navigateTo({
			    url: '/pages/address/addSite'
			});
		},
		async click(index, index1) {
			if(index1 == 1) {
				await this.$u.api.removeAddress(this.addressList[index].id)
				this.getAddress()
				this.addressList[index].show = false
				this.$u.toast(`删除成功`);
			} else {
				this.$u.toast(`已设置为默认地址`);
				this.addressList.forEach(address=>{
					if(address.id == this.addressList[index].id){
						this.$u.api.setAddressDefault(address.id)
						address.is_default = 1
						address.show = false
						console.log(address)
						// 改为默认存储默认地址的id
						uni.setStorageSync('addressId',address.id)
					}else{
						address.is_default = 0
					}
				})
			}
		},
		open(index) {
			this.addressList[index].show = true;
			this.addressList.map((val, idx) => {
				if(index != idx) this.addressList[idx].show = false;
			})
		},
		addressDetails(index){
			uni.redirectTo({
				url:`/pages/address/setaddSite?${JSON.stringify(this.addressList[index])}`
			})
		},
		addressDetails2(index){
			if(!this.addressList[index].is_default == 1){
				this.active = index
				this.$u.toast(`已设置为默认地址`);
				this.addressList.forEach(address=>{
					if(address.id == this.addressList[index].id){
						this.$u.api.setAddressDefault(address.id)
						address.is_default = 1
						// 改为默认存储默认地址的id
						uni.setStorageSync('addressId',address.id)
					}else{
						address.is_default = 0
					}
				})
			} 
		}
	},
	
};
</script>

<style lang="scss" scoped>
.item {
	padding: 40rpx 20rpx;
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
.active{
	background-color: #EEEEEE;
	border-radius: 24rpx;
	padding: 5rpx;
}
.items {
		display: flex;
		padding: 20rpx;
	}
	
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
.addSite {
	display: flex;
	position: fixed;
	justify-content: space-around;
	width: 600rpx;
	line-height: 100rpx;
	bottom: 30rpx;
	left: 80rpx;
	background-color: red;
	border-radius: 60rpx;
	font-size: 30rpx;
	.add{
		display: flex;
		align-items: center;
		color: #ffffff;
		.icon{
			margin-right: 10rpx;
		}
	}
}
</style>
