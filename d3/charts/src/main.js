let isArray = Array.isArray;
class Chart {
	constructor (opt) {
		
    this.initFn(opt)
		this.render()

	}
	initFn (opt) {
		let baseOpt = {
			name: 'chart',
			data: [123,456,789,123,45,345,213],
			xScale: {
				type: 'line',
				domain: [],
				range: [0, 600],
			},
			yScale: {
				type: 'line',
				domain: [],
				range: [0, 600],
			},
			xAxis: {
				axis: null,
				orient: 'bottom',
				ticks: 7,
			},
			yAxis: {
				orient: 'left',
				ticks: 10	
			},
			node: {
				type: 'rect',
				color: '#f60',
				height: 40,
				gap: 10
			},
			style: {
				width: '500',
				height: '800',
				margin: '50',
			},
		}
		opt = {...baseOpt, ...opt}
		this.opt = opt
		this.data = opt.data || []
		this.data.max = d3.max(this.data)
		this.data.min = d3.min(this.data)
		this.name = opt.name || 'chart'
		this.style = opt.style

		this.style.chartWidth = this.style.width - this.style.padding * 2
		this.style.chartHeight = this.style.height - this.style.padding * 2
		this.type = opt.type;

		this.dataSize = opt.data.size || 0;
		this.el = document.getElementById(opt.el)
		this.svg = null
		this.chart = {}
		this.chart.node = opt.node
		this.chart.scale = {}
	}
	parseScale () {
		// parse domain
		if (this.opt.xScale) {
			let xScale = this.chart.scale.x = d3.scale.linear();
			let xScaleOpt = this.opt.xScale
			let xDomain = xScaleOpt.domain
			let xRange = xScaleOpt.range

			if (xDomain && isArray(xDomain)) {
				xDomain[0] = xDomain[0] !== undefined ? xDomain[0] : this.data.min
				xDomain[1] = xDomain[1] !== undefined ? xDomain[1] : this.data.max
			}

			if (xRange && isArray(xRange)) {
				xRange[0] = xRange[0] !== undefined ? xRange[0] : 0
				xRange[1] = xRange[1] !== undefined ? xRange[1] : this.chart.width - this.style.margin
			}
			xScale.domain(xDomain).range(xRange)
		}
		if (this.opt.yScale) {
			let yScale = this.chart.scale.y = d3.scale.linear();
			let yScaleOpt = this.opt.yScale
			let yDomain = yScaleOpt.domain
			let yRange = yScaleOpt.range

			if (yDomain && isArray(yDomain)) {
				yDomain[0] = yDomain[0] !== undefined ? yDomain[0] : this.data.min
				yDomain[1] = yDomain[1] !== undefined ? yDomain[1] : this.style.max
			}

			if (yRange && isArray(yRange)) {
				yRange[0] = yRange[0] !== undefined ? yRange[0] : 0
				yRange[1] = yRange[1] !== undefined ? yRange[1] : this.chart.height - this.style.margin
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
	}
	// render
    // mount
  mount() {
  	this.svg = d3.select(this.el)
    	.append('svg')
    	.attr('width', this.style.width)
    	.attr('height', this.style.height)    
  }
  create() {
  	var _this = this
    // 定义坐标轴
    // d3.svg.axis(): D3中坐标轴的组件， 能够在svg中生成组成坐标轴的元素
    // scale(): 指定比例尺
    // orient(): 指定刻度朝向，button表示在坐标轴的下方显示
    // ticks(): 指定刻度的数量

    // 将坐标轴添加到svg中
    this.chart.axis = d3.svg.axis()
    	.scale(this.scale)
    	.orient(this.chart.orient)
    	.ticks(this.chart.ticks)

    // this.svg.append('g')
    // 	.attr('class', 'axis')
    // 	.attr('transform', 'translate(20, 130)')
    // 	.call(this.chart.axis)


    this.chart.node = this.svg.selectAll('rect')
    	.data(this.data)
    	.enter()
    	.append('rect')
    	.attr('x', 20)
    	.attr('y', function (d, i) {
    		return i * (_this.opt.node.height + _this.opt.node.gap)
    	})
    	.attr('height', this.chart.node.height)
    	.attr('width', function (d, i) {
    		return _this.chart.scale.x(d)
    	})
    	.fill(this.chart.node.color)	
  }

  type (type) {
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