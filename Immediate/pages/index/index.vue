<template>
	<view class="content">

		<view class="food_today">
			<view class="uni-common-mt" style="background:#ffffff; padding:20rpx;">
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
					<view class="number" >
						<uni-list class = "list" >
						    <uni-list-item title="能量"  ></uni-list-item>
						    <uni-list-item  title="脂肪"></uni-list-item>
							<uni-list-item title="碳水化合物" ></uni-list-item>
							<uni-list-item  title="蛋白质" rightText="1" ></uni-list-item></uni-list>
						
					</view>
				</uni-card>
			</view>
	
			<view class="sonfood" style="background:#aaffff">
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
					<view class="number" >
						<uni-list class = "list" >
						    <uni-list-item title="能量"  ></uni-list-item>
						    <uni-list-item  title="脂肪"></uni-list-item>
							<uni-list-item title="碳水化合物" ></uni-list-item>
							<uni-list-item  title="蛋白质" rightText="1" ></uni-list-item></uni-list>
						
					</view>
				</uni-card>
		
			</view>
		
			<view class="sonfood" style="background:#aaaaff">
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
					<view class="number" >
						<uni-list class = "list" >
						    <uni-list-item title="能量"  ></uni-list-item>
						    <uni-list-item  title="脂肪"></uni-list-item>
							<uni-list-item title="碳水化合物" ></uni-list-item>
							<uni-list-item  title="蛋白质" rightText="1" ></uni-list-item></uni-list>
						
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
		flex-grow:3;
		align-items:center;
		text-align: center;

	}
	.sonfood{
		display: flex;
		flex-direction: row;
		flex-grow:3;
		align-items:center;
		text-align: center;
	}
	.breakfast {
		display: flex;
		flex-direction: row;
		
		align-items:center;
		
	}
	.card {
		display: flex;
		flex-direction: column;
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
		align-items: flex-start; 
		text-align: left;
	
		}
	
</style>
