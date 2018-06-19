import EventEmitter from 'wolfy87-eventemitter'
import d3 from 'd3'
class Chart extends EventEmitter {
	constructor (opt) {
		let baseOpt = {
			data: [123,456,789,100,123],
			name: 'chart',
			chart: {
				scale: {
					type: 'line',
					domain: [],
					range: [],
				},
				orient: 'bottom',
				ticks: 7,
				node: {
					type: 'rect'
					color: 'red'
				}
			},
			style: {
				width: '500',
				height: '500',
				margin: '50',
			},
		}
		opt = {...baseOpt, ...opt}
		this.opt = opt
		this.data = opt.data || []
		this.data.max = d3.max(this.data)
		this.data.min = d3.min(this.data)
		this.name = opt.name || 'chart'
		this.chart = opt.chart
		this.style = {
			margin: opt.margin,
			width: opt.width,
			height: opt.height, 
		}
		this.type = opt.type;
		this.dataSize = opt.data.size || 0;
		this.el = document.getElementById(el)
		this.svg = null

		this.render()

	}
	init (opt) {

		new Chart(parseOpt(opt))
	}
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
		this.create()
	}
	// render
    // mount
  mount() {
  	this.svg = d3.select(this.el)
    	.append('svg')
    	.width(this.width)
    	.height(this.height)    
  }
  crate() {
  	// initData
    this.chart.scale = d3.scale.linear()
    	.domain(this.chart.domin)
    	.range(this.chart.range) 

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

    this.svg.append('g')
    	.attr('class', 'axis')
    	.attr('transform', 'translate(20, 130)')
    	.call(this.chart.axis)


    var rect = svg.selectAll('rect')
    	.data(this.data)
    	.enter()
    	.append('rect')
    	.attr('x', 20)
    	.attr('y', function (d, i) {
    		return i * 25
    	})
    	.attr('height', rectHeight - 2)
    	.attr('width', function (d, i) {
    		return this.chart.scale(d)
    	})
    	.fill(this.chart.node.color)	
  }
  version = 1.0

  type = function (type) {
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
Chart.typeOpt = {
	fore: {
   
	},
	histogram: {

	},
	pie: {

	}
}

var chart = Chart.init()