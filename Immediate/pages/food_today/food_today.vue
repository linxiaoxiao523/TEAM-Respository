<template>
	<view class="content">

		<view class="food_today">
			<view class="uni-common-mt" style="background:#ffc2f7; padding:20rpx;">
				<rich-text :nodes="nodes"></rich-text>
			</view>
		</view>

		<view class='food'>
			<view class='breakfast' style="background:#aaffff;padding:20rpx;height:170px;">
				<text style=" text-align:center;padding:20rpx;">早餐</text>
				<uni-card class="card1" isShadow="true">
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
					<view class="number" >
					<text>能量：636.9 KJ</text>
						<view class="space" style="height: 5px;"></view>
						<text>脂肪：47.8 g</text>
						<view class="space" style="height: 5px;"></view>
						<text>蛋白质: 27.3 g</text>
						<view class="space" style="height: 5px;"></view>
						<text>碳水化合物：26.6 g</text>
					<view class="text-box" scroll-y="true">
						<text>{{num1}}</text>
					</view>
					</view>
				</uni-card>

			</view>
			<view class='lunch' style="background:#61c3ff;padding:20rpx;height:170px;">
				<text style=" text-align:center;padding:20rpx;">午餐</text>
				<uni-card class="card2" isShadow="true">
					<form @submit="formSubmit" @reset="formReset">
						<view class="uni-form-item uni-column">

							<input class="uni-input" @input="onKeyInput" placeholder="输入午餐" style="background:#d3dad9;" />
							<view class="space" style="height: 10px;"></view>
						</view>
						<view class="uni-btn-v">
							<button form-type="submit" type="primary" size="mini">Submit</button>
							<!-- <button type="primary" form-type="reset" size="mini">Reset</button> -->
						</view>
					</form>
					<view class="number">
						<text>能量：</text>
						<view class="space" style="height: 5px;"></view>
						<text>脂肪：</text>
						<view class="space" style="height: 5px;"></view>
						<text>蛋白质: </text>
						<view class="space" style="height: 5px;"></view>
						<text>碳水化合物： </text>
					</view>
				</uni-card>
			</view>
			<view class='dinner' style="background:#aaaaff;padding:20rpx;height:170px;">
				<text style=" text-align:center;padding:20rpx;">晚餐</text>
				<uni-card class="card3" isShadow="true">
					<form @submit="formSubmit" @reset="formReset">
						<view class="uni-form-item uni-column">

							<input class="uni-input" @input="onKeyInput" placeholder="输入晚餐" style="background:#d3dad9;" />
							<view class="space" style="height: 10px;"></view>
						</view>
						<view class="uni-btn-v">
							<button form-type="submit" type="primary" size="mini" @click="get">Submit</button>
							<!-- <button type="primary" form-type="reset" size="mini">Reset</button> -->
						</view>
					</form>
					<view class="number">
						<text>能量： </text>
						<view class="space" style="height: 5px;"></view>
						<text>脂肪： </text>
						<view class="space" style="height: 5px;"></view>
						<text>蛋白质: </text>
						<view class="space" style="height: 5px;"></view>
						<text>碳水化合物： </text>
					</view>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				nodes: [{
					name: 'div',
					attrs: {
						class: 'div-class',
						style: 'line-height: 35px; color:black; text-align:center;'
					},
					children: [{
						type: 'text',
						text: '今日食谱'
					}]
				}],

				num1: '能量',

				// text:"1",
				fname: ""
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
		align-items: center;
		text-align: center;

	}

	.breakfast {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
	}

	.lunch {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
	}

	.dinner {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: center;
	}

	.card1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		height: 170px;
		width: 295px;
		padding: 20rpx;
		align-self: center;

	}

	.card2 {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		height: 170px;
		width: 295px;
		padding: 20rpx;
		align-self: center;
	}

	.card3 {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		height: 170px;
		width: 295px;
		padding: 20rpx;
		align-self: center;
	}
</style>
