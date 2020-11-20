'use strict';

const db = uniCloud.database()
exports.main = async (event, context) => {
	let res = await db.collection('food').where({
	  fname:event.fname
	  }).get()
	
	return res
};