<template>
	<view class="container">
		<view class="daren">
			<view class="daren-banner-box">
				<view class="talentsub-background"></view>
				<view class="margin-tb-sm">
					<swiper :indicator-dots="true" :autoplay="true" interval="6000" duration="1500" class="daren-banner-swiper">
						<swiper-item v-for="(item, index) in banner" :key="index">
							<image :src="item.picture" class="daren-slide-image" mode="widthFix" />
							<view class="talentsub-text">{{ item.title }}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>

			<view class="wandering">
				<u-row class="wandering-title">
					<u-col class="col" span="7" align="left">健康小常识</u-col>
					<u-button class="button" size="medium" :plain="true" shape="circle" @click="cbutton">MORE+</u-button>
				</u-row>


				<view class="wandering-content">
					<view class="wandering-div" v-for="(item,index) in articles" :key="index">
						<uni-card @click="change(item.id)" :title="item.title" mode="style" is-shadow="true" :thumbnail="item.picture" >
						</uni-card>
					</view>
				</view>
			</view>
			<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
			 :activeColor="activeColor"></u-tabbar>
		</view>
	</view>
</template>



<script>
	export default {
		data() {
			return {
				bgColor: "#ffffff",
				banner: [{
						picture: "https://pcsdata.baidu.com/thumbnail/96fcbd52cj7aefbf6cf61dd743ca61c5?fid=3716426565-16051585-1118935599170299&rt=pr&sign=FDTAER-yUdy3dSFZ0SVxtzShv1zcMqd-BgH0fuxReRgjVlXtjqToY0KAwgo%3D&expires=2h&chkv=0&chkbd=0&chkpc=&dp-logid=3813560643&dp-callid=0&time=1606395600&size=c1600_u1600&quality=100&vuk=-&ft=video",
						title: '打败朋友圈的英式早餐'
					},
					{
						picture: "https://pcsdata.baidu.com/thumbnail/57534ad35m2e3503c9ddd744f33d9e8e?fid=3716426565-16051585-15977188662631&rt=pr&sign=FDTAER-yUdy3dSFZ0SVxtzShv1zcMqd-SqxEfNaEkPtQLGjRvSQd7VRqLF8%3D&expires=2h&chkv=0&chkbd=0&chkpc=&dp-logid=3939509035&dp-callid=0&time=1606399200&size=c1600_u1600&quality=100&vuk=-&ft=video",
						title: '亲测！连续晨跑一个月后，谈谈我的真实感受'
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
				articles: []
			};
		},
		onLoad() {
			const db = uniCloud.database()
			db.collection('article').get({
				getCount: true,
			}).then(res => {
				console.log(res);
				var num = this.getRandomInt(0, 2)
				console.log(num)
				for (var i = 0; i < 2; i++) {
					this.articles.push({
						id: res.result.data[num]._id,
						title: res.result.data[num].title,
						picture: res.result.data[num].picture,
					});
					num++
				}
			})
		},
		methods: {
			change(id) {
				var articleid = JSON.stringify(id)
				uni.navigateTo({
					url: "/pages/article_details/article_details?articleid=" + articleid
				})
			},
			
			getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},
			cbutton() {
				uni.navigateTo({
					url: "/pages/article_list/article_list"
				})
			}
		}
	};
</script>


<style>
	.page {
		background: #f2f2f2;
	}

	.daren {
		width: 100%;
		box-sizing: border-box;
		/* 		border:#000000;
		border-size:300rpx; */
	}

	.daren-banner-box {
		box-sizing: border-box;
		border-color: #026dd1;
		border-style: solid;
		border-left: none;
		border-right: none;
		border-bottom-style: dotted;
	}

	.daren-banner-box .margin-tb-sm {
		margin-top: 20upx;
		padding: 0 20upx;
	}

	.daren-banner-swiper {
		width: 100%;
		height: 400upx;
		border-radius: 12upx;
		overflow: hidden;
		transform: translateY(0);
	}

	.daren-slide-image {
		width: 100%;
		height: 260upx;
		display: block;
		max-height: 260upx !important;
		min-height: 260upx !important;
		transform: translate3d(0, 0, 0);
		margin-left: 10upx;
		margin-right: 10upx;
		border-top-left-radius: 12upx;
		border-top-right-radius: 12upx;
	}

	.daren-banner-swiper .talentsub-text {
		display: block;
		background: #ffffff;
		color: #333333;
		padding: 1rem;
		font-size: 30upx;
		border-bottom-left-radius: 12upx;
		border-bottom-right-radius: 12upx;
		margin-left: 10upx;
		margin-right: 10upx;
	}

	.talentsub-div {
		position: absolute;
		bottom: 30upx;
		right: 20upx;
		width: 140upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 8upx;
		padding-top: 0;
		background: rgba(250, 250, 250, 0.9);
		border-top-left-radius: 6px;
		border-top-right-radius: 30px;
	}

	.talentsub-num {
		color: #7590da;
		padding-top: 20upx;
		padding-bottom: 10upx;
	}

	.talentsub-num .number {
		text-align: center;
		font-size: 35upx;
	}

	.talentsub-num .danpin {
		font-size: 30upx;
		display: block;
		text-align: center;
	}

	.talentsub-div image {
		width: 120upx;
		height: 120upx;
		border-radius: 6px;
	}

	/* 	.week-title {
		font-size: 36upx;
		padding-left: 38upx;
		padding-top: 0upx;
		padding-bottom: 10upx;
		color: #484848;
	} */

	/* 	.week-new {
		width: 100%;
		max-width: 100%;
	}
 */
	/* 	.week-container {
		white-space: nowrap;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		list-style: none;
		padding: 0;
		z-index: 1;
		padding-top: 0upx;
		padding-left: 25upx;
		padding-right: 25upx;
		border-radius: 12upx;
	}
 */
	/* .week-container .swiper-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 1;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-transition-property: -webkit-transform;
		transition-property: -webkit-transform;
		-o-transition-property: transform;
		transition-property: transform;
		transition-property: transform, -webkit-transform;
		-webkit-box-sizing: content-box;
		box-sizing: content-box;
		transition-timing-function: ease-out;
		margin: 0 auto;
		border-radius: 12upx;
	}
 */
	/* 
	.week-container .swiper-wrapper .new-article {
		display: inline-block;
		background: #ffffff;
		border-radius: 12upx;
		-webkit-flex-shrink: 0;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		width: 70%;
		height: 100%;
		position: relative;
		transition-property: transform;
		transform: translate3d(0, 0, 0);
		margin-right: 20upx;
	}
 */
	/* 
  */
	/* 	.wandering{
		border-color: #000000;
		border-style: solid;
		border-size:300rpx;
	} */

	.week-container .swiper-wrapper .new-article .article-title {
		font-size: 30upx;
		color: #484848;
		display: block;
		padding-top: 16upx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-left: 16upx;
	}

	.week-container .swiper-wrapper .new-article .article-info {
		display: flex;
		align-items: center;
		padding: 16upx;
	}

	.week-container .swiper-wrapper .new-article .info-img {
		width: 45upx;
		height: 45upx;
		border-radius: 100%;
		margin-right: 16upx;
	}

	.week-container .swiper-wrapper .new-article .info-name {
		font-size: 30upx;
		color: #666;
	}

	.week-container .swiper-wrapper .new-article .detail {
		position: absolute;
		right: 16upx;
		font-size: 26upx;
		color: #666;
	}

	/*大家都在逛*/
	.wandering-title {
		font-size: 36upx;
		padding-left: 38upx;
		padding-top: 20upx;
		padding-bottom: 10upx;
		color: #484848;
	}

	.wandering-content {
		padding: 5rpx;
	}

	.wandering-content .wandering-div {
		padding: 5rpx;
		margin-bottom: 5upx;
		
		border-radius: 12upx;
		background: #ffffff;
	}
</style>
