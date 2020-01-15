<template>
	<view>
		<!-- 	<view class="center_menu">
			<view class="" v-for="item in list">
				<view class="menu_item" @tap="onshowCurrency(item.url)">
					<text>{{item.name}}</text>
				</view>
				<view :style="item.style"></view>
			</view>
		</view> -->
		<view class="center_menu">
			<view>
				<view class="menu_item">
					<text>账号与安全</text>
				</view>
				<view style="height:20upx;width:100%;background:#EDEDED;"></view>
			</view>
			<view>
				<view class="menu_item">
					<text>新消息提醒</text>
				</view>
				<view class="menu_item">
					<text>勿扰模式</text>
				</view>
				<view class="menu_item">
					<text>聊天</text>
				</view>
				<view class="menu_item">
					<text>隐私</text>
				</view>
				<view class="menu_item" @click="onshowCurrency">
					<text>通用</text>
				</view>
				<view style="height:20upx;width:100%;background:#EDEDED;"></view>
			</view>
			<view>
				<view class="menu_item">
					<text>关于微信</text>
				</view>
				<view class="menu_item">
					<text>帮助与反馈</text>
				</view>
				<view style="height:20upx;width:100%;background:#EDEDED;"></view>
			</view>
			<view>
				<view class="menu_item">
					<text>插件</text>
					<image src="" mode=""></image>
				</view>
				<view style="height:20upx;width:100%;background:#EDEDED;"></view>
			</view>
			<view>
				<view class=" align-center-bottom">
					<text>切换账号</text>
				</view>
				<view style="height:20upx;width:100%;background:#EDEDED;"></view>
			</view>
			<view>
				<!-- <navigator url="/pages/login/login"> -->

				<view class=" align-center-bottom" @click="onDeit">
					<text>退出</text>
				</view>
				<!-- </navigator> -->
				<view style="height:20upx;width:100%;background:#EDEDED;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: "账号与安全",
						style: "height:20upx;width:100%;background:#EDEDED;"
					}, {
						name: "新消息提醒",
					}, {
						name: "勿扰模式",
					}, {
						name: "聊天",
					}, {
						name: "隐私",
					},
					{
						name: "通用",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						name: "关于微信",
					},
					{
						name: "帮助与反馈",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						name: "插件",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						name: "切换账号",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						name: "退出",
						style: "height:20upx;width:100%;background:#EDEDED;"
					}
				]
			};
		},
		methods: {
			onDeit() {
				this.$util.get('/wechatUser/logOut').then(res => {
					uni.reLaunch({
						url: "/pages/login/login"
					})
				})
			},
			onshowCurrency() {
				uni.navigateTo({
					url: "/pages/showSet/currency/currency"
				})
			},
		}

	}
</script>

<style lang="scss">
	.center_menu {
		width: 100%;
		display: inline-block;

		.align-center-bottom {
			font-size: $uni-font-size-sm;
			// font-weight: bold;
			font-family: $uni-base-font-family;
			letter-spacing: 1px;
			padding: 26upx 5%;
			background: #FEFEFE;
			overflow: hidden;
			box-sizing: border-box;

			position: relative;
			border-bottom: 1px solid #EFEFEF;
			display: flex;
			align-items: center;
			justify-content: center
		}

		.menu_item {
			font-size: $uni-font-size-sm;
			// font-weight: bold;
			font-family: $uni-base-font-family;
			letter-spacing: 1px;
			padding: 26upx 5%;
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
				margin-left: 5upx;
			}

			image {
				width: 60upx;
				height: 60upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
