function lineArea3ChartSnake(title, xLebal, yLebal1, yLebal2, yLebal3, yMax,
		yMin) {

	// 路径配置
	require.config({
		paths : {
			echarts : 'js3/echartsdist'
		}
	});

	// 使用
	require([ 'echarts', 'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('echarts'));

		if (xLebal == null || xLebal.length == 0) {
			
			myChart.showLoading({
				text : '暂无数据',
				effect : 'bubble',
				textStyle : {
					fontSize : 24
				}
			});
			return ;
		}
		option = {
			title : {
				x : 'center'
			},
			tooltip : {
				trigger : 'axis'
			},
//			legend : {
//				data : [ '定基指数', '环比指数', '同比指数' ],
//				x : 'right'
//			},

			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : xLebal
			} ],

			yAxis : [ {
				type : 'value',
				max : yMax,
				min : yMin
			} ],

			dataZoom : {
				show : true,
				realtime : true,
				start : 0,
				end : 100

			},

			series : [ {
				name : '定基指数',
				type : 'line',
				smooth : true,
				symbol : 'none',
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal1.slice(0, 1)
			}, {
				name : '环比指数',
				type : 'line',
				smooth : true,
				symbol : 'none',// 线条样式
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal2.slice(0, 1)
			}, {
				name : '同比指数',
				type : 'line',
				smooth : true,
				symbol : 'none',
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal3.slice(0, 1)
			} ]
		};

		// 为echarts对象加载数据
		var i = 1;
		myChart.setOption(option);
		var obj = setInterval(function() {
			if (i >= xLebal.length) {
				clearInterval(obj);
				return;
			}

			myChart.addData([ [ 0, // 系列索引
			yLebal1[i], // 新增数据
			false, // 新增数据是否从队列头部插入
			true // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			], [ 1, // 系列索引
			yLebal2[i], // 新增数据
			false, // 新增数据是否从队列头部插入
			true // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			], [ 2, // 系列索引
			yLebal3[i], // 新增数据
			false, // 新增数据是否从队列头部插入
			true // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头

			] ]);
			i++;

		}, 20);

	});

}

function lineArea3ChartSnake2(title, xLebal, yLebal1, yLebal2, yLebal3, yMax,
		yMin) {

	// 路径配置
	require.config({
		paths : {
			echarts : 'js3/echartsdist'
		}
	});

	// 使用
	require([ 'echarts', 'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('echarts'));

		if (xLebal == null || xLebal.length == 0) {
			
			myChart.showLoading({
				text : '暂无数据',
				effect : 'bubble',
				textStyle : {
					fontSize : 24
				}
			});
			return ;
		}
		option = {
			title : {
				x : 'center'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : [ '定基指数', '环比指数', '同比指数' ]

			},

			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : xLebal
			} ],

			yAxis : [ {
				type : 'value',
				max : yMax,
				min : yMin
			} ],

			dataZoom : {
				show : true,
				realtime : true,
				start : 0,
				end : 100

			},
			toolbox : {
				show : true,
				feature : {
					saveAsImage : {
						show : true
					}
				}
			},
			series : [ {
				name : '定基指数',
				type : 'line',
				smooth : true,
				symbol : 'none',
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal1.slice(0, 1)
			}, {
				name : '环比指数',
				type : 'line',
				smooth : true,
				symbol : 'none',// 线条样式
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal2.slice(0, 1)
			}, {
				name : '同比指数',
				type : 'line',
				smooth : true,
				symbol : 'none',
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal3.slice(0, 1)
			} ]
		};

		// 为echarts对象加载数据
		var i = 1;
		myChart.setOption(option);
		var obj = setInterval(function() {
			if (i >= xLebal.length) {
				clearInterval(obj);
				return;
			}

			myChart.addData([ [ 0, // 系列索引
			yLebal1[i], // 新增数据
			false, // 新增数据是否从队列头部插入
			true // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			], [ 1, // 系列索引
			yLebal2[i], // 新增数据
			false, // 新增数据是否从队列头部插入
			true // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			], [ 2, // 系列索引
			yLebal3[i], // 新增数据
			false, // 新增数据是否从队列头部插入
			true // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头

			] ]);
			i++;

		}, 20);

	});

}
function lineArea3Chart(title, xLebal, yLebal1, yLebal2, yLebal3, yMax, yMin) {

	// 路径配置
	require.config({
		paths : {
			echarts : 'js3/echartsdist'
		}
	});

	// 使用
	require([ 'echarts', 'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('echarts'));

		option = {
			title : {
				x : 'center'
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				data : [ '定基指数', '环比指数', '同比指数' ],
				x : 'right'
			},

			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : xLebal
			} ],

			yAxis : [ {
				type : 'value',
				max : yMax,
				min : yMin
			} ],
			//
			// dataZoom : {
			// show : true,
			// realtime : true,
			// start : 0,
			// end : 100
			//
			// },

			series : [ {
				name : '定基指数',
				type : 'line',
				smooth : true,
				symbol : 'none',
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal1
			}, {
				name : '环比指数',
				type : 'line',
				smooth : true,
				symbol : 'none',// 线条样式
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal2
			}, {
				name : '同比指数',
				type : 'line',
				smooth : true,
				symbol : 'none',
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal3
			} ]
		};

		// 为echarts对象加载数据

		myChart.setOption(option);

	});

}
function lineArea3ChartPulse(title, xLebal, yLebal1, yLebal2, yLebal3, yMax,
		yMin) {
	// alert(yLebal1.slice(0,2));
	// 路径配置
	require.config({
		paths : {
			echarts : '../js3/echartsdist'
		}
	});

	// 使用
	require([ 'echarts', 'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
	], function(ec) {
		// 基于准备好的dom，初始化echarts图表
		var myChart = ec.init(document.getElementById('echarts'));

		option = {
			title : {
				x : 'center'
			},
			tooltip : {
				trigger : 'axis'
			},
//			legend : {
//				data : [ '定基指数', '环比指数', '同比指数' ],
//				x : 'right'
//			},

			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : xLebal.slice(0, 10)
			} ],

			yAxis : [ {
				type : 'value',
				max : yMax,
				min : yMin
			} ],

			// dataZoom : {// 数据 缩放
			// type : 'inside',
			// start : 60,
			// end : 80
			// },

			series : [ {
				name : '定基指数',
				type : 'line',
				smooth : true,
				symbol : 'none',
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal1.slice(0, 10)
			}, {
				name : '环比指数',
				type : 'line',
				smooth : true,
				symbol : 'none',// 线条样式
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal2.slice(0, 10)
			}, {
				name : '同比指数',
				type : 'line',
				smooth : true,
				symbol : 'none',
				itemStyle : {
					normal : {
						lineStyle : {
							type : 'default'
						}
					}
				},
				data : yLebal3.slice(0, 10)
			} ]
		};

		// 为echarts对象加载数据
		var i = 10;
		myChart.setOption(option);
		var obj = setInterval(function() {
			if (i >= xLebal.length) {
				clearInterval(obj);
				return;
			}
			myChart.addData([ [ 0, // 系列索引
			yLebal1[i], // 新增数据
			false, // 新增数据是否从队列头部插入
			true // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头

			], [ 1, // 系列索引
			yLebal2[i], // 新增数据
			false, // 新增数据是否从队列头部插入
			true // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			], [ 2, // 系列索引
			yLebal3[i], // 新增数据
			false, // 新增数据是否从队列头部插入
			true // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
			, xLebal[i] ] ]);
			i++;

		}, 500);

	});

}


/**
 * 柱线图
 */
function barLineChartSnake(title, xLebal, yLebal1, yLebal2, yLebal3, yLebal4, yLebal5, yMax, yMin){
	var option = {
		    tooltip: {
		        trigger: "axis",
		        axisPointer: {
		            type: "shadow",
		            textStyle: {
		                color: "#fff"
		            }

		        },
		        formatter: function (params,ticket,callback) {
		        	var name = params[0].name;
		        	var res = '<div style="padding:5px;"><span>'+name+'</span><hr/>';
		        	for(var i =0;i<params.length;i++){
		        		var obj = params[i];
		        		if(obj.seriesType=="bar"){
		        			res+= obj.seriesName+":&nbsp;"+(obj.value*yMax/yMin|0)+'(万吨)<br/>';
		        		} else {
		        			res+= obj.seriesName+":&nbsp;"+(obj.value)+'<br/>';
		        		}
		        			
		        		
		        	}
		        	res+='</div>';
		            return res;
		        }
		    },
		    calculable: true,
		    xAxis: [{
		    	type : 'category',
				data : xLebal
		    }],
		    yAxis: [{
		        type: "value",
		        min:0
		    }],
		    dataZoom : {
		        show : true,
		        realtime : true,
		        start : 0,
		        end : 100,
		        handleColor:'#6b9bc3'
		    },
		    series: [{
		            name: parseInt(xLebal[0].substr(0,4))-1+"年",
		            type: "bar",
		            itemStyle:{
		                normal: {
		                    color: "rgba(255,144,128,1)"
		                }
		            },
		            data: yLebal5
		        },

		        {
		            name: xLebal[0].substr(0,4)+"年",
		            type: "bar",
		            itemStyle: {
		                normal: {
		                    color: "rgba(0,191,183,1)",
		                    barBorderRadius: 0
		                }
		            },
		            data: yLebal4
		        },{
		            name: "定基指数",
		            type: "line",
		            smooth : true,
		            symbol : 'none',
		            itemStyle: {
		            	normal: {
		            		color:'#ff8255'
		            	}
		            },
		            data: yLebal1
		        }, {
		            name: "同比指数",
		            type: "line",
		            smooth : true,
					symbol : 'none',// 线条样式
					itemStyle: {
						normal: {
							color:'#db72d7'
						}
		            },
		            data: yLebal3
		        },{
		            name: "环比指数",
		            type: "line",
		            smooth : true,
		            symbol : 'none',
		            itemStyle: {
		            	normal: {
		            		color:'#90d2fa'
		            	}
		            },
		            data: yLebal2
		        }
		    ]
		};
	var myChart = echarts.init(document.getElementById('echarts2'));
	myChart.setOption(option);
	
}
var colors = ['#008b00','#1E90FF','#2f4554','#ff6f33','#d3d3d3'];
/**
 *货物类型top5
 */
function barChartTraffic (title, xLebal, yLebal, yMax, yMin) {
	var dataArray = [];
	for(var i=0;i<yLebal.length;i++){
		var data = {
			name : xLebal[i],
			value:yLebal[i],
			itemStyle:{normal:{color:colors[i]}}
		};
		dataArray.push(data);
	}
	
	var option = {
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c}万吨 ({d}%)"
	    },
	    legend: {
	    	orient: 'horizontal',
	        left: 'left',
	        top:'bottom',
	        data: xLebal,
	        show:true
	    },
	    series : [
	        {
	            name: title,
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:dataArray,
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};
	var myChart = echarts.init(document.getElementById('echarts3'));
	myChart.setOption(option);
	if(title!='全国'){
		$(".yshu").html(title);
	}
	
}
