<template>
	<view class="pages">
		<view class="user-view" @click="onshowuser">
			<image :src="info.wcAvatar" mode="" style="width: 120upx;height: 120upx;margin: 15upx;border-radius: 10upx;"></image>
			<view class="font-view">
				<view class="userName">
					<text>{{info.wcName}}</text>
				</view>
				<view class="num-view">
					<text class="number">微信号 ： {{info.wcNum}}</text>
					<image src="../../static/lib/code.png" mode="" style="width: 25upx;height: 25upx;margin-right: 20upx;margin-left: 10upx;"></image>
					<image src="../../static/lib/next.png" mode="" style="width: 30upx;height: 30upx;"></image>
				</view>
			</view>
		</view>
		<view class="center_menu">
			<view class="" v-for="item in list">
				<view class="menu_item" @tap="onshowitem(item.url)">
					<image :src="item.img" mode="aspectFill"></image>
					<text>{{item.name}}</text>
				</view>
				<view :style="item.style"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					// headurl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578478076396&di=d603bd05cbbd5279e064c7c5861539ae&imgtype=jpg&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D4195514412%2C1335775636%26fm%3D214%26gp%3D0.jpg',
					// userName: 'Rachel',
					// num: "121xasda爱上大吉阿卡丽阿萨会计师d",
				},
				list: [{
						img: '/static/lib/mypayment.jpg',
						name: "支付",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						img: '/static/lib/collect.jpg',
						name: "收藏",
						style: ""
					},
					{
						img: '/static/lib/photo.jpg',
						name: "相册",
					},
					{
						img: '/static/lib/card.jpg',
						name: "卡包"
					},
					{
						img: '/static/lib/emotion.jpg',
						name: "表情",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						id: 10,
						img: '/static/lib/setting.jpg',
						name: "设置",
						url: '/pages/showSet/showSet'
					},


				],
			};
		},
		onLoad() {

		},
		onShow() {
			if (this.$store.state.userInfo.id) {
				console.log(this.$store.state.userInfo.id, 'this.$store.state.userInfo.id')
				this.$util.post('/wechatUser/findWechatUserById?wcUserId=' + this.$store.state.userInfo.id).then(res => {
					this.info = res.data.data
					this.$store.state.userInfo = res.data.data
				})
			}
		},
		onNavigationBarButtonTap(e) {
			this.$util.post('/wechatUser/wechatUserRandom').then(res => {
				this.info = res.data.data
				    
				this.$store.state.userInfo = res.data.data
			})
		},
		methods: {
			onshowuser() {
				uni.navigateTo({
					url: '/pages/userInfo/userInfo'
				})
			},
			onshowitem(url) {
				uni.navigateTo({
					url: url
				})
			}
		}

	}
</script>

<style lang="scss">
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
					width: 450upx;
					color: gray;
					display: -webkit-box;
					font-size: 27rpx;
					word-break: break-all;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}
	}

	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: $uni-font-size-sm;
			// font-weight: bold;
			font-family: $uni-base-font-family;
			letter-spacing: 1px;
			padding: 15upx 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			position: relative;
			border-bottom: 1px solid #EFEFEF;

			&:hover {
				background: #F6F6F6 !important;
			}

			&::after {
				content: '';
				width: 30upx;
				height: 30upx;
				position: absolute;
				right: 5%;
				background: url('../../static/lib/next.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 10px;
			}

			image {
				width: 70upx;
				height: 70upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
