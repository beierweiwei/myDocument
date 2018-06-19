let isArray = Array.isArray;
class Chart {
	constructor (opt) {	
    this.initFn(opt)
		this.render()
	}
	initFn (originOpt) {
		// 静态配置：staticOpt:style


		// 动态配置：domyicOpt: data,	
		//和动态
		var baseOpt = {
			name: 'chart',
			data: [123,456,789,333,555,345,213],
			xScale: {
				type: 'line',
				domain: [],
				range: []
			},
			yScale: {
				type: 'line',
				domain: [],
				range: []
			},
			xAxis: {
				orient: 'bottom',
				ticks: 10,
				translate: {
					x:  0,
					y:  0
				}
			},
			yAxis: {
				orient: 'left',
				ticks: 10,
				translate: {
					x: 0,
					y: 0
				}
			},
			node: {
				type: 'rect',
				color: '#f60',
				height: 40,
				gap: 10
			},
			style: {
				width: 500,
				height: 500,
				color: 'black',
				left: 40,
				top: 40,
				right: 40,
				bottom: 40
			}
		}
		var opt = {...baseOpt, ...originOpt}
		this.opt = opt
		this.data = originOpt.data /*更新*/ || this.data /*更新其他*/ || opt.data /*初始化*/


		this.chart = this.chart ||  {}
		this.data.max = d3.max(this.data)
		this.data.min = d3.min(this.data)
		this.name = opt.name
		this.style = { ...baseOpt.style, ...this.style, ...originOpt.style}

		this.chart.width = Number(this.style.width) - Number(this.style.left + this.style.right ) 
		this.chart.height = Number(this.style.height) - Number(this.style.top + this.style.bottom) 
    this.chart.xAxis = originOpt.xAxis   || this.chart.xAxis  || baseOpt.xAxis
    this.chart.yAxis = originOpt.yAxis   || this.chart.yAxis  || baseOpt.yAxis
    this.chart.xScale = originOpt.xScale || this.chart.xScale || baseOpt.xScale
    this.chart.yScale = originOpt.yScale || this.chart.yScale || baseOpt.xScale
		this.chart.node  =   originOpt.node  || this.chart.node   || baseOpt.node
		this.chart.scale = {}
		this.chart.axis = {}
		this.type = originOpt.type || this.chart.type || baseOpt.type;
		this.el = this.el || document.getElementById(originOpt.el)
		this.svg = this.svg

	}
	parseScale () {
		// parse domain
		if (this.chart.xScale) {
			let xScale = this.chart.scale.x = d3.scale.linear();
			let xDomain = this.chart.xScale.domain
			let xRange = this.chart.xScale.range

			// if (xDomain && isArray(xDomain)) {
			// 	xDomain[0] = xDomain[0] !== undefined ? xDomain[0] : this.data.min
			// 	xDomain[1] = xDomain[1] !== undefined ? xDomain[1] : this.data.max
			// }

			// if (xRange && isArray(xRange)) {
			// 	xRange[0] = xRange[0] !== undefined ? xRange[0] : 0
			// 	xRange[1] = xRange[1] !== undefined ? xRange[1] : this.chart.width
			// }
			xDomain[0] = this.data.min
			xDomain[1] = this.data.max
			xRange[0] =  0
			xRange[1] = this.chart.width
			xScale.domain(xDomain).range(xRange)
		}
		if (this.chart.yScale) {
			let yScale = this.chart.scale.y = d3.scale.linear();
			let yDomain = this.chart.yScale.domain
			let yRange = this.chart.yScale.range

			if (yDomain && isArray(yDomain)) {
				yDomain[0] = yDomain[0] !== undefined ? yDomain[0] : this.data.min
				yDomain[1] = yDomain[1] !== undefined ? yDomain[1] : this.data.max
			}

			if (yRange && isArray(yRange)) {
				yRange[0] = yRange[0] !== undefined ? yRange[0] : 0
				yRange[1] = yRange[1] !== undefined ? yRange[1] : this.chart.height
			}
			yScale.domain(yDomain).range(yRange)
		}
		// parseRange
	}
	// parseAxis() {

	// },
	parseOpt (opt) {
		// wrap data
		let data = opt.data  
		data = typeof opt.wrapData === 'function' ? opt.wrapData(data) : data;
		// caculate style
		return {
			...opt,
			data
		}
	}
	render() {
		this.mount()
		this.parseScale()
		this.create()
		console.log(this)
		return this
	}
	// render
  // mount
  mount() {
  	this.el.innerHTML = ''
  	this.svg = d3.select(this.el)
    	.append('svg')
    	.attr('width', this.style.width)
    	.attr('height', this.style.height)  
  	return this  
  }
  create () {
  	var _this = this,
  	nodes = this.chart.nodes
    // 定义坐标轴
    // d3.svg.axis(): D3中坐标轴的组件， 能够在svg中生成组成坐标轴的元素
    // scale(): 指定比例尺
    // orient(): 指定刻度朝向，button表示在坐标轴的下方显示
    // ticks(): 指定刻度的数量

    // 将坐标轴添加到svg中
    // this.chart.axis = d3.svg.axis()
    // 	.scale(this.scale)
    // 	.orient(this.chart.orient)
    // 	.ticks(this.chart.ticks)

    // this.svg.append('g')
    // 	.attr('class', 'axis')
    // 	.attr('transform', 'translate(20, 130)')
    // 	.call(this.chart.axis)


    nodes = this.svg.selectAll('rect');
    nodes.data(this.data)
    	.enter()
    	.append('rect')
    	.attr('x', this.style.left)
    	.attr('y', function (d, i) {
    		return i * (_this.opt.node.height + _this.opt.node.gap)
    	})
    	.attr('height', this.chart.node.height)
    	.attr('width', function (d, i) {
    		return _this.chart.scale.x(d)
    	})
    	.attr('fill', this.style.color)
    // 刻度尺
    if (this.chart.xAxis) {
    	this.chart.axis.x = d3.svg.axis() // 刻度
    				.scale(this.chart.scale.x)		//指定比例尺
    				.orient(this.chart.xAxis.orient)	//指定刻度的方向
    				.ticks(this.chart.xAxis.ticks);			//指定刻度的数量
    
    	this.svg.append("g")
    		.attr("class","axis")
    		.attr("transform","translate("  + (this.style.left + this.chart.xAxis.translate.x) + ',' + (this.style.top + this.chart.height + this.chart.xAxis.translate.y) +")")
    		.call(this.chart.axis.x);

    }
    if (this.chart.yAxis) {
    	this.chart.axis.y = d3.svg.axis() // 刻度
    				.scale(this.chart.scale.y)		//指定比例尺
    				.orient(this.chart.yAxis.orient)	//指定刻度的方向
    				.ticks(this.chart.yAxis.ticks);			//指定刻度的数量
   
    	this.svg.append("g")
    		.attr("class","axis")
    		.attr("transform","translate("  + (this.style.left + this.chart.yAxis.translate.x) + ',' + (this.style.top + this.chart.yAxis.translate.y) + ")")
    		.call(this.chart.axis.y);
    }

  	return this
  }
  // 操作单个节点
  updateData (data) {
  	if (data && isArray(data)) {
  		this.data = data
  		this.data.max = d3.max(data)
  		this.data.min = d3.min(data)
  	}
  	return this.render()
  }

  addDataNode (dataNode) {
  	if(!isArray(dataNode)) {
  		dataNode = [dataNode]
  	}
  	let data = this.data
  	return this.updateData([...data, ...dataNode])

  }

  removeDataNode (idx, lenth) {
  	let data = this.data
  	data.splice(idx, length)
  	return this.updateData(data)
  }
  updateDataNode (dataNode, idx, length) {
  	let data = this.data 
  	data.splice(idx, length, dataNode)
  	return this
  }

  // 通过配置文件重新生写实例
  updateChart (opt) {
  	// update修改实例中的某点配置
    this.initFn(opt)
		this.render()
  }
  getTypeOpt (type) {
		return this.typeOpt[type] || {}
	}


	// operate node

		//get node

		// update node

		// remove node

		// add node

		// node event
			// drag
			// click
			// dbclick
			// hover

	// operate data -> update
	  // getData()
	  // addData()
	  // updateData  
	  // removeData  render.update()



	// bind event
}
Chart.init = function (opt) {
	return new Chart(opt)
}
Chart.typeOpt = {
	fore: {
   
	},
	histogram: {

	},
	pie: {

	}
}
var chart = Chart.init({el: 'chart'})
