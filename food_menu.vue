<template>
	<view class="container">
		<!-- <view class="title">推荐菜谱</view> -->
		<u-tabs :list="pageList" :is-scroll="false" :current="currentPage" @change="changePage"></u-tabs>
		<view>
			<uni-list id="onemenu" v-for="(item,index) in productList" :key="index">

				<uni-list-item :thumb="item.picture" :title="item.title" :note="item.note" :show-arrow=false @click="articlechang(item.id)">
					<button class="add">+</button>
				</uni-list-item>

			</uni-list>

		</view>


		<!-- <view class="loading">{{loadingText}}</view> -->
		<view class="footer">
			<button type="primary">提交</button>
		</view>
		<div>
			<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
			 :activeColor="activeColor"></u-tabbar>
		</div>
	</view>

</template>

<script>
	// import uniList from "@/components/uni-list/uni-list.vue"
	//    import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
		// components: {uniList,uniListItem},
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
				currentPage: 0,
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
				productList: [{
						"id": "5fbfd35eff938a78a3bac5ab",
						title:'', 
						note: '',
						"热量": "135.17",
						"脂肪": "6.21",
						"纤维素": "0.57",
						"碳水化合物": "13.17",
						"蛋白质": "7.42",
						"picture": "../../static/00001.jpg"
					},
					{
						"id": "000002",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					},
					{
						"id": "000003",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					},
					{
						"id": "000004",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					},
					{
						"id": "000005",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					},
					{
						"id": "000006",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					},
					{
						"id": "000007",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					},
					{
						"id": "000008",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					},
					{
						"id": "000009",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					},
					{
						"id": "000010",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					},
					{
						"id": "000011",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					},
					{
						"id": "000012",
						title:'',
						note: '',
						"热量": "74.17",
						"脂肪": "4.21",
						"纤维素": "0.02",
						"碳水化合物": "3.17",
						"蛋白质": "4.42",
						"picture": "../../static/00002.jpg"
					}
				],
			};
		},
		onLoad(options) {
			let that = this;
			 
			const db = uniCloud.database()
			db.collection('recipes')
				.where({
					_id:that.menuid
				})
				.get({
					getOne:true,
					})
				.then(res => {
					console.log(res),
					console.log(res.result.data.foodname),
					that.name = res.result.data.foodname,
					console.log(that.name),
					that.productList[0].title = res.result.data.foodname	
					that.productList[1].title = res.result.data.foodname	
					that.productList[2].title = res.result.data.foodname
	
				})
				.catch(err => {
					console.log(err)
				})
		},
		methods: {
			articlechang(id) {
				var menuid = JSON.stringify(id)
				console.log(menuid);
				uni.navigateTo({
					url: "/pages/food_details/food_details?menuid="+menuid
				})
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
	page {
		background-size: 100% 100%;
		display: flex;
		flex-direction: column;
	}

	.container {
		width: 100%;
		padding: 20px;
		overflow: scroll;
	}


	.title {
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		text-align: center;
		font-weight: 500;
	}

	.start {
		position: fixed;
		height: 0;
		border-top: none;
		border-bottom: 24px;
		bottom: 0px;
	}

	.uni-list-item {
		display: flex;
		/*align-items: left;垂直居中*/
		justify-content: center;
		/*水平居中*/
		border-width: 1px;
		border-style: solid;
		border-color: #E5E5E5;

	}

	.part {
		background-color: #d4cfcf;
		padding: 10upx;
	}

	.footer {
		line-height: 100rpx;
		flex: 0 0 100rpx;
	}

	.add {
		display: flex;
		/*align-items: left;垂直居中*/
		justify-content: center;
		/*水平居中*/
		margin-right: 1px;
		margin-top: auto;
		font-size: 1px;
	}
</style>
