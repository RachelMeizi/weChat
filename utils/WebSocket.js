// const url = 'ws://192.168.10.9:9111'  //小郭
// 聊天：端口 9111  ，参数：command=OneToOne，userCode，toPeopleId，content 
// const url = 'ws://huizhi.zez.cn:9010
var socketOpen = false
var sendMsg = null
import store from '@/store/index.js'




export default {
	// 连接
	opWebSocket() {

		const url = 'ws://douyin.9zk.com:7777/ws?token=' + store.state.userInfo.msg // store.state.userInfo ? store.state.userInfo.msg : ''
		uni.connectSocket({
			url: url
		});
		console.log(url, 'websocket--Url')
		uni.onSocketOpen((res) => {
			console.log('44444');
			console.log('WebSocket连接已打开！');
			socketOpen = true
		});
		uni.onSocketError((res) => {
			console.log('WebSocket连接打开失败，请检查！');
			socketOpen = false
		});
		uni.onSocketClose((res) => {
			console.log('WebSocket 已关闭！');
			socketOpen = false
		});

		uni.onSocketMessage((res) => {
			console.log('收到WebSocket内容：' + res.data);
			store.state.msg = JSON.parse(res.data)
			// store.state.msg =res.data
		});
	},
	// 发送信息
	send(msg) {
		sendMsg = msg
		uni.showLoading({
			title: '发送中...'
		})
		// return new Promise((resolve, reject) => {
		if (socketOpen) {
			uni.sendSocketMessage({
				data: JSON.stringify(msg),
				success: (res) => {
					console.log('发送成功回调', res)
					sendMsg = ''
					setTimeout(() => {
						uni.hideLoading();
					}, 100);

					// resolve(res)
				},
				fail: (err) => {
					// reject(err)
					// this.send(msg)
				},
				complete: () => {
					uni.hideLoading()
				}
			});
		} else {
			// 连接出现问题 轮循连接
			let num = 0
			let time = setInterval(() => {
				if (num == 10) {
					clearInterval(time)
					return this.fail('网络出现了一点小问题...')
				} else if (socketOpen) {
					num = 0
					clearInterval(time)
					this.send(msg)
				} else {
					num++
					this.opWebSocket()
				}
			}, 1000)
		}
		// })
	},
	// 关闭
	close() {
		if (!socketOpen) return
		uni.closeSocket()
	},
	fail(title) {
		uni.showToast({
			title,
			icon: 'none'
		});
	},

}
