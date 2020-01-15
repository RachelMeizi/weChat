<template>
	<view class="pages">
		<view class="list">
			<view class="flex_col" @longpress="onLongPress" :class="{'active':pickerUserIndex==index}" v-for="(item,index) in userList"
			 :key="index" :data-index="index" @click="onShowNext(item)">
				<image :src="item.wcAvatar" mode="aspectFill"></image>
				<view class="flex_grow">
					<view class="flex_col">
						<text class="flex_grow">{{item.wcName}}</text>
						<text class="time">{{item.recordTime}}</text>
					</view>
					<!-- <text class="info">{{item.wcContent}}</text> -->
					<rich-text  class="info" :nodes="item.wcContent"></rich-text>
				</view>
			</view>
		</view>
		<view class="shade" v-show="showShade" @tap="hidePop">
			<view class="pop" :style="popStyle" :class="{'show':showPop}">
				<view v-for="(item,index) in popButton" :key="index" @tap="pickerMenu(item,index)" :data-index="index">{{item}}</view>
			</view>
		</view>
		<view class="shade " v-show="showMask" @tap="hidePop">
			<view class="pop showMask" :class="{'show':showMask}">
				<view v-for="(item,index) in popButtonSan" :key="index" @tap="pickerMenuSan(index)" :data-index="index">

					<text> {{item}}</text>
				</view>
			</view>
		</view>
		<view style="height: 100upx;width: 100%;"> </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				userList: [],
				/* 窗口尺寸 */
				winSize: {},
				/* 显示遮罩 */
				showShade: false,
				showMask: false,
				/* 显示操作弹窗 */
				showPop: false,
				/* 弹窗按钮列表 */
				popButton: ["标为关注", "置顶聊天", "删除该聊天"],
				popButtonSan: ["发起群聊", "添加朋友", "扫一扫", "收付款", "帮助与反馈"],
				/* 弹窗定位样式 */
				popStyle: "",
				/* 选择的用户下标 */
				pickerUserIndex: -1
			}
		},
		onNavigationBarButtonTap(e) {
			console.log(e, '44')
			this.showMask = true
		},
		onLoad() {
			// this.getListData();
			console.log(this.$store.state.userInfo, 'userInfo')
			this.getWindowSize();

			// #ifdef H5
			document.onLong = function(e) {
				var e = e || window.event;
				e.preventDefault();
			};
			// #endif
		},
		onShow() {
			this.getListData();
		},
		onReachBottom() {
			let page = this.page
			page++
			this.page = page
			this.$util.get('/wechatUser/findWechatRecordPage?page=' + page).then(res => {
				if (res.data.code == 200) {
					this.userList = [...this.userList, ...res.data.data]
				} else if (res.data.data.length == 0) {
					uni.showToast({
						title: "到底了!",
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}
			})
		},
		methods: {
			onShowNext(item) {
				if (item.isJump == 0) {
					uni.navigateTo({
						url: '/pages/showSet/groupAssistant/groupAssistant?pages=2'
					})
				}

			},
			pickerMenuSan(index) {
				if (index == 2) {
					uni.scanCode({
						success: (res) => {
							console.log('条码类型：' + res.scanType + "");
							console.log('条码内容：' + res.result + "");
							console.log('条码字符集：' + res.charSet + "");
							uni.showModal({
								title: '条码类型：' + res.scanType + "",
								content: '条码内容：' + res.result + ""
							})
						},
						fail: function(e) {
							console.log('扫描fail：' + JSON.stringify(e));
						},
						complete: function() {
							console.log('扫描complete');
						}
					})
				} else if (index == 1) {
					uni.navigateTo({
						url: "/pages/index/addNewFriend/addNewFriend",
					})
					this.showMask = false
				}
			},
			/* 获取列表数据 */
			getListData() {
				this.$util.get('/wechatUser/findWechatRecordPage?page=1').then(res => {
					if (res.data.code == 200) {
						this.userList = res.data.data
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})

			},
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.winSize = {
							"witdh": res.windowWidth,
							"height": res.windowHeight
						}
					}
				})
			},
			/* 长按监听 */
			onLongPress(e) {
				let [touches, style, index] = [e.touches[0], "", e.currentTarget.dataset.index];

				/* 因 非H5端不兼容 style 属性绑定 Object ，所以拼接字符 */
				if (touches.clientY > (this.winSize.height / 2)) {
					style = `bottom:${this.winSize.height-touches.clientY}px;`;
				} else {
					style = `top:${touches.clientY}px;`;
				}
				if (touches.clientX > (this.winSize.witdh / 2)) {
					style += `right:${this.winSize.witdh-touches.clientX}px`;
				} else {
					style += `left:${touches.clientX}px`;
				}

				this.popStyle = style;
				this.pickerUserIndex = Number(index);
				this.showShade = true;
				this.$nextTick(() => {
					setTimeout(() => {
						this.showPop = true;
					}, 100);
				});
			},
			/* 隐藏弹窗 */
			hidePop() {
				this.showPop = false;
				this.showMask = false
				this.pickerUserIndex = -1;
				setTimeout(() => {
					this.showShade = false;
				}, 250);
			},

			/* 选择菜单 */
			pickerMenu(item, index) {
				item = this.userList[this.pickerUserIndex]
				console.log(index, item, `index`);
				// // 在这里开启你的代码秀
				if (index == 2) {
					this.$util.post('/wechatUser/delWechatRecord?wcRecordId=' + item.id).then(res => {
						if (res.data.code == 200) {
							this.getListData()
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none",
							});
						}
					})
				}



				/* 
				 因为隐藏弹窗方法中会将当前选择的用户下标还原为-1,
				 如果行的菜单方法存在异步情况，请在隐藏之前将该值保存，或通过参数传入异步函数中
				 */
				this.hidePop();
			}
		}
	}
</script>

<style scoped lang="scss">
	.pages {
		font-size: 35upx;
	}

	/* 列式弹性盒子 */
	.flex_col {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
	}

	/* 弹性盒子弹性容器 */
	.flex_col .flex_grow {
		width: 0;
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
	}

	.flex_row .flex_grow {
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
	}

	/* 弹性盒子允许换行 */
	.flex_col.flex_wrap {
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}

	/* 列表 */
	.list {
		background-color: #fff;
		font-size: $uni-font-size-sm;
		font-weight: 600;
		font-family: $uni-base-font-family;
		color: #333;
		user-select: none;
		touch-callout: none;

		&>view {
			padding: 28upx 30upx;
			position: relative;

			&:active,
			&.active {
				background-color: #f3f3f3;
			}

			image {
				height: 90upx;
				width: 90upx;
				border-radius: 4px;
				margin-right: 20upx;
			}

			&>view {
				line-height: 40upx;

				.time,
				.info {
					color: #999;
					font-size: 28upx;
					font-weight: normal;
					margin-top: 2upx;
					 display: -webkit-box;
					    -webkit-box-orient: vertical;
					    -webkit-line-clamp:1;
					    overflow: hidden;
					    text-overflow:ellipsis;
				}

				.time {
					width: 150upx;
					text-align: right;
				}

				.info {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}

		&>view:not(:first-child) {
			margin-top: 1px;

			&::after {
				content: '';
				display: block;
				height: 0;
				border-top: #CCC solid 1px;
				width: 620upx;
				position: absolute;
				top: -1px;
				right: 0;
				transform: scaleY(0.5);
				/* 1px像素 */
			}
		}
	}

	/* 遮罩 */
	.shade {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 10upx;
		bottom: 0;
		left: 0;
		-webkit-touch-callout: none;

		.pop {
			position: fixed;
			z-index: 101;
			width: 200upx;
			box-sizing: border-box;
			font-size: 28upx;
			text-align: left;
			color: #333;
			background-color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			line-height: 80upx;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);

			&.show {
				transform: scale(1, 1);
			}

			&>view {
				padding: 0 20upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				user-select: none;
				-webkit-touch-callout: none;

				&:active {
					background-color: #f3f3f3;
				}
			}
		}

		.showMask {
			position: fixed;
			right: 10upx;
			top: 50upx;
			z-index: 101;
			width: 300upx;
			height: 400upx;
			border-radius: 10upx;
			margin: 10upx;
			box-sizing: border-box;
			font-size: 28upx;
			text-align: left;
			color: #fff;
			background-color: rgb(39, 40, 34);
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
			line-height: 80upx;
			transition: transform 0.15s ease-in-out 0s;
			user-select: none;
			-webkit-touch-callout: none;
			transform: scale(0, 0);

		}

	}
</style>
