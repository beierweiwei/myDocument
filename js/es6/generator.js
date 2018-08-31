/**
 * 基本概念
Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。本章详细介绍 Generator 函数的语法和 API，它的异步编程应用请看《Generator 函数的异步应用》一章。

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。
 */
function * helloWorlGenerator() {
	yield 'hello';
	yield 'world';
	return 'ending';
}

var hw = helloWorlGenerator()
/*h
w.next()
{value: "hello", done: false}
hw.next()
{value: "world", done: false}
hw.next()
{value: "ending", done: true}
hw.next()
{value: undefined, done: true}
*/

/**
 * 上面代码定义了一个 Generator 函数helloWorldGenerator，它内部有两个yield表达式（hello和world），
 * 即该函数有三个状态：hello，world 和 return 语句（结束执行）。
 * 然后，Generator 函数的调用方法与普通函数一样，也是在函数名后面加上一对圆括号。
 * 不同的是，调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，
 * 也就是上一章介绍的遍历器对象（Iterator Object）。
 *
 * 下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。也就是说，每次调用next方法，
 * 内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止。换言之，Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行。
 */
/**
 * 总结一下，调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。
 * 以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
 * value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。
 */

/**
 * yield 表达式
由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。
 yield表达式就是暂停标志。

 需要注意的是，yield表达式后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，
 因此等于为 JavaScript 提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。
 */