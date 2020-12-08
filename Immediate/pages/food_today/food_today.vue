<template>
	<view class="content">

		<view class="food_today">
			<view class="uni-common-mt" style="padding:20rpx;">
				<u-tabs :list="pageList" :is-scroll="false" :current="currentPage" @change="changePage"></u-tabs>
				<rich-text :nodes="nodes"></rich-text>
			</view>

		</view>

		<view class="food">

			<view class="timebox">
				<picker :range="years" @change="yearChange" mode="multiSelector" class="time">
					选择日期：{{ years[0][yearsIndex1] }} 年 {{ years[1][yearsIndex2]  }} 月 {{ years[2][yearsIndex3]  }}日
				</picker>
			</view>

		</view>
		<view class="cards">
			<view class="cardbox">
				<scroll-view scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
				 @scrolltolower="lower" @scroll="scroll">
					<view id='Article'>
						<u-card  v-for="food in foodList" :key="index1" :title="food.title" :sub-title="food.time" :show-foot="false">
							<view class="card" slot="body">
								<u-row class="row1">
									<u-col class='col' span="9" align="left">
										<u-icon name="https://ftp.bmp.ovh/imgs/2020/12/153683ddcac4ce1e.png" size="34" :label="food.calories"></u-icon>
									</u-col>
								</u-row>
							</view>
						</u-card>
					</view>
					<u-back-top :scroll-top="scrollTop"></u-back-top>
				</scroll-view>
			</view>

		</view>

		<div>
			<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
			 :activeColor="activeColor"></u-tabbar>
		</div>

	</view>


</template>

<script>
	export default {

		data() {
			return {
				date1: "",
				years: [
					['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
					['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
					['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
						'20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'
					]
				],
				yearsIndex1: 0,
				yearsIndex2: 0,
				yearsIndex3: 0,
				pageList: [{
					name: '食谱推荐'
				}, {
					name: '自定义食谱'
				}, {
					name: '每日记录'
				}],
				currentPage: 2,
				nodes: [{
					name: 'div',
					attrs: {
						class: 'div-class',
						style: 'line-height: 35px; color:black; text-align:center;'
					},
					// children: [{
					// 	type: 'text',
					// 	text: '今日食谱'
					// }]
				}],

				num1: '能量',
				fname: "",
				current: 2,
				foodList: [],
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
						iconPath: "https://s3.ax1x.com/2020/11/20/DMMGK1.png",
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
				],

			}
		},
		onLoad() {
			var dat = new Date();
			this.yearsIndex1 = dat.getFullYear() - 2018;
			this.yearsIndex2 = dat.getMonth();
			this.yearsIndex3 = dat.getDate() - 1;
			this.date1 = this.years[0][this.yearsIndex1].toString() + '-' + this.years[1][this.yearsIndex2].toString() + '-' +
				this.years[2][this.yearsIndex3].toString();
			const app = getApp();
			const db = uniCloud.database();
			db.collection('food_today').where({
					use_openid: app.globalData.user_openid,
					day: this.date1
				})
				.get()
				.then(res => {
					console.log(res);
					for (var i = 0; i < res.result.data.length; i++) {
						this.foodList.push({
							"id": res.result.data[i]._id,
							"title": res.result.data[i].recipes_title,
							"calories": res.result.data[i].recipes_calories,
							"time": res.result.data[i].time,
							"day": res.result.data[i].day
						})
					}
				})
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
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
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			},
			yearChange: function(e) {
				this.foodList = [];
				var date = new Date();
				this.yearsIndex1 = e.detail.value[0];
				this.yearsIndex2 = e.detail.value[1];
				this.yearsIndex3 = e.detail.value[2];
				this.date1 = this.years[0][this.yearsIndex1].toString() + '-' + this.years[1][this.yearsIndex2].toString() + '-' +
					this.years[2][this.yearsIndex3].toString();
				const app = getApp();
				const db = uniCloud.database();
				db.collection('food_today').where({
						use_openid: app.globalData.user_openid,
						day: this.date1
					})
					.get()
					.then(res => {
						console.log(res);
						for (var i = 0; i < res.result.data.length; i++) {
							this.foodList.push({
								"id": res.result.data[i]._id,
								"title": res.result.data[i].recipes_title,
								"calories": res.result.data[i].recipes_calories,
								"time": res.result.data[i].time,
								"day": res.result.data[i].day
							})
						}
					})
			},
			changePage(index) {
				console.log(index);
				if (index == 0) {
					uni.switchTab({
						url: "/pages/food_menu/food_menu"
					});
				} else if (index == 1) {
					uni.navigateTo({
						url: "/pages/food_custom/food_custom"
					});
				} else if (index == 2) {
					uni.navigateTo({
						url: "/pages/food_today/food_today"
					});
				}
			},
			goto(url) {
				console.log(url)
			},
			custom(keyword) { //调用数据库筛选搜索框内容
				console.log(keyword)
			},
			search(keyword) //调用数据库筛选搜索框内容
			{
				console.log(keyword)
			},
			clear() {
				// console.log(this.value);
			}
		}

	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-grow: 1;
		flex-wrap: wrap;

	}

	.food_today {
		display: flex;
		flex-direction: column;
		flex-grow: 3;
		flex-basis: 100%;

	}

	.timebox {
		margin: 9rpx 50rpx 0 110rpx;
		text-align: center;
	}

	.time {
		posion: absolute;
		margin: 9rpx 50rpx 0 50rpx;
		height: 50rpx;
		font-size: 30rpx;

	}

	.date {
		position: absolute;
		margin: 0 0 0 190rpx;
		height: 50rpx;
		font-size: 4rpx;
		font-weight: bold;
	}


	#Article {
		postion: absolute;
		background-color: rgba($color:#2979ff, $alpha: 0.5);
		height: 100%;
		padding-top: 2%;
	
	}
	.food {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: flex-start;
		align-items: flex-start;
		text-align: center;
		background-color: rgba(41, 121, 255, 0.5);
	}

	.cards {
		background-color: rgba(41, 121, 255, 0.5);
		padding: 0 10% 0 0;
		width:100%;
	}

/* 	.card {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		text-align: center;
		margin: 0 0 0 0;
		/* background-color: rgba(149,189,255,0.5); */
/* 
	} */

	.number {
		display: flex;
		flex-direction: row;
		align-items: center;

	}

	.list {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: left;

	}

	.row {
		display: absolute;
		margin: 0 0 0 30rpx;
		height: 50rpx;
		font-size: 10rpx;
		font-weight: bold;

	}

	.row1 {
		display: absolute;
		margin: 0 0 0 0;
		height: 50rpx;
		font-size: 10rpx;
		font-weight: bold;

	}

	.scroll-Y {
		height: auto;
		margin: 0 200% 0 0;
	}

/* 	.card {
		display: flex;
		width: 550rpx;
		height: 55rpx;

	} */
</style>
