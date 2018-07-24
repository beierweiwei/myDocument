require.config({
	paths: {
		ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
  	jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
	}
})

require([
	'ramda', 
	'jquery'
	], function (_, $) {
// 函数式编程
		var trace = _.curry(function (tag, x) {
			console.log(tag, x)
			return x
		})

		var Impure = {
			getJSON: _.curry(function (cb, url) {
				$.getJSON(url, cb)
			}),
			setHtml: _.curry(function (sel, html) {
				$(sel).html(html)
			})
		}
		var img = function (url) {
			return $('<img/>', {src: url})
		}
		var url = function (term) {
			return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
		}

		var mediaUrl = _.compose(_.prop('m'), _.prop('media'))
		var urlToImg = _.compose(img, mediaUrl)
		var images = _.compose(_.map(urlToImg), _.prop('items'))

		//var images = _.compose(_.map(img), srcs)
		
		var renderImages = _.compose(Impure.setHtml('body'), images)
		var app = _.compose(Impure.getJSON(renderImages), url)
		app('girl'); 
		// 面向过程
		// var app = function (term) {
		// 	$.getJSON('https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?', render)
		// }
		// var render = function(res) {
		// 	var html = res.items.map(item => $('<img/>', {src: item.media.m}))
		// 	$('body').html(html)
		// }
		// app('girl')
	})

