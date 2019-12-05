window.onload = function() {
	document.getElementsByClassName('header')[0].style.background = "green";
}

var scriptEle = document.createElement('script');
scriptEle.onload = function() {
	console.log('scriptEle has loaded!!!');
}

scriptEle.src = './asyncTest.js';

document.body.appendChild(scriptEle);
