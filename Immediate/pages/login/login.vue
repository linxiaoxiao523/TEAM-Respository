<template>
	<view>
		<view v-if="isCanUse">
			<view>
				<view class="content">
					<image class="background" src="/static/tabs/login.png">
						<view class="title">
							<p>IMMEDIATE</p>
						</view>
						<view class="subtitle">
							<p>健 康 管 理</p>
						</view>

				</view>
				<button class='login' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxLogin">
					授权登录
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				SessionKey: '',
				OpenId: '',
				code: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse') || true
			}
		},
		methods: {
			wxLogin() {
				let that = this;
				uni.authorize({
					scope: 'scope.userInfo',
					success() {
						uni.getUserInfo({
							provider: 'weixin',
							success: function(wxLoginres) {
								let nickName = wxLoginres.userInfo.nickName;
								let avatarUrl = wxLoginres.userInfo.avatarUrl;
								uni.reLaunch({
									url: '/pages/index/index',
								});
								try {
									uni.setStorageSync('isCanUse', false);
									
									that.updateUserInfo();
									uni.reLaunch({
										url: '/pages/index/index',
									});
								} catch (e) {}
							},
							fail(res) {
								console.log(res)
							}
						}),
						uni.login({
						    success: res => {
						    //code值(5分钟失效)
						    console.info(res.code);
						    //小程序appid
						    let appid = 'wxcb70e32f42968687'; //我瞎写的
						    //小程序secret
						    let secret = '26e5c9d1b35ac21df0c0c9600886a266'; //我瞎写的
						    //wx接口路径
						    let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code';
						    uni.request({
						      url: url, // 请求路径
						      method: 'GET', //请求方式
						      success: result => {
						        //响应成功
						        //这里就获取到了openid了
						        console.info(result.data.openid);
						        uni.setStorage({
						          key:'user',
						          data: result.data.openid
						        })
						      },
						      fail: err => {} //失败
						    });
						  }
						});
						
						;
					}
				})
			},
			login() {
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginres) {
						if (!that.isCanUse) {
							uni.authorize({
								scope: 'scope.userInfo',
								success() {
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											//获取用户信息后向调用信息更新方法
											let nickName = infoRes.userInfo.nickName; //昵称
											let avatarUrl = infoRes.userInfo.avatarUrl; //头像
											// uni.request({
											// 	url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx21c6ab42cac35f45&secret=7933a91af160403c4c824e4192837ced&js_code=' +
											// 		code + '&grant_type=authorization_code',
											// 	data: {
											// 		appKey: this.$store.state.appKey,
											// 		customerId: that.customerId,
											// 		nickName: that.nickName,
											// 		headUrl: that.avatarUrl
											// 	},
											// 	method: 'POST',
											// 	header: {
											// 		'content-type': 'application/json'
											// 	},
											// 	success: (res) => {
											// 		if (res.data.state == 'success') {
											// 			uni.reLaunch({
											// 				url: '/pages/index/index',
											// 			});
											// 		}
											// 	}
											// })
										}
									});
								}
							})

						}
						// uni.request({
						// 	url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx21c6ab42cac35f45&secret=7933a91af160403c4c824e4192837ced&js_code=' +
						// 		code + '&grant_type=authorization_code',
						// 	data: {
						// 		code: code,
						// 	},
						// 	method: 'GET',
						// 	header: {
						// 		'content-type': 'application/json'
						// 	},
						// 	success: (res) => {
						// 		uni.hideLoading();
						// 	}
						// })
					}
				});
			},
		},
		// onLoad() {
		// 	this.login();
		// }
	}
</script>

<style scoped>
	.content text {
		display: block;
		color: #ffffff;
		margin-top: 500rpx;
		text-align: center;
	}

	.login {
		border-radius: 80rpx;
		margin: 60rpx 250rpx;
		font-size: 30rpx;
		margin-top: 500rpx;
	}

	.background {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -2;
	}

	.logo {
		position: absolute;
		width: auto;
		height: auto;
		z-index: -1;
	}

	.title {
		font-weight: 300;
		margin: 150rpx 0 0 0;
		font-size: 100rpx;
		color: white;
		text-align: center;
	}

	.subtitle {
		font-weight: 200;
		margin: 0 0 20rpx 0;
		font-size: 40rpx;
		color: #999999;
		text-align: center;
	}
</style>
