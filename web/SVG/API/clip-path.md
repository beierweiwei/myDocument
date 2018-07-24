# clipPath

剪切路径用于指定可绘制区域。从概念上来说，当绘制的图形超出了剪切路径所指定的区域，超出区域的部分将不会被绘制。

剪切路径是用clipPath元素定义的。属性clip-path可用来引用剪切路径。

剪切路径在概念上等同于一个自定义的可视区域，用来引用元素。所以，它会影响一个元素的呈现，但不会影响这个元素固有的几何形状。被剪切的元素的边界框（即，如果一个元素通过clip-path属性引用了一个clipPath元素，这个元素和它的子元素就是被剪切的元素）必须保持原样，就如它没有被剪切。

默认情况下，一个形状，其被剪切掉的区域（不可见的区域）是不响应鼠标事件的。举个例子，如果一个半径为10的圆形被剪切成半径为5的圆形，那么这个圆在半径为5以外的区域是不能接收“click”事件的。

```js
<?xml version="1.0"?>
<svg width="120" height="120"
     viewPort="0 0 120 120" version="1.1"
     xmlns="http://www.w3.org/2000/svg">

    <defs>
        <clipPath id="myClip">
            <circle cx="30" cy="30" r="20"/>
            <circle cx="70" cy="70" r="20"/>
        </clipPath>
    </defs>
    
    <rect x="10" y="10" width="100" height="100"
          clip-path="url(#myClip)"/>
    
</svg>
```