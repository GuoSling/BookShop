import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);
import store from '@/store';
const app = new Vue({
	store,
    ...App
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

// 引入自定义小工具
import utails  from 'common/utails.js'
Vue.use(utails,app)
app.$mount()
