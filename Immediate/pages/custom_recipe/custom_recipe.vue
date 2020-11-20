<template>
	<view class="container">
		<u-tabs :list="pageList" :is-scroll="false" :current="currentPage"></u-tabs>
		<u-collapse :accordion="false">
			<u-collapse-item :title="food.kind" v-for="(food, index) in foodList" :key="index">
				<view class="item" v-for="food in food.body">
					<view class="foodName">
						{{food.name}}
						({{food.calories}}千卡/100g)
					</view>
					<view class="inputNumber">
						<u-number-box :value=0 :step=25 :max=500 :input-height="40" @change="amountChange($event, food)"></u-number-box>g
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
					kind: "谷物类",
					body: [{
							name: "稀饭",
							calories: 59,
							mass: 0,
						},
						{
							name: "土豆",
							calories: 81,
							mass: 0,
						},
						{
							name: "白薯",
							calories: 106,
							mass: 0,
						},
						{
							name: "燕麦片",
							calories: 338,
							mass: 0,
						},
						{
							name: "面条",
							calories: 301,
							mass: 0,
						},
						{
							name: "面包",
							calories: 313,
							mass: 0,
						},
						{
							name: "红薯",
							calories: 86,
							mass: 0,
						},
						{
							name: "小米粥",
							calories: 46,
							mass: 0,
						},
						{
							name: "油条",
							calories: 388,
							mass: 0,
						},
						{
							name: "包子",
							calories: 223,
							mass: 0,
						},
						{
							name: "馒头",
							calories: 223,
							mass: 0,
						},
						{
							name: "米粉",
							calories: 349,
							mass: 0,
						},
					],
				}, {
					kind: "蛋类",
					body: [],
				}, {
					kind: "肉类",
					body: [],
				}, {
					kind: "奶类及制品",
					body: [],
				}, {
					kind: "蔬果及菌藻",
					body: [],
				}, {
					kind: "坚果大豆类",
					body: [],
				}],
				weight: 0,
				calories: 0,
			}
		},
		methods: {
			amountChange(event, food) {
				this.weight = 0;
				this.calories = 0;
				food.mass = event.value;
				for (var i in this.foodList) {
					for (var j in this.foodList[i].body) {
						this.weight += this.foodList[i].body[j].mass;
						this.calories += this.foodList[i].body[j].calories * this.foodList[i].body[j].mass / 100;
					}
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
