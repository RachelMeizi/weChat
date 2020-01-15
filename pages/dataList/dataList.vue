<template>
	<view class="page">
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<checkbox-group class="block" @change="checkboxChange">
				<view class="cu-list menu-avatar no-padding">
					<view class="cu-item" v-for="(items,sub) in listItem" :key="sub">
						<view class="cu-avatar round lg">
							<image class="headurl" :src="items.wcAvatar" mode=""></image>
						</view>
						<view class="content">
							<view class="text-grey">{{items.wcName}}</view>
						</view>
						<label class="checkbox" @click="getchaangImg(items)">
							<checkbox class='green' :class="{checked:items.checked}" :checked="items.checked" :value="items.wcDataId"></checkbox>
						</label>
					</view>
				</view>
			</checkbox-group>
		</scroll-view>
		<view class="maskshow" v-if='showMask==true'>
			<view class="mask-content">
				<view class="">
					输入随机好友数量
				</view>
				<view class="input-view">
					<input type="number" v-model="contentvalue" placeholder="请输入随机人数" />
				</view>
				<view class="btn-view">

					<button type="primary" style="background: #f8f8f8;font-size: 30upx;margin-top: 30upx;color: #000000;" @click.stop="onColose">取消</button>
					<button type="primary" style="background: #39B54A;font-size: 30upx;margin-top: 30upx;" @click.stop="onMonsub">确定</button>
				</view>
			</view>
		</view>

		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				seacheContent: '',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				selectMemberObj: [],
				showMask: false,
				hidden: true,
				allSelect: false,
				listCurID: '',
				contentvalue: '',

				listItem: [
					// 	{
					// 	wcAvatar: '/static/logo.png',
					// 	wcName: "qqqqqqqq",
					// 	checked: false,
					// }, {
					// 	wcAvatar: '/static/logo.png',
					// 	wcName: "pppppasdkajbd",
					// 	checked: false,
					// }, 
				],

				listCur: '',
			};
		},
		onLoad() {
			this.$util.get('/wechatUser/allWechatFriend').then(res => {
				if (res.data.code == 200) {
					res.data.data.forEach(item => {
						item.checked = false
					})
					console.log(res.data.data, 'asd')
					this.listItem = res.data.data
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}
			})

		},
		onNavigationBarButtonTap(e) { //导入好友
			if (e.float == 'right') {
				let srt = this.selectMembers.join(',')
				// console.log(srt.toString(), '11')
				this.$util.post('/wechatUser/impWeChatFriend?wcDataIds=' + srt).then(res => {
					if (res.data.code == 200) {
						uni.navigateBack({
							delta: 1
						})
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			} else { //随机
				this.showMask = true
				console.log(e.float == 'right', '00')
			}

		},

		methods: {

			onMonsub() {
				if (this.contentvalue) {
					if (this.contentvalue > 100) {
						uni.showToast({
							title: '一次最多随机添加100人'
						})
					} else {
						this.$util.post('/wechatUser/impWeChatFriendRandom?randomNum=' + this.contentvalue).then(res => {
							if (res.data.code == 200) {
								this.showMask = false
								uni.showToast({
									title: '添加成功',
								})
								this.contentvalue = ""
							} else {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
							}
						})
					}
				} else {
					uni.showToast({
						title: "随机数量不能为空~",
						icon: "none"
					})
				}
			},
			onColose() {
				this.showMask = false
			},

			getchaangImg(items, index) {
				items.checked = !items.checked
				if (items.checked) {
					items.wcUserId = items.wcDataId
					this.selectMemberObj.push(items)
				} else {
					this.selectMemberObj.splice(index, 1)
				}
				console.log(this.selectMemberObj, ' getchaangImg')

			},
			checkboxChange(e) {
				let values = e.detail.value

				this.selectMembers = values
				console.log(this.selectMembers, 'this.selectMembers');
			},



		}
	}
</script>

<style lang="scss">
	.page {
		/* padding-top: 100upx; */
		background: #FFFFFF;
		width: 100%;
		min-height: 100vh;
	}

	.seacher-view {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-flow: row;
		margin: 10upx;
		padding: 10upx;
		border-bottom: 1upx solid #F2F2F2;

	}

	.btn-view {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-flow: row;

		&>button {
			margin: 10upx;
		}
	}

	

	.maskshow {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: 0;
		z-index: 10;
		background: rgba(0, 0, 0, 0.5);
		padding: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.mask-content {
		width: 90%;
		height: 300upx;
		background: #FFFFFF;
		border-radius: 10upx;
		/* 	position: absolute;
		left: 0;
		bottom: 0;
		z-index: 100; */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
		font-size: 30upx;

		/* font-weight: bold; */
	}

	.input-view {
		margin: 0 auto;
		width: 80%;
		padding: 10upx;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1upx solid #39B54A;

	}

	.img-view {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-flow: row;
		max-width: 300upx;
		height: 90upx;
	}

	.topImg {
		margin: 5upx;
		height: 90upx;
		width: 90upx;
		border-radius: 4px;
	}

	.selectBtn {
		width: 150upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		font-size: 30upx;
		color: #39B54A;
		background: #ECECEC;
	}

	.activeBtn {
		width: 150upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		font-size: 30upx;
		color: #FFFFFF;
		background: #39B54A;
	}

	.text-grey {
		color: #000000;
	}

	.indexes {
		position: relative;
	}

	.cu-item {
		border-bottom: 1upx solid #f2f2f2;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 300upx;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.headurl {
		height: 90upx;
		width: 90upx;
		border-radius: 4px;
		/* margin-right: 20upx; */
	}


	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>
