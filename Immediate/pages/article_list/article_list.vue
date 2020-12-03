<template>
	<div>
		<!-- 吸顶 搜索框 -->

		<u-sticky>
			<view class="topback">
				<u-row>
					<u-search v-model="keyword" @change="change" @custom="custom" @search="search" :shape="shape" :clearabled="clearabled"
					 :show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
				</u-row>
				<!-- 			<view class="topdot"> .</view> -->
			</view>
		</u-sticky>



		<view>
			<scroll-view scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
			 @scrolltolower="lower" @scroll="scroll">
				<view id='Article'>
					<!-- v-for 循环从数据库中传回的 articleLiet  并生成 card -->
					<!-- 注册点击事件，跳转到相应的推文界面 -->
					<u-card v-for="(article,index) in articleList" :key="index" :title="article.title" :thumb="article.cover" @click='goto(article.id)'
					 :show-foot="false">
						<view class="" slot="body">
							<u-row class="row1">
								<u-col class='col' span="9" align="left">
									<u-icon name="clock-fill" size="34" color="" :label='article.time'></u-icon>
								</u-col>

<!-- 								<u-col class='col' span="" align="">
									<u-icon name="heart-fill" size="34" color="red" :label="article.count"></u-icon>
								</u-col> -->
							</u-row>
						</view>
					</u-card>
				</view>
				<u-back-top :scroll-top="scrollTop"></u-back-top>
			</scroll-view>
		</view>
		<!-- <u-tabbar v-model="current" show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor"></u-tabbar> -->
	</div>
</template>



<script>
	export default {
		data() {
			return {

				//search 搜索框属性
				scrollTop: 0,
				keyword: '请输入关键字',
				value: '',
				shape: 'round',
				bgColor: "#ffffff",
				clearabled: true,
				showAction: true,
				inputAlign: 'left',
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				//card 数据库传回的推文信息
				articleList: [],
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF',
			}
		},
		onLoad() {
			const db = uniCloud.database()
			db.collection('article')
			.orderBy('time desc')
			.get({
				getCount: true,
			}).then(res => {
				console.log(res);
				for (var i = 0; i < res.result.count; i++) {
					this.articleList.push({
						"id": res.result.data[i]._id,
						"title": res.result.data[i].title,
						"cover": res.result.data[i].picture,
						"time": res.result.data[i].time
					});
				}
			})
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			goto(id) {
				var articleid = JSON.stringify(id)
				console.log(articleid)
				uni.navigateTo({
					url: "/pages/article_details/article_details?articleid=" + articleid
				})
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

<style scoped lang="scss">
	.u-row {
		margin: 70px;
	}

	.scroll-Y {
		height: auto;
	}
</style>

<style lang="scss" scoped>
	// .container {
	// 	position:absolute;
	// 	// height: 200vh;
	// 	// margin-top: 150rpx;
	// 	// background-color: #FFFFFF;
	// }

	.sticky {
		width: 750rpx;
		height: 120rpx;
		background-color: #2979ff;
		color: #fff;
		padding: 24rpx;
	}

	#Article {
		postion: absolute;
		background-color: rgba($color:#2979ff, $alpha: 0.5);
		height: 100%;
		padding-top: 2%;

	}

	.topback {
		positon: absolute;
		background-color: white;
		margin-bottom: 2%;
	}
</style>
