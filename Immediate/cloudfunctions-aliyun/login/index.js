'use strict';
exports.main = async (event, context) => {
	let secret = '26e5c9d1b35ac21df0c0c9600886a266'
	let appid = 'wxcb70e32f42968687'
	let code = event.code
	let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +
		code + '&grant_type=authorization_code';
	// uni.request({
	// 	url: url, // 请求路径
	// 	method: 'GET', //请求方式
	// 	success: result => {
	// 		//响应成功
	// 		//这里就获取到了openid了
	// 		return result.data.openid
	// 	},
	// 	fail: err => {} //失败
	// });
	const res = await uniCloud.httpclient.request(url, {
		method: 'GET',
		dataType: 'json'
	})
	return res
};
