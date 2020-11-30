<template>
	<view>
		<u-tabs class='tabs' :list="listr" :is-scroll="false" :current="currentr" @change="changer" style="item-width:700rpx">
		</u-tabs>

		<view class="center">
			<view class="logo">
				<image class="logo-img" :src="use_to"></image>
				<view class="logo-title">
					<text class="uer-name">Hi！{{use_name}}</text>
					<!-- 					<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text> -->
				</view>
			</view>
			<view class="center-list">
				<u-field v-model="sex" label="性别" placeholder="请填写性别">
				</u-field>
				<u-field v-model="height" label="身高(cm)" placeholder="请填写身高">
				</u-field>
				<u-field v-model="weight" label="体重(kg)" placeholder="请填写体重">
				</u-field>
				<u-field v-model="target_weight" label="目标体重" placeholder="请填写目标体重">
				</u-field>
			</view>
			<u-button class="button" @click="submit">{{submit_text}}</u-button>
		</view>
		<view>
			<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
			 :activeColor="activeColor"></u-tabbar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				use_name: "你未登录",
				use_to:"",
				submit_text: "提交",
				login: false,
				avatarUrl: "../../static/uni-center/logo.png",
				uerInfo: {},
				sex: "",
				height: 0.0,
				weight: 0.0,
				target_weight: 0.0,
				currentr: 2,
				listr: [{
					name: '运动成果'
				}, {
					name: '运动记录'
				}, {
					name: '个人'
				}],
				current: 2,
				list: [{
						iconPath: "https://s3.ax1x.com/2020/11/20/DMMQC4.png",
						selectedIconPath: "https://s3.ax1x.com/2020/11/20/DMMl8J.png",
						text: '主页',
						isDot: true,
						customIcon: false,
						pagePath: "/pages/index/index" //主页页面地址
					},
					{
						iconPath: "https://s3.ax1x.com/2020/11/20/DMMJDx.png",
						selectedIconPath: "https://s3.ax1x.com/2020/11/20/DMMYb6.png",
						text: '锻炼',
						customIcon: false,
						pagePath: "/pages/clock/clock" //锻炼页面地址
					},
					{
						iconPath: "https://s3.ax1x.com/2020/11/20/DMMK5F.png",
						selectedIconPath: "https://s3.ax1x.com/2020/11/20/DMMGK1.png",
						text: '食谱',
						customIcon: false,
						pagePath: "/pages/food_menu/food_menu" //食谱页面地址
					},
					{
						iconPath: "https://s3.ax1x.com/2020/11/20/DMM3vR.png",
						selectedIconPath: "https://s3.ax1x.com/2020/11/20/DMM129.png",
						text: '成果',
						isDot: false,
						customIcon: false,
						pagePath: "/pages/result/result" //成果页面地址
					},
				]
			}
		},
		onLoad() {
			const app = getApp();
			const db = uniCloud.database();
			db.collection('user').where({
					openid: app.globalData.user_openid,
				})
				.get()
				.then(res => {
					console.log(res);
					this.use_to=res.result.data[0].head_url;
					this.use_name=res.result.data[0].nickname;
					this.sex = res.result.data[0].sex;
					this.weight = res.result.data[0].weight;
					this.target_weight = res.result.data[0].wish_weight;
					this.height = res.result.data[0].height;
				})
				.catch(err => {
					console.log(err);
				})
		},
		methods: {
			getTime: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day;
				return timer;
			},
			changer(index) {
				if (index == 0) {
					uni.switchTab({
						url: "/pages/result/result"
					});
				} else if (index == 1) {
					uni.navigateTo({
						url: "/pages/result/person"
					});
				} else if (index == 2) {
					uni.navigateTo({
						url: "/pages/result/person"
					});
				}
			},
			submit() {
				const app = getApp();
				const db = uniCloud.database();
				this.height = parseFloat(this.height);
				this.weight = parseFloat(this.weight);
				this.target_weight = parseFloat(this.target_weight);
				//数据库user 更新
				db.collection("user")
					.where({
						openid: app.globalData.user_openid
					})
					.update({
						sex: this.sex.toString(),
						height: this.height,
						weight: this.weight,
						wish_weight: this.target_weight
					}).catch(err => {
						console.log(err);
					});
				var p = this.getTime();
				db.collection('user_weight').where({
						user_openid: app.globalData.user_openid,
						time: p.toString(),
					})
					.get()
					.then(res => {
						if (res.result.data.length <= 0) {
							db.collection("user_weight")
								.add({
									user_openid: app.globalData.user_openid,
									time: p.toString(),
									sex: this.sex.toString(),
									weight: this.weight,
									wish_weight: this.target_weight
								}).catch(err => {
									console.log(err);
								})
						} else {
							db.collection('user_weight')
								.where({
									user_openid: app.globalData.user_openid,
									time: p.toString()
								})
								.update({
									weight: this.weight,
									sex: this.sex.toString(),
									weight: this.weight,
									wish_weight: this.target_weight
								})
								.catch(err => {
									console.log(err);
								})
						}
						uni.showToast({
							title: "提交成功!"
						});
					}).catch(err => {
						console.log(err);
						uni.showToast({
							title: "提交失败~"
						});
					})
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}

	/* 	page,
	view {
		display: flex;
	} */

	page {
		background-color: #f8f8f8;
		display: flex;
	}

	.hhh {
		flex-direction: column;
	}

	.center {
		flex-direction: column;
		display: flex;
	}

	.tabs {
		/* 		width: 100%;
		height: 40px;
/* 		padding: 20upx; */
		/* 		box-sizing: border-box; */
		/* 		flex-direction: row;
		align-items: center; */
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background: linear-gradient(0deg, #2979ff, white);
		flex-direction: row;
		align-items: center;
		display: flex;
	}

	.logo-hover {
		opacity: 0.8;
		display: flex;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
		display: flex;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
		display: flex;
	}

	.button {
		margin-top: 20px;
		align-items: center;
		justify-items: center;
		display: flex;

	}

	.uer-name {
		height: 60upx;
		line-height: 30upx;
		font-size: 38upx;
		color: #FFFFFF;
		display: flex;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
		display: flex;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
		display: flex;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
		display: flex;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
		display: flex;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
		display: flex;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #4cd964;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
		display: flex;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
		display: flex;
	}


	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
		display: flex;
	}
</style>
