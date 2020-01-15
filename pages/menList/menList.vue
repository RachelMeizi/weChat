<template>
	<view>

		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<view class="cu-list menu-avatar no-padding">
				<view class="cu-item" v-for="(items,sub) in topList" :key="sub" @click="onshowNext(items.url)">
					<view class="cu-avatar round lg">
						<image class="headurl" :src="items.img" mode=""></image>
					</view>
					<view class="content">
						<view class="text-grey">{{items.name}}</view>
					</view>
				</view>
			</view>
			<block v-for="(item,index) in list" :key="index">
				<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
					<view class="padding">{{item.name}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" v-for="(items,sub) in item.listItem" :key="sub" @longpress="onLongPress($event,items)"
						 :data-index="sub">
							<view class="cu-avatar round lg">
								<image class="headurl" :src="items.wcAvatar" mode=""></image>
							</view>
							<view class="content">
								<view class="text-grey">{{items.wcName}}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in wordlist" :key="index" :id="index" @touchstart="getCur"
				 @touchend="setCur">
					{{item.name}}</view>
			</view>
		</view>
		<view class="mask-del" v-if="showDelMask==true" @click="colseMask">
			<view class="mskeContent-center" @click="onDelList">
				<text>删除联系人</text>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
		<view class="bottom-view">
			<text>{{lengList}}位联系人</text>
		</view>
		<view class="bottom-view grya">
		</view>
		<view style="height: 100upx;width: 100%;"> </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				showDelMask: false,
				listCurID: '',
				lengList: '',
				topList: [{
						name: '新的朋友',
						img: '/static/lib/newfriend.jpg',
						url: "/pages/index/addNewFriend/addNewFriend",
					},
					{
						name: '群聊',
						img: '/static/lib/groupchat.jpg',
					},
					{
						name: '标签',
						img: '/static/lib/sign.jpg',
						url: '/pages/dataList/dataList',
					},
					{
						name: '公众号',
						img: '/static/lib/publicnum.jpg',
					},
					// {
					// 	name: '企业微信联系人',
					// 	img: '/static/lib/team.jpg',
					// }
				],
				listCur: '',

				list: [],

				wordlist: []
			};
		},
		onLoad() {
			let list = [{}];
			let arr = [{
						name: "↑"
					},
					{
						name: "☆"
					}
				],
				obj3 = {
					name: "#"
				};



			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);

			}
			list = [...arr, ...list]
			list = [...list, obj3]
			this.wordlist = list;
		},
		onShow() {
			this.getListData()
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		methods: {
			getListData() {
				this.$util.get('/wechatUser/findWechatFriendPage').then(res => {
					this.list = res.data.data
					this.lengList = res.data.msg

				})
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			onshowNext(url) {
				uni.navigateTo({
					url: url
				})
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			},
			onLongPress(e, item) {
				this.listItemValue = item
				this.showDelMask = true
			},
			colseMask() {
				setTimeout(() => {
					this.showDelMask = false
				}, 1000)
			},
			onDelList() {
				this.$util.get('/wechatUser/delWcFriend?wcFriendId=' + this.listItemValue.id).then(res => {
					if (res.data.code == 200) {
						this.showDelMask = false
						this.getListData()
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: "none",
						});
					}
				})
			},




		}
	}
</script>

<style lang="scss">
	page {
		/* padding-top: 100upx; */
	}

	.bottom-view {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 33upx;
		background-color: #fff;
		height: 92upx;
		color: gray;
	}

	.grya {
		background-color: #F8F8F8;
	}

	.indexes {
		position: relative;
	}

	.cu-item {
		border-bottom: 1upx solid #f2f2f2;
		// padding: 20upx;
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
			font-size: $uni-font-size-sm;
			font-weight: bold;
			font-family: $uni-base-font-family;
		}
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 10upx;
		padding: 20upx 20upx 20upx 60upx;		
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
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
		// background: #fff;
		display: flex;
		flex-direction: column;
		// box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;

	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 25upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20upx !important;

	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 25upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 1upx;
		height: 25upx;
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

	.text-grey {
		color: #000000;
		font-size: $uni-font-size-sm;
		// font-weight: bold;
		font-family: $uni-base-font-family;
	}
</style>
