// #ifdef H5
const host = '/api'
// #endif
// #ifndef H5

const host = 'http://47.104.201.33:8081'

// #endif

import store from '../store/index.js'

export default {
	// webHost: 'https://glass.zez.cn',
	shopId: 3,
	get(url, tips = true) {
		return new Promise((resolve, reject) => {
			// if (tips) {
			// 	uni.showLoading({
			// 		title: '数据加载中xx',
			// 		mask: false
			// 	});
			// }
			console.log(host + url, store.state.userInfo, 'get请求接口')
			uni.request({
				url: host + url,
				method: 'GET',
				header: {
					'token': store.state.userInfo ? store.state.userInfo.msg : 'abc', //自定义请求头信息
					// 'token':uni.getStorageSync('CODE'),
					'shopId': this.shopId,
					'serviceNum': '1005'
				},
				success: res => {

					res.statusCode == 200 && resolve(res)
				},
				fail: (err) => reject(err),
				complete: (res) => {
					if (res.data.code == 401) {
						uni.showModal({
							title: '登陆提示',
							content: '你还没有登陆,请先登陆才能获取数据',
							confirmText: '去登陆',
							success: ress => {
								if (ress.confirm) {
									uni.navigateTo({
										url: '/pages/login/login',
									});
								}
							},

						});
					}
					console.log(res.data.code, "complete,44")
					uni.hideLoading()
				}
			});
		})
	},
	//post区别:会自动对发送的数据进行 JSON 序列化
	post(url, data, Tips = true) {
		return new Promise((resolve, reject) => {
			if (Tips) {
				// uni.showLoading({
				// 	title: '数据加载中',
				// 	mask: true
				// });
			}
			console.log(host + url, 'post请求接口')
			uni.request({
				url: host + url,
				method: 'POST',
				header: {
					'token': store.state.userInfo ? store.state.userInfo.msg : 'abc', //自定义请求头信息

				},
				data: data,
				success: res => {

					resolve(res)
				},
				fail: (err) => reject(err),
				complete: (res) => {

					console.log(res.data, "complete,post")
					if (res.data.code == 401) {
						uni.showModal({
							title: '登陆提示',
							content: '你还没有登陆,请先登陆才能获取数据',
							confirmText: '去登陆',
							success: ress => {
								if (ress.confirm) {
									uni.navigateTo({
										url: '/pages/login/login',
									});
								}
							},

						});
					}
					uni.hideLoading()
				}
			});
		})
	},
	success(title) {
		return new Promise(resolve => {
			uni.showToast({
				title,
				success: resolve()
			})
		})
	},
	fail(title) {
		uni.showToast({
			title,
			icon: 'none'
		});
	},
	upload(
		url,
		data,

	) {
		uni.showLoading({
			title: '上传中...',
			mask: true,
		});
		return new Promise((resolve, reject) => {
			
			uni.request({
				url: host + url,
				method: 'POST',
				header: {
					'token': store.state.userInfo ? store.state.userInfo.msg : 'abc', //自定义请求头信息
					'content-type': 'multipart/form-data',
				},
				data: data,
				success: res => {

					resolve(res)
				},
				fail: (err) => reject(err),
				complete: (res) => {

					console.log(res.data, "complete,post")
					if (res.data.code == 401) {
						uni.showModal({
							title: '登陆提示',
							content: '你还没有登陆,请先登陆才能获取数据',
							confirmText: '去登陆',
							success: ress => {
								if (ress.confirm) {
									uni.navigateTo({
										url: '/pages/login/login',
									});
								}
							},

						});
					}
					uni.hideLoading()
				}
			});
		})
		// return new Promise((resolve, reject) => {
		// 	uni.uploadFile({
		// 		url: host + url,
		// 		filePath: file,
		// 		header: {
		// 			'token': store.state.userInfo ? store.state.userInfo.msg : '', //自定义请求头信息
		// 			"server_num":"2",
		// 			'content-type': 'multipart/form-data',
		// 		},
		// 		name: 'file',
		// 		success: res => resolve(res),
		// 		fail: err => reject(err),
		// 		complete: () => {
		// 			uni.hideLoading()
		// 		}
		// 	})
		// })
	},
	uploadImage(url, filePaths, i = 0, callback) {
		const length = filePaths.length
		uni.showLoading({
			title: '上传中..',
			mask: true
		})
		return new Promise((resolve, reject) => {
			uni.uploadFile({
				header: {
					'token': store.state.userInfo ? store.state.userInfo.msg : '', //自定义请求头信息
					'shopId': this.shopId
				},
				url: host + url,
				filePath: filePaths[i],
				name: 'file',
				success: res => {
					resolve(res),
						callback && callback(res)
					i++
					if (i < length) {
						this.uploadImage(url, filePaths, i, callback)
					} else {
						uni.hideLoading()
						uni.showToast({
							title: '上传完成!',
						})
					}
				},
				fail: err => {
					reject(err),
						callback && callback(err)
					uni.hideLoading()
					uni.showToast({
						title: '上传失败!',
						icon: 'none'
					})
				}
			})
		})
	},
	hidePhoneNum(phone) {
		let result = "";
		if (phone != null && phone != "") {
			if (phone) { //substring(start,end) 返回从start位置开始到end位置的子串（不包含end）
				result = phone.substring(0, 3) + "****" + phone.substring(7);
			}
		}
		return result;

	},

	week() {
		let data = [];
		let week = new Date().getDay() - 1
		let arr = ['一', '二', '三', '四', '五', '六', '日']
		for (let i = 0; i < 7; i++) {
			if (i == 0) {
				data.push(`星期${arr[week]}(今天)`)
			} else if (i == 1) {
				data.push(`星期${arr[week+1]}(明天)`)
			} else if (i == 2) {
				data.push(`星期${arr[week+2]}(后天)`)
			} else {
				if (week + i >= arr.length) {
					data.push(`星期${arr[week+i-arr.length]}`)
				} else {
					data.push(`星期${arr[week+i]}`)
				}

			}
		}
		return data
	},


	times() {
		let arr = [];
		let val;
		for (let i = 0; i < 24; i = i + 0.5) {
			if (i == parseInt(i)) {
				let f = i.toString();
				if (f.length < 2) {
					f = "0" + f;
				}
				val = f + ":00:00";
			} else {
				let f = (i - 0.5).toString();
				if (f.length < 2) {
					f = "0" + f;
				}
				val = f + ":30:00";
			}
			arr.push(val);
		}
		return arr;
	},
	//调用高德web Api逆地址解析
	reverseAddress(lng, lat, key) {
		return new Promise((resolve, reject) => {
			let url =
				`https://restapi.amap.com/v3/geocode/regeo?output=JSON&location=${lng},${lat}&key=${key}&radius=2000&extensions=base`
			uni.request({
				url: url,
				method: 'get',
				dataType: 'json',
				success: res => resolve(res),
				fail: (err) => reject(err),
			});
		})
	},
	checkPhone(phone) {
		let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
		if (myreg.test(phone)) {
			return true
		} else {
			return false
		}
	},

	checkLogin() {
		const userInfo = store.state.userInfo
		const code = uni.getStorageSync('CODE')
		console.log(code, userInfo, 'checkLogin');
		//未通过检测
		if (!userInfo) {
			setTimeout(() => {
				uni.showModal({
					title: '温馨提示',
					content: '您还没有登录，请先登录',
					success: res => {
						if (res.confirm) {
							uni.redirectTo({
								url: '/pages/loginBase/wx_login/wx_login.vue'
							});
						}
					}
				});

			}, 1000)

			return false
		} else {
			console.log(userInfo, '45444444444444');
		}
		//通过检测
		return true
	}
}
