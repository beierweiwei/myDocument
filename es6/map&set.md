# Set && Map 
## Set
基本用法

ES6提供了新的数据结构Set。类似于数组，但是成员是唯一的，没有重复值。

```js 
const s = new Set();
[2,3,5,4,5,2,2].forEach(x => s.add(x));

for (let i of s) {
    console.log(i);
}
```

`add`方法向实例添加成员，set函数可以接受一个数组（或者具有iterable接口的其它数据结构）作为参数，用来初始化。

向Set加入值时，不会发生类型转换，判断两个值是否相同使用算法‘Same-value-zero equality’,类似于严等`===`,主要的区别是`NaN`等于自身。

## Set实例的属性和方法
属性
- Set.prototype.constructor：构造函数，默认就是Set函数。
- Set.prototype.size：返回Set实例的成员总数。
方法
操作类
- `add(value)`：添加某个值，返回 `Set` 结构本身。
- `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `clear()`：清除所有成员，没有返回值。
遍历类
- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

## WeakSet

## Map
ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

### 实例的属性和操作方法
- `size`属性
- `set(key, value)`
- `get(key)` 
- `has(key)` 
- `delete(key)` 
- `clear()` 

遍历方法

- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。
- `entries()`：返回所有成员的遍历器。
- `forEach()`：遍历 `Map` 的所有成员。

## WeakMap
`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。
`WeakMap`与`Map`的区别有两点。

首先，`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。

其次，`WeakMa`p的键名所指向的对象，不计入垃圾回收机制。