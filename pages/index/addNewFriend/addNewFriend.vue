<template>
	<view class="">

		<view class="content-view">
			<navigator url="/pages/index/search/search">
				<view class="sercher">
					<image src="/static/lib/garySao.png" mode="" style="width: 50upx;height: 50upx;margin: 10upx;"></image>
					<input type="text" value="" placeholder="微信/手机号" placeholder-style="color:#ccc" />
				</view>
			</navigator>
		</view>
		<view class="wxNum">
			<text style="color:gray;">我的微信号:{{wcNum}}</text>
			<image src="../../../static/lib/code.png" mode="" style="width: 30upx;height: 30upx;margin-left: 10upx;"></image>
		</view>
		<view class="content-view">
			<cmd-cell-item title="雷达加朋友" slot-left brief="添加身边的朋友" arrow>
				<image src="../../../static/lib/leida.png" mode="" class="iconImg"></image>
			</cmd-cell-item>
			<cmd-cell-item title="面对面建群" slot-left brief="与生病的朋友进入同一个群聊" arrow>
				<image src="/static/lib/groupchat.jpg" mode="" class="iconImg"></image>
			</cmd-cell-item>
			<cmd-cell-item title="扫一扫" slot-left brief="扫描二维码名片" arrow>
				<image src="../../../static/lib/sao.png" mode="" class="iconImg"></image>
			</cmd-cell-item>
			<cmd-cell-item title="手机联系人" slot-left brief="添加或邀请通讯录中的朋友" arrow>
				<image src="../../../static/lib/lianxiren.png" mode="" class="iconImg"></image>
			</cmd-cell-item>
			<cmd-cell-item title="公众号" slot-left brief="获取更多资讯和服务" arrow>
				<image src="../../../static/lib/publicnum.jpg" mode="" class="iconImg"></image>
			</cmd-cell-item>
			<cmd-cell-item title="企业微信联系人" slot-left brief="通过手机号搜索企业微信用户" arrow>
				<image src="../../../static/lib/com.png" mode="" class="iconImg"></image>
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
				wcNum: ''
			};
		},
		onLoad() {
			this.wcNum=this.$store.state.userInfo.wcNum
		},
		methods:{
			
		}
		
	}
</script>

<style lang="scss">
	.content-view {
		background: #FFFFFF;
	}

	.sercher {
		display: flex;
		justify-content: flex-start;
		align-content: center;
		padding: 20upx;

		input {
			height: 60upx;
			line-height: 50upx;
		}
	}

	.iconImg {
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
	}

	.wxNum {
		display: flex;
		justify-content: center;
		align-content: center;
		margin: 40upx;
	}
</style>
