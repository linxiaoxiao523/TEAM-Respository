<template>
		<view>
		<!-- 吸顶 搜索框 -->
		<u-sticky>
			<view class="topback">
				<view class="room">
					<u-dropdown class="column1" >
						<u-dropdown-item @change="change" v-model="value1" :title=str :options="options1"></u-dropdown-item>
					</u-dropdown>
				</view>
			</view>
		</u-sticky>
		
			<view>
				<view class='Article'>
					<!-- v-for 循环从数据库中传回的 articleLiet  并生成 card -->
						<u-card  margin="40rpx" padding="40" v-for="article in articleList" :key="index1" :title="article.title" :sub-title="article.time" :thumb="article.cover" :show-foot="false">
							<view class="" slot="body">
								<u-row class="row1">
									<u-col class='col' span="9" align="left" >
										<u-icon name="man-add-fill" size="34" color="black" :label=" article.count"></u-icon>
									</u-col>
	                           <!-- 注册点击事件，跳转到相应的房间内部-->
									<u-col class='col' span="" align=" ">
									<navigator url="/pages/room/room" >
										<button class="button" >进入</button>
									</navigator>
									</u-col>
								</u-row>
							</view>
						</u-card>
				</view>
			</view>
		</view>
</template>



<script>
	export default {
		data() {
			return {
				num:0,  //所有房间总人数
				value1: 1,
				str: "运动类型",
				array: ['跑步','散步','无氧运动','耐力训练','力量训练','增肌训练'],
				options1: [{
						label: '跑步',
						value: 1,
					},
					{
						label: '散步',
						value: 2,
					},
					{
						label: '无氧运动',
						value: 3,
					},
					{
						label: '耐力训练',
						value: 4,
					},
					{
						label: '力量训练',
						value: 5,
					},
					{
						label: '增肌训练',
						value: 6,
					},
				],
				articleList: [{
						title: '一起跑步呀！！！', //房间名
						count: '0',  //当前房间人数
					},
					{
							title: '挑战自我！！！', //房间名
							count: '999',  //当前房间人数
						},
					{
							title: '一起运动呀！！！', //房间名
							count: '999',  //当前房间人数
						},	
					{
							title: '一起跑步呀！！！', //房间名
							count: '999',  //当前房间人数
						},
					{
							title: '一起跑步呀！！！', //房间名
							count: '999',  //当前房间人数
						},
					{
							title: '一起跑步呀！！！', //房间名
							count: '999',  //当前房间人数
						},
					{
							title: '一起跑步呀！！！', //房间名
							count: '999',  //当前房间人数
						},
					{
							title: '一起跑步呀！！！', //房间名
							count: '999',  //当前房间人数
						},
					{
							title: '一起跑步呀！！！', //房间名
							count: '999',  //当前房间人数
						},
					{
							title: '一起跑步呀！！！', //房间名
							count: '999',  //当前房间人数
						},
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
			change(index){
				this.str = this.array[index-1]
			}
		}
	}
</script>

<style scoped lang="scss">
	.row1 {
		margin: 70rpx ;
	}

	.scroll-Y {
		height: auto;
	}
	//小程序里没变	

	
</style>

<style lang="scss" scoped>

	.Article{
		position:absolute;
		width:100%;
		background-color: rgba($color:#55557f, $alpha: 0.5);
		margin-top:-12%;
		paddding-top:-10%;
	}
	
	.topback{
		background-color: white;
		margin:0 0 10% 0;
	}
		
	.column1{
		// position: absolute;
		width:100%;
		background-color: white;
		text-align: left;
	}
	
	.button{
		 position: absolute;
		 top: 81%;
		 left:78%;
		 width: 110rpx;
		 height: 40rpx;
		 font-size: 20rpx;
	}
	
</style>
