# 简易商城系统实现思路

## 功能模块

## 后台
### 商品模块
	
	标题
	图例
	描述
	属性 属性 （库）
		默认属性
		新增自定义属性
			商品分类
			属性列表-选项
	上架
	库存
	销量
	价格
	市场价格
	规格 （库）
	图文详情
	商品分类（库）
	店铺id
	商品分类模块（库）
		增删改查

## 用户模块
	个人信息
		账号
		密码
		id
		openid
		性别
		昵称
		avastar
		手机号码
		生日
		收货地址 （）
		注册时间
		封禁
		订单号
		结算单
		购物车/搜藏
	增删改查


## 支付模块
	第三方平台
		微信
		阿里
			商家id
			流水号
			配置信息

## 配送模块
	快递类型
	运费模版
		编辑


## 角色模块
	角色类型
		管理
		运营
		客服
		商家
	角色增删改查
	权限的增删改查

## 商家模块
	商家信息
		店铺名称
		店铺id
		营业执照
		注册时间


## 订单模块
	订单
	属性
		订单编号
		时间
		商品属性
			名称
			图片
			规格
			数量
			单价
			（优惠金额）
			总结
			支付金额
			支付方式
		用户
			用户id
			用户信息-收货信息
				收获地址
				收获电话

		订单状态
			已发货
			待发货
			已支付
			已完成
			退货
		商家
			商家id
			商家名称
		支付
			流水id
			平台
			金额
			时间
		动作	
			删改查

### 支付
	第三方支付api
	alipay
	wxpay

## 前台

### 商品模块
  列表
  	商品名称
  	商品价格
  	市场价格
  	规格
 	图片

  详情
  	商品名称
  	价格
  	市场价格
  	图文详情
  	规格
  	评价
  	地区
购物车模块
	商品
		商品id
		信息
		数量
加车和购买
结算单
	商品
		名称
		数量
		价格
		总价
	用户
		选择收获地址
		编辑收获地址

订单 
	订单号
	金额
	配送方式
	订单状态
配送方式

### 订单
商品信息
用户信息
支付信息
订单状态
取消订单
退货
确认收货
确认收货倒计时
评价
### 结算单
时间
单号
商品信息
用户信息
支付信息

### 支付
用户信息
金额
时间
流水号
支付方式平台

### 收货地址
用户信息
	id/姓名/电话/性别
收货地址
收货电话

增删改查
设置默认收货地址

### 登陆/注册



后续模块
  优惠券模块


