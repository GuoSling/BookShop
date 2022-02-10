const install = (Vue, vm) => {
	// 是否登录
	const isLogin = ()=>{
		// 判断本地是否缓存的有token，如果没有则跳转到登录
		const token = vm.vuex_token
		if(token){
			return true
		}else{
			// 获取来自那个页面
			// 把最后一个元素抛出并赋值给currentPage
			const currentPage = getCurrentPages().pop()
			const options = currentPage.options
			const optionskeys = Object.keys(options)
			let params = ''
			if(optionskeys !== 0){//不等于0说明有参数
				params = optionskeys.reduce((pre,current)=>{
					return `${pre}${current}=${options[current]}&`
				},'?').slice(0,-1)
			}
			// 本地存贮
			uni.setStorageSync('back_url',currentPage.route + params)
			vm.$u.toast('请先登录')
			setTimeout(()=>{
				vm.$u.route({
					type:'redirect',//redirect方式跳转后不能返回
					url: 'pages/auth/login',
				})
			},200)
			return false
		}
	}
	// 更新用户信息
	const  updateUser = async ()=>{
		// 请求用户信息
		const userInfo = await vm.$u.api.userInfo();
		// 更新之后本地存储
		vm.$u.vuex('vuex_user', userInfo)
	}
	
	// 把登入方添加到vm.$u.utails身上
	vm.$u.utails = {
		isLogin,
		updateUser
	}
}

export default {
	install
}