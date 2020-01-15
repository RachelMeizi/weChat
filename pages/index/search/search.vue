<template>
	<view class="pages">
		<view class="topNav">
			<image src="/static/lib/backpay.png" mode="" @click="onBack"></image>
			<input type="text" focus='true' v-model="inputValue" placeholder="微信号/手机号" />
		</view>
		<view class="content-view" v-if="inputValue!=''&& showInfo!=true">
			<view class="sercher" @click="onSerch">
				<image src="/static/lib/11.png" mode="" style="width: 100upx;height: 100upx;margin: 20upx;"></image>
				<text> 搜索:<text style="color: #06C05F;">{{inputValue}}</text></text>
				<!-- <input type="text" :value="inputValue" style="color: #06C05F;"/> -->
			</view>
		</view>

		<view class="content-view" v-if="showInfo==true">
			<view style="border-bottom: 1upx solid #F2F2F2; margin: 10upx;color: gray;">
				个人
			</view>
			<cmd-cell-item :title="info.wcName" slot-left :brief="info.signature">
				<image :src="info.wcAvatar" mode="" class="iconImg"></image>
			</cmd-cell-item>
			<view style="height:20upx;width:100%;background:#EDEDED;">

			</view>
			<cmd-cell-item title="搜一搜" :sceachContent='sercContent' slot-left brief="小程序,公众号,文章,朋友圈和表情等" arrow>
				<image src="../../../static/lib/searchsearch.jpg" mode="" class="iconImg"></image>
			</cmd-cell-item>

		</view>
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
				inputValue: '',
				showInfo: false,
				info: {},
				sercContent: ''
			};
		},
		watch: {
			inputValue(val) {
				this.sercContent = val
			}
		},
		onNavigationBarSearchInputChanged(e) { //输入框输入内容变化事件
			console.log(e)
			this.inputValue = e.text
		},
		onNavigationBarSearchInputConfirmed(e) { //搜索事件，

		},
		onLoad() {
			// this.inputValue=''
			this.$util.get('/wechatUser/queryFriend').then(res => {
				this.info = res.data.data
			})
		},
		methods: {
			onSerch() {
				this.showInfo = true
				// wechatUser/queryFriend

			},

			onBack() {
				uni.redirectTo({
					url: '/pages/index/addNewFriend/addNewFriend'
				})
			},
		}
	}
</script>

<style lang="scss">
	.pages {
		margin-top: 50upx;
	}

	.topNav {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		// background: #007AFF;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		image {
			width: 40upx;
			height: 40upx;
			margin: 20upx;
		}

	}

	.content-view {
		background: #FFFFFF;
	}

	.iconImg {
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
	}

	.sercher {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-flow: row;
		padding: 20upx;

		input {
			height: 100upx;
			line-height: 50upx;
		}
	}
</style>
