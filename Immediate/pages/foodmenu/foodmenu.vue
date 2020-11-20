<template>
	<view class="container">
			<view class="title">推荐菜谱</view>

			<view>  
			    <uni-list  id="onemenu" v-for="(item,index) in productList" :key="index"> 
				   
						<uni-list-item :thumb="item.picture"  :title="item.title"  :note="item.note" :show-arrow=false > 
							<button class="add">+</button>
						</uni-list-item>            
						
			    </uni-list>
			    
			    </view>
				
		
				<view class="loading">{{loadingText}}</view>
				 <view class="footer">
						<button type="primary">提交</button>
					 </view>
			</view>

</template>

<script>
	 import uniList from "@/components/uni-list/uni-list.vue"
	    import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	    export default {
	        components: {uniList,uniListItem},
	        data() {
	            return {
	                productList: [],
	            };
	        },
	        onLoad() {
	            this.getList();
	        },
	        methods: {          
	            getList() {         
	                uni.request({
	                    url: "../../static/foodmenu.json",                  
	                    method: 'get',
	                    dataType: 'json',
	                    success: (res) => {
	                        console.log(res.data);
	                        this.productList = res.data;
	                    },                  
	                });
	            },
				
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
		overflow:scroll;
	}


	.title {
		height: 40px;
		line-height: 40px;
		font-size: 20px;
		text-align:center;
		font-weight: 500;
	}
	.start{
		position: fixed;
		height: 0;
		border-top: none;
		border-bottom: 24px ;
		bottom: 0px;
	}
.uni-list-item {
	display: flex;
	/*align-items: left;垂直居中*/
	justify-content: center;/*水平居中*/
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
.add{
	display: flex;
	/*align-items: left;垂直居中*/
	justify-content: center;/*水平居中*/
	margin-right: 1px;
	margin-top:auto;
	font-size: 1px;
}
</style>
