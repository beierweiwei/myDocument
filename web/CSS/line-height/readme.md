# line-height 与 vertical-aligin
## line-height 
line-box的高度由line-box内所有inline-box最高点和最低点决定的。

line-height继承不同写法：数字 和 百分比表示方法，在元素自身设置了line-height（非继承的情况下）在定义行高元素本身上的值是相同的，区别在于子元素的继承。
* 继承的百分比：就是父元素计算后的行高。
* 继承数字：当前font-size * 数字倍数 得出来的行高。
* px单位：基于基线上下移动

## 内联元素对齐方式

inline-box的对齐，基于line-box末端隐藏的文本节点内容框（字体大小，如果字体为Npx,则内容框的高度为Npx）对齐。所有元素的默认vertical-align属性是baseline。

*baseline对齐就是将元素的base-line线与需要对齐元素的base-line线对齐。*

## 行高对不同级元素影响不同：
* block、inline-block设置行高，行高可以支持元素高度。
* inline元素设置行高，不会支撑自身高度。但行高会作为vertical-aligin中top，bottom对齐依据。且行高可以撑开父元素高度。
* 如果需要line-box中的所有inline-box居中对齐，则需要保证所有元素字体大小一致。

## 行高和vertical-aligin
* 设置了line-height属性的元素内的line-block,inline元素内容（line-blok是行高或者高度，inline字体内容（大小））的中垂线与line-box中垂线重合。
* 所有inline,inline-blok默认vertical-aligin为baselin对齐
* 设置行高的垂直居中方法是决对垂直居中，设置vertical-aligin：middle方法接近垂直居中。所以设置行高绝对居中后，line-box中的所有inline，inline-block元素都会基于line-box的尾部隐藏文本节点进行。*如果此时在给元素设置midle对齐，则元素会偏移*
* 注意元素对齐是基于line-box尾部的隐藏文本对齐，而非元素的兄弟节点。
* *vertical-aligin: baseline 对齐方式只与文字的baseline有关,和行高无关。*

## vertical-aligin:midle并非绝对居中
vertical-aligin:midle 是baseline + 1/2 x-height高度。根据字体的不同x高度也不尽相同。

基于baseline对齐，line-box内的各元素保持内容（字体大小或行高）同linebox字体保持一致则会居中对齐。如果其中有使用vertical-algin:midle属性，则会发现和绝对居中有偏差。

## linebox 中的inline 和 inline-block元素的对齐过程
第一步定位line-box隐藏的尾部文本节点。

* 文本节点的高度等于line-box的包含块的字体大小。
* 文本节点的位置与line-box的line-height中垂直居中。
* 文本节点的顶部即为文本节点的顶线，底部为底线。baseline在底线上面一点。

第二步定位inline-block元素中的隐藏文本节点。（可以将line-block看成和line-box有同样的属性）
* 文本节点的高度等于inline-block元素的字体大小
* 文本节点的位置与inline-block元素的line-height垂直居中
* 文本节点的顶部即为文本节点的顶线，底部为底线。baseline在底线上面一点。
然后每个inline-block根据自身设定的vertical-align属性，将同line-box尾部隐藏的文本节 
