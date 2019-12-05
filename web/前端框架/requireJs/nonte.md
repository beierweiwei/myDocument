# requiresJs
AMD: 异步定义模块，代表： require.js

## 作用

* 模块作用域避免全局变量污染
* 便于项目维护

## 模块化规范

## 使用方法
`html`通过`script，`标签引入`require.js`,然后通过`script`标签设置`data-main`属性,确定人口js文件。
	
	<!--This sets the baseUrl to the "scripts" directory, and
    loads a script that will have a module ID of 'main'-->
	<script data-main="scripts/main.js" src="scripts/require.js"></script>

require相对于baseUrl来加载所有模块。baseUrl默认为data-main设定的入口文件所在的目录。如果没有显示设置data-main,

## 配置

在顶层页面（或者没用定义模块的脚本文件中）使用require（）；可以使用配置对象进行配置
可以在入口文件`main.js`中设置config。不过需要注意data-main属性定义的入口脚步是异步加载的，避免有其他的入口文件，如果有请确保入口文件先于其他文件加载。

你可以在require.js加载之前，定义一个全局变量require作为配置对象。

```js
<script>
    var require = {
        deps: ["some/module1", "my/module2", "a.js", "b.js"],
        callback: function(module1, module2) {
            //This function will be called when all the dependencies
            //listed above in deps are loaded. Note that this
            //function could be called before the page is loaded.
            //This callback is optional.
        }
    };
</script>
<script src="scripts/require.js"></script>
```

*note: 最好使用require = {}, 而不要使用window.require = {}; 因为后者在ie中无效*

`require.config({optionObj})`;

> [几种rquireJs配置模式](https://github.com/requirejs/requirejs/wiki/Patterns-for-separating-config-from-the-main-module)

optionObj

  * `baseUrl`: 加载模块的根路径
  * `paths`: {}, 模块id名称和指定路径的键值对。
  * `bundles`: 2.10版本引入；
  * `shim`: 传统型的全局注入变量和未使用define定义依赖的遗留类库，你必须使用shim来指定他们的依赖关系。
 *如果你没有指明依赖关系，加载可能报错。这是因为基于速度的原因，RequireJS会异步地以无序的形式加载这些库*


```js
requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app'
    }
});
// Start the main app logic.
requirejs(['jquery', 'canvas', 'app/sub'],
function   ($,        canvas,   sub) {
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
});		
```

 如果没有明确配置conifg中的baseUrl, srcipt标签的data-main属性也没有用时，require.js默认从使用requre.js的html被包含的文件夹为baseUrl。

 requrejs默认所有模块资源为js脚本，所以无需在moduleId后加上`.js`后缀。在requirejs在进行`module ID`到 `path`的解析时会自动加上js后缀。

 避开baseUrl + path解析的规则

 * 以'.js'结束
 * 以‘／’开头
 * 包含url协议‘http://'或‘https;//'协议开头

 require.js 假设默认所有文件为script脚本，所以依赖模块时只需要填写模块id，requreJS会自动将id转为路径。

 以下几种情况，requireJs会将模块当作普通的url进行加载, 不会使用 baseUrl + path自动转换。

  * 以.js结束
  * 以'/'开头
  * 包含协议, 如 'http、https'


### paths fallbacks
当运行在浏览器里面时，可以指定paths fallbacks。先尝试从cdn加载模块，如果cdn加载失败了就加载指定的paths fallbacks。

*note: pahts fallbacks只在具体的模块匹配时才会生效。这和普通的paths配置不同，paths配置可以应用到模块id的前缀部分*


```js
requirejs.config({
    //To get timely, correct error triggers in IE, force a define/shim exports check.
    enforceDefine: true,
    paths: {
        jquery: [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min',
            //If the CDN location fails, load from this location
            'lib/jquery'
        ]
    }
});

//Later
require(['jquery'], function ($) {
});
```

### bundles

```js
requirejs.config({
    bundles: {
        'primary': ['main', 'util', 'text', 'text!template.html'],
        'secondary': ['text!secondary.html']
    }
});

require(['util', 'text'], function(util, text) {
    //The script for module ID 'primary' was loaded,
    //and that script included the define()'d
    //modules for 'util' and 'text'
});
```

bundles只时设置在包含多个define模块脚本中从哪里去寻找包含在其中的模块。它没有自动绑定这些模块到打包模块的id上。bundle的模块id只是用来设定模块的定位。
bundles配置和paths配置有些相像，但也有很大不同。paths对象的value是路径符号，而不允许设置为模块id。
如果打包构建目标是不存在的模块id时或者在构建中你有不需要通过加载器加载的插件资源，bundles配置讲非常有用。
*keys和values都是模块id，而不是路径符。它们都是绝对模块IDs,而不是和paths config 或者 map conifg一样是可以是一个模块的前缀*

在requireJS2.20中，优化器可以生成一个bundles配置，将其插入顶层的requireJs.config()调用。more detail [bundlesConfigOutFile](https://github.com/requirejs/r.js/blob/98a9949480d68a781c8d6fc4ce0a07c16a2c8a2a/build/example.build.js#L641)

### shime
设置依赖， exports 和定制初始化对于那些老的传统的浏览器全局变量没有使用define()声明的依赖和设定模块值的脚本库。

下面的例子需要requireJS 2.0以上，假设backbone.js、underscore.js和jquery.js已经被安装在baseUrl目录中。

```js
requirejs.config({
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'foo': {
            deps: ['bar'],
            exports: 'Foo',
            init: function (bar) {
                //Using a function allows you to call noConflict for
                //libraries that support it, and do other cleanup.
                //However, plugins for those libraries may still want
                //a global. "this" for the function will be the global
                //object. The dependencies will be passed in as
                //function arguments. If this function returns a value,
                //then that value is used as the module export value
                //instead of the object found via the 'exports' string.
                //Note: jQuery registers as an AMD module via define(),
                //so this will not work for jQuery. See notes section
                //below for an approach for jQuery.
                return this.Foo.noConflict();
            }
        }
    }
});

//Then, later in a separate file, call it 'MyModel.js', a module is
//defined, specifying 'backbone' as a dependency. RequireJS will use
//the shim config to properly load 'backbone' and give a local
//reference to this module. The global Backbone will still exist on
//the page too.
define(['backbone'], function (Backbone) {
  return Backbone.Model.extend({});
});


```


在RequireJS 2.0.* 中， shim 中的"exports" 属性也可以配置成一个函数。这种情况, 它的功能和上面的 "init" 属性一样。  "init" 属性用于RequireJS 2.1.0+ 中，如此， exports配置的字符串值可用于 [enforceDefine](http://requirejs.org/docs/api.html#config-enforceDefine)，也可用于类库加载后的一些功能性工作。

像 jQuery 或者 Backbone 插件这种不需要导出一个模块值的模块，可以用 shim 只配置一个表示依赖项的数组：

```js
requirejs.config({
    shim: {
        'jquery.colorize': ['jquery'],
        'jquery.scroll': ['jquery'],
        'backbone.layoutmanager': ['backbone']
    }
});

```


然而如果你想要在IE中检测404并执行fallbacks 或者errbacks，那么就必须配置 exports ，这样加载器才能检测脚本是否加载成功：

```js
requirejs.config({
    shim: {
        'jquery.colorize': {
            deps: ['jquery'],
            exports: 'jQuery.fn.colorize'
        },
        'jquery.scroll': {
            deps: ['jquery'],
            exports: 'jQuery.fn.scroll'
        },
        'backbone.layoutmanager': {
            deps: ['backbone']
            exports: 'Backbone.LayoutManager'
        }
    }
});
```

*关于`shim`配置重要注意事项：*

* shim只是配置模块的依赖关系。需要加载 模块的话，还是需要用 调用require/define 。 设置shim不会触发加载代码。
* shim配置的脚本只使用其他shim模块作为依赖，或者是没有依赖的AMD模块且在调用define()之后它们同样会生成一个全局变量（如jquery 或 lodash。因此如果你使用一个AMD模块作为shim配置模块的依赖，AMD模块可能直到shimed code 构建执行后才会执行，且会出现一个错误。最终的方法是升级所有的shime模块拥有AMD define调用配置。
* 如果不可能升级shim模块代码，requireJS2.1.11中的优化器有一个[wrapShim build option](https://github.com/requirejs/r.js/blob/b8a6982d2923ae8389355edaa50d2b7f8065a01a/build/example.build.js#L68)将会尝试自动讲shim模块自动包裹define()函数。这讲改变shim依赖的作用域，所以这种方法不总是有效。
* init方法讲不会调用对于AMD模块。
* 在node使用requireJs,shim config将不被支持。因为node中没有喝浏览器中相同的全局环境变量。

*关于优化器中‘shime’重要注意事项*

* 你需要在 [mainConfigFile](http://requirejs.org/docs/optimization.html#mainConfigFile)打包配置 中指定shim配置项所在的配置文件。 否则，优化工具找不到 shim 配置。 另一种做法是在打包的配置文件中保留shim配置的副本。
* 在构建中不要把CDN和shim conifg混合使用。shim起到的作用是在所有依赖加载完之后再加载模块，只起到延时加载的作用。当模块内嵌到打包文件中时模块不会被延迟加载，而模块没有用define的定义。所以模块会在cdn依赖加载前执行。
* 对于本地的多文件build，上述的CDN加载建议仍然适用。任何shim过的脚本，它们的依赖必须加载于该脚本执行之前。这意味着要么直接在含有shim脚本的build层build它的依赖，要么先使用require([], function (){})调用来加载它的依赖，然后对含有shim脚本的build层发出一个嵌套的require([])调用。
* 如果您使用了uglifyjs来压缩代码，不要将uglify的toplevel选项置为true，或在命令行中不要使用 -mt。 该选项会破坏shim用于找到exports的全局名称。

### packages

配置从commonJS包中加载模块

### nodeIdCompat

处理moduleId的后缀，如果为true，则模块名可以加‘.js’后缀。

### waitSeconds:

模块加载超时时间。如果为0不设置超时时间，默认为7秒。

### context 

命名一个加载上下文。这允许require.js在同一页面上加载模块的多个版本，如果每个顶层require调用都指定了一个唯一的上下文字符串。想要正确地使用，请参考多版本支持一节。

### deps

指定要加载的一个依赖数组。当将require设置为一个config object在加载require.js之前使用时很有用。一旦require.js被定义，这些依赖就已加载。使用deps就像调用require([])，但它在loader处理配置完毕之后就立即生效。它并不阻塞其他的require()调用，它仅是指定某些模块作为config块的一部分而异步加载的手段而已。

### callback 

在deps加载完毕后执行的函数。当将require设置为一个config object在加载require.js之前使用时很有用，其作为配置的deps数组加载完毕后为require指定的函数。

### enforceDefine

如果设置为true，则当一个脚本不是通过define()定义且不具备可供检查的shim导出字串值时，就会抛出错误。参考在IE中捕获加载错误一节。

### xhtml

如果设置为true，则使用document.createElementNS()去创建script元素。

### urlArgs

RequireJS获取资源时附加在URL后面的额外的query参数。作为浏览器或服务器未正确配置时的“cache bust”手段很有用。使用cache bust配置的一个示例：

urlArgs: "bust=" +  (new Date()).getTime()
在开发中这很有用，但请记得在部署到生成环境之前移除它。

### scriptType

指定RequireJS将script标签插入document时所用的type=""值。默认为“text/javascript”。想要启用Firefox的JavaScript 1.8特性，可使用值“text/javascript;version=1.8”。

### skipDataMain
如果为true，则跳过通过`data-main`属性扫描入口文件。在require为嵌入到其他类库中时，避免多个版本的require库相互干扰

## api 

模块不同于传统的脚本文件，它良好地定义了一个作用域来避免全局名称空间污染。它可以显式地列出其依赖关系，并以函数(定义此模块的那个函数)参数的形式将这些依赖进行注入，而无需引用全局变量。RequireJS的模块是模块模式的一个扩展，其好处是无需全局地引用其他模块。

### definde();

无依赖，定义模块为一个简单对象

```js
define({
	a: '1',
	b: '2'
})
```

需要做一些工作

```js
define(function() {
	//do smoework
	return {
		...
	}
})
```

有依赖

```js
define(['jquery', 'lodash'], function($, _){
	//do somework
	return {
		...
	}
})
```

定义模块为function

```js
define(['module1', 'module2'], function(m1, m2) {
	//todo somework
	return function() {
		...
   }
})
```

兼容commojs定义的模块，简单的commonJs wrap

```js
define(function(require, exports, module) {
	var a = require('a');
	var b = require('b');
	return function() {

	}
})
```

#### 生成相对于模块的路径
将require作为依赖，然后调用require.toUrl;

```js
defind(['require'], function(require) {
  var css = require.toUrl('./style.css');
})
```

#### console.debug
在js console 已经异步加载模块，直接使用`require(modulename)`;
*note:只在通过异步版本require([])加载了的模块有效。如果使用相对路径如`require(['./modulename'])`则只在define里面生效*


### 相对模块命名相对于其他模块的名字，而非路径


### 循环依赖

模块a，模块b相互依赖,使用require指定依赖

```js
//b.js
define(["require", "a"],
    function(require, a) {
        //"a" in this case will be null if "a" also asked for "b",
        //a circular dependency.
        return function(title) {
            return require("a").doSomething();
        }
    }
);
```

使用commoJs形式的写法，只在循环引用的模块同时导出对象而不是方法。

```js
//Inside b.js:
define(function(require, exports, module) {
    //If "a" has used exports, then we have a real
    //object reference here. However, we cannot use
    //any of "a"'s properties until after "b" returns a value.
    var a = require("a");

    exports.foo = function () {
        return a.bar();
    };
});

```

如果你用的是数组依赖的方法，需要指定exports依赖

```js
//Inside b.js:
define(['a', 'exports'], function(a, exports) {
    //If "a" has used exports, then we have a real
    //object reference here. However, we cannot use
    //any of "a"'s properties until after "b" returns a value.

    exports.foo = function () {
        return a.bar();
    };
});
```

### 指定一个jsonp服务依赖
实现也是通过生成scr标签，通过http的get方法请求js数据。
指定define为callback函数。
只有jsonp内容返回对象时才能工作，array和string不生效。
同一url的依赖jsonp服务数据会被缓存
错误处理不够详细，只有超时处理，可以重写require.onError()

```js
require(["http://example.com/api/data.json?callback=define"],
    function (data) {
        //The data object will be the API response for the
        //JSONP data call.
        console.log(data);
    }
);

```

### 卸载模块

全局require.undef()方法通过重置内部加载器内部状态来卸载之前加载过的模块,
不过它不会卸载那些被其他加载模块依赖的模块，所以这个方法只适合要卸载的模块不被其他模块依赖的情况下使用。

```js

requirejs.config({
    enforceDefine: true,
    paths: {
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min'
    }
});

//Later
require(['jquery'], function ($) {
    //Do something with $ here
}, function (err) {
    //The errback, error callback
    //The error has a list of modules that failed
    var failedId = err.requireModules && err.requireModules[0];
    if (failedId === 'jquery') {
        //undef is function only on the global requirejs object.
        //Use it to clear internal knowledge of jQuery. Any modules
        //that were dependent on jQuery and in the middle of loading
        //will not be loaded yet, they will wait until a valid jQuery
        //does load.
        requirejs.undef(failedId);

        //Set the path to jQuery to local path
        requirejs.config({
            paths: {
                jquery: 'local/jquery'
            }
        });

        //Try again. Note that the above require callback
        //with the "Do something with $ here" comment will
        //be called if this new attempt to load jQuery succeeds.
        require(['jquery'], function () {});
    } else {
        //Some other error. Maybe show message to the user.
    }
});

```

### 服务器中使用requireJs

服务端使用同步加载，需要通过构建工具重新定义requrie.load()方法.服务端的 require.load 方法在build/jslib/requirePatch.js中

### require();

## 高级用法

### 从包中加载模块

RequireJS支持从CommonJS包结构中加载模块，但需要一些额外的配置。具体地，支持如下的CommonJS包特性：

* 一个包可以关联一个模块名/前缀。
* package config可为特定的包指定下述属性：
	* name：包名（用于模块名/前缀映射）
	* location： 磁盘上的位置。位置是相对于配置中的baseUrl值，除非它们包含协议或以“/”开头
	* main：当以“包名”发起require调用后，所应用的一个包内的模块。默认为“main”，除非在此处做了另外设定。该值是相对于包目录的。

* 重要事项：*

虽然包可以有CommonJS的目录结构，但模块本身应为RequireJS可理解的模块格式。例外是：如果你在用r.js Node适配器，模块可以是传统的CommonJS模块格式。你可以使用CommonJS转换工具来将传统的CommonJS模块转换为RequireJS所用的异步模块格式。
一个项目上下文中仅能使用包的一个版本。你可以使用RequireJS的多版本支持来加载两个不同的模块上下文；但若你想在同一个上下文中使用依赖了不同版本的包C的包A和B，就会有问题。未来可能会解决此问题。
如果你使用了类似于入门指导中的项目布局，你的web项目应大致以如下的布局开始（基于Node/Rhino的项目也是类似的，只不过使用scripts目录中的内容作为项目的顶层目录）:

```
project-directory/
	project.html
	scripts/
		require.js
```

而下面的示例中使用了两个包，cart及store：

```
project-directory/
project.html
cart/
	main.js
store/
	main.js
	util.js
main.js
require.js
```

project.html会有如下的一个script标签：

`<script data-main="scripts/main" src="scripts/require.js"></script>`

这会指示require.js去加载scripts/main.js。main.js使用“packages”配置项来设置相对于require.js的各个包，此例中是源码包“cart”及“store”：

```js
//main.js的内容
//传递一个config object到require
require.config({
    "packages": ["cart", "store"]
});

require(["cart", "store", "store/util"],
function (cart,   store,   util) {
    //正常地使用模块
});
```

对“cart”的依赖请求会从scripts/cart/main.js中加载，因为“main”是RequireJS默认的包主模块。对“store/util”的依赖请求会从scripts/store/util.js加载。

如果“store”包不采用“main.js”约定，如下面的结构：

```
project-directory/
	project.html
	scripts/
		cart/
			main.js
		store/
			store.js
			util.js
	main.js
	package.json
require.js
```

则RequireJS的配置应如下：

```js
require.config({
    packages: [
        "cart",
        {
            name: "store",
            main: "store"
        }
    ]
});
```

减少麻烦期间，强烈建议包结构遵从“main.js”约定。

### 多版本支持

如配置项一节中所述，可以在同一页面上以不同的“上下文”配置项加载同一模块的不同版本。require.config()返回了一个使用该上下文配置的require函数。下面是一个加载不同版本（alpha及beta）模块的示例（取自test文件中）：

```js
<script src="../require.js"></script>
<script>
var reqOne = require.config({
  context: "version1",
  baseUrl: "version1"
});

reqOne(["require", "alpha", "beta",],
function(require,   alpha,   beta) {
  log("alpha version is: " + alpha.version); //prints 1
  log("beta version is: " + beta.version); //prints 1

  setTimeout(function() {
    require(["omega"],
      function(omega) {
        log("version1 omega loaded with version: " +
             omega.version); //prints 1
      }
    );
  }, 100);
});

var reqTwo = require.config({
      context: "version2",
      baseUrl: "version2"
    });

reqTwo(["require", "alpha", "beta"],
function(require,   alpha,   beta) {
  log("alpha version is: " + alpha.version); //prints 2
  log("beta version is: " + beta.version); //prints 2

  setTimeout(function() {
    require(["omega"],
      function(omega) {
        log("version2 omega loaded with version: " +
            omega.version); //prints 2
      }
    );
  }, 100);
});
</script>
```

*注意“require”被指定为模块的一个依赖，这就允许传递给函数回调的require()使用正确的上下文来加载多版本的模块。如果“require”没有指定为一个依赖，则很可能会出现错误。*

### 在页面加载之后加载代码

上述多版本示例中也展示了如何在嵌套的require()中迟后加载代码。

### 对Web Worker的支持

从版本0.12开始，RequireJS可在Web Worker中运行。可以通过在web worker中调用importScripts()来加载require.js（或包含require()定义的JS文件），然后调用require就好了。

你可能需要设置baseUrl配置项来确保require()可找到待加载脚本。
你可以在unit test使用的一个文件中找到一个例子。

### 对Rhino的支持

RequireJS可通过r.js适配器用在Rhino中。参见r.js的README。

### 处理错误

通常的错误都是404（未找到）错误，网络超时或加载的脚本含有错误。RequireJS有些工具来处理它们：require特定的错误回调（errback），一个“paths”数组配置，以及一个全局的requirejs.onError事件。

传入errback及requirejs.onError中的error object通常包含两个定制的属性：

requireType：含有类别信息的字串值，如“timeout”，“nodefine”， “scripterror”
requireModules： 超时的模块名/URL数组。
如果你得到了requireModules错，可能意味着依赖于requireModules数组中的模块的其他模块未定义。


### 在IE中捕获加载错
Internet Explorer有一系列问题导致检测errbacks/paths fallbacks中的加载错 比较困难：

IE 6-8中的script.onerror无效。没有办法判断是否加载一个脚本会导致404错；更甚地，在404中依然会触发state为complete的onreadystatechange事件。
IE 9+中script.onerror有效，但有一个bug：在执行脚本之后它并不触发script.onload事件句柄。因此它无法支持匿名AMD模块的标准方法。所以script.onreadystatechange事件仍被使用。但是，state为complete的onreadystatechange事件会在script.onerror函数触发之前触发。
因此IE环境下很难两全其美：匿名AMD（AMD模块机制的核心优势）和可靠的错误检测。
但如果你的项目里使用了define()来定义所有模块，或者为其他非define()的脚本使用shim配置指定了导出字串，则如果你将enforceDefine配置项设为true，loader就可以通过检查define()调用或shim全局导出值来确认脚本的加载无误。
因此如果你打算支持Internet Explorer，捕获加载错，并使用了define()或shim，则记得将enforceDefine设置为true。参见下节的示例。

注意：如果你设置了enforceDefine: true，而且你使用data-main=""来加载你的主JS模块，则该主JS模块必须调用define()而不是require()来加载其所需的代码。主JS模块仍然可调用require/requirejs来设置config值，但对于模块加载必须使用define()。
如果你使用了almond而不是require.js来build你的代码，记得在build配置项中使用insertRequire来在主模块中插入一个require调用 —— 这跟data-main的初始化require()调用起到相同的目的。


### require([]) errbacks
当与requirejs.undef()一同使用errback时，允许你检测模块的一个加载错，然后undefine该模块，并重置配置到另一个地址来进行重试。
一个常见的应用场景是先用库的一个CDN版本，如果其加载出错，则切换到本地版本：

```js
requirejs.config({
    enforceDefine: true,
    paths: {
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min'
    }
});

//Later
require(['jquery'], function ($) {
    //使用$
}, function (err) {
    //errback
    //error含有出错的模块列表
    var failedId = err.requireModules && err.requireModules[0],
    if (failedId === 'jquery') {
        //undef是全局的requirejs object上的一个函数。
        //用它来清空jQuery的信息。 任何依赖于jQuery或处于加载中的模块都不再
        //加载，它们会等待有效的jQuery加载完毕。
        requirejs.undef(failedId);

        //将jQuery设置到本地版本上
        requirejs.config({
            paths: {
                jquery: 'local/jquery'
            }
        });

        //重试。注意上述含有“使用$”一句的require回调会在新的
        //jQuery加载成功后被调用。
        require(['jquery'], function () {});
    } else {
        //其他错。考虑报错给用户。
    }
});
```

使用“requirejs.undef()”，如果你配置到不同的位置并重新尝试加载同一模块，则loader会将依赖于该模块的那些模块记录下来并在该模块重新加载成功后去加载它们。

注意：errback仅适用于回调风格的require调用，而不是define()调用。define()仅用于声明模块。

### paths备错配置
上述模式（检错，undef()模块，修改paths，重加载）是一个常见的需求，因此有一个快捷设置方式。paths配置项允许数组值：

```js
requirejs.config({
    //为了在IE中正确检错，强制define/shim导出检测
    enforceDefine: true,
    paths: {
        jquery: [
            'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min',
            //若CDN加载错，则从如下位置重试加载
            'lib/jquery'
        ]
    }
});

//后面
require(['jquery'], function ($) {
});
```

上述代码先尝试加载CDN版本，如果出错，则退回到本地的lib/jquery.js。

注意：paths备错仅在模块ID精确匹配时工作。这不同于常规的paths配置，常规配置可匹配模块ID的任意前缀部分。备错主要用于非常的错误恢复，而不是常规的path查找解析，因为那在浏览器中是低效的。

### 全局的 requirejs.onError

为了捕获在局域的errback中未捕获的异常，你可以重载requirejs.onError()：

```js
requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};
```

## 加载器插件

RequireJS支持加载器插件。使用它们能够加载一些对于脚本正常工作很重要的非JS文件。RequireJS的wiki有一个插件的列表。本节讨论一些由RequireJS一并维护的特定插件：

### 指定文本文件依赖

如果都能用HTML标签而不是基于脚本操作DOM来构建HTML，是很不错的。但没有好的办法在JavaScript文件中嵌入HTML。所能做的仅是在js中使用HTML字串，但这一般很难维护，特别是多行HTML的情况下。
RequireJS有个text.js插件可以帮助解决这个问题。如果一个依赖使用了text!前缀，它就会被自动加载。参见text.js的README文件。

### 页面加载事件及DOM Ready

RequireJS加载模块速度很快，很有可能在页面DOM Ready之前脚本已经加载完毕。需要与DOM交互的工作应等待DOM Ready。现代的浏览器通过DOMContentLoaded事件来知会。
但是，不是所有的浏览器都支持DOMContentLoaded。domReady模块实现了一个跨浏览器的方法来判定何时DOM已经ready。下载并在你的项目中如此用它：

```js
require(['domReady'], function (domReady) {
  domReady(function () {
    //一旦DOM准备就绪，本回调就执行。
    //在此函数中查询及处理DOM是安全的。
  });
});
```

基于DOM Ready是个常规需求，像上述API中的嵌套调用方式，理想情况下应避免。domReady模块也实现了Loader Plugin API，因此你可以使用loader plugin语法（注意domReady依赖的!前缀）来强制require()回调函数在执行之前等待DOM Ready。当用作loader plugin时，domReady会返回当前的document：

```js
require(['domReady!'], function (doc) {
    //本函数会在DOM ready时调用。
    //注意'domReady!'的值为当前的document
});
```

*注意:*如果document需要一段时间来加载（也许是因为页面较大，或加载了较大的js脚本阻塞了DOM计算），使用domReady作为loader plugin可能会导致RequireJS“超时”错。如果这是个问题，则考虑增加waitSeconds配置项的值，或在require()使用domReady()调用（将其当做是一个模块）。

### define I18N bundle

一旦你的web app达到一定的规模和流行度，提供本地化的接口和信息是十分有用的，但实现一个扩展良好的本地化方案又是很繁贅的。RequireJS允许你先仅配置一个含有本地化信息的基本模块，而不需要将所有的本地化信息都预先创建起来。后面可以将这些本地化相关的变化以值对的形式慢慢加入到本地化文件中。
i18n.js插件提供i18n bundle支持。在模块或依赖使用了i18n!前缀的形式（详见下）时它会自动加载。下载该插件并将其放置于你app主JS文件的同目录下。
将一个文件放置于一个名叫“nls”的目录内来定义一个bundle——i18n插件当看到一个模块名字含有“nls”时会认为它是一个i18n bundle。名称中的“nls”标记告诉i18n插件本地化目录（它们应当是nls目录的直接子目录）的查找位置。如果你想要为你的“my”模块集提供颜色名的bundle，应像下面这样创建目录结构：

my/nls/colors.js
该文件的内容应该是：

```js
//my/nls/colors.js文件内容：
define({
    "root": {
        "red": "red",
        "blue": "blue",
        "green": "green"
    }
});
```

以一个含有“root”属性的object直接量来定义该模块。这就是为日后启用本地化所需的全部工作。你可以在另一个模块中，如my/lamps.js中使用上述模块：

```js
//my/lamps.js内容
define(["i18n!my/nls/colors"], function(colors) {
    return {
        testMessage: "The name for red in this locale is: " + colors.red
    }
});
```

my/lamps模块具备一个“testMessage”属性，它使用了colors.red来显示红色的本地化值。
日后，当你想要为文件再增加一个特定的翻译，如fr-fr，可以改变my/nls/colors内容如下：

```js
//my/nls/colors.js内容
define({
    "root": {
        "red": "red",
        "blue": "blue",
        "green": "green"
    },
    "fr-fr": true
});
```

然后再定义一个my/nls/fr-fr/colors.js文件，含有如下内容：

```js
//my/nls/fr-fr/colors.js的内容
define({
    "red": "rouge",
    "blue": "bleu",
    "green": "vert"
});
```

RequireJS会使用浏览器的navigator.language或navigator.userLanguage属性来判定my/nls/colors的本地化值，因此你的app不需要更改。如果你想指定一个本地化方式，你可使用模块配置将该方式传递给插件：

```js
requirejs.config({
    config: {
        //为i18n做配置
        //module ID
        i18n: {
            locale: 'fr-fr'
        }
    }
});
```

注意 RequireJS总是使用小写版本的locale值来避免大小写问题，因此磁盘上i18n的所有目录和文件都应使用小写的本地化值。 RequireJS有足够智能去选取合适的本地化bundle，使其尽量接近my/nls/colors提供的那一个。例如，如果locale值时“en-us”，则会使用“root” bundle。如果locale值是“fr-fr-paris”，则会使用“fr-fr” bundle。
RequireJS也会将bundle合理组合，例如，若french bundle如下定义（忽略red的值）：

```js
//my/nls/fr-fr/colors.js内容：
define({
    "blue": "bleu",
    "green": "vert"
});
```

则会应用“root”下的red值。所有的locale组件是如此。如果如下的所有bundle都已定义，则RequireJS会按照如下的优先级顺序（最顶的最优先）应用值：

```
my/nls/fr-fr-paris/colors.js
my/nls/fr-fr/colors.js
my/nls/fr/colors.js
my/nls/colors.js
```

如果你不在模块的顶层中包含root bundle，你可像一个常规的locale bundle那样定义它。这种情形下顶层模块应如下：

```js
//my/nls/colors.js内容：
define({
    "root": true,
    "fr-fr": true,
    "fr-fr-paris": true
});
```

root bundle应看起来如下：

```js
//my/nls/root/colors.js内容：
define({
    "red": "red",
    "blue": "blue",
    "green": "green"
});
```

## 多入口配置

## require原理


 


