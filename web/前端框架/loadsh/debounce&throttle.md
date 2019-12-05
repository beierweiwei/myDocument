在2011年，Twitter网站曾爆出一个问题：在主页往下滚动时，页面会变得缓慢以致没有响应。John Resig发表了一篇文章《 a blog post about the problem》指出直接在scroll事件上面绑定高消耗的事件是一个多么愚蠢的想法。现在项目中大家都会对类似的scroll或者resize事件都进行了节流控制，下述是我们经常用到，也是《JavaScript高级程序设计》- JavaScript高级技巧中提及的节流方式。

```js
/**
 * 节流函数(JavaScript高级程序设计)
 * @param method 方法
 * @param scope 当前函数执行作用域
 */
function throttle(method, scope) {
    clearTimeout(method.tId);
    method.tId= setTimeout(function(){
        method.call(scope);
    }, 100);
}

function resizeDiv(){
    var div = document.getElementById("myDiv");
    div.style.height = div.offsetWidth + "px";
}

// 节流在resize事件中最常用
window.onresize = function(){
    throttle(resizeDiv);
};
```

之前一直觉得上述代码就是实现了真正的节流，也没去深入研究。直到最近在和之前的同事讨论图表的问题，说起了“throttle和debounce”，他说我们项目中使用的不是真正意义上的throttle，而是一个debounce的简单实现。这里先简单介绍一下“throttle和debounce”，二者都是随着时间推移控制执行函数的次数来达到较少资源消耗，特别在事件触发上，尤为重要。

debounce(func, wait, immediate)：创建并返回函数的防反跳版本，将延迟函数的执行（真正的执行）在函数最后一次调用时刻的wait毫秒之后，对于必须在一些输入（多是一些用户操作）停止之后再执行的行为有帮助。将一个连续的调用归为一个！

throttle(func, wait, options)：创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔指定的wait毫秒调用一次该函数； 不允许方法在每wait ms间执行超过一次！

举个例子：页面存在一个按钮，通过throttle和debounce包括其监听函数，wait设置为1000ms。确保在每个1000ms内都多次触发click持续2000ms。

```js
// 执行1次(最后一次点击1000ms后)
btnDom.addEventListener('click', debounce(clickBtn, 1000)); 
// 执行3次(点击立即执行一次、1000ms后执行一次，2000ms后执行一次)
btnDom.addEventListener('click', throttle(clickBtn, 1000)); 
```

debounce使用场景：

第一次触发后，进行倒计wait毫秒，如果倒计时过程中有其他触发，则重置倒计时；否则执行fn。用它来丢弃一些重复的密集操作、活动，直到流量减慢。例如：

对用户输入的验证，不在输入过程中就处理，停止输入后进行验证足以；
提交ajax时，不希望1s中内大量的请求被重复发送。
throttle使用场景

第一次触发后先执行fn（当然可以通过{leading: false}来取消），然后wait ms后再次执行，在单位wait毫秒内的所有重复触发都被抛弃。即如果有连续不断的触发，每wait ms执行fn一次。与debounce相同的用例，但是你想保证在一定间隔必须执行的回调函数。例如：

对用户输入的验证，不想停止输入再进行验证，而是每n秒进行验证；
对于鼠标滚动、window.resize进行节流控制。
正真的业务场景：

一个相当常见的例子，用户在你无限滚动的页面上向下滚动鼠标加载页面，你需要判断现在距离页面底部多少。如果用户快接近底部时，我们应该发送请求来加载更多内容到页面。在此debounce没有用，因为它只会在用户停止滚动时触发，但我们需要用户快到达底部时去请求。通过throttle我们可以不间断的监测距离底部多远。

```js
$(document).ready(function(){
  // 这里设置时间间隔为300ms
  $(document).on('scroll', throttle(function(){
    check_if_needs_more_content();
  }, 300));

  // 是否需要加载更多资源
  function check_if_needs_more_content() {     
    var pixelsFromWindowBottomToBottom = 0 + $(document).height() - $(window).scrollTop() - $(window).height();
    // 滚动条距离页面底部小于200，加载更多内容
    if (pixelsFromWindowBottomToBottom < 200){
      // 加载更多内容
      $('body').append($('.item').clone()); 
    }
  }
});
```

特别说明：

```js
// 错误
$(window).on('scroll', function() {
    debounce(doSomething, 300); 
});

// 正确
$(window).on('scroll', debounce(doSomething, 200));
```

下述代码，引用自`underscore`

debounce函数

```js 
/**
 * 防反跳。func函数在最后一次调用时刻的wait毫秒之后执行！
 * @param func 执行函数
 * @param wait 时间间隔
 * @param immediate 为true，debounce会在wai 时间间隔的开始调用这个函数
 * @returns {Function}
 */
function debounce(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
        var last = new Date().getTime() - timestamp; // timestamp会实时更新

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function() {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        var callNow = immediate && !timeout;

        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}
```

throttle函数

```
/**
 * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数
 * @param func 执行函数
 * @param wait 时间间隔
 * @param options 如果你想禁用第一次首先执行的话，传递{leading: false}，
 *                如果你想禁用最后一次执行的话，传递{trailing: false}
 * @returns {Function}
 */
function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
```

>转自：https://blog.csdn.net/ligang2585116/article/details/75003436