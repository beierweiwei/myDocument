# win10 virtualbox安装linux,nginx 

## 安装前

* 电脑bios设置cpu开启虚拟化技术 
* win10的hyper服务会与virtualobx冲突，如果有安装和开启了hyper服务的，需要在系统服务中将其关闭。

## 安装 

### 安装增强驱动
增强驱动可以调整虚拟机分辨率，和鼠标直接在物理机和虚拟机之间切换，非常方便
其他方法参考：
[virtualBox实现主机和虚拟机相互ping通,配置静态IP地址](https://blog.csdn.net/u010486658/article/details/70871940)

[Accessing your Virtualbox Guest from your Host OS](https://gist.github.com/odan/48fc744434ec6566ca9f7a993f4a7ffb)

安装方法：[VirtualBox 屏幕分辨率怎么调整，怎么全屏](https://jingyan.baidu.com/album/6525d4b13b7d0fac7d2e94ef.html)

## 虚拟机网络设置

linux做服务器使用建议安装centos

系统安装成功后，虚拟机关机状态下设置虚拟机的网卡设置，建议直接使用桥接模式，方便主机和局域网机器与虚拟性通信（物理机需连网线）。

修改虚拟机liunx系统的防火墙设置，web开发需要打开80端口，或者直接关闭防火墙

## 安装nginx 

centos7下自动安装
```bash 
# yum -y update 
# yum install epel-release
# yum install nginx 
```
[完整教程](https://www.tecmint.com/install-nginx-on-centos-7/)
[niux总结](https://chenjiabing666.github.io/2018/06/06/Nginx%E6%80%BB%E7%BB%93/)

## 安装nvm
[linux安装nvm](https://blog.csdn.net/qq_23598037/article/details/78384999)