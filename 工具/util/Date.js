Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, // month
		"d+": this.getDate(), // day
		"h+": this.getHours(), // hour
		"m+": this.getMinutes(), // minute
		"s+": this.getSeconds() // second
	};
    
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1,
		    RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}


function formDateTime (time, format) {
	time = new Date(time)
	var o = {
		"M+": time.getMonth() + 1, // month
		"d+": time.getDate(), // day
		"h+": time.getHours(), // hour
		"m+": time.getMinutes(), // minute
		"s+": time.getSeconds() // second
	};
    
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1,
		    RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}