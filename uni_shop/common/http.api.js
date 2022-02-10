// /common/http.api.js

// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
// let indexUrl = '/api/index';//api数量多的话，就不写在这里了

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	vm.$u.api = {}
	// 首页
	vm.$u.api.index = (params = {}) => vm.$u.get('/api/index',params);
	// 认证相关的
	vm.$u.api.authLogin = (params) =>{
		return vm.$u.post('/api/auth/login',params)
	}	// 登录
	vm.$u.api.authRegister = (params) =>vm.$u.post('/api/auth/register',params)	// 注册
	vm.$u.api.authLoginout = () =>vm.$u.post('/api/auth/logout')	// 退出登
	vm.$u.api.authOssToken = () =>vm.$u.get('/api/auth/oss/token')	// 获取osstoken
	// 用户相关的
	vm.$u.api.userInfo = () =>vm.$u.get('/api/user')	// 用户信息
	vm.$u.api.userInfoUpdata = (params) =>vm.$u.put('/api/user',params)	// 更改用户信息
	vm.$u.api.userAvatar = (params) =>vm.$u.post('/api/user/avatar',params)//更改头像
	// 商品相关
	vm.$u.api.goodsinfo = (id) =>vm.$u.get(`/api/goods/${id}`)//详情页
	vm.$u.api.goodCollection = (id) =>vm.$u.post(`/api/collects/goods/${id}`)//收藏和取消收藏
	vm.$u.api.goodCollectionList = (params) =>vm.$u.get('/api/collects',params)//收藏列表
	
	vm.$u.api.goodsList = (params = {}) =>vm.$u.get('/api/goods',params)//分类
	
	// 购物车相关的
	vm.$u.api.cartsAdd = (params) =>vm.$u.post(`/api/carts`,params)//添加购物车
	vm.$u.api.cartsList = (params) =>vm.$u.get(`/api/carts`,params)//购物车列表
	vm.$u.api.cartsGoodsSelect = (_params) =>vm.$u.patch('/api/carts/checked',_params)//购物车商品选中
	vm.$u.api.cartsDelete = (id) =>vm.$u.delete(`/api/carts/${id}`)//购物车商品移除
	vm.$u.api.cartsSumChange = (id,params) =>vm.$u.put(`/api/carts/${id}`,params)//购物车商品数量改变
	// 订单相关的数据
	vm.$u.api.orders = () =>vm.$u.get(`/api/orders/preview`)//订单预览
	
	// 地址相关
	vm.$u.api.address = (params) =>vm.$u.post(`/api/address`,params)//添加地址
	vm.$u.api.addressList = () =>vm.$u.get(`/api/address`)//地址列表
	vm.$u.api.setAddressDefault = (id) =>vm.$u.patch(`/api/address/${id}/default`)//设置为默认地址	
	vm.$u.api.removeAddress = (id) =>vm.$u.delete(`/api/address/${id}`)//删除地址
	vm.$u.api.updateAddress = (id,params) =>vm.$u.put(`/api/address/${id}`,params)//删除地址
	
	
	
}

export default {
	install
}