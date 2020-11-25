<template>
    <view>
        <view>
            <view class="title">番茄牛腩</view>		
        </view>
		<view class="form1">
			<image src="../../static/niunan.jpg" mode="widthFix"></image>
		    <view>
				<text class="flex flex-direction">分类:私家菜\n</text>
				<text class="flex flex-direction">热量:135大卡\n</text>
				<text class="flex flex-direction">简介:色泽鲜艳、酸甜可口、肥烂不腻。西红柿中的番茄红素被称为“植物黄金”，具有强抗氧化功能，同样利于美容及皮肤健康。</text>
				
			
			
			</view>
			
			</view>
			<view>
            <t-table @change="change">
                <t-tr>
                    <t-th >营养素</t-th>
                    <t-th>含量</t-th>
                    
                </t-tr>
                <t-tr v-for="item in tableList1" :key="item.id">
                    
                    <t-td>{{ item.nutrion }}</t-td>
                    <t-td>{{ item.content }}</t-td>
                </t-tr>
            </t-table>
		</view>
		<view class="title2">
		营养价值	
		</view >
			<view>西红柿内的苹果酸和柠檬酸等有机酸既有保护所含。。。</view>
		
   
    </view>
</template>

<script>
    import tTable from '@/components/t-table/t-table.vue';
    import tTh from '@/components/t-table/t-th.vue';
    import tTr from '@/components/t-table/t-tr.vue';
    import tTd from '@/components/t-table/t-td.vue';
    export default { 
        components: {
            tTable,
            tTh,
            tTr,
            tTd
        },
        data() {
            return {
				
                tableList1: [{
                        id: 0,
                        nutrion: '热量（大卡）',
                        content: '135.17',
                    },
                    {
                        id: 1,
                        nutrion: '脂肪（克）',
                        content: '6.21',
                    },
                    {
                        id: 2,
                        nutrion: '纤维素（克）',
                        content: '0.57',
                    },
                    {
                        id: 3,
                        nutrion: '碳水化合物（克）',
                        content: '12.94',
                    },
					{
					    id: 4,
					    nutrion: '蛋白质（克）',
					    content: '7.42',
					}
                ]
            };
        },
        methods: {
            change(e) {
                console.log(e.detail);
            },
            edit(item) {
                uni.showToast({
                    title: item.name,
                    icon: 'none'
                });
            }
        }
    };
</script>

<style>
	.title{
		background-color: #A0CFFF;
		text-align: center;
		display: flex; 
		flex-direction: column;
		align-items: center;
	},
	.form1{
		display: flex;
		justify-content: space-between;
		text-align: left;
		text-decoration: underline;
	}
	.title2{
		background-color: #999999;
		text-align: center;
		display: flex; 
		flex-direction: column;
		align-items: center;
		border: 3rpx solid #555555;
		border-radius: 10rpx;
		padding: 10rpx;
	}
		
</style>

