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
					{{ years[0][yearsIndex1] }} 年 {{ years[1][yearsIndex2]  }} 月 {{ years[2][yearsIndex2]  }}
				</picker>
			</view>





		</view>
		<view>
			<view>
				<scroll-view scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
				 @scrolltolower="lower" @scroll="scroll">
					<view id='Article'>
						<!-- v-for 循环从数据库中传回的 articleLiet  并生成 card -->
						<!-- 注册点击事件，跳转到相应的推文界面 -->
						<u-card v-for="article in articleList" :key="index1" :title="article.title" :sub-title="article.time" :thumb="article.cover"
						 @click='goto(article.url)' :show-foot="false">
							<view class="card" slot="body">
								<u-row class="row1">
									<u-col class='col' span="9" align="left">
										<u-icon name="clock-fill" size="34" color="" :label='article.time' margin=></u-icon>
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
				years: [
					["请选择年份", 2019, 2020, 2021],
					["请选择月份", 10, 11, 12],
					["请选择日期", 1, 2, 3]
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

				// text:"1",
				fname: "",
				current: 2,
				articleList: [{
						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '第一餐',
						time: '2020-02-02',

						url: 'http://www.baidu.com'
					},
					{
						// 	cover: require('@/assets/images/article-cover-2.jpg'),

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '第二餐',
						time: '2020-02-01',


						url: 'http://www.baidu.com'
					},
					{
						// 	cover: require('@/assets/images/article-cover-2.jpg'),

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '第三餐',
						time: '2020-02-01',

						url: 'http://www.baidu.com'
					},

				],

			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			yearChange: function(e) {
				console.log(e)
				//获得对象的 detail的 value
				//通过数组的下标改变显示在页面的值
				this.yearsIndex1 = e.detail.value[0];
				this.yearsIndex2 = e.detail.value[1];
				this.yearsIndex3 = e.detail.value[2];
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

	.scroll-Y {
		height: auto;
	}

	.card {
		display: flex;
		width: 550rpx;
		height: 120rpx;

	}
</style>
