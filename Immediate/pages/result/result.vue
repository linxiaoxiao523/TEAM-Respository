<template>
	<view>
		<u-tabbar v-model="current" :show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: "#ffffff",
				current: 3,
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
		methods: {

		}
	}
</script>

<style>

</style>
