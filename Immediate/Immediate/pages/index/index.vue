<template>
	<view class="content">
	        
	        <view class="uni-padding-wrap">
	            <view class="uni-common-mt" style="background:#a8a8a4; padding:20rpx;">
	                <rich-text :nodes="nodes"></rich-text>
	            </view>
	        </view>
	    </view>
</template>

<script>
export default {
    data() {
        return {
            nodes: [{
                name: 'div',
                attrs: {
                    class: 'div-class',
                    style: 'line-height: 35px; color:black; text-align:center;'
                },
                children: [{
                    type: 'text',
                    text: '今日食谱'
                }]
            }],
        }
    }
}
</script>

<style>
	
</style>
