<template>
	<view>
		<view class="container">
			<!-- 最外层用container容器，设置背景颜色 -->
			<view class="picture">
				<image class="pic" v-bind:src="p_url"></image>
			</view>
			<!-- picture和pic不一样，pic才是设置图片格式的，picture是放图片的“盒子” -->
			<view class="paper">
				<view>
					<text class="title">{{name}}</text>
				</view>
				<!-- 文本内容用<view>和<text class=...>控制，view可以换行，text是行内元素 -->
				<view>
					<text class="subtitle">简介：</text>
					<text>{{introduction}}</text>
				</view>

				<view>
					<text class="subtitle">食品营养成分表：</text>
				</view>

				<view>
					<t-table @change="change">
						<t-tr>
							<t-th>营养素</t-th>
							<t-th>含量</t-th>

						</t-tr>
						<t-tr v-for="item in tableList1" :key="item.id">

							<t-td>{{ item.nutrion }}</t-td>
							<t-td>{{ item.content }}</t-td>
						</t-tr>
					</t-table>
				</view>

			</view>
		</view>
		<view class="footer">
			<button type="primary" @click="button_submit">提交</button>
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			return {
				menuid: '', //对应_id
				name: '',
				introduction: '',
				p_url: "",
				tableList1: [{
						id: 0,
						nutrion: '热量（大卡）',
						content: '',
					},
					{
						id: 1,
						nutrion: '脂肪（克）',
						content: '',
					},
					{
						id: 2,
						nutrion: '纤维素（克）',
						content: '',
					},
					{
						id: 3,
						nutrion: '碳水化合物（克）',
						content: '',
					},
					{
						id: 4,
						nutrion: '蛋白质（克）',
						content: '',
					}
				]
			};
		},
		onLoad(options) {
			let that = this;
			that.menuid = options.menuid.replace(/""/g, "");
			that.menuid = JSON.parse(that.menuid)
			// console.log(this.textObj)
			console.log(options.menuid)
			// that.menuid = options.menuid;
			console.log(that.menuid);
			const db = uniCloud.database()
			db.collection('recipes')
				.where({
					_id: that.menuid
				})
				.get({
					getOne: true,
				})
				.then(res => {
					console.log(res),
						console.log(res.result.data.foodname),
						that.name = res.result.data.foodname,
						console.log(that.name),
						that.introduction = res.result.data.introduction,
						that.tableList1[0].content = res.result.data.calories,
						that.tableList1[1].content = res.result.data.fat,
						that.tableList1[2].content = res.result.data.cellulose,
						that.tableList1[3].content = res.result.data.carbohydrates,
						that.tableList1[4].content = res.result.data.protein,
						that.p_url = res.result.data.picture
				})
				.catch(err => {
					console.log(err)
				})
		},
		methods: {
			getTime: function() {

				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			},
			button_submit() {
				let that = this;
				const app = getApp();
				const db = uniCloud.database();
				// console.log(app.globalData.user_openid)
				// console.log(that.menuid)
				// console.log(that.name.toString())
				console.log(db.env.now)
				db.collection('food_today').add({
						use_openid: app.globalData.user_openid,
						recipes_id: that.menuid.toString(),
						recipes_title: that.name.toString(),
						recipes_calories: that.tableList1[0].content.toString(),
						time: that.getTime()
					}).then(res => {
						uni.showToast({
							title: "提交成功，请勿重复提交!"
						})
					})
					.catch(err => {
						console.log(err);
						uni.showToast({
							title: "提交失败!"
						})

					})
			},
			change(e) {
				console.log(e.detail);
			},
			edit(item) {
				uni.showToast({
					title: item.name,
					icon: 'none'
				});
			}
		}
	};
</script>

<style>
	/* container设置的是最内部的底色(我这里是米色) */
	.container {
		background-color: #FAB6B6;
		position: relative;
		z-index: -1;
		/* 背景米色在-1层，必须和position：relative一起用 */
		height: auto;
	}

	/* 所有的文本内容和表格内容,都是用一个paper的大盒子包起来的 */
	.paper {
		margin: -14% 4% 0% 4%;
		/* 外边框,让整个paper叠在图片上面(所以用-14%) */
		background-color: white;
		padding: 1% 2% 5% 2%;
		/* 内边距，保证不要顶着边框 */
		border-radius: 30rpx;
		/*边框圆角*/
		position: relative;
		border-color: #FAB6B6;
		/* 整个paper搞个和背景一样颜色的外框，看起来协调 */
		border-style: solid;
		border-width: 10rpx;
	}

	/* 下面就是根据具体元素进行设计和布局，自由发挥 */
	.picture {
		display: flex;
		justify-content: center;
		width: 100%;
		position: relative;
		z-index: -1;
	}

	.title {
		/* background-color: #e1b29f; */
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 140%;
		/* color:white; */
		font-size: 60rpx;
		margin: 0 30% 2% 30%;
		border-radius: 30rpx;
	}

	,
	.subtitle {
		font-weight: 600;
		font-size: 30rpx;
	}

	/* 
	.footer {
		font-weight: 600;
		font-size: 30rpx;
		line-height: 100rpx;
		flex: 0 0 100rpx;
	} */

	.pic {
		width: 100%;
	}
</style>
