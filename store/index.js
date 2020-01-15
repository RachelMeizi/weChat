import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		code: null,
		userInfo:{
			msg:'',
		},
		page:'',
		isShop:1,//是否是商家  1=商家  2=用户
		hasPhone:1,
	},
	
	mutations: {
		//注册时间，type:increment，handler第一个参数是state；
		login(state, CODE) {
			uni.setStorageSync('CODE', CODE)
			state.userInfo.msg = CODE
			console.log(CODE,'vuex全局缓存');
			// state.userInfo.headurl = userInfo.headurl || '/static/im/face/face_4.jpg'
		},
		logout(state) {
			uni.removeStorageSync('CODE')
			state.userInfo = null
		},
		increment(state) {
			// 变更状态
			state.count++
		},
		commit(state,venueId){
			state.venueId = venueId;
		
		},
		brandChange(state,brandId){
			state.brandId = brandId;
		},

	},

})

export default store
