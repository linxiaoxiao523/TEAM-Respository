<template>
	<view class="container">

		<u-tabs :list="listr" :is-scroll="false" :current="currentr" @change="changer">
		</u-tabs>
		<view class="qiun-charts">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll=true @touchstart="touchLineA"
			 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>

		</view>
		<view class="bigpaper">
			<view class="subtitle">
				<text>信息登记表</text>
			</view>

			<view class="paper">
				<u-grid :col="2" bg-color="grey">
					<u-grid-item>
						<view class="grid-text">开始时间:{{day}}</view>
					</u-grid-item>
					<u-grid-item>
						<view class="grid-text">原体重:{{for_weight}} kg</view>
					</u-grid-item>
					<u-grid-item>
						<view class="grid-text">当前体重:{{now_weight}} kg</view>
					</u-grid-item>
					<u-grid-item>
						<view class="grid-text">目标体重:{{goal_weight}} kg</view>
					</u-grid-item>
				</u-grid>
			</view>

			<view class="blank">.
			</view>

		</view>

		<view>
			<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
			 :activeColor="activeColor"></u-tabbar>
		</view>
	</view>
</template>
<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js';
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				day: 0,
				for_weight: 80,
				now_weight: 75,
				goal_weight: 72,
				advice: "无氧运动 + 正常食谱",
				currentr: 0,
				listr: [{
					name: '运动成果'
				}, {
					name: '运动记录'
				}, {
					name: '个人'
				}],
				current: 3,
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
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
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
				let LineA = {
					"categories": [],
					"series": [{
						"name": "体重变化图",
						"data": []
					}]
				};
				var myDate = new Date();
				const db = uniCloud.database();
				db.collection("user_weight")
					.orderBy('time', 'asc')
					.where({
						user_openid: getApp().globalData.user_openid
					})
					.get()
					.then((res) => {
						if (res.result.data.length > 0) {
							this.day = res.result.data[0].time;
							this.for_weight = res.result.data[0].weight;
							var i = 0;
							for (i = 0; i < res.result.data.length; i++) {
								LineA.categories[i] = res.result.data[i].time;
								LineA.series[0].data[i] = res.result.data[i].weight;
							}
							i--;
							this.now_weight = res.result.data[i].weight;
							this.goal_weight = res.result.data[i].wish_weight;
							_self.showLineA("canvasLineA", LineA);

						} else {
							var str = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate()
							LineA.categories.push(myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate());
							LineA.series[0].data[0] = 0;
							_self.showLineA("canvasLineA", LineA);
							uni.showModal({
								title: '提示',
								content: '请先输入身高体重哦!',
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
					})


				// LineA.categories=res.data.data.LineA.categories;
				// LineA.series=res.data.data.LineA.series;
				// _self.showLineA("canvasLineA",LineA);
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: true
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						disableGrid: false,
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						itemCount: 6,
						scrollShow: true,
						scrollAlign: 'right',
						dashLength: 8
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 0,
						max: 80,
						format: (val) => {
							return val.toFixed(0) + 'kg'
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.showToolTip(e, {
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
		margin: 0 0 -100% 0;
		// border-radius: 20rpx;

	}



	.paper {
		margin: 14% 4% 0% 4%;
		padding: -10% 2% 0% 2%;
		border-radius: 30rpx;
		position: relative;
		border-color: rgba($color: #FFFFFF, $alpha: 0.5);
		border-style: solid;
		border-width: 20rpx;
		border-height: auto;

	}

	.subtitle {
		text-align: center;
		font-size: 40rpx;
		color: blue($color: #000000);
		font-weight: 500;

	}
</style>
