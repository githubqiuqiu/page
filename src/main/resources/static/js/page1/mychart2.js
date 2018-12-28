var expMap = null;
var expMap2 = null;
$(function() {
	$.ajax({
		url : 'price_map.action',
		type : 'post',
		dataType : 'json',
		success : function(json) {
			expMap = json.expMap;
			chinaMapCharts(json.nameList);
		}
	});
});



function chinaMapCharts(nameList) {
	var periodTime = expMap[nameList[0]].dateString; 
	var year = expMap[nameList[0]].year;
	var cycle = expMap[nameList[0]].cycle;
	$("#priceYearAndCycle").html("&nbsp;("+year+'年第'+cycle+'周)');
	var dataArray=[];
	for(var i=0;i<nameList.length;i++){
		var flag = false;
		var index =  -1;
		var name = expMap[nameList[i]].areaName.replace('省','');
		switch(name) {
			case '宁夏回族自治区':name = '宁夏';break;
			case '西藏自治区':name = '西藏';break;
			case '内蒙古自治区':name = '内蒙古';break;
			case '广西壮族自治区':name = '广西';break;
			case '新疆维吾尔自治区':name = '新疆';break;
		}
		var data = {
			name : name,
			value:Math.round(expMap[nameList[i]].chain * 10000) / 100,
			desc:[{name:expMap[nameList[i]].startLine,value:Math.round(expMap[nameList[i]].chain * 10000) / 100,exp:(expMap[nameList[i]].exp1 * 10000/10).toFixed(2)}]
		};
		for(var j=0;j<dataArray.length;j++){
			var obj = dataArray[j];
			if(obj.name==data.name){
				data.value = (obj.value+data.value)/2;
				for(var k=0;k<obj.desc.length;k++){
					data.desc.push(obj.desc[k]);
				}
				index = j;
				flag = true;
			}
		}
		if(flag){
			dataArray.splice(index,1);
		}
		dataArray.push(data);
		
	}
	var p = dataArray[0];
	p.periodTime = periodTime;
	updateTips(p,'price');
	var myChart = echarts.init(document.getElementById('container'));
	option = {
//		title : {
//			text : '各省份运量月环比指数效果图',
//			left : 'center'
//		},
		tooltip : {
			trigger : 'item',
			showDelay: 0,
	        transitionDuration:0,
	        borderRadius : 8,
	        padding: 20,    // [5, 10, 15, 20]
	        textStyle : {
	            color: 'white',
	            decoration: 'none',
	            fontSize: 12,
	            fontWeight: 'bold'
	        },
			//formatter : "{a} <br/>{b} :{c}%",
			formatter: function (params,ticket,callback) {
	            var res = '<span style="font-size:18px;">'+params.name+'</span><span style="margin-left:20px;">'+params.seriesName+'</span><hr/>';
	            for (var i = 0, l = params.data.desc.length; i < l; i++) {
	            	var obj = params.data.desc[i];
	            	res +=  obj.name + ' : ' + obj.value+'%<br/>';
	                
	            }
	            return res;
	        }
		},
		legend : {
			orient : 'vertical',
			left : 'left',
			data : [ '总指数' ]
		},
		visualMap : {
			min : -2,
			max : +2,
			left : 'left',
			color : [ '#78a3c6','#a6bfd8','#98bfe0'],
			top : 'bottom',
			text : [ '涨', '跌' ], // 文本，默认为数值文本
			calculable : true,
			show : false
		},
		toolbox : {
			show :  false,
			orient : 'vertical',
			left : 'right',
			top : 'center',
			feature : {
				dataView : {
					readOnly : false
				},
				restore : {},
				saveAsImage : {}
			}
		},
		series : [ {
			name : periodTime,
			type : 'map',
			mapType : 'china',
			roam : false,
			label : {
				normal : {
					show : true
				},
				emphasis : {
					show : true
				}
			},
			data : dataArray

		} ]
	};
	myChart.setOption(option);
	myChart.on('click', function(params) {
		params.periodTime = periodTime;
		updateTips(params.data,'price');
	});
}

function chinaMapCharts2(nameList) {
	var periodTime = expMap2[nameList[0]].dateString;
	var year = expMap2[nameList[0]].year;
	var cycle = expMap2[nameList[0]].cycle;
	$("#voluemYearAndCycle").html("&nbsp;("+year+'年第'+cycle+'周)');
	var dataArray=[];
	for(var i=0;i<nameList.length;i++){
		var flag = false;
		var index =  -1;
		var name = nameList[i].replace('省','');
		switch(name) {
			case '宁夏回族自治区':name = '宁夏';break;
			case '西藏自治区':name = '西藏';break;
			case '内蒙古自治区':name = '内蒙古';break;
			case '广西壮族自治区':name = '广西';break;
			case '新疆维吾尔自治区':name = '新疆';break;
		}
		var data = {
			name : name,
			value:Math.round(expMap2[nameList[i]].chain * 10000) / 100,
			desc:[{name:name,value:Math.round(expMap2[nameList[i]].chain * 10000) / 100,exp:(expMap2[nameList[i]].exp1 * 100).toFixed(2)}]
		
		};
		dataArray.push(data);
		
	}
	console.log(dataArray);
	var p = dataArray[0];
	p.periodTime = periodTime;
	updateTips(p,'volume');
	var myChart = echarts.init(document.getElementById('container2'));

	var option = {
		tooltip : {
			trigger : 'item',
			showDelay: 0,
	        transitionDuration:0,
	        borderRadius : 8,
	        padding: 20,    // [5, 10, 15, 20]
	        textStyle : {
	            color: 'white',
	            decoration: 'none',
	            fontSize: 12,
	            fontWeight: 'bold'
	        },
			//formatter : "{a} <br/>{b} :{c}%",
			formatter: function (params,ticket,callback) {
	            var res = '<span style="font-size:18px;">'+params.name+'</span><span style="margin-left:20px;">'+params.seriesName+'</span><hr/>';
	            res +=  params.data.name + ' : ' + params.data.value+'%<br/>';
	            return res;
	        }
		},
		legend : {
			orient : 'vertical',
			left : 'left',
			data : [ '总指数' ]
		},
		visualMap : {
			min : -2,
			max : +2,
			left : 'left',
			color : [ '#78a3c6','#a6bfd8','#98bfe0'],
			top : 'bottom',
			text : [ '涨', '跌' ], // 文本，默认为数值文本
			calculable : true,
			show : false
		},
		toolbox : {
			show :  false,
			orient : 'vertical',
			left : 'right',
			top : 'center',
			feature : {
				dataView : {
					readOnly : false
				},
				restore : {},
				saveAsImage : {}
			}
		},
		series : [ {
			name : periodTime,
			type : 'map',
			mapType : 'china',
			roam : false,
			label : {
				normal : {
					show : true
				},
				emphasis : {
					show : true
				}
			},
			data : dataArray

		} ]
	};
	myChart.setOption(option);
	myChart.on('click', function(params) {
		params.periodTime = periodTime;
		updateTips(params.data,'volume');
		indexVolume(params.data.name);
		indexTraffic(params.data.name);
	});
}

/**
 * 更改首页价格指数栏目titel信息
 */
function updateTips(params,id) {
	var provinceName = params.name;
	var desc = params.desc;
	var periodTime = params.periodTime;
	$("#"+id+"Title").html(provinceName);
	$("#"+id+"Date").html(periodTime);
	var citys = "";
	var exps = "";
	for(var i = 0;i<desc.length;i++) {
		var obj = desc[i];
		
		citys += '<div class="li1-sp1">'+obj.name+'</div>';
		if(obj.value>0){
			exps += '<div class="li1-sp3">'+obj.exp+'&nbsp;&nbsp;'+obj.value+'%</div>';
		}else {
			exps += '<div class="li1-sp2">'+obj.exp+'&nbsp;&nbsp;'+obj.value+'%</div>';
		}
		
	}
	
	$("#"+id+"Citys").html(citys);
	$("#"+id+"Exps").html(exps);
}
