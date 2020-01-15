<template>
	<view class="page">
		<view class="userInfo">
			<image :src="userInfo.headurl" mode=""></image>
			<view class="info">
				<view class="info-top">
					<text>{{userInfo.name}}</text>
					<image :src="userInfo.gender=='女'?'/static/home/gril.png':'/static/home/boy.png'" mode=""></image>
				</view>
				<text class="area">地区:{{userInfo.area}}</text>
			</view>
		</view>

		<view class="desc">
			<view class="descTitle">个性签名 :<text class="descInfo">{{userInfo.desc}}</text></view>
		</view>
		<view  class="addBtn" @tap='onaddBtn(userInfo.userId)'>
			{{addText}}
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addText: '添加为好友',
				userInfo: {
					// userId: 1,
					// headurl: 'https://dwz.cn/ZeL0EFhL',
					// number: '1354453265', //账号
					// zanNum: 20, //获赞次数
					// followNum: 30, //关注人数
					// fansNum: 50, //粉丝数量
					// name: 'Rachel',
					// area: '湖南',//只需要省份  不需要市 县
					// gender: 2, //性别  1=女  2=男
					// isFriend: 0, //与当前登录用户关系 是否是好友，0=不是  1=是
					// desc: 'to be No.1,视频频限制时长视频限制时长视频限制时长',//个性签名
				},
			}
		},
		onLoad(options) {
			let userId = options.userId
			console.log(options, '添加好友');
			//请求添加人的信息
			this.$util.get('/otherUserDetail?userId=' + userId).then(res => {
				this.userInfo = res.data
				console.log('用户信息', this.userInfo);
			})
		},
		methods: {
			onSendMesssage(userId) {
				uni.navigateTo({
					url: '/pages/message_info?userId=' + userId,
				});
			},
			onaddBtn(userId) {
				console.log(userId, '添加为好友id');
				if (this.addText == '添加为好友') {
					// this.sendMsg()//发送好友请求
					this.$util.post('/addScanFriend?id=' + userId).then(res => {
						if (res.data.status == 200) {
							this.addText = '已发送请求，耐心等待'
						} else {
							console.log(res.data)
							uni.showToast({
								title: res.data.msg,
								icon: 'none',								
								success: () => {
									setTimeout(()=>{
										uni.navigateBack({
											delta: 1
										})
									},1000)
									
								}
							})
						}
					})
				} else {
					return
				}
			},
			sendMsg(content, command = 'OneToOne') {
				let msg = {
					userCode: this.$store.state.userInfo.msg,
					toPeopleId: this.id,
					content: content,
				}
				console.log(msg)
				this.$websock.send(msg)
			},
		}
	}
</script>

<style lang="scss">
	.page {
		width: 100%;
		min-height: 100vh;
		background: #ddd;
		// color: #fff;
		font-size: 30upx;


		.userInfo {
			background: #fff;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-flow: row;
			padding: 30upx;
			box-sizing: border-box;

			image {
				width: 100upx;
				height: 100upx;
				border-radius: 10upx;
			}

			.info {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-flow: column;
				margin-left: 20upx;


				&-top {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					flex-flow: row;
					font-size: 30upx;
					font-weight: bold;


					image {
						width: 40upx;
						height: 40upx;
						margin-left: 10upx;
					}


				}

				.area {
					color: gray;
					font-size: 28upx;
					font-weight: normal;
					margin-top: 10upx;
				}
			}
		}

		.desc {
			background: #fff;
			padding: 20upx;
			margin-top: 20upx;

			.descTitle {
				font-weight: bold;

				.descInfo {
					color: gray;
					font-weight: normal;
					margin-left: 10upx;

				}
			}

		}

		.addBtn {
			height: 120upx;
			line-height: 120upx;
			text-align: center;
			background: #fff;
			color: rgb(86, 106, 148);
			margin-top: 20upx;
			font-weight: bold;
			font-size: 35upx;
		}

	}
</style>
