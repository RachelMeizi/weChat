<template>
	<view>
		<view class="pages">
			<cmd-cell-item title="头像" slot-right addon="附加文案" arrow="">
				<image :src="info.wcAvatar" mode="" class="headurl"></image>
			</cmd-cell-item>
			<cmd-cell-item title="昵称" :addon="info.wcName" arrow @click="fnClickName(info.wcName,1)" />
			<cmd-cell-item title="微信号" :addon="info.wcNum"  @click="fnClickName(info.wcNum,2)" />
			<cmd-cell-item title="二维码名片" slot-right addon="附加文案" arrow @click="onShowCode">
				<image src="/static/lib/code.png" mode="" class="codeImg"></image>
			</cmd-cell-item>
			<cmd-cell-item title="更多" arrow />
			<view style="height:20upx;width:100%;background:#EDEDED;"></view>
			<cmd-cell-item title="我的地址" arrow />
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
				info: {
					// wcAvatar:'/static/lib/9.png',
					// wcName:'小米',
					// wcNum:'asdnksajb',
					// codeImg:'/static/lib/code.png',
				}
			};
		},
		onLoad() {
			console.log(this.$store.state.userInfo, '44')
		
		},
		onShow() {
			this.$util.post('/wechatUser/findWechatUserById?wcUserId=' + this.$store.state.userInfo.id).then(res => {
				this.info = res.data.data
				this.$store.state.userInfo = res.data.data
			
			})
		},
		methods: {
			fnClickName(value, type) {
				let url = ''
				if (type == 1) {
					url = '/pages/userInfo/editName/editName?pages=1' + '&value=' + value
				} else {
					url = '/pages/userInfo/editName/editName?pages=2' + '&value=' + value //修改微信号
				}
				uni.navigateTo({
					url: url
				})
			},
			onShowCode() {

				uni.navigateTo({
					url: '/pages/userInfo/codeImg/codeImg'
				})
			},
		}
	}
</script>

<style lang="scss">
	.pages {
		background: #FFFFFF;
	}

	.headurl {
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
	}
	.codeImg {
		width: 35upx;
		height: 35upx;
	}
</style>
