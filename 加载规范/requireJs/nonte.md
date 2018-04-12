## requiresJs
AMD: 异步定义模块，代表： require.js

##使用方法
`html`通过`script，`标签引入`require.js`,然后通过`script`标签设置`data-main`属性,确定人口js文件。
require.config({option...});
option
  * baseUrl: 加载模块的根路径
  * path: {}：以原始路径的字符串为key，以替换解析后的新路径为value。

 如果没有明确配置conifg中的baseUrl, srcipt标签的data-main属性也没有用时，require.js默认从使用requre.js的html被包含的文件夹为baseUrl。

 require.js 假设默认所有文件为script脚本，所以依赖模块时只需要填写模块id，requreJS会自动将id转为路径。

 以下几种情况，requireJs会将模块当作普通的url进行加载, 不会使用 baseUrl + path自动转换。
    * 以.js结束
    * 以'/'开头
    * 包含协议, 如 'http、https'
## api 
definde();
require();


 


