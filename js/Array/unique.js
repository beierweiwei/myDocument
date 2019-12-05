Array.prototype.unique = function () {
	let resArr = [this[0]]
	for (let i = 1; i < this.length; i ++) {
		if (this.indexOf(this[i]) === i) resArr.push(this[i])
	}
	return resArr
}

Array.prototype.unique1 = function () {
	let resArr = []
	for (let i = 0; i < this.length; i++) {
		if (!~resArr.indexOf(this[i])) resArr.push(this[i])
	}
	return resArr 
}
// es5 
Array.prototype.unique2 = function () {
	return [...new Set (this)]
}
// test 
function generateRadomArr (len, rangeLeft, rangRight) {
	let resArr = []
	for (let i = 0; i < len; i ++) {
		let n = rangeLeft + (rangRight - rangeLeft) * Math.random()
		n = parseInt(n)
		resArr.push(n)
	}
	return resArr 
}

function testUnique(method, testArr) {
	console.time(method)
	let res = testArr[method]()
	console.timeEnd(method)
	console.log(res.length)
}

let testArr = generateRadomArr(10000, 0, 10000)
testUnique('unique', testArr)
testUnique('unique1', testArr)
testUnique('unique2', testArr)

// test result 
/*
node unique.js
unique: 47.919ms
6365
unique1: 34.068ms
6365
unique2: 1.835ms
6365

 */