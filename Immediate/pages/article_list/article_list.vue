<template>
	<div>
		<!-- 吸顶 搜索框 -->
		<u-sticky>
			<view>
				<u-row>
					<u-search v-model="keyword" @change="change" @custom="custom" @search="search" :shape="shape" :clearabled="clearabled"
					 :show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
				</u-row>
			</view>
		</u-sticky>

		<view>
			<scroll-view scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
			 @scrolltolower="lower" @scroll="scroll">
				<view id='Article'>
					<!-- v-for 循环从数据库中传回的 articleLiet  并生成 card -->
					<!-- 注册点击事件，跳转到相应的推文界面 -->
					<u-card v-for="article in articleList" :key="index1" :title="article.title" :sub-title="article.time" :thumb="article.cover"
					 @click='goto(article.url)' :show-foot="false">
						<view class="" slot="body">
							<u-row class="row1">
								<u-col class='col' span="9" align="left">
									<u-icon name="clock-fill" size="34" color="" :label='article.time'></u-icon>
								</u-col>

								<u-col class='col' span="" align="">
									<u-icon name="heart-fill" size="34" color="red" :label="article.count"></u-icon>
								</u-col>
							</u-row>
						</view>
					</u-card>
				</view>
				<u-back-top :scroll-top="scrollTop"></u-back-top>
			</scroll-view>
		</view>
		<u-tabbar v-model="current" show="true" :bg-color="bgColor" :border-top="borderTop" :list="list" :inactive-color="inactiveColor"
		 :activeColor="activeColor"></u-tabbar>
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
				articleList: [{
						cover: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1605788336&di=d7391ee28fe49a24cc8114c5fe776a31&src=http://img.mp.itc.cn/upload/20170205/377e86f8b5dd49c2bab67531169bb8bc_th.jpeg',
						title: '健康减肥食谱',
						time: '2020-02-02',
						count: '999',
						content: '',
						url: 'http://www.baidu.com'
					},
					{
						// 	cover: require('@/assets/images/article-cover-2.jpg'),

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '6个超强燃脂技巧',
						time: '2020-02-01',
						count: '999',
						content: '今天是2月1日，疫情仍在延续。在大部分人还在家里“避险”的时候，医生、警察们早已坚守在自己的工作岗位，用自己的血肉之躯铸就抗击疫情的钢铁长城。钢轨上，火车呼啸，铁路人们也早早地来到单位，他们为运输物资的重要“生命线”保驾护航。新型冠状肺炎疫情打响后，车站封闭、乡镇互关，交通不便，留守值班干部职工的日常生活、防控药品极缺。',
						url: 'http://www.baidu.com'
					},
					{
						// 	cover: require('@/assets/images/article-cover-2.jpg'),

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '6个超强燃脂技巧',
						time: '2020-02-01',
						count: '999',
						content: '今天是2月1日，疫情仍在延续。在大部分人还在家里“避险”的时候，医生、警察们早已坚守在自己的工作岗位，用自己的血肉之躯铸就抗击疫情的钢铁长城。钢轨上，火车呼啸，铁路人们也早早地来到单位，他们为运输物资的重要“生命线”保驾护航。新型冠状肺炎疫情打响后，车站封闭、乡镇互关，交通不便，留守值班干部职工的日常生活、防控药品极缺。',
						url: 'http://www.baidu.com'
					},
					{
						// 	cover: require('@/assets/images/article-cover-2.jpg'),

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '6个超强燃脂技巧',
						time: '2020-02-01',
						count: '999',
						content: '今天是2月1日，疫情仍在延续。在大部分人还在家里“避险”的时候，医生、警察们早已坚守在自己的工作岗位，用自己的血肉之躯铸就抗击疫情的钢铁长城。钢轨上，火车呼啸，铁路人们也早早地来到单位，他们为运输物资的重要“生命线”保驾护航。新型冠状肺炎疫情打响后，车站封闭、乡镇互关，交通不便，留守值班干部职工的日常生活、防控药品极缺。',
						url: 'http://www.baidu.com'
					},
					{
						// 	cover: require('@/assets/images/article-cover-2.jpg'),

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '6个超强燃脂技巧',
						time: '2020-02-01',
						count: '999',
						content: '今天是2月1日，疫情仍在延续。在大部分人还在家里“避险”的时候，医生、警察们早已坚守在自己的工作岗位，用自己的血肉之躯铸就抗击疫情的钢铁长城。钢轨上，火车呼啸，铁路人们也早早地来到单位，他们为运输物资的重要“生命线”保驾护航。新型冠状肺炎疫情打响后，车站封闭、乡镇互关，交通不便，留守值班干部职工的日常生活、防控药品极缺。',
						url: 'http://www.baidu.com'
					},
					{
						// 	cover: require('@/assets/images/article-cover-2.jpg'),

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '6个超强燃脂技巧',
						time: '2020-02-01',
						count: '999',
						content: '今天是2月1日，疫情仍在延续。在大部分人还在家里“避险”的时候，医生、警察们早已坚守在自己的工作岗位，用自己的血肉之躯铸就抗击疫情的钢铁长城。钢轨上，火车呼啸，铁路人们也早早地来到单位，他们为运输物资的重要“生命线”保驾护航。新型冠状肺炎疫情打响后，车站封闭、乡镇互关，交通不便，留守值班干部职工的日常生活、防控药品极缺。',
						url: 'http://www.baidu.com'
					},
					{
						// 	cover: require('@/assets/images/article-cover-2.jpg'),

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '6个超强燃脂技巧',
						time: '2020-02-01',
						count: '999',
						content: '今天是2月1日，疫情仍在延续。在大部分人还在家里“避险”的时候，医生、警察们早已坚守在自己的工作岗位，用自己的血肉之躯铸就抗击疫情的钢铁长城。钢轨上，火车呼啸，铁路人们也早早地来到单位，他们为运输物资的重要“生命线”保驾护航。新型冠状肺炎疫情打响后，车站封闭、乡镇互关，交通不便，留守值班干部职工的日常生活、防控药品极缺。',
						url: 'http://www.baidu.com'
					},
					{
						// 	cover: require('@/assets/images/article-cover-2.jpg'),

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '6个超强燃脂技巧',
						time: '2020-02-01',
						count: '999',
						content: '今天是2月1日，疫情仍在延续。在大部分人还在家里“避险”的时候，医生、警察们早已坚守在自己的工作岗位，用自己的血肉之躯铸就抗击疫情的钢铁长城。钢轨上，火车呼啸，铁路人们也早早地来到单位，他们为运输物资的重要“生命线”保驾护航。新型冠状肺炎疫情打响后，车站封闭、乡镇互关，交通不便，留守值班干部职工的日常生活、防控药品极缺。',
						url: 'http://www.baidu.com'
					},
					{
						// 	cover: require('@/assets/images/article-cover-2.jpg'),

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '6个超强燃脂技巧',
						time: '2020-02-01',
						count: '999',
						content: '今天是2月1日，疫情仍在延续。在大部分人还在家里“避险”的时候，医生、警察们早已坚守在自己的工作岗位，用自己的血肉之躯铸就抗击疫情的钢铁长城。钢轨上，火车呼啸，铁路人们也早早地来到单位，他们为运输物资的重要“生命线”保驾护航。新型冠状肺炎疫情打响后，车站封闭、乡镇互关，交通不便，留守值班干部职工的日常生活、防控药品极缺。',
						url: 'http://www.baidu.com'
					}
				],
				show: true,
				bgColor: '#ffffff',
				borderTop: true,
				midButton: true,
				inactiveColor: '#909399',
				activeColor: '#5098FF',
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			goto(url) {
				console.log(url)
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
	.container {
		height: 200vh;
		margin-top: 150rpx;
	}

	.sticky {
		width: 750rpx;
		height: 120rpx;
		background-color: #2979ff;
		color: #fff;
		padding: 24rpx;
	}
</style>
