<template>
	<view class="page">
		<!-- 搜索框 -->
		<view class="seacher-view">
			<view class="img-view">
				<image :src="item.wcAvatar" mode="" class="topImg" v-for="item in selectMemberObj"></image>
			</view>
			<image src="../../../static/lib/circlecamera.png" mode="" style="height: 50upx;width: 50upx;"></image>
			<input v-model="seacheContent" placeholder="搜索" @input='onSeacher' />
			<view :class="allSelect==false?'selectBtn':'activeBtn'" @click="onAllSelect">
				<text> {{ allSelect==false?'全选':'不选'}}</text>
			</view>
		</view>

		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<checkbox-group class="block" @change="checkboxChange">
				<block v-for="(item,index) in list" :key="index">
					<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
						<view class="padding">{{item.name}}</view>
						<view class="cu-list menu-avatar no-padding">
							<view class="cu-item" v-for="(items,sub) in item.listItem" :key="sub">
								<view class="cu-avatar round lg">
									<image class="headurl" :src="items.wcAvatar" mode=""></image>
								</view>
								<view class="content">
									<view class="text-grey">{{items.wcName}}</view>
								</view>
								<label class="checkbox" @click="getchaangImg(items,sub)">
									<checkbox class='green' :class="{checked:items.checked}" :checked="items.checked" :value="items.name"></checkbox>
								</label>
							</view>
						</view>
					</view>
				</block>
			</checkbox-group>
		</scroll-view>
		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur">
					{{item.name}}</view>
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
				selectMembers:[],
				hidden: true,
				allSelect: false,
				listCurID: '',
				list: [	],//通讯录二维数组
				listCur: '',
			};
		},
		onLoad() {
			let list = [{}];
			this.$util.get('/wechatUser/findWechatFriendPage').then(res=>{
				this.list=res.data.data
			})
		
		},
		onNavigationBarButtonTap(e) {			
			uni.navigateTo({
				url: '/pages/showSet/editNew/editNew',
			})
			uni.setStorageSync('selectMembers',this.selectMembers)
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
			//全选
			onAllSelect() {
				this.allSelect = !this.allSelect
				for (let i = 0; i < this.list.length; i++) {
					this.list[i].listItem.forEach(item => {
						item.checked = this.allSelect
						if (item.checked) {
							this.selectMemberObj.push(item)
							this.selectMembers.push(item.wcName)
						} else {
							this.selectMemberObj = []
							this.selectMembers=[]
						}
					})
				}
			},
			onSeacher(e) {
				this.seacheContent = e.detail.value
				//调起搜索接口返回搜索内容

			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
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
			getchaangImg(items, index) {
				if (items.checked) {
					this.selectMemberObj.push(items)
				} else {
					this.selectMemberObj.splice(index, 1)
				}
				console.log(this.selectMemberObj, ' getchaangImg')

			},
			checkboxChange(e) {
				var items = this.list,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					console.log(item, ' e.detail')
					item.listItem.forEach((member) => {
						if (values.includes(member.name)) {
							this.$set(member, 'checked', true)
						} else {
							this.$set(member, 'checked', false)
						}
					})
				}
				this.selectMembers = values
				console.log(this.selectMembers, 'this.selectMembers');
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
			}
		}
	}
</script>

<style>
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
