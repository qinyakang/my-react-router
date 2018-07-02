/**
 * 封装ajax统一控制
 * @param {Object} rquest
 */
function $myAjax(rquest) {
	return new Promise(function(resolve, reject) {
		$.ajax({
			url: rquest.url,
			type: rquest.type || 'get',
			data: rquest.data || {},
			async: rquest.async == undefined ? true : rquest.async,
			contentType: rquest.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function(res) {
				resolve(res);
			},
			error: function(res) {
				reject(res);
			}
		});
	});
}
