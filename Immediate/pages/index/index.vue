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
						<view class="wandering-div-title">涨知识，这些健身小常识知道了会对你有帮助，让你更具魅力</text></view>
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
			};
		},
		onLoad() {},
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
		border-right:none;
		border-bottom-style:dotted;
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
 *//* 
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
 *//* 
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
