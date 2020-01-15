<template>
	<view>
		<view class="center_menu">
			<view class="" v-for="item in list">
				<view class="menu_item" @tap="onshowCurrency(item.url)">
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
				list: [{
						img: '/static/lib/huan.png',
						name: "已启用功能",
					}, {
						img: '/static/lib/QQEmail.png',
						name: "QQ邮箱",
					}, {
						img: '/static/lib/ten.jpg',
						name: "腾讯新闻",
					}, {
						img: '/static/lib/9.png',
						name: "群发助手",
						url:'/pages/showSet/groupAssistant/groupAssistant?pages=1'
					},
					{
						img: '/static/lib/team.jpg',
						name: "微信运动",
					},
					{
						img: '/static/lib/wepay.jpg',
						name: "微信支付",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						img: '/static/lib/huan2.png',
						name: "未启用功能",
					},
				]
			};
		},
		methods:{
			onshowCurrency(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	.center_menu {
		width: 100%;
		display: inline-block;

		.menu_item {
			font-size: $uni-font-size-sm;
			// font-weight: bold;
			font-family: $uni-base-font-family;
			letter-spacing: 1px;
			padding: 30upx 5%;
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
				background: url('../../../static/lib/next.png') no-repeat;
				background-size: 100%;
			}

			text:nth-of-type(1) {
				margin-left: 5upx;
			}

			image {
				width: 60upx;
				height: 60upx;
				padding: 4upx;
				margin-right: 10upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
