# vue2.3版本.sync使用

vue 2.3版本 v-bind指令的.sync重新回归，但实际上是语法糖，和之前的.sync有区别，使用上也有不同

```js
<comp :foo.sync="bar"></comp>
// 等价于
<comp :for="bar" @upate:foo="foo=$event"></comp>
```

组件中直接调用`this.$emit('update:foo', someVal)`即可

*注意：事件直接写在模版中写成表达式的形式，`$event`为事件的传参数值。*