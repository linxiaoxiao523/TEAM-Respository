<template>
	<view class="Excercise">
		<!-- 菜单栏 -->
		<div>
			<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
			 :activeColor="activeColor"></u-tabbar>
		</div>
		<u-row class="Tipbar" type="flex" justify="space-between">
			<u-col :span="4" class="column1">
				<u-dropdown class="column1">
					<u-dropdown-item @change="change" v-model="value1" :title=str :options="options1"></u-dropdown-item>
				</u-dropdown>
			</u-col>

			<u-col :span="3">
				<p class="column2" style="float: left;">当前消耗: {{calorie}}kcal</p>
				<u-icon name="star-fill" class="column4" style="float: left;"></u-icon>
			</u-col>
		</u-row>

		<!-- 时钟 -->
		<view class="clock">
			<view>{{hour}}:</view>
			<view>{{minute}}:</view>
			<view>{{second}}</view>
		</view>
		<u-row class="buttons" gutter="6">
			<u-col span="4">
				<u-button @click="op1" type="primary" :plain="true">{{state}}</u-button>
			</u-col>
			<u-col span="4">
				<!-- 链接到其他页面 -->
				<u-button type="primary" :plain="true" @click="vclick">虚拟健身房</u-button>
			</u-col>

			<u-col span="4">
				<u-button @click="get_time" type="primary" :plain="true">停止，查看结果</u-button>
			</u-col>
		</u-row>



		<!-- <view> -->

		<u-popup v-model="show" mode="center" border-radius="14" mask="false" width="500rpx" height="300rpx">
			<view style="text-align: center; line-height: 250rpx;">
				<p>确定要结束本次运动吗？</p>
			</view>
			<u-row class="buttons2">
				<u-col span="4">
					<u-button @click="show = false;show1 = true" type="primary" :plain="true">确定</u-button>
				</u-col>
				<u-col span="4">
					<u-button @click="show = false" type="primary" :plain="true">取消</u-button>
				</u-col>
			</u-row>

		</u-popup>

		<u-popup v-model="show1" mode="center" border-radius="14" mask="false" width="500rpx" height="300rpx">
			<view style="text-align: center; line-height: 70rpx;">
				<p style="line-height: 70rpx;">本次运动时长：{{hour}}:{{minute}}:{{second}}</p>
				<br></br>
				<p style="line-height: 70rpx;">共消耗卡路里：{{calorie}}kcal</p>
				<br></br>
				<p style="line-height: 70rpx;">继续加油哟！</p>
				<u-button @click="init_time" type="primary" :plain="true" size="mini">确定</u-button>
			</view>

		</u-popup>





		<!-- </view> -->

	</view>

</template>

<script>
	export default {
		data() {
			return {
				bgColor: "#ffffff",
				show: false,
				show1: false,
				str: "运动类型",
				calorie: 0,
				state: "开始计时",
				array: ['跑步', '散步', '无氧运动', '耐力训练', '力量训练', '增肌训练'],
				flag: 1,
				count: 0,
				flag1: 0, // 0表示正在计时,1表示暂停
				value1: 1,
				value2: '',
				hour: "00",
				minute: "00",
				second: "00",
				totalCount: 0,
				timer: null,
				options1: [{
						label: '跑步',
						value: 1,
					},
					{
						label: '散步',
						value: 2,
					},
					{
						label: '无氧运动',
						value: 3,
					},
					{
						label: '耐力训练',
						value: 4,
					},
					{
						label: '力量训练',
						value: 5,
					},
					{
						label: '增肌训练',
						value: 6,
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
			vclick() {
				uni.showModal({
					content: `该功能有待开发！`,
					showCancel: false
				})
			},
			change(index) {
				this.str = this.array[index - 1]
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
				}, 1000);
				this.is_show = true;
				// }
			},

			op1() {
				if (this.flag1 === 0) {
					this.flag1 = 1;
					this.state = "时间暂停";
					this.start();
				} else {
					this.flag1 = 0;
					this.state = "继续计时";
					this.end();
				}
			},
			get_time() {
				// 运动时间传给后端

				// 初始化
				this.end();
				this.state = "开始计时";
				this.count = 0;
				this.flag = 1;
				this.flag1 = 0;
				this.show = true;
				// console.log(this.count);
			},
			init_time() {
				this.hour = "00";
				this.minute = "00";
				this.second = "00";
				this.show1 = false;
			}

		},
	}
</script>

<style lang="scss" scoped>
	.demo-layout {
		height: 80rpx;
		border-radius: 8rpx;
		text-align: center;
	}

	.column1 {
		font-family: SimHei;

	}

	.column2 {
		position: absolute;
		left: 60%;
		top: 10%;
		font-size: 25upx;
		font-family: SimHei;
		float: "right";
		font-weight: 700;

	}

	.column4 {
		position: absolute;
		left: 90%;
		top: 10%;
		float: "right";
	}

	.clock {
		display: flex;
		position: absolute;
		left: 30%;
		top: 35%;
		font-size: 70upx;
	}

	.buttons {
		width: 400px;
		height: 10px;
		position: absolute;
		left: 1%;
		top: 70%;
		display: flex;
		// justify-content: space-between;
	}

	.buttons2 {

		position: absolute;
		left: 50%;
		top: 50%;
		display: flex;
	}
</style>
