$(function() {

	indexPrice();
	indexGoods(1,10);
	indexGoodsCount();
});
//指数类型(周月季年指数)
var preExpType = 2;
var preExpType2 = 3;
//车型
var preCar = 3;
//指数类型
var preCate = 1;

var start = 0;
var limit = 10;
var index = 1;
var totalPage = 100000;


function selectItem(target,value,cls,type) {
	$(target).addClass(cls).siblings().removeClass(cls);
	if(type=="price"){
		preExpType = value;
		indexTrend();
	} else if(type=="volume") {
		preExpType = value;
		indexVolume();
	} else if(type=="cateId"){
		preCate = value;
		indexTrend();
	}else if(type=="carId") {
		preCar = value;
		indexPrice();
	}
}



function indexTrend() {

	var url = "index_trend.action?cateId=" + preCate + "&expTypeId="+ preExpType+"&marketId=1";

	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',
		success : function(json) {

			if (preExpType == 2)
				lineArea3ChartSnake(json.title, json.chart1.xLebal,json.chart1.yLebal, json.chart2.yLebal,json.chart3.yLebal, json.y_max, json.y_min);
			else if (preExpType == 3)
				lineArea3ChartPulse(json.title, json.chart1.xLebal,json.chart1.yLebal, json.chart2.yLebal,json.chart3.yLebal, json.y_max, json.y_min);

			else
				lineArea3ChartPulse(json.title, json.chart1.xLebal,json.chart1.yLebal, json.chart2.yLebal,json.chart3.yLebal, json.y_max, json.y_min);// 临时
		}
	});
}

function indexLine() {
	var url = "index_line.action";

	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',
		success : function(json) {
			chinaMapCharts3(json.list);
		}
	
	});
}

function indexVolume(areaName) {

	var url = "index_volume.action";

	$.ajax({
		url : url,
		type : 'post',
		data:{marketId:1,expTypeId:preExpType2,areaName:areaName},
		dataType : 'json',
		success : function(json) {
			if (preExpType == 3) {
				barLineChartSnake(json.title, json.chart1.xLebal,json.chart1.yLebal, json.chart2.yLebal,json.chart3.yLebal, json.chart4.yLebal,json.chart5.yLebal, json.y_max, json.y_min);
			}
			else if (preExpType == 4) {
				barLineChartSnake(json.title, json.chart1.xLebal,json.chart1.yLebal, json.chart2.yLebal,json.chart3.yLebal, json.chart4.yLebal,json.chart5.yLebal, json.y_max, json.y_min);
			}
			else {
				barLineChartSnake(json.title, json.chart1.xLebal,json.chart1.yLebal, json.chart2.yLebal,json.chart3.yLebal, json.chart4.yLebal,json.chart5.yLebal, json.y_max, json.y_min);
			}
		}
	});
}

function indexTraffic(areaName) {

	var url = "index_traffic.action";

	$.ajax({
		url : url,
		type : 'post',
		data:{marketId:1,areaName:areaName,marketName:'全国'},
		dataType : 'json',
		success : function(json) {
			barChartTraffic(json.title, json.chart.xLebal,json.chart.yLebal, json.y_max, json.y_min);
		}
	});
}
/**
 * 货源信息统计数目
 */
//var ttt = null;
function indexGoodsCount(){
	var url = "index_goods_count.action";
	
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		success:function(json){
			var time = sessionStorage.getItem("currentTime");
			var count = json.count|0;
			var currentTime = json.currentTime;
			
			if(time!=null&&time!=''&&time!==undefined&&time==currentTime){
				count = sessionStorage.getItem("count");
			}else {
				sessionStorage.setItem("currentTime",currentTime);
			}
			
				
//					if(ttt==null) {
//						 var tt = 200;
						setInterval(function(){
						
						var a=Math.floor(Math.random()*5);
						count=parseInt(count)+parseInt(a);
						//count++;
						var length = (count+"").length;

		        		var html = "";
		        		for(var i = 0;i<length;i++) {
		        			html+='<div class="t1 fl">'+(count+"").charAt(i)+'</div>';
		        		}
		        		html+='<div class="t2 fl">条</div>';
		        			$(".com2Lnew").html(html);
		        			sessionStorage.setItem("count",count);
		        	
					},1000);
//	        	}
			//
		}
			
	});
	
}

/**
 *货源信息按批次查询，并播放
 */

function indexGoods(page,limit){
	var random=null;
	//上一页
	if(page==-1) {
		index--;
	} else if(page==0) {//下一页
		index++;
	} else if(page==-2) {//尾页
		index = totalPage;
	} else {
		index = page;
	}
	index = index>0?index:1;
	start = (index-1)*10+Math.ceil(Math.random()*1000);
	
	var url = "index_goods.action?start="+start+"&limit="+limit;
	
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		success:function(json){
			var now = new Date();
			var str = '';
			for(var i = 0;i<10;i++) {
				var obj = json.data[i];
//				var time = (now.getTime()-obj.createdOn.time)|0;
			
//				if(index==1){
//					time="刚刚";
//				}else
//					if(time>86400*1000){
//					time = "昨天";
//				} else if(time>3600*1000){
//					time = (time/3600/1000).toFixed(0)+"小时前";
//				} else if(time>60*1000){
//					time = (time/60/1000).toFixed(0)+"分钟前";
//				} else {
//					time ="刚刚";
//				}
				//今天的时间
				 var day2 = new Date();
				 day2.setTime(day2.getTime());
				 var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate()+"-"+day2.getHours();
				 var minutes=day2.getMinutes();
				 var time=day2.getHours();
				 if(time<7){
						time = "昨天";
					} else if(time>=7&&time<17){
								if(index<3){
									time = "刚刚";
								}else if(index<8){
									time=minutes+"分钟前";
								}else{
									time =(time-7)+"小时前";
								}
					} else {
						time =(time-16)+"小时前";
					}
				  str += '<li title="'+obj.memo+'"><div class="xuhao fl" >'+(i+1)+'</div><p class="nerong fl" style="font-size: 12px;"><span class="nerp1 fl">'+obj.infoContent+'</span><span class="ctime fr">'+time+'</span></p></li>';
			}
			$(".com2Nr").html(str);
			$("#currentPage").val(index);
			$(".mtsh_shsp").html(index);
			indexLine();
		}
		
	});
}
indexPriceExponent();
/**
 * 价格指数swipe
 */ 
function indexPriceExponent() {
	var url = "index_price_exponent.action";
	
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		success:function(json){
			var list = json.data;
			var str = "";
			var length = list.length;
			for(var i = 0;i<Math.ceil(length/5);i++) {
				str +='<div class="swiper-slide volume1"><ul class="voluUl">';
				for(var j=0;j<5;j++){
					var index = 5*i+j;
					if(index<length){
						var chain = parseFloat(list[index].chain*100).toFixed(2);
						var expName = list[index].expName.replace("运价","").replace("运输指数","");
						str +='<li onclick="expxHtml('+list[index].attribute1+',\''+list[index].expName+'\')"><div class="li1"><div class="li1-sp1 fl">'+expName+'</div>';
						if(chain>0){
							str +='<div class="li1-sp2 fr">'+parseFloat(list[index].exp1*1000).toFixed(2)+'</div></div>';
						}else {
							str +='<div class="li1-sp3 fr">'+parseFloat(list[index].exp1*1000).toFixed(2)+'</div></div>';
						}
						//str +='<div class="li1-sp2 fr">'+parseFloat(list[index].exp1*100).toFixed(1)+'</div></div>';
						str +='<div class="li2">环比值：'+parseFloat(list[index].exp2*1000).toFixed(2)+'&ensp;&ensp;涨跌幅：'+parseFloat(list[index].chain*100).toFixed(2)+'% </div></li>';
					}
					
				}
				str +='</ul><a href="expx.htm" class="voluBtn">查询</a></div>';
				
					
			}
			var chain = parseFloat(list[0].chain*100).toFixed(2);
			var str2 = "";
			str2+='<h4 class="zs1Right_h4">中国公路物流运价指数</h4>';
			str2+='<div class="zuo1 fl">'+parseFloat(list[0].exp1*1000).toFixed(2)+'</div>';
			str2+='<div class="zuo2 fl">';
			if(chain>0){
				str2+='<p class="zs2_up">'+chain+'%</p>';
				$("#priceExp").css("color","#ff5172");
			}else {
				str2+='<p class="zs2_down">'+chain+'%</p>';
				$("#priceExp").css("color","#3f9f60");
			}
			str2+='<p class="zs2_xia">定基周指数:'+list[0].periodTime+'</p>';
			str2+='</div>';
            
			$("#priceExp").html(str2);
			
			$("#swiper-wrapper").html(str);
			var swiper = new Swiper('#swiper-container', {
		        nextButton: '#swiper-button-next',
		        prevButton: '#swiper-button-prev',
		        spaceBetween: 2
		    });
			
		}
		
	});
}


/**
 * 运量指数swipe
 */ 
function indexVolumeExponent() {
	var url = "index_volume_exponent.action";
	
	$.ajax({
		url:url,
		type:'post',
		dataType:'json',
		success:function(json){
			var list = json.data;
			var str = "";
			var length = list.length;
			for(var i = 0;i<Math.ceil(length/5);i++) {
				str +='<div class="swiper-slide volume1"><ul class="voluUl">';
				for(var j=0;j<5;j++){
					var index = 5*i+j;
					
					if(index<length){
						var name = list[index].expName.replace("省","");
						var chain = parseFloat(list[index].chain*100).toFixed(2);
						if(index>1) {
							name = name.replace("指数","");
						}
						switch(name) {
							case '宁夏回族自治区':name = '宁夏';break;
							case '西藏自治区':name = '西藏';break;
							case '内蒙古自治区':name = '内蒙古';break;
							case '广西壮族自治区':name = '广西';break;
							case '新疆维吾尔自治区':name = '新疆';break;
						}
						str +='<li><div class="li1"><div class="li1-sp1 fl">'+name+'</div>';
						if(chain>0){
							str +='<div class="li1-sp2 fr">'+parseFloat(list[index].exp1*100).toFixed(2)+'</div></div>';
						}else {
							str +='<div class="li1-sp3 fr">'+parseFloat(list[index].exp1*100).toFixed(2)+'</div></div>';
						}
						
						str +='<div class="li2">环比值：'+parseFloat(list[index].exp2*100).toFixed(2)+'&ensp;&ensp;涨跌幅：'+parseFloat(list[index].chain*100).toFixed(2)+'% </div></li>';
					}
					
				}
				str +='</ul><a href="volumex.htm" class="voluBtn">查询</a></div>';
				
					
			}
			var chain = parseFloat(list[0].chain*100).toFixed(2);
			var str2 = "";
			str2+='<h4 class="zs1Right_h4">中国公路物流运价量指数</h4>';
			str2+='<div class="zuo1 fl">'+parseFloat(list[0].exp1*100).toFixed(2)+'</div>';
			str2+='<div class="zuo2 fl">';
			if(chain>0){
				str2+='<p class="zs2_up">'+chain+'%</p>';
				$("#volumeExp").css("color","#ff5172");
			}else {
				str2+='<p class="zs2_down">'+chain+'%</p>';
				$("#volumeExp").css("color","#3f9f60");
			}
			
			str2+='<p class="zs2_xia">定基月指数:'+list[0].periodTime+'</p>';
			str2+='</div>';
            
			$("#volumeExp").html(str2);
			
			$("#swiper-wrapper2").html(str);
			var swiper = new Swiper('#swiper-container2', {
		        nextButton: '#swiper-button-next2',
		        prevButton: '#swiper-button-prev2',
		        spaceBetween: 2
		    });
		}
		
	});
}
/**
 *首页价格查询
 */
function indexPrice() {
	
	var url = "index_price_new.action?cateId=" + preCar+'&marketId=1&startLine=广州';
	//&startLine=广州'

	$.ajax({
		url : url,
		type : 'post',
		dataType : 'json',
		success : function(json) {
			
			var str = "";
			str += '<thead><tr class="w_yjzs_tbtr1"><td>运输方式</td><td>线路</td><td>报价企业</td><td>运价</td><td>环比</td><td>时间</td></tr></thead>';
			var list = json.list;
			str += '<tbody>';
			var cateName = $(".tag-cloud2").text();
			for (var i = 0;i<list.length;i++){
				var unit = "元";
				
				var obj = list[i];
				unit = preCar==3?'元/吨':preCar==4?'元/立方':'元';
				var year = obj.periodTime.year+1900;
				var month = obj.periodTime.month+1;
				var date = obj.periodTime.date;
				var chain = obj.chain;
				str+='<tr>';
				str+='<td>'+cateName+'</td>';
				str+='<td>'+obj.startLine+'-'+obj.endLine+'</td>';
				str+='<td>林安集团</td>';
				str+='<td>¥'+obj.price+unit+'</td>';
				if(chain>=0) {
					str+='<td><img src="/'+res+'/images4/up.png"/>+'+(obj.chain*100).toFixed(2)+'%</td>';
				}else {
					str+='<td><img src="/'+res+'/images4/down.png"/>'+(obj.chain*100).toFixed(2)+'%</td>';
				}
				
				str+='<td>'+year+'-'+month+'-'+date+'</td>';
				str+='</tr>';
				
			}	
			str+='</tbody>';
            $("#resultTable").html(str);
        
		}
	});
}

/**
 * 指数查询页面
 */
function expxHtml(level,expName) {
	$("#level").val(level);
	$("#expName").val(expName);
	sessionStorage.setItem("level",level);
	sessionStorage.setItem("expName",expName);
	window.location.href = "expx.htm";
	//$("#form").submit();
}