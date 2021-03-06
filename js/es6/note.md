# ES6学习笔记

## 一些定义：
* 解构赋值：ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。 
解构赋值右边为对象，不为对象转换为对象，转换不鸟的就报错。
* Proxy：Proxy是es6新增一个类。Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
## Proxy
实际上重载（overload）了点运算符，即用自己的定义覆盖了语言的原始定义。
使用场景：

文档：

调用：
```
new Proxy({}, {
    get () {},
    set () {}
        
})
```
参数:
* 一实际需要代理的目标对象。
* 二代理操作配置，每一个代理操作需要对应的处理函数。如果配置对象为空，则会直接访问目标对象。


## Reflect
定义：用于操作对象。将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。修改某些Object上的方法返回结果。

### Reflect.ownKeys (target)
Reflect.ownKeys方法用于返回对象的所有属性，基本等同于Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和。

## Promise
### Promise.resolve()
时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。
如果要转换的对象是一个thenable 对象，这在将他转换成promise对象后立即调用thenable的then方法。
Promise.resolve().then()立即resolve()的 Promise 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。 
### Promise.try()
两点作用：
* 包装的函数如果时同步则同步执行，如果异步则异步执行。
* 错误处理，不管同步或者异步操作抛出的异常都可以通拓promse的catch方法捕获。而不需使用try...catch单独处理同步函数。
### 与generate使用
### Promise.race()
`const p = Promise.race([p1, p2, p3])`
Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。  

## 函数的扩展
参数默认值： 默认值是惰性求值
默认参数作用域
箭头函数
尾调用优化（trail call）:某个函数的最后一步是调用另一个函数。
catch后的参数可省略（es2019）

## 数组的扩展
### 扩展运算符
（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。 

### Array.from() 
用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。 
任何类数组(有length属性)的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换。对于还没有部署该方法的浏览器，可以用Array.prototype.slice方法替代。
```
Array.from({ length: 3  });// [ undefined, undefined, undefined  ]
```
### 数组实例方法：
* `copyWithin()`
* `find(),findIndex()`,这两个方法都可以通过Object.is()判断是否存在NaN，弥补了数组的indexOf方法的不足。 
* `fill()`
* `entries`
* `keys`
* `values()`
flat，flatMap
### 数组的空位
数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位。空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值
```
Array(3) // [, , ,]
```
> ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。
* `forEach()`,`filter()`, `reduce()`, `every()` 和`some()`都会跳过空位。
* `map()`会跳过空位，但会保留这个值
* `join()`和`toString()`会将空位视为`undefined`，而`undefined`和`null`会被处理成空字符串。
* ES6 则是明确将空位转为`undefined`。

# Array.prototype.sort() 的排序稳定性


## 对象的扩展
### 对象的数据属性和访问器属性
访问属性
* `get` —— 一个没有参数的函数，在读取属性时工作，
* `set` —— 带有一个参数的函数，当属性被设置时调用，
* `enumerable` —— 与数据属性相同，
* `configurable` —— 与数据属性相同。
数据属性和属性描述
* `value`
* `writeable`
* `ennumberable`
* `configable`
定义字面量对象时，属性可使用表达式，加[]符号，当[]中的值为对象时，会被转换为string[object object]

方法`name`属性，返回方法名

取值器和设值器的方法，会在对象属性访问器属性描述对象的`get`和`set`属性上，返回的函数名为`set`或`get`加上方法名。

有两种特殊情况：`bind`方法创造的函数，`name`属性返回bound加上原函数的名字；`Function`构造函数创造的函数，`name`属性返回`anonymous`。
当属性为`Symbol`值时，方法的`name`属性返回`Symbol`值的描述符。

### 属性的枚举
当属性的描述对象属性 `ennumberable`为`false`时，遍历时一下方法会忽略改属性。
`Object.keys()` 对象自身可枚举属性
`for...in` 对象及继承的可枚举属性
`JSON.stringify`
`Object.assign()`

### 属性遍历
es6有5种方法对对象属性进行遍历。
* `for...in...`
* `Object.keys()` 
* `Object.getOwnPropertyNames()`
* `Object.getOwnPropertySymbols()`
* `Reflect.ownKeys(obj)`

`super`关键字，只能用在对象的方法中，代指对象的原型对象，只有对象方法的简写中才能使用。
### 对象扩展运算符 
...（ES2018）

### 解构赋值
对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

扩展运算符


### 对象的新增方法
`Object.is()` 判断和严等相反( `NaN !== NaN` ,`+0 === -0` )
`Object.assign(target1, source1, source2, ...)`: 合并对象自身可遍历属性。 注意：合并`get`方法的属性时，合并后的值是调用get方法的返回值。浅拷贝。同名属性替换。参数可为数组，作为对象。

`Object.getOwnPropertyDescriptors(es2017)`：

该方法返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象。

该方法的引入目的，主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。
```
const shallowMerge = (target, source) => Object.defineProperties(   target,   Object.getOwnPropertyDescriptors(source)  );
Object.create(proto[<Plug>PeepOpenropertiesObject] )// es5,Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
```
## 字符串扩展
1. 字符测unicode表示法。超出\u0000-\uffff 范围的添加{}可正常解码。
2. 字符串添加了遍历接口，使用for...of循环遍历，同时遍历时可以识别大于0xFFFF的码点，而for循环无法识别。
3. 直接输入u+2020 和 u+2029（行分隔符，段分隔符）JSON格式允许直接输入行段分隔符，js不行，使用JSON.parse解析时就会出错。es2019允许在js里直接输入这两个符号。
4. JSON.stringify改造：0xD800-0xDFF之间的码点必须配合使用（两个码点搭配表示一个大于uxFFFF范围之外的字符）
5. 模板字符串
6. 标签模板
7. 模板字符串的限制

### 新增方法
* `String.fromCodePoint()`
* `String.raw()`

实例方法
* `codePointAt()`
* `normalize()`
* `includes()`, `startsWith()`, `endsWith()`
* `repeat()`返回一个新字符串，将原来的字符串重复n次
* `padStart()`, `padEnd()`(es2017)
* `trimStart()`, `trimEnd()`
* `matchAll()`

## 正则扩展
字符串的4个方法可以使用正则：match,replace,search,split,es6语言内部实现与正则相关的方法全部定义在RegExp对象上。

### 新增
* u修饰符，含义为‘Unicode模式’。用来正确解析大于\uFFFF的Unicode字符（作为单个字符解析，如果没有u则会解析为两个字符）。也就是说，会正确处理四个字节的 UTF-16 编码。
* y修饰符，粘连（sticky）修饰符。
* s修饰符，dotAll模式，即.代表一切字符。
* 先行断言:/x(?=y)/,/ x(?!y))/
* 后行断言:`/(?<=y)x/`, `/(?<!y)x/`从右匹配：贪婪模式，子匹配相的引用(\1\2....)
* 具名匹配
    ```
    const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    const matchObj = RE_DATE.exec('1999-12-31'); 
    const year = matchObj.groups.year; // 1999 
    const month = matchObj.groups.month; // 12 
    const day = matchObj.groups.day; // 31
    ```
    
### 在正则表达式内引用 (\k<word>)

```
    const RE_TWICE = /^(?<word>[a-z]+)!\k<word>$/;
    RE_TWICE.test('abc!abc') // true 
    RE_TWICE.test('abc!ab') // false
```

`math`方法，一段字符有多个匹配，则需要通过循环方法多次匹配才可匹配到完整的结果。目前有一个提案增加了`String.prototype`.`matchAll`方法，可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。 

## Iterator & for ... of
`Iterator` 是一种接口，为各种不同的数据结构提供统一的访问机制。 
作用：提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，Iterator 接口主要供`for...of`消费。 
### `Iterator`与`generator`函数
遍历器的`return`、`throw`

具有`Iterator`接口原生数据类型
* `Array`
* `Map`
* `Set`
* `String`
* `TypedArray`
* 函数的 `arguments` 对象
* `NodeList` 对象
* 对比`for in` 循环的优点
* 有着同`for...in`一样的简洁语法，但是没有`for...in`那些缺点。
* 不同于`forEach`方法，它可以与`break`、`continue`和`return`配合使用。
* 提供了遍历所有数据结构的统一操作接口。

## 异步遍历器ES2018
异步遍历器的最大的语法特点，就是调用遍历器的`next`方法，返回的是一个 `Promise` 对象。 对象的异步遍历器接口，部署在`Symbol.asyncIterator`属性上面。  
### `for await...of`
### 异步Generator函数

## Generator函数
含义：状态机 遍历器

`Generator` 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。
  Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。  执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

`generator`函数是分段执行的，`yiel `表达式是暂停标记。
  和函数一样调用，该函数并不执行，而是指向内部状态的指针对象，也就是遍历器对象。然后调用遍历器对象的`next`方法，使指针移向下一个状态。，每次调用`next`方法，内部指针就从函数头部或上次停下来的地方执行，知道越到`yield`为止。

### `yield`表达式

### 与 `Iterator`接口关系。
  Generator就是遍历器生成函数，可直接赋值给对象的Symbol.iterator属性，从而使该对象拥有Iterator接口。
```
  var myIterable = {}; 
  myIterable[Symbol.iterator] = function* () {   yield 1;   yield 2;   yield 3;  }; 
  [...myIterable] // [1, 2, 3]
```
### next方法的参数
  斐波那契数列 
### for...of循环
### generator.prototype.throw()
`Generator` 函数返回的遍历器对象，都有一个`throw`方法，可以在函数体外抛出错误，然后在 `Generator` 函数体内捕获 。

遍历器对象`throw`的错误内部没有捕获，就会向外层抛出。

`throw`方法抛出的错误要被内部捕获，前提是必须至少执行过一次`next`方法 。

`throw`方法被捕获后，会附带执行下一条`yield`语句，也就是说，会附带执行一次`next`方法。

### generator.prototype.return()
给定返回值，并终结遍历器。

### throw(),return(),next()共同点
### yield*表达式
如果在 `Generator` 函数内部，调用另一个 `Generator` 函数。需要在前者的函数体内部，自己手动完成遍历。 `yield*`后面的 `Generator` 函数（没有`return`语句时），等同于在 `Generator` 函数内部，部署一个`for...of`循环。任何数据结构只要有 `Iterator` 接口，就可以被`yield*`遍历  
### 作为对象属性的 Generator 函数
`Generator`函数总是返回一个遍历器，ES6 规定这个遍历器是 `Generator` 函数的实例，也继承了 `Generator` 函数的`prototype`对象上的方法。 
### 含义
* `Generator` 与状态机
* `Generator` 与协程

## `Generator` 函数的异步应用
* 协程的`Generator`函数实现
* `Thunk`函数
参数求值策略

`thunk`函数的含义：编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 `Thunk` 函数。

### js语言的Thunk函数
js中的thunk函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

> 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。
```
// ES5版本
var Thunk = function(fn){
    return function (){
        var args = Array.prototype.slice.call(arguments);
        return function (callback){
            args.push(callback);
                return fn.apply(this, args);
        }
    }
}

// ES6版本
const Thunk = function(fn) {
    return function (...args) {
        return function (callback) {
            return fn.call(this, ...args, callback);
        }
  
    }

}
```
### Thumkify模块
将普通的函数转为thunk函数工具。
### Generator函数的流程管理
思路： 
1. 定义一个run函数，调用generate。
2. run内部定义一个next函数，和异步遍历的思路相同。一个thunk函数，在将next（）函数作为参数传给这个thunk函数。next中，移动gen的指针，然后将next作为回调，传给指针的返回值，即thunk函数的回调参数。

### Thunk函数的自动流程管理
### co模块
用于Genrator函数的自执行
### co模块源码

## async函数
asnc函数是对Generator函数的替换和改进。
* 内置执行器
* 更好的语义
* 更广的适用性
* 返回值是Promise
> 进一步说，async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。
### await命令
await命令后面返回一个Promise对象，如果不是Promise对象就返回对应的值。
如果是thenable对象，那么await会将其等同于Promise对象。
### async实现原理
这里需要反复查看理解

## Class
* 类里所有的方法都定义在类的prototye当中。
* 类内部定义的方法是不可枚举的（与es5不同）
### constructor方法
默认且必须方法。如果未定义，会自动添加一个。
### setter & getter
类的属性内部可以使用set和get关键字设置属性的存储函数，拦截属性的存取行为。
存值函数、取值函数存储在属性的Descriptor 上。
### 属性表达式
### class表达式
和函数表达式一样
使用class表达式，可写出立即执行的class
> *注意点*：
    * 严格模式： 类和模块内部，默认就是严格模式。
    * 不存在提升： ES6 不会把类的声明提升到代码头部。
    * name属性：name属性总是返回紧跟在class关键字后面的类名
    * Generator方法：如果某个方法之前加上星号（*），就表示是一个Gerneragor函数。
    * this的指向：在构造方法中绑定this，或使用箭头函数，或使用Proxy
### 静态方法
* 一个方法前加上static关键字，就表示静态方法。如果静态方法中包含this，this指向该类，而不是实例。
* 静态方法可被继承
* 静态方法也可以从super上调用。
* 实例属性的新写法： 实例属性除了可以在constructor中的this中定义外，也可以定义在类的最顶层。
* 静态属性：目前只能在类的外部定义。提案中的写法，在实例属性上加上static关键字。
* 私有属性：#（提案中），静态私有属性
* new.target属性：用于构造函数之中，如果不是通过new命令调用的构造函数，new.target返回undisturbed。子类继承父类时，new.target会返回子类。
## class继承
* super():调用父类的constructor方法,如果子类声明了constructor函数，则必须先调用super(),生成实例，然后才能操作this。
* 子类会继承父类的静态方法。
* Object.getPrototypeOf():可以用来从子类上获取父类。
## super关键字
* 函数调用
* 对象调用：
    * 在普通方法中，指向父类的原型对象,
    * 调用super上的方法时，方法中的this指向子类的实例。。
    * 对super中的某个属性赋值时，super就this，指向子类的实例。
    * 静态方法中super指向父类,当调用super中的方法时，this指向子类。
*使用super时，必须下你是的指定是作为函数还是作为对象使用，否则会报错~！*
对象总是继承其他对象，所以可以在任意对象中使用super关键字。
### 类的prototype 属性 和 —__proto__属性
多数浏览器中私有实现—__proto__属性（非es规范）。对象的—__proto__指向对应构造函数的prototype属性。Class作为构造函数的语法糖，用时拥有prototye属性和—__proto__属性，因此存在两条继承链。
* 子类的__proto__属性，表示构造函数的继承，总是指向父类。
* 子类的prototype属性的—__proto__属性表示方法的继承，总是指向父类的prototype属性。
* 子类的__proto__属性
### 原生构造函数的继承
原生构造函数是指语言内置的构造函数，通常用来生成数据结构。
* 原生构造函数的this无法绑定，导致拿不到内部属性。
* es6允许原生构造函数定义之类。因为es6是先新建父类的实例对象this，
* 然后在用子类的构造函数修饰this，使父类的所有行为都可以继承。
继承Object的子类，有一个行为差异，es6改变了Object构造函数的行为，一点Object方法不是通过new Object() 调用的，就会忽略参数。

### Mixin模式的实现。

## Decorator装饰器
装饰器是一种与类相关的语法，用来注释或修改类和类的方法。
装饰器是一种函数，写成@+函数名。它可以放在类和类的方法的定义前面。

### 类的装饰
类的装饰器是一个对类进行处理的函数，装饰器函数第一个参数，就是索要装饰的目标类。
### 方法的装饰器


