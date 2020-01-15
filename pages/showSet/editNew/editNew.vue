<template>
	<view>
		<view class="topMan">
			<text style="margin-bottom: 20upx;">你将发消息给{{selectMembers.length || userInfo.msCount}}位朋友</text>
			<view style="[{height:100%,width:100%}]" @click="colseMask">
				<scroll-view scroll-y="true" :style="[{height:ScollHeigt+'upx',width:winSize.width+'px'}]" style="margin-bottom: 50upx;">
					<view class="name">
						<text v-for="item in selectMembers" v-if="selectMembers.length>0">{{item}},</text>
						<text>{{userInfo.msUserName}}</text>

					</view>
				</scroll-view>
			</view>

		</view>
		<view style="height: 100upx;width: 100%;"> </view>


		<view class="cu-bar foot input fixed-index" :style="[{bottom:InputBottom+'px'}]">
			<view class="action">
				<image src="/static/lib/voice.jpg" mode="" style="width: 55upx;height: 55upx;"></image>
			</view>

			<textarea class="solid-bottom" focus="true" auto-height maxlength="1000" cursor-spacing="10" @focus="InputFocus"
			 @input="onInput" @blur='InputBlur' :adjust-position="true" />
			<view class="action">
					<image src="/static/lib/chatemotion.jpg" mode="" style="width: 55upx;height: 55upx;"></image>
				</view>
				<image src="/static/lib/plus2.png" mode="" style="width: 45upx;height: 45upx;margin:20upx;" v-if="inputValue==''" @click="onPlus"></image>
				<button class="cu-btn bg-green shadow"  v-if="inputValue!=''">发送</button>
				<!-- @click="onSend" -->
			
			</view>
			<!-- <view class="top-mask" v-if="showBottom==true" @click="colseMask">
				
			</view> -->
			<view class="bottom-view cu-bar foot" :style="[{bottom:0+'px'}]" v-if="showBottom==true">
				<view class="bottom-view-forItem">
					<!--  @click="onOpenImg(index)" -->
					<view class="item" v-for="(item,index) in list">
						<image :src="item.img" mode=""></image>
						<text>{{item.name}}</text>
					</view>	
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectMembers: [],
				InputBottom:0,
				showBottom:false,
				inputValue:'',
				userInfo:{},
				winSize:{},
				focus:true,
				ScollHeigt:'520',
				list:[{
					name:'相册',
					img:'/static/lib/1.png',
					
				},{
					name:'拍摄',
					img:'/static/lib/2.png',
				},{
					name:'语音输入',
					img:'/static/lib/3.png',
				},
				{
					name:'我的收藏',
					img:'/static/lib/4.png',
				}]
			};
		},
		onLoad(options) {				
			this.userInfo=uni.getStorageSync('msUserInfo')
			this.getWindowSize()
			this.showBottom=true
			this.InputBottom=300//距离底部位置
			// this.focus=true//光标
			console.log(this.winSize.height,this.ScollHeigt,'744')
			this.selectMembers = uni.getStorageSync('selectMembers')
		},
		onHide() {
			uni.removeStorageSync('msUserInfo')
		},
		methods: {
			/* 获取窗口尺寸 */
			getWindowSize() {
				uni.getSystemInfo({
					success: (res) => {
						this.winSize = {
							"witdh": res.windowWidth,
							"height": res.windowHeight
						}
					}
				})
			},
			InputFocus(e) {
				console.log(e.detail,'544')
					this.inputValue=' '
					this.showBottom=false
					this.InputBottom=0
					this.ScollHeigt=1000
					
					console.log(this.ScollHeigt,'InputFocus')
			},
			
			InputBlur(e) {				
				this.inputValue=''
			},
			colseMask(){
				this.showBottom=false
				this.InputBottom=0
				this.ScollHeigt=1000
			},
			onInput(e) {
				this.InputBottom = 0
				this.inputValue=e.detail.value
				console.log(e.detail.value)
			},
			onPlus(){
				this.showBottom=true
				this.InputBottom=300
				
				console.log(this.showBottom,'this.showBottom')
			},
			onOpenImg(index){
				if(index==0){
					uni.chooseImage({
					    count: 1, //默认9
					    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					    sourceType: ['album'], //从相册选择
					    success:  (res)=> {
							console.log(res,'选中照片回调参数')
							// this.imgList=res.tempFilePaths[0]
							//调起群发功能
							// this.onSend()
							     
							 this.$util.upload('/wechatUser/upload?file='+res.tempFilePaths[0]).then(res=>{
								 console.log(res)
								 this.imgList=res.data.data
							 })
					    }
					});
				}
			},	
			onSend(){
			let json={
				msUserName:this.selectMembers.length<=0?this.userInfo.msUserName:this.selectMembers.join(',').toString(),
				msContent:this.inputValue,
				msCount: this.userInfo.msCount||this.selectMembers.length.toString()
				// file:this.imgList||''
			}
			if((json.msContent===''||json.msContent===" ") && json.file==''){
				uni.showToast({
					title:'群发内容不能为空!',
					icon:'none'
				})
				return
			}
			console.log(json,'44')				
				this.$util.post('/wechatUser/massSendInfo',JSON.stringify(json)).then(res=>{
					if(res.data.code==200){					
						uni.removeStorageSync('selectMembers')
						this.inputValue=''
						uni.navigateBack({
							delta:2
						})
					}
				})	
			},

		}
	}
</script>

<style lang="scss">
.cu-bar{
	background: #F8F8F8;
}
.fixed-index{
	z-index: 1500 !important;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.bottom-view-forItem{
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-flow: row wrap;
	margin-top: 50upx;

	.item{
		background: #FFFFFF;
		border-radius: 20upx;
		font-size: 30upx;
		margin: 20upx;
		padding: 10upx;
		width: 140upx;
		height: 130upx;
		font-size: 28upx;
		color: gray;
		display: flex;		
		justify-content: center;
		align-items: center;
		flex-flow: column;
		image{
			width: 60upx;
			height: 60upx;
		}
	}
}
.bottom-view{
	width: 100%;
	height: 630upx !important;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	// background: #007AFF;
}
.top-mask{
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 50vh;
	background: rgba(255, 255, 255,0.01);
}
.solid-bottom{
	width: 80%;
	min-height: 80upx;
	background: #FFFFFF;
	border-radius: 10upx;
}
.cu-btn{
width: 150upx;
margin-left: 10upx;
}
.topMan{
	width: 100%;
	min-height: 200upx;
	background: #FFFFFF;
	font-size: 30upx;
	color: #000;
	padding: 22upx;
	&>text{
	font-size: 29upx;
	color: gray;
	margin: 3upx;
	}
	.name{
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-flow: row wrap;
		padding: 10upx;
		text{
			margin: 2upx;
			font-size: 30upx;
			
		}
	}
}

</style>
