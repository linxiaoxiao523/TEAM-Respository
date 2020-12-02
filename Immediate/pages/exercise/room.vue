<template>
	<view  >
		<view class="roomname">
			<p>房间名</p>
		</view>
		
		<view>
				<view class="Article">
					<!-- v-for 循环从数据库中传回的 articleLiet  并生成 card -->
					<u-card :border="true" margin="10rpx"  title-size=37 sub-title-size=28  sub-title-color= black v-for="article in articleList" :key="index1" :title="article.title" :sub-title="article.timelen" :thumb="article.cover"
					 @click='goto(article.url)' :show-foot="false">
						<view class="" slot="body">
							<u-row class="row1">
								<u-col class='col' span="9" align="left" >
									<u-icon name="clock-fill" size="34" color="" :label='article.time'></u-icon>
								</u-col>
								
								<u-col class='col' span="" align="">
									<view class="heat ">
										<u-icon name="star-fill" size="34" color="" :label="article.count" ></u-icon>
										<p> kcal</p>
									</view>
								</u-col>
							</u-row>
						</view>
					</u-card>
				</view>
				<u-back-top :scroll-top="scrollTop"></u-back-top>
			</scroll-view>
		</view>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				
				bgColor: "#ffffff",
				clearabled: true,
				showAction: true,
				inputAlign: 'left',
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				//card 数据库传回的推文信息
				articleList: [{
						cover: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1605788336&di=d7391ee28fe49a24cc8114c5fe776a31&src=http://img.mp.itc.cn/upload/20170205/377e86f8b5dd49c2bab67531169bb8bc_th.jpeg',
							//用户头像
						title: 'TTL233',  //用户昵称
						time: '2020-12-02',//用户加入健身房时间
						timelen:'00:06:40',//运动时长
						count: '999 ',      //用户消耗卡路里
					},
					{
						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '*******',
						time: '2020-02-01',
						timelen:'00:06:40',
						count: '999 ',
						
					},
					{
						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '*******',
						time: '2020-02-01',
						timelen:'00:06:40',
						count: '999 ',
					},
					{
						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '*******',
						time: '2020-02-01',
						timelen:'00:06:40',
						count: '999 ',
					},
					{
						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '*******',
						time: '2020-02-01',
						timelen:'00:06:40',
						count: '999 ',
					},
					{

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '*******',
						time: '2020-02-01',
						timelen:'00:06:40',
						count: '999 ',
					},
					{

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '*******',
						time: '2020-02-01',
						timelen:'00:06:40',
						count: '999 ',
					},
					{

						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '*******',
						time: '2020-02-01',
						timelen:'00:06:40',
						count: '999',
					},
					{
						cover: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3194055763,3664834051&fm=26&gp=0.jpg',
						title: '*******',
						time: '2020-02-01',
						timelen:'00:06:40',
						count: '999 ',
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
	
	.Article{
		background-color:#55557f;
		height: 120%;
		border-style:solid;
		border-color:#55557f;
	}
	.topback{
		background-color: white;
	}
	.topdot{
		background-color: white;
		color: white;
	}
	
	
	.heat {
		display: flex;
		flex-wrap: nowrap;
	}	
	.roomname{
		display: flex;
		justify-content: center;
		font-size: 36rpx;
	}
</style>
