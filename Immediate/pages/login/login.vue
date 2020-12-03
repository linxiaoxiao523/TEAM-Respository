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
				uni.login({
					success: res => {
						//code值(5分钟失效)
						console.info(res.code);
						that.code = res.code
						//小程序appid
						// let appid = 'wxcb70e32f42968687'; //我瞎写的
						// //小程序secret
						// let secret = '26e5c9d1b35ac21df0c0c9600886a266'; //我瞎写的
						// //wx接口路径
						// let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +
						// 	res.code + '&grant_type=authorization_code';

						// uni.request({
						// 	url: url, // 请求路径
						// 	method: 'GET', //请求方式
						// 	success: result => {
						// 		//响应成功
						// 		//这里就获取到了openid了

						uniCloud.callFunction({
								name: 'login',
								data: {
									code: that.code
								}
							})
							.then(res => {
								that.OpenId = res.result.res.data.openid;
								console.log(that.OpenId)
								uni.getUserInfo({
									provider: 'weixin',
									success: function(wxLoginres) {
										let nickName = wxLoginres.userInfo.nickName;
										// let openid = wxLoginres.userInfo.openid
										let avatarUrl = wxLoginres.userInfo.avatarUrl;
										// let sex = wxLoginres.userInfo.gender;
										// console.log(sex);
										const db = uniCloud.database();
										db.collection('user')
											.where({
												openid: that.OpenId
											})
											.get()
											.then((res) => {
												// console.log(res);
												if (res.result.data.length <= 0) {
													// const db = uniCloud.database();
													db.collection('user').add({
														nickname: nickName,
														openid: that.OpenId,
														// sex: sex,
														head_url: avatarUrl
													})
												} else {
													db.collection('user').where({
														openid: that.OpenId
													}).update({
														nickname: nickName,
														openid: that.OpenId,
														// sex: sex,
														head_url: avatarUrl
													})
												}
												// res 为数据库查询结果
												console.log(res);
												const app = getApp();
												app.globalData.user_openid = that.OpenId;
												console.log(app.globalData.user_openid);
											}).catch((err) => {
												// err.message 错误信息
												// err.code 错误码
												console.log(err)
												console.log(that.OpenId)
											});
								
								
								
										uni.setStorageSync('isCanUse', false);
								
								
										uni.reLaunch({
											url: '/pages/index/index',
										});
									},
									fail(res) {
										console.log(res)
									}
								});
							});
						uni.setStorage({
							key: 'user',
							data: that.OpenId
						});
						
						// 	},
						// 	fail: err => {} //失败
						// });
					}
				});
			},
		},

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
		background-color: white;
		width: 35%;
		opacity: 0.6;
		color: black;
		border-radius: 30rpx;
		margin: 0 0 0 250rpx;
		font-size: 35rpx;
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
