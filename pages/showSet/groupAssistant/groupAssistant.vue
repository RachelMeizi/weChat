<template>
	<view>
		<view class="pages1" v-if="pages==1">
			<view class="user-view" @click="onshowuser">
				<image src="/static/lib/9.png" mode="" style="width: 120upx;height: 120upx;margin: 20upx;border-radius: 10upx;"></image>
				<view class="font-view">
					<view class="userName">
						群发助手
					</view>
					<view class="num-view">
						<text class="number">已启用</text>
					</view>
				</view>
			</view>
			<view class="desc">
				<text>功能介绍</text>
				<text>我能把你的通知,祝福等消息分别发给各个收件人</text>
			</view>
			<view style="height:20upx ;width: 100%;  background: #EDEDED;">

			</view>
			<!-- <cmd-cell-item title="功能介绍" addon="241544512512奥斯卡打了放开那1222" /> -->
			<cmd-cell-item title="开始群发" arrow @click="onshowhistoryList" />
			<cmd-cell-item title="清空此功能消息记录" arrow />
			<button type="warn" class="stopBtn">停用</button>
		</view>
		<view class="pages2" v-if="pages==2">
			<view class="list-view" v-for="item in list">
				<view class="time" v-if="item.createTimeStr">
					{{item.createTimeStr}}
				</view>
				<view class="time time-Null" v-else>
					
				</view>
				<view class="whitemask" @longtap="delItem(item)">
					<view style="color: gray;">{{item.msCount}}位收件人:</view>
					<view class="man"><text>{{item.msUserName}}</text></view>
					<view style="border-bottom: 1upx solid #F2F2F2;font-size: 30upx;color: #000000;" v-if="item.msContent">
						<!-- <text>{{item.msContent}}</text> -->
						<rich-text :nodes="item.msContent"></rich-text>
					</view>
					<image :src="item.msImgUrl" mode="aspectFit" style="width: 300upx;max-height: 600upx;margin: 0 auto;" v-if="item.msImgUrl!=''"
					 @click="onProviewImg(item.msImgUrl)"></image>
					<view style="padding: 20upx;text-align: center;color: #7888AA;" @click="onshowNew(1,item)"><text>再发一条</text></view>
				</view>

			</view>
			<view class="bottom-view">
				<button size="mini" class="newbtn" @click="onshowNew(2)">新建群发</button>
			</view>
		</view>
		<view class="mask-del" v-if="showDelMask==true" @click="colseMask">
			<view class="mskeContent-center" @click.stop="onDelList">
				<text>删除记录</text>
			</view>
		</view>
		<view class="mask" v-if="showMask==true" @click="tapMask">
			<view class="mask-content">
				<text class="titTip">请先选择口子</text>
				<view class="sark-view">
					<view class="sark-view-item" v-for="item in radioList">
						<view class="sark-view-item-top">
							<text>{{item.name}} </text>
							<!-- <text style="font-size: 25upx;color: gray;">订单总价 -->
							<!-- <text style="font-size: 25upx;color: red;margin-left: 20upx;" v-if="item.checked==true"> ￥{{item.price}}</text></text> -->
							<radio :checked="item.checked" @tap.stop="changRadio(item)" />
						</view>
						<!-- <text style="font-size: 25upx;color: gray;">重量:{{item.weight}}kg</text> -->
					</view>
				</view>

				<button class="deliverBtn" @click="onPublish">群发</button>
			</view>
		</view>
		<view style="height: 100upx;width: 100%;"> </view>
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	export default {
		components: {
			cmdCellItem
		},
		data() {
			return {
				pages: 1,
				showDelMask: false,
				showMask: false,
				radioList: [],

				list: [
					// 	{ //历史群发记录
					// 	date: '2019-10-15  12:20', //发布的时间
					// 	msContent: 'asjdhasjfhasbf卡机的办卡积分来看就爱上了开发', //发布的内容
					// 	itemMan: ['哈偶像', '安师大', '萨达是', '萨达', '啥就后端是高分', '撒娇的灰色返回', '埃及食物'] //用户名称数组
					// },
				]
			};
		},
		onLoad(options) {
			this.pages = options.pages
			if (this.pages == 2) {
				// uni.setNavigationBarTitle({
				// 	title: '群发助手'
				// })
				this.getData()

			}

		},
		onShow() {
			this.getData()
		},
		methods: {
			onProviewImg(img) {
				let imgArr = []
				imgArr.push(img)
				uni.previewImage({
					urls: imgArr,
					// longPressActions: {
					//     itemList: ['发送给朋友', '保存图片', '收藏'],
					//     success: function(data) {
					//         console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					//     },
					//     fail: function(err) {
					//         console.log(err.errMsg);
					//     }
					// }
				});
			},
			getData() {
				this.$util.get('/wechatUser/massSendInfoList').then(res => {
					this.list = res.data.data
				})
				this.$util.get('/wechatUser/kzList').then(res => {
					res.data.data.forEach(item => {
						item.checked = false
					})
					this.radioList = res.data.data
				})

			},
			onshowhistoryList() {
				uni.navigateTo({
					url: '/pages/showSet/groupAssistant/groupAssistant?pages=2'
				})
			},
			delItem(item) {
				console.log(item, '11')
				this.listItem = item
				this.showDelMask = true
			},
			colseMask() {
				setTimeout(() => {
					this.showDelMask = false
				}, 1000)
			},
			onPublish() {
				this.$util.get('/wechatUser/massSendInfoRandom?kzNum=' + this.selectSarkName).then(res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '群发成功',
						})
						this.showMask = false
						this.getData()
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			tapMask() {
				this.showMask = false
			},
			changRadio(item) {
				this.radioList.forEach((item, index) => {
					this.$set(item, 'checked', false)
				})
				this.$set(item, 'checked', true)
				console.log(item, '444');
				this.selectSarkName = item.value
				// item.checked = !item.checked

			},
			onDelList() {

				this.$util.get('/wechatUser/massSendInfoDel?msId=' + this.listItem.id).then(res => {
					if (res.data.code == 200) {
						this.showDelMask = false
						this.getData()
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			onshowNew(type, item) {
				console.log(item, 'item')
				if (type == 1) {
					uni.setStorageSync('msUserInfo', item)
					uni.navigateTo({
						url: '/pages/showSet/editNew/editNew'
					})
				} else {
					// uni.navigateTo({
					// 	url: '/pages/showSet/friendsList/friendsList'
					// })
					this.showMask = true

				}

			}
		}
	}
</script>

<style lang="scss">
	.pages1 {
		background: #FFFFFF;
	}

	.pages2 {
		// background: #ECECEC;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
	}

	.bottom-view {

		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 92upx;
		font-size: 33upx;
		background-color: #F8F8F8;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1upx solid #F2F2F2;
	}

	.deliverBtn {
		width: 60%;
		font-size: 30upx;
		margin-top: 20upx;
		margin-bottom: 20upx;
		background: #06C05F;
		color: #FFFFFF;
	}

	.mask-del {
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		bottom: 0;
		background: rgba(0.5, 0.5, 0.5, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;

		.mskeContent-center {
			display: flex;
			justify-content: center;
			align-items: center;
			background: #FFFFFF;
			width: 80%;
			height: 100upx;
			border-radius: 20upx;
			font-size: 30upx;
		}
	}

	.mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30upx;

		.mask-content {
			background: #FFFFFF;
			width: 80%;
			min-height: 400upx;
			margin: 0 auto;
			border-radius: 20upx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-flow: column;

			.titTip {
				padding: 20upx;
			}

			.sark-view {
				width: 80%;
				background: #fff;
				padding: 0 30upx;

				.sark-view-item {
					width: 100%;
					height: 86upx;
					// border-bottom: 1px solid #f2f2f2;

					.sark-view-item-top {
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin: 20upx;
					}
				}
			}
		}


	}

	.stopBtn {
		width: 90%;
		font-size: 30upx;
		padding: 10upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.newbtn {
		// position: fixed;
		// left: 40%;
		// bottom: 10upx;
		background: #06C05F;
		font-size: 30upx;
		color: #FFFFFF;

	}

	.list-view {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
		margin: 10upx 0;

		.time {
			color: white;
			font-size: 28upx;
			font-weight: bold;
			margin: 10upx;
			
		}
		.time-Null{
			margin: 15upx;
		}

		.whitemask {
			width: 87%;
			min-height: 300upx;
			background-color: #FFFFFF;
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			flex-flow: column;
			border-radius: 10upx;
			padding: 14upx;

			view {
				width: 100%;
				padding: 10upx;
				margin: 2upx;
			}

			.man {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-flow: row wrap;
				color: gray;
				display: -webkit-box;
				// line-height: 20rpx;
				height: 50upx;
				word-break: break-all;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				border-bottom: 1upx solid #F2F2F2;
			}
		}

	}

	.desc {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		min-height: 50px;
		padding-top: 10px;
		padding-bottom: 10px;
		margin-left: 10px;
		margin-right: 10px;

		&>text:first-child {
			margin-left: 5upx;
			width: 200upx;
			font-size: 16px;
		}

		&>text:last-child {
			width: 360upx;
			font-size: 30upx;
			font-weight: bold;
			color: gray;
		}
	}

	.user-view {
		width: 100%;
		padding: 20upx;
		height: 220upx;
		background: #FFFFFF;
		font-size: 30upx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 20upx solid #EDEDED;

		.font-view {
			display: flex;
			justify-content: flex-start;
			align-items: flex-start;
			flex-flow: column;

			.userName {
				font-size: 35upx;
				font-weight: bold;
				margin-bottom: 20upx;
			}

			.num-view {
				width: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;

				.number {

					color: $uni-base-color;
					font-size: 28upx;
				}
			}
		}
	}
</style>
