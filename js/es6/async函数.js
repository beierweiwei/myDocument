/**
 * 简单来说 async函数其实就是generagtor的语法糖
 * 它内置执行器来执行async函数。 
 * await后一般跟promise对象，如果普通对象或值await会把它转换成立即返回的promise对象。
 * 等待promise对象完成后，将promise完成时返回的值传提取出来；
 *
 * 作用：异步开发的回调嵌套，和gennerator比起来更简单，清晰，语义化、返回promise
 *
 * 场景：1、异步操作
 * 			 2、流程控制
 */

async function getSomething() {
	let something = {far: 'bar'};
	var result = await Promise.resolve(something).then((val) => val);
	return result;
}

async function getSomethingAfter() {
	var getSomethingPromise = getSomething();
	let res1 = await getSomethingPromise.then((val) => { val.res1 = val.far; return val});
	let res2 = await 123;
	let res3 = await null;
	console.log('getSomething() instanceof Promise is', getSomethingPromise instanceof Promise);

	console.log('res1:', res1);
	console.log('res2:', res2);
	console.log('res3:', res3);
}

getSomethingAfter();


async function getSomething() {
	let something = {far: 'bar'};
	var result = await Promise.resolve(something).then((val) => val);
	return result;
}

/**
 * 错误处理
 *
 * await 后面的promise错误可以使用同步try...catch捕获，
 * 亦或是使用promise的catch方法捕获。
 * 如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。
 */
async function getSomethingError() {
	let something = {far: 'bar'};
	throw new Error('error out');
	await new Promise(function(resolve, reject) {
		setTimeout(() => reject('something error'), 1000)
	}) 
}

getSomethingError().catch(err => {console.log('catcherror')});



//async 函数原理
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}

//spawn实现

function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}