<template>
	<view class="container">

		<u-tabs :list="listr" :is-scroll="false" :current="currentr" @change="changer">
		</u-tabs>
		<!-- 
		<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		:active-color="activeColor"></u-tabbar> -->

		<view class="qiun-columns">
			<!-- <view class="qiun-bg-white qiun-title-bar qiun-common-mt" >
				<view class="qiun-title-dot-light">卡路里消耗图</view>
			</view> -->
			<view class="qiun-charts">
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" disable-scroll=true @touchstart="touchColumn"
				 @touchmove="moveColumn" @touchend="touchEndColumn"></canvas>
			</view>
		</view>
		<view>
			<u-calendar v-model="show_calendar" :mode="mode" @change="change_calendar"></u-calendar>
			<u-button @click="show_calendar=true" type="primary" plain="true">请选择日期</u-button>
		</view>

		<view class="bigpaper">
			<view class="subtitle">
				<text>运动信息表</text>
			</view>

			<view class="paper">
				<view class="grid-text-time">时间 : {{year}} 年 {{month}} 月 {{day}} 日 </view>
				<u-grid :col="1" bg-color="grey" v-for="(item,index) in day_list" :key="index">

					<u-grid-item>
						<view class="grid-text">{{item.type}}: {{item.consume_calorie.toFixed(2)}}大卡</view>
					</u-grid-item>
				</u-grid>
			</view>

			<view class="blank">.
			</view>

		</view>



		<div>
			<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
			 :activeColor="activeColor"></u-tabbar>
		</div>
	</view>
</template>
<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaColumn = null;
	export default {
		data() {
			return {
				day_consume: {
					key_date: String,
					key_type: Array(),
					key_calorie: Array()
				},
				day_list: [],
				show_calendar: false,
				mode: 'date',
				dates: '',
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				year: 2020,
				month: 11,
				day: 30,
				for_weight: 80,
				now_weight: 75,
				goal_weight: 72,
				currentr: 1,
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
				],
			}
		},
		onLoad() {
			_self = this;
			_self.date = new Date();
			_self.year = _self.date.getFullYear(); //获取完整的年份(4位);
			_self.month = _self.date.getMonth() + 1;
			_self.day = _self.date.getDate();
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			_self.getServerData();
		},
		methods: {
			change_calendar(e) {
				// _self.show_calendar = true;
				_self.year = e.year;
				_self.month = e.month;
				_self.day = e.day;
				var every_time = e.year + "/" + e.month + "/" + e.day;
				_self.change_card(every_time);
			},

			change_card(every_time) {

				_self.day_list = [];
				const db = uniCloud.database();
				db.collection("exercise_today")
					.where({
						user_openid: getApp().globalData.user_openid,
						time: every_time
					})
					.get()
					.then((res) => {
						if (res.result.data.length > 0) {
							for (var i = 0; i < res.result.data.length; i++) {
								_self.day_list.push({
									"type": res.result.data[i].type,
									"consume_calorie": res.result.data[i].consume_calorie
								})
							}
						} else {
							_self.day_list.push({
								"type": "今天没有运动喔",
								"consume_calorie": 0
							});
						}
					})
			},

			changer(index) {
				if (index == 0) {
					uni.switchTab({
						url: "/pages/result/result"
					});
				} else if (index == 1) {
					uni.navigateTo({
						url: "/pages/result/record"
					});
				} else if (index == 2) {
					uni.navigateTo({
						url: "/pages/result/person"
					});
				}
			},
			getServerData() {

				let Column = {
					"categories": [],
					"series": [{
						"name": "日卡路里消耗/大卡",
						"data": []
					}]
				};
				var myDate = new Date();
				var shapes = new Array();
				const db = uniCloud.database();
				db.collection("exercise_today")
					.orderBy('time', 'desc')
					.where({
						user_openid: getApp().globalData.user_openid
					})
					.get()
					.then((res) => {
						// console.log(res.result.data);
						var num = 0;
						var temp_calorie = 0;
						if (res.result.data.length > 0) {
							for (var i = res.result.data.length - 1; i >= 0; i--) {
								if (i > 0 && res.result.data[i].time == res.result.data[i - 1].time) {
									temp_calorie += res.result.data[i].consume_calorie;
									_self.day_consume.key_date = res.result.data[i].time;
									_self.day_consume.key_type.push(res.result.data[i].type);
									_self.day_consume.key_calorie.push(res.result.data[i].consume_calorie);
								} else {
									temp_calorie += res.result.data[i].consume_calorie;
									var str = res.result.data[i].time.split('/');
									var str2 = str[1] + '/' + str[2];
									Column.categories[num] = str2;
									Column.series[0].data[num] = (temp_calorie).toFixed(2);
									num++;
									temp_calorie = 0;
								}
							}
							_self.showColumn("canvasColumn", Column);
						} else {
							var str = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()

							Column.categories.push(myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate());
							Column.series[0].data[0] = 0;
							_self.showColumn("canvasColumn", Column);
							uni.showModal({
								title: '提示',
								content: '暂无数据，开始锻炼吧!',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击确定');
										// 页面跳转
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});

						}
					});
				var mydate = new Date();
				var every_time = mydate.toLocaleDateString();
				_self.change_card(every_time);

			},
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {
						show: true,
					},
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: chartData.categories,
					series: chartData.series,
					enableScroll: true,
					xAxis: {
						type: 'grid',
						gridType: 'dash',
						itemCount: 5, //x轴单屏显示数据的数量，默认为5个
						scrollAlign: 'right', //滚动条初始位置
					},
					yAxis: {
						//disabled:true
						dashLength: 6,
						splitNumber: 5,
						min: 0,
						max: 3500,
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / chartData.categories.length
						}
					}
				});
			},
			touchColumn(e) {
				canvaColumn.scrollStart(e);
			},
			moveColumn(e) {
				canvaColumn.scroll(e);
			},
			touchEndColumn(e) {
				canvaColumn.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		}
	}
</script>


<style scoped lang="scss">
	.grid-text {
		text-align: left;
		font-size: 25rpx;
		margin-top: 4rpx;

	}

	.grid-text-time {
		text-align: left;
		font-size: 25rpx;
		margin-top: 4rpx;
		font-weight: bold;
	}

	.u-tabs {
		//height:50px;
		//opacity:0.2;
		//border-bottom:1px solid  #000000;
		//border-top:1px solid  #000000;
	}

	.u-tabbar {
		height: 0px;
		//opacity:0.2;


	}

	.container {
		// background: linear-gradient(0deg, #5899ee, white,white,white);
		//margin-bottom: 100%;
		//border-bottom:1px solid  #000000;
		border-top: 5rpx solid #2979ff;
		height: auto;
		// margin-bottom: 170%;
	}

	.bigpaper {
		background: linear-gradient(0deg, #2979ff, white);
		margin: 0% 0% 0% 0%;
		pading: 0% 0% 0% 0%;
		// border-radius: 20rpx;

	}

	.paper {
		margin: -1% 4% 1% 4%;
		padding: -10% 2% 10% 2%;
		border-radius: 30rpx;
		position: relative;
		border-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-style: solid;
		border-width: 20rpx;
		border-height: auto;

	}

	.subtitle {
		text-align: center;
		font-size: 30rpx;
		// color: blue($color: #000000);
		font-weight: 500;
		background-color: rgba($color: #FFFFFF, $alpha: 0.5);
		height: 80rpx;
		padding: 4% 0% 0% 0%;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
