//node中的this、global
/**
 * 全局的global和this没有联系
 * 全局的this是一个空对象
 * 函数中的this会指向全局的global对象
 * 
 */

console.log(this); //{}
this.num = 10;
console.log(this.num); //10
console.log(global.num); //undefined

function test() {
	this.testFnName = 'test';
	console.log('is this eq global', this === global);
}

test();

console.log('global.testFnName', global.testFnName); //'test'


require('./Module.js');