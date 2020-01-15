<template>
	<view class="pages">
		<view class="center_menu">
			<view class="" v-for="item in list">
				<view class="menu_item">
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
						img: '/static/lib/circle.jpg',
						name: "朋友圈",
						style:"height:20upx;width:100%;background:#EDEDED;"
					},
					{
						img: '/static/lib/scanscan.jpg',
						name: "扫一扫",
						style: ""
					},
					{
						img: '/static/lib/shark.jpg',
						name: "摇一摇",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						img: '/static/lib/look.jpg',
						name: "看一看"
					},
					{
						img: '/static/lib/searchsearch.jpg',
						name: "搜一搜",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						img: '/static/lib/nearperson.jpg',
						name: "附近的人",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						img: '/static/lib/shop.jpg',
						name: "购物"
					},
					{
						img: '/static/lib/game.jpg',
						name: "游戏",
						style: "height:20upx;width:100%;background:#EDEDED;"
					},
					{
						img: '/static/lib/program.jpg',
						name: "小程序"
					},
				

				],
			};
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
				height:70upx;
			}

			&:nth-of-type(4) {
				margin-top: 10px;
			}
		}
	}
</style>
