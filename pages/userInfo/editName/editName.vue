<template>
	<view>
		<view class="pages">
			<view class="input-view">

				<input :value="inputValue" @input='getValue' />
			</view>
			<text class="tit" v-if="pages==1">好名字让你的朋友更容易记住你</text>
			<text class="tit" v-if="pages==2">好微信号让你的朋友更容易记住你</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: '',
				pages: 1,
			};
		},
		onLoad(options) {
			this.inputValue = options.value
			this.pages = options.pages
			console.log(options)
			if(this.pages==2){
				uni.setNavigationBarTitle({
					title:'更改微信号'
				})
			}
		},
		onNavigationBarButtonTap() {
			if(this.inputValue!=''){
			let url = ''
			if (this.pages == 1) { //修改昵称 wcName
				url = '/wechatUser/updWechatName?wcName=' + this.contentvalue
			} else { //修改微信号
				url = '/wechatUser/updWechatNum?wcNum=' + this.contentvalue
			}
			this.$util.post(url).then(res => {
				if (res.data.code == 200) {
					uni.navigateBack({
						delta: 1
					})
				}
			})
				
			}else{
				uni.showToast({
					title:"输入内容不能为空！",
					icon:'none'
				})
			}
		},
		methods: {
			getValue(e) {
				this.contentvalue=e.detail.value
			},
		}
	}
</script>

<style lang="scss">
	.pages {
		margin: 0 auto;
		width: 95%;
	}

	.input-view {
		margin: 0 auto;
		width: 100%;
		padding: 10upx;
		height: 80upx;
		line-height: 80upx;		
		border-bottom: 1upx solid #39B54A;
	}

	.tit {
		font-size: 28upx;
		color: gray;
		margin: 15upx;
	}
</style>
