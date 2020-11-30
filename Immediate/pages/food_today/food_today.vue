<template>
	<view class="content">

		<view class="food_today">
			<view class="uni-common-mt" style="padding:20rpx;">
				<u-tabs :list="pageList" :is-scroll="false" :current="currentPage" @change="changePage"></u-tabs>
				<rich-text :nodes="nodes"></rich-text>
			</view>

		</view>

		<view class="food">
			<view>
				<picker :range="years" @change="yearChange" mode="multiSelector" class="time">
					{{ years[0][yearsIndex1] }} 月 {{ years[1][yearsIndex2]  }}日
				</picker>
			</view>
			<!-- 						 <u-button class="date">选择日期</u-button>	 -->
		</view>
		<view>
			<uni-list class="row">
				<uni-list-item title="早餐"></uni-list-item>
				<uni-list-item title="午餐"></uni-list-item>
				<uni-list-item title="晚餐"></uni-list-item>
				<uni-list-item title="加餐"></uni-list-item>
				<uni-list-item title="运动"></uni-list-item>
			</uni-list>
			<view>

			</view>
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
				years: [
					["请选择月份", 10, 11, 12],
					["请选择日期", 1, 2, 3]
				],
				yearsIndex1: 0,
				yearsIndex2: 0,
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

				// text:"1",
				fname: "",
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
						selectedIconPath: "",
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
		methods: {
			yearChange: function(e) {
				console.log(e)
				//获得对象的 detail的 value
				//通过数组的下标改变显示在页面的值
				this.yearsIndex1 = e.detail.value[0];
				this.yearsIndex2 = e.detail.value[1];
			},
			formSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				// uni.showModal({
				// 	content: '表单数据内容：' + JSON.stringify(formdata),
				// 	showCancel: false
				// });
			},
			input: function(event) {
				this.fname = event.target.value
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
			get() {
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'get',
					data: {
						fname: this.fname
					}
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询成功，获取数据列表为：${JSON.stringify(res.result.data)}`,
						showCancel: false
					})

					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
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

	.time {
		posion: absolute;
		margin: 9rpx 0 0 50rpx;
		height: 50rpx;
		font-size: 4rpx;

	}

	.date {
		position: absolute;
		margin: 0 0 0 190rpx;
		height: 50rpx;
		font-size: 4rpx;
		font-weight: bold;
	}

	.food {

		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: flex-start;
		align-items: flex-start;
		text-align: center;
	}

	.card {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		text-align: center;

	}

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
</style>
