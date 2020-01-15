<template>
	<view class="pages">

		<view class="content">
			<view class="userInfo">
				<image :src="info.wcAvatar" mode="" class="headurl"></image>
				<view class="">
					<view class="wcName-view">
						<text class="wcName">{{info.wcName}}</text>
						<image :src="info.wcSex==true?'/static/lib/man.png':'/static/lib/woman.png'" mode="" class="man"></image>
					</view>
					<text style="margin-top: 15upx;color: gray;">{{info.wcAddress}}</text>
				</view>
			</view>
			<!-- <tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background"
			 :foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
			 :usingComponents="true" @result="qrR" /> -->
			<view class="bottom-viwe">
				<image :src="info.wcQrCodeUrl" mode="" class="codeImg"></image>
				<text>扫一扫上面的二维码图案,加我微信</text>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				info: null,
				ifShow: true,
				val: '1', // 要生成的二维码值
				size: 500, // 二维码大小
				unit: 'upx', // 单位
				background: '#ffffff', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#000000', // 角标色
				icon: '', // 二维码图标 /static/logo.png
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			};
		},
		onLoad() {
			this.info = this.$store.state.userInfo
			this.val = this.info.id
			this.$util.post('/wechatUser/createQrCode').then(ress => {
				this.info = ress.data.data
				console.log(ress.data.data.wcQrCodeUrl, ' ress.data.wcQrCodeUrl')


			})

		},
		methods: {
			qrR(res) {
				this.src = res
			},
		}

	}
</script>

<style lang="scss">
	.pages {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: column;
	}

	.wcName-view {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-flow: row;
	}

	.wcName {
		max-width: 200upx;
		display: -webkit-box;
		line-height: 40rpx;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 10upx;
	}

	.man {
		width: 40upx;
		height: 40upx;
	}

	.content {
		background: #fff;
		width: 85%;
		height: 800upx;
		border-radius: 15upx;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-flow: column;

		.bottom-viwe {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-flow: column;

			.codeImg {
				width: 80%;
				height: 500upx;
				border-radius: 10upx;
				margin: 20upx;
			}

			&>text {
				color: gray;
				font-size: 28upx;
			}
		}

		.userInfo {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #FFFFFF;
			// margin-left: -280upx;

			.headurl {
				width: 100upx;
				height: 100upx;
				border-radius: 10upx;
				margin: 20upx;
			}
		}
	}
</style>
