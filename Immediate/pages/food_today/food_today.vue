<template>
	<view class="content">

		<view class="food_today">
			<view class="uni-common-mt" style="padding:20rpx;">
				<u-tabs :list="pageList" :is-scroll="false" :current="currentPage" @change="changePage"></u-tabs>
				<rich-text :nodes="nodes"></rich-text>
			</view>
		</view>

		<view class="food">
			<view class="sonfood" style="background:#55aaff">
				<uni-card class="card" isShadow="true" scroll-y="true">
					<form @submit="formSubmit" @reset="formReset">
						<view class="uni-form-item uni-column">
							<input class="uni-input" name="input" @v-model="fname" @input="input" placeholder="输入早餐" style="background:#d3dad9;" />
							<view class="space" style="height: 10px;"></view>
						</view>
						<view class="uni-btn-v">
							<button form-type="submit" type="primary" size="mini" @click="get">Submit</button>
							<!-- <button type="primary" form-type="reset" size="mini">Reset</button> -->
						</view>
					</form>
					<!-- <view class="space" style="height: 10px;"></view> -->
					<view class="number">
						<uni-list class="list">
							<uni-list-item title="能量" rightText="135.17kcal"></uni-list-item>
							<uni-list-item title="脂肪" rightText="6.21g"></uni-list-item>
							<uni-list-item title="碳水化合物" rightText="12.96g"></uni-list-item>
							<uni-list-item title="蛋白质" rightText="7.42g"></uni-list-item>
						</uni-list>

					</view>
				</uni-card>
			</view>

			<view class="sonfood" style="background:#aaffff">
				<uni-card class="card" isShadow="true" scroll-y="true">
					<form @submit="formSubmit" @reset="formReset">
						<view class="uni-form-item uni-column">
							<input class="uni-input" name="input" @v-model="fname" @input="input" placeholder="输入午餐" style="background:#d3dad9;" />
							<view class="space" style="height: 10px;"></view>
						</view>
						<view class="uni-btn-v">
							<button form-type="submit" type="primary" size="mini" @click="get">Submit</button>
							<!-- <button type="primary" form-type="reset" size="mini">Reset</button> -->
						</view>
					</form>
					<!-- <view class="space" style="height: 10px;"></view> -->
					<view class="number">
						<uni-list class="list" >
							<uni-list-item title="能量" showArrow="false"></uni-list-item>
							<uni-list-item title="脂肪"  showArrow="false"></uni-list-item>
							<uni-list-item title="碳水化合物" showArrow="false"></uni-list-item>
							<uni-list-item title="蛋白质" showArrow="false"></uni-list-item>
						</uni-list>

					</view>
				</uni-card>

			</view>

			<view class="sonfood" style="background:#aaaaff">
				<uni-card class="card" isShadow="true" scroll-y="true">
					<form @submit="formSubmit" @reset="formReset">
						<view class="uni-form-item uni-column">
							<input class="uni-input" name="input" @v-model="fname" @input="input" placeholder="输入晚餐" style="background:#d3dad9;" />
							<view class="space" style="height: 10px;"></view>
						</view>
						<view class="uni-btn-v">
							<button form-type="submit" type="primary" size="mini" @click="get">Submit</button>
							<!-- <button type="primary" form-type="reset" size="mini">Reset</button> -->
						</view>
					</form>
					<!-- <view class="space" style="height: 10px;"></view> -->
					<view class="number">
						<uni-list class="list">
							<uni-list-item title="能量"></uni-list-item>
							<uni-list-item title="脂肪"></uni-list-item>
							<uni-list-item title="碳水化合物"></uni-list-item>
							<uni-list-item title="蛋白质"></uni-list-item>
						</uni-list>

					</view>
				</uni-card>

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
				bgColor: "#ffffff",
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

	.food {
		display: flex;
		flex-direction: column;
		flex-grow:3;
		align-items:center;
		text-align: center;

	}
	.sonfood{
		display: flex;
		flex-direction: row;
		width:100%;
		
		align-items:center;
		text-align: center;
	}
	
	.card {
		display: flex;
		flex-direction: column;
		width:100%;
		align-items:center;
		text-align: center;
		
	}

	.number{
		display: flex;
		flex-direction: row;
		align-items: center;
		
	}
	
	.list{
		display: flex;
		flex-direction: row;
		align-items: center; 
		text-align: left;
	
		}
	
</style>
