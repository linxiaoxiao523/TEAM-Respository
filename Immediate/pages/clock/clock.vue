<template>
	<view>
		<div>
			<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
			 :active-color="activeColor"></u-tabbar>
		</div>
		<u-row class="Tipbar" type="flex" justify="space-bet">
			<u-col :span="4">
				<u-dropdown class="column1">
					<u-dropdown-item @change="change" v-model="value1" :title=str :options="options1"></u-dropdown-item>
				</u-dropdown>
			</u-col>

			<u-col>
				<p class="column2" style="float: left;">当前消耗: {{calorie1.toFixed(2)}} kcal</p>
				<!-- 				<u-icon name="star-fill" class="column4" style="float: left;"></u-icon> -->
			</u-col>
		</u-row>

		<!-- 时钟 -->
		<view class="clock">
			{{hour}}:{{minute}}:{{second}}
		</view>

		<u-row class="buttons" gutter="4">
			<u-col span="4">
				<button @click="op1" type="primary" :plain="true" class="button1">{{state}}</button>
			</u-col>
<!-- 			<u-col span="4">

			</u-col> -->
			<u-col span="4">
				<button @click="get_time" type="primary" :plain="true" class="button3">停止并查看结果</button>
			</u-col>
		</u-row>

		<!-- <view> -->

		<u-popup v-model="show" mode="center" border-radius="14" width="500rpx" height="300rpx">
			<view style="text-align: center; line-height: 250rpx;">
				<p>确定要结束本次运动吗？</p>
			</view>

			<u-row class="buttons2">
				<u-col span="4">
					<u-button @click="todb" type="primary" :plain="true">确定</u-button>
				</u-col>
				<u-col span="4">
					<u-button @click="show = false" type="primary" :plain="true">取消</u-button>
				</u-col>
			</u-row>

		</u-popup>

		<u-popup v-model="show1" mode="center" border-radius="14" width="500rpx" height="300rpx">
			<view style="text-align: center;">
				<p style="line-height: 70rpx;">本次运动时长：{{hour}}:{{minute}}:{{second}}</p>
				<br></br>
				<p style="line-height: 70rpx;">共消耗卡路里：{{calorie1.toFixed(2)}}kcal</p>
				<br></br>
				<p style="line-height: 70rpx;">继续加油哟！</p>
				<u-button @click="init_time" type="primary" :plain="true" size="mini">确定</u-button>
			</view>

		</u-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				show1: false,
				str: "运动类型",
				state: "开始计时",
				calorie1: 0,
				array: ['跑步', '步行', '快走', '骑自行车', '游泳', '自由训练'],
				flag: 1,
				count: 0,
				flag1: 0, // 0表示正在计时,1表示暂停
				value1: -1,
				value2: '',
				hour: "00",
				minute: "00",
				second: "00",
				totalCount: 0,
				timer: null,
				options1: [{
						label: '跑步',
						value: 0,
						calorie: 455 //表示455kcal/h
					},
					{
						label: '步行',
						value: 1,
						calorie: 162 //表示162kcal/h
					},
					{
						label: '快走',
						value: 2,
						calorie: 292 //表示292kcal/h
					},
					{
						label: '骑自行车',
						value: 3,
						calorie: 260 //表示260kcal/h
					},
					{
						label: '游泳',
						value: 4,
						calorie: 650 //表示650kcal/h
					},
					{
						label: '自由训练',
						value: 5,
						calorie: 227 //表示227kcal/h
					},
				],
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
		props: {
			lists: {
				type: Object
			}
		},
		methods: {
			change(index) {
				this.str = this.array[index];
				// console.log(this.value1);
			},
			end() {
				this.is_show = false;
				clearInterval(this.timer);
				this.$emit('clockend', this.totalCount);
			},

			showNum(num) {
				if (num < 10) {
					return '0' + num
				}

				return num
			},
			start() {
				if (this.flag === 1) {
					this.count = 0;
					this.flag = 0;
				}
				let _this = this;
				_this.timer = setInterval(function() {
					_this.count++;
					_this.second = _this.showNum(_this.count % 60);
					_this.hour = _this.showNum(parseInt(_this.count / 60 / 60));
					_this.minute = _this.showNum(parseInt(_this.count / 60) % 60);
					_this.totalCount = _this.count;
					_this.calorie1 = ((_this.totalCount / 3600) * (_this.options1[_this.value1].calorie));
				}, 1000);
				this.is_show = true;
				// }
			},

			op1() {
				if (this.value1 == -1) {
					uni.showToast({
						title: "请先选择类型"
					})
				} else {
					if (this.flag1 === 0) {
						this.show = false;
						this.flag1 = 1;
						this.state = "时间暂停";
						this.start();
					} else {
						this.flag1 = 0;
						this.state = "继续计时";
						this.end();
					}
				}
			},
			getTime: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// month >= 1 && month <= 9 ? (month = "0" + month) : "";
				// day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '/' + month + '/' + day;
				return timer;
			},
			get_time() {
				// 初始化
				this.end();
				this.state = "继续计时";
				// this.count = 0;
				// this.flag = 1;
				// this.flag1 = 0;
				this.show = true;
				// console.log(this.count);
			},
			init_time() {
				this.hour = "00";
				this.minute = "00";
				this.second = "00";
				this.calorie1 = 0;
				this.count = 0;
				this.show1 = false;
			},
			todb() {
				this.show = false;
				this.show1 = true;
				// 运动时间传给后端
				if (this.calorie1 != 0) {
					var app = getApp();
					var p = this.getTime();
					var l = this.options1[this.value1].label;
					const db = uniCloud.database();
					db.collection("exercise_today").add({
							user_openid: app.globalData.user_openid,
							time: p.toString(),
							type: l.toString(),
							consume_calorie: parseFloat(this.calorie1)
						})
						.catch(err => {
							console.log(err)
						})
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.column1{
			/* font-family: SimHei;*/
			 position: absolute;
			 top: 2%;
			 display: flex;
			 justify-content: flex-start;
		}
		.column2{
			position: absolute;
			left: 50%;
			top: 4%;
			font-size: 30upx;
			font-family: SimHei;
			float: "right";
			font-weight: 700;
		}
		.column4{
			position: absolute;
			left: 87%;
			top: 4%;
			float: "right";
		}
			
		.clock{
			display: flex;
			position: absolute;
			text-align: center;
			top: 8%;
			font-size: 70upx;
			width: 98%;
			height:45%;
			padding:0 0 0 29%;
			margin:0 1% 0 1%;
			border-radius: 50rpx;
			border-width: 5rpx;
			border-style:solid;
			align-items: center;
			border-color: #b7b7b7;
			
		}
		.buttons{
			position: absolute;
			left: 4%;
			top: 60%;
			display: flex;
			// justify-content: space-between;
		}
		.button1{
			height:150rpx;
			padding:25rpx 0 0 0;
			width: 290rpx;
			left: 24%;
		}
		.button3{
			height:150rpx;
			width: 300rpx;
			font-size: 35rpx;
			//font-weight: 560;
			left: 76%;
			display: flex;
			align-items: center;
			justify-content: center;
			color: blue;
			border-color: blue;
			
	}	
		.buttons2{
			position: absolute;
			left: 50%;
			top: 50%;
			display: flex;
		}
</style>
