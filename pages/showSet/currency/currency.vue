<template>
	<view>
		<view class="content-view">
			
		<cmd-cell-item title="开启横屏模式"  show-switch  switch-color="#45C01A" />
		<cmd-cell-item title="自动下载微信安装宝" addon="仅Wi-Fi网络" arrow />
		<cmd-cell-item title="多语言" addon="跟随系统" arrow />
		<cmd-cell-item title="字体大小" arrow />
		<cmd-cell-item title="照片,视频和文件" arrow />
		<cmd-cell-item title="发现页管理" arrow />
		<cmd-cell-item title="辅助功能" arrow @click='onshowNext'/>
		<cmd-cell-item title="流量统计" arrow />
		<cmd-cell-item title="微信存储空间" arrow />
		</view>
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	export default {
		   components: {cmdCellItem},
		data() {
			return {
				
			};
		},
		methods:{
			onshowNext(){
				uni.navigateTo({
					url: "/pages/showSet/Auxiliary/Auxiliary"
				})
			}
		}
	}
</script>

<style lang="scss">
.content-view{
	background: #FFFFFF;
}
</style>
