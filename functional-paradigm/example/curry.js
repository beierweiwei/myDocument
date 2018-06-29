var _ = require('lodash')
var curry = _.curry 

var add = function (x) {
	return function (y) {
		return x + y
	}
}

var addOne = add(1)
var addTen = add(10)

var r1 = addOne(1)
var r2 = addTen(1)

console.log(r1, r2)

add = curry(function (x, y) {
	return x + y
})

addOne = add(1)
addTen = add(10)

var r3 = addOne(1)
var r4 = add(1, 1)
var r5 = addTen(1)
var r6 = add(10, 1)

console.log(r3, r4, r5, r6)

var split = curry(function(splitStry, what){
	return what.split(splitStry)
})

var words = split(' ')

//test 
var abc = words('123 456 sdf skdfj  sdkfj')

sentences = map(words)



var map = curry(function (operator,sentencesStr) {
	return map(sentencesStr, operator)
})

console.log(abc)

var slice = curry(function (end, string) {
	return string.slice(end)	
}) 

var removeHead = slice(0)


var isLasetInStock = compose(_.prop('in_stock'),last)

var nameofFirstCar = compose(_.prop('name'), _.head)

compose(_average,  map(function(c){return c.dollar_value}))

sanitizeNames = compose(map(_underscores))

var availablePrice = compose(_curry(function(js, str) {
	return str.join(js)
}),map(function(x) {
	return accouting.formateMoney(x.dollar_value)
}),map(_.props('in_stock')))