//获取QueryString的数组
const getQueryStr = function() {
	var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&#]+", "g"))
	if (result == null) {
		return ""
	}
	for (var i = 0; i < result.length; i++) {
		result[i] = result[i].substring(1)
	}
	return result
}

//根据QueryString参数名称获取值

const getQueryStrgByName = function(name) {
	var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&#]+)", "i"))
	if (result == null || result.length < 1) {
		return ""
	}
	return result[1]
}

var urlEncode = function(param, key, encode) {
	if (param == null) return '';
	var paramStr = '';
	var t = typeof(param);
	if (t == 'string' || t == 'number' || t == 'boolean') {
		paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
	} else {
		for (var i in param) {
			var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
			paramStr += urlEncode(param[i], k, encode);
		}
	}
	return paramStr;
}

