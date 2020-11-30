<template>

	<view class="daren">
		<view class="daren-banner-box">
			<view class="talentsub-background"></view>
			<view class="margin-tb-sm">
				<swiper :indicator-dots="false" :autoplay="true" interval="5000" duration="200" class="daren-banner-swiper">
					<swiper-item v-for="(item, index) in banner" :key="index">
						<image :src="item.picture" class="daren-slide-image" mode="widthFix" />
						<view class="talentsub-text">{{ item.title }}</view>
						<view class="talentsub-div">
							<view class="talentsub-num">
								<view class="number">555</view>
								<view class="danpin">ready to make a nice work</view>
							</view>
							<image src="https://pic.rmb.bdstatic.com/0992e030fe3c2f2095797781f39d1c185482.gif" mode=""></image>
						</view>
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
				<view class="wandering-div" v-for="(item, index) in 10" :key="index">
					<view class="wandering-top">
						<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605871082389&di=6d7c62dfb2e849fd63cf1ae8c7db6903&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171021%2Fa3bf958fdb54478cbb65779104dd82eb.jpeg"
						 mode="widthFix" class="wandering-image"></image>
						<view class="wandering-label">
							<text class="label-text">生活/</text>
							<text class="label-num">锻炼</text>
						</view>
					</view>
					<view class="wandering-desc">
						<view class="wandering-div-title"><text class="">涨知识，这些健身小常识知道了会对你有帮助，让你更具魅力</text></view>
						<view class="wandering-div-subtitle">
							<text class="">那么今天小编就要给大家说几个健身的小常识，这也许会对你的健身起到很大的帮助。</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor"></u-tabbar>
	</view>
</template>



<script>

	export default {
		data() {
			return {
				bgColor: "#ffffff",
				banner: [{
						picture: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3005384363,1609525191&fm=26&gp=0.jpg",
						title: '自律是一种习惯~'
					},

					{
						picture: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605728185428&di=1a0257b6dbd734fb330bd14a5d7205b8&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F19%2F03%2F06%2Fe741501f47455ccd4dd0ece360d06450.jpg",
						title: '夏日小确幸'
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
			};
		},
		onLoad() {uni.startPullDownRefresh()
		//onPullDownRefresh() {
		//			console.log('refresh');
		//			setTimeout(function () {
		//				uni.stopPullDownRefresh();
		//				// 这里放刷新数据的方法
		//			}, 1000);
		//		},
		},
		methods: {
			cbutton() {
				uni.navigateTo({
					// url: 'test?id=1&name=uniapp'  c传递参数

					url: "/pages/article_list/article_list"

				})
			}
		}
	};
</script>

<!-- <view class="refresh-view" bindtap="maketodos" hover="true" hover-class="refresh-view-hover"> -->
<!-- <image id="refresh" class="refresh-icon" src="/pages/index/timg.jpg"></image> -->
<!-- </view> -->
<!-- /按钮/ -->

<style>
	page {
		background: #f2f2f2;
	}

	.daren {
		width: 100%;
		box-sizing: border-box;
	}

	.daren-banner-box {
		width: auto;
		box-sizing: border-box;
		height: auto;
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
		color: #809def;
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

	.talentsub-background {
		position: absolute;
		top: 0;
		width: 100%;
		height: 140px;
		background-image: url('http://img.fqapps.com/FqkeWFSpNCpKEiM6Qgm_sabSD5Ag');
	}

	.week-title {
		font-size: 36upx;
		padding-left: 38upx;
		padding-top: 0upx;
		padding-bottom: 10upx;
		color: #484848;
	}

	.week-new {
		width: 100%;
		max-width: 100%;
	}

	.week-container {
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

	.week-container .swiper-wrapper {
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

	.week-container .swiper-wrapper .new-article .article-img {
		width: 100%;
		max-height: 300upx;
		display: block;
		border-top-left-radius: 12upx;
		border-top-right-radius: 12upx;
	}

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
		padding: 25upx;
	}

	.wandering-content .wandering-div {
		padding: 20upx;
		margin-bottom: 30upx;
		border-radius: 12upx;
		background: #ffffff;
	}

	.wandering-content .wandering-div .wandering-top {
		position: relative;
		margin-bottom: 10upx;
	}

	.wandering-content .wandering-div .wandering-top .wandering-image {
		width: 100%;
		height: 208upx !important;
		display: block;
		border-radius: 10upx;
	}

	.wandering-content .wandering-div .wandering-top .wandering-label {
		position: absolute;
		bottom: -20upx;
		left: 20upx;
		padding: 8upx 20upx;
		background: #fc9090;
		color: #ffffff;
		border-radius: 8upx;
	}

	.wandering-content .wandering-div .wandering-top .wandering-label .label-num {
		font-size: 28upx;
	}

	.wandering-content .wandering-div .wandering-div-title {
		display: block;
		color: #484848;
		padding-top: 25upx;
		padding-bottom: 20upx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.wandering-content .wandering-div .wandering-div-subtitle {
		font-size: 26upx;
		color: #999999;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
