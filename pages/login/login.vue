<template>
	<view class="content">
		<image src="/static/lib/welcome2.jpg" mode="aspectFill" class="swiper-item-img" v-if="showLogin==false"></image>
		<view v-if="showLogin==true">
			<view class="input-group">
				<text style="font-size: 45upx;margin: 15upx;">微信/QQ/邮箱登陆</text>
				<view class="input-row border">
					<text class="title">账号：</text>
					<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请填写微信账号"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">密码：</text>
					<m-input type="password" displayable v-model="password" placeholder="请填写微信密码"></m-input>
				</view>
				<!-- <text style="font-size: 30upx;color: #3F536E;margin-top: 15upx;">用手机号登陆</text> -->
			</view>
			<view class="btn-row">
				<button type="primary" :class="account!=''||password!==''?'primary':'grayPrimay'" @tap="bindLogin">登录</button>
			</view>
			<view class="action-row">
				<navigator url="./register?type=reg">找回密码</navigator>
				<text>|</text>
				<navigator url="./register?type=findPwd">紧急冻结</navigator>
				<text>|</text>
				<navigator url="./register?type=findPwd">更多</navigator>
			</view>

		</view>
	</view>
</template>

<script>
	// import service from '@/common/service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '@/components/m-input.vue'

	export default {
		components: {
			mInput
		},
		data() {
			return {
				hasProvider: true,
				showLogin: false,
				account: '', //账号
				password: '', //密码
				positionTop: 0,
				type: '', //certifica
				name: '',
				cardID: ''
			}
		},
		computed: mapState(['forcedLogin', 'userInfo']),
		onLoad(options) {
			let time = 1
			this.second = time + "s"
			this.time = setInterval(() => {
					if (time == 0) {
						clearInterval(this.time)

						this.showLogin = true


					} else {
						time--
						this.second = time + "s"
					}
				},
				1000)

		},
		onShow() {


		},
		onReady() {
			this.initPosition();
		},

		methods: {
			...mapMutations(['login']),

			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
				console.log(this.positionTop, '44');
			},
			onCertifica() {
				var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/s
				if (this.name == '' || this.cardID == '') {
					uni.showToast({
						title: '信息不能为空',
						icon: "none"
					})
					return
				} else {
					if (!regIdNo.test(this.cardID)) {
						uni.showToast({
							title: '身份证号填写有误',
							icon: "none"
						})
						return
					}
				}
				uni.showToast({
					title: '提交成功',
					success: (res) => {
						uni.navigateBack({
							delta: 1
						})
					}
				})
			},
			bindLogin() {
				// uni.removeStorageSync('userInfos')
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				// if (this.account.length < 5) {
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '账号最短为 5 个字符'
				// 	});
				// 	return;
				// }
				// if (this.password.length < 6) {
				//     uni.showToast({
				//         icon: 'none',
				//         title: '密码最短为 6 个字符'
				//     });
				//     return;
				// }
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */



				this.$util.post('/wechatUser/login?userName=' + this.account + "&userPsd=" + this.password).then(res => {
					if (res.data.code == 0) {
						// uni.setStorageSync('userInfos', res.data)
						// this.login(res.data.data);
						this.$store.state.userInfo = res.data.data
						uni.switchTab({
							url: '/pages/index/index'
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})

			},
			oauth(value) {
				// uni.removeStorageSync('userInfo')//清楚账号密码的请求信息
				uni.login({
					provider: value,
					success: (res) => {
						console.log(res);
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								// this.toMain(infoRes.userInfo.nickName);
								// uni.setStorageSync('userInfos',infoRes.userInfo)
								console.log('infoRes', infoRes.userInfo);
								if (infoRes.userInfo) {
									//调第三方登陆接口
									let json = {
										headurl: infoRes.userInfo.avatarUrl,
										name: infoRes.userInfo.nickName,
										area: infoRes.userInfo.province,
										openId: infoRes.userInfo.openId,
										gender: infoRes.userInfo.gender || infoRes.userInfo.gender == 2 ? '女' : '男',
										access_token: res.access_token
									}
									console.log('this.userInfo', json)
									// this.$util.post('/4444',{json:JSON.stringify(json)}).then(res=>{
									// 	if(res.data.status==200){
									// 		uni.reLaunch({
									// 			url: '/pages/tabbar/newIndex'
									// 		})
									// 	}
									// 	else{
									// 		this.$util.fail(res.data.msg)
									// 	}
									// })

								}
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},

		},

	}
</script>

<style>
	.swiper-item-img {
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 10;

	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #f8f8f8;
		padding: 10px;
		color: #fff;
		min-height: 100vh;
	}

	.input-group {
		margin-top: 20px;
		position: relative;
		color: #000000;
		padding: 20upx;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		/* background-color: #c8c7cc; */
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		/* background-color: #c8c7cc; */
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 30upx;
		line-height: 130upx;
	}

	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}

	.cardID {
		font-size: 29upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #ccc;
		margin-bottom: 20upx;
	}

	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}

	button.onCertifica {
		border-radius: 5upx;
		background-color: rgb(253, 116, 14);
	}

	button.primary {
		background-color: rgb(7, 193, 96);
		border-radius: 10upx;
	}

	button.grayPrimay {
		background-color: rgb(180, 237, 205);
		border-radius: 10upx;
	}

	.action-row {
		position: absolute;
		bottom: 10upx;
		left: 20%;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #6F7393;
		padding: 0 10px;
	}

	.action-row text {
		color: #6F7393;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #6F7393;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}
</style>
