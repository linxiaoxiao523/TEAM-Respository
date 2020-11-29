<template>
	<view class="container">
		<u-tabs :list="pageList" :is-scroll="false" :current="currentPage" @change="changePage"></u-tabs>
		<u-collapse ref="collapseList" :accordion="false">
			<u-collapse-item :title="food.kind" v-for="food in foodList">
				<view class="item" v-for="foodItem in food.body">
					<view class="foodName">
						{{foodItem.name}}
						({{foodItem.calories}}千卡/100g)
					</view>
					<view class="inputNumber">
						<u-number-box :value=0 :step=25 :max=500 :input-height="40" @change="amountChange($event, foodItem)"></u-number-box>g
					</view>
				</view>
			</u-collapse-item>
		</u-collapse>
		<br>
		<view style="text-align: right;">
			重量：{{weight}}g　热量：{{calories}}大卡
			<br>
			<u-button>记录</u-button>
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
				pageList: [{
					name: '食谱推荐'
				}, {
					name: '自定义食谱'
				}, {
					name: '每日记录'
				}],
				currentPage: 1,
				checked: [],
				foodList: [{
					kind: "主食类",
					body: [],
				}, {
					kind: "蔬菜类",
					body: [],
				}, {
					kind: "水果类",
					body: [],
				}, {
					kind: "肉、蛋类",
					body: [],
				}, {
					kind: "坚果类",
					body: [],
				}],
				weight: 0,
				calories: 0,
				current: 2,
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
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
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF',
			}
		},
		onLoad() {
			const db = uniCloud.database();
			db.collection('ingredients')
				.where({
					category: "主食类",
				})
				.get({
					getCount: true,
				})
				.then(res => {
					for (var i = 0; i < res.result.data.length; i++) {
						this.foodList[0].body.push({
							id: res.result.data[i]._id,
							name: res.result.data[i].name,
							calories: res.result.data[i].calories,
							mass: 0,
						})
					}
					this.$refs.collapseList.init();
				})
				.catch(err => {
					console.log(err);
				})
			db.collection('ingredients')
				.where({
					category: "蔬菜类",
				})
				.get({
					getCount: true,
				})
				.then(res => {
					for (var i = 0; i < res.result.data.length; i++) {
						this.foodList[1].body.push({
							id: res.result.data[i]._id,
							name: res.result.data[i].name,
							calories: res.result.data[i].calories,
							mass: 0,
						})
					}
					this.$refs.collapseList.init();
				})
				.catch(err => {
					console.log(err);
				})
			db.collection('ingredients')
				.where({
					category: "水果类",
				})
				.get({
					getCount: true,
				})
				.then(res => {
					for (var i = 0; i < res.result.data.length; i++) {
						this.foodList[2].body.push({
							id: res.result.data[i]._id,
							name: res.result.data[i].name,
							calories: res.result.data[i].calories,
							mass: 0,
						})
					}
					this.$refs.collapseList.init();
				})
				.catch(err => {
					console.log(err);
				})
			db.collection('ingredients')
				.where({
					category: "肉、蛋类",
				})
				.get({
					getCount: true,
				})
				.then(res => {
					for (var i = 0; i < res.result.data.length; i++) {
						this.foodList[3].body.push({
							id: res.result.data[i]._id,
							name: res.result.data[i].name,
							calories: res.result.data[i].calories,
							mass: 0,
						})
					}
					this.$refs.collapseList.init();
				})
				.catch(err => {
					console.log(err);
				})
			db.collection('ingredients')
				.where({
					category: "坚果类",
				})
				.get({
					getCount: true,
				})
				.then(res => {
					for (var i = 0; i < res.result.data.length; i++) {
						this.foodList[4].body.push({
							id: res.result.data[i]._id,
							name: res.result.data[i].name,
							calories: res.result.data[i].calories,
							mass: 0,
						})
					}
					this.$refs.collapseList.init();
				})
				.catch(err => {
					console.log(err);
				})
		},
		methods: {
			amountChange(event, foodItem) {
				this.weight = 0;
				this.calories = 0;
				foodItem.mass = event.value;
				for (var i in this.foodList) {
					for (var j in this.foodList[i].body) {
						this.weight += this.foodList[i].body[j].mass;
						this.calories += this.foodList[i].body[j].calories * this.foodList[i].body[j].mass / 100;
					}
				}
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
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.foodName {
		width: 65%;
		float: left;
	}

	.inputNumber {
		float: right;
	}
</style>
