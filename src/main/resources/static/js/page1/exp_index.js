var preExpType = 2;
var preCateId = 1;
var preType = 5;
var marketId = 1;
$(function() {
	//queryFormSubmit();
});

function selectExpType(expType) {

	if (preExpType == expType)
		return;

	$("#selExpTypeId" + expType).attr("class",
			"w_yjzs_div5_next w_yjzs_div5_on");
	$("#selExpTypeId" + preExpType).attr("class", "w_yjzs_div5_next");

	preExpType = expType;
	$("#expTypeId").val(expType);
	queryFormSubmit();
}

function selectType(type) {
	if (preType == type)
		return;
	$("#selectType" + type).attr("class", "w_yjzs_div2_h1 w_yjzs_div2_h1_on");
	$("#selectType" + preType).attr("class", "w_yjzs_div2_h1");
	$("#selectTypeSon" + type).show();
	$("#selectTypeSon" + preType).hide();
	preType = type;
	$("#type").val(type);
}
var pager = [];
var exp1List = [];
var preValue = 1;
function queryFormSubmit() {
	if (queryingButtonObj != null)
		return;
	if (marketId==1&&preType == 3 && $("#area").val() == '') {
		alerts_autoClose("物流区域不能为空!", 350, 80);
		return;
	}
	if (preType == 2 && $("#city").val() == '') {
		alerts_autoClose("节点城市不能为空!", 350, 80);
		return;
	}

	if (preType == 1 && $("#startLine").val() == '') {
		alerts_autoClose("出发城市不能为空!", 350, 80);
		return;
	}
	if (preType == 1 && $("#endLine").val() == '') {
		alerts_autoClose("目的城市不能为空!", 350, 80);
		return;
	}
	queryingButton('submitButton');
	
	var options = {

		beforeSubmit : function() {

		},
		success : function(json) {

			var html = "";
			html +='<div class="w_i_jgzs_3_1_son">'
			html +='<div class="w_i_jgzs_3_bt">'+json.title+'</div>';
			
			if(json.chain>=0) {
				html +='<div class="w_i_jgzs_3_bt">指数：<span style="color:red;">'+json.expVal+'</span></div>';
				html +='<div class="w_i_jgzs_3_bt">环比涨跌幅：<img src="images3/arrow_up.png" style="height:13px; "><span style="color:red;">'+json.chain+'<span></span></span></div>';
			} else {
				html +='<div class="w_i_jgzs_3_bt">指数：<span style="color:green;">'+json.expVal+'</span></div>';
				html +='<div class="w_i_jgzs_3_bt">环比涨跌幅：<img src="images3/arrow_down.png" style="height:13px; "><span style="color:green;">'+json.chain+'<span></span></span></div>';
			}
			html +='<div class="w_i_jgzs_3_bt">时间：'+json.periodTime+'</div>';
			html +='</div>';
			$("#trendDesc").html(html);
			lineArea3ChartSnake2(json.title, json.chart1.xLebal,json.chart1.yLebal, json.chart2.yLebal, json.chart3.yLebal,json.y_max, json.y_min);
			$("#expTitle").html(json.title);
			$("#dataDesc").html("总共有" + json.pager.total + "条数据 共"+ json.pager.pages + "页");
			pager = json.pager;
			exp1List = json.chart1.yLebal;
			jsGoPager(1);

			clearInterval(queryingButtonObj);
			$("#submitButton").html('立即查询');
			$("#submitButton").removeAttr("disabled");
			queryingButtonObj = null;

		},
		error : function() {
			clearInterval(queryingButtonObj);
			$("#submitButton").html('立即查询');
			$("#submitButton").removeAttr("disabled");
			queryingButtonObj = null;
			alerts("网络不可用！");
		},
		dataType : 'json'
	};
	$("#queryform").ajaxSubmit(options);
}
function prePage() {
	if (pager.pageNumber <= 1) {
		alerts("当前为第一页!");
		return;
	}
	jsGoPager(pager.pageNumber - 1)
}
function nextPage() {
	if (pager.pageNumber == pager.pages) {
		alerts("当前为最后一页!");
		return;
	}
	jsGoPager(pager.pageNumber + 1)
}
function firstPage() {
	if (pager.pageNumber == 1) {
		alerts("当前为第一页!");
		return;
	}
	jsGoPager(1)
}
function lastPage() {
	if (pager.pageNumber == pager.pages) {
		alerts("当前为最后一页!");
		return;
	}
	jsGoPager(pager.pages)
}
function jumpPage() {
	if ($("#pageNumber").val() > pager.pages) {
		alerts("最大不能超过" + pager.pages + "页");
		return;
	}
	if ($("#pageNumber").val() <= 0) {
		alerts("页数应该为正整数!");
		return;
	}
	if ($("#pageNumber").val() == pager.pageNumber) {
		alerts("当前已是第" + $("#pageNumber").val() + "页");
	}
	jsGoPager($("#pageNumber").val());
}
function jsGoPager(page) {

	var html = "<thead><tr class=\"w_yjzs_tbtr1\" ><td>指数</td><td>环比</td><td>统计时间</td><td>统计周期</td><td>发布时间</td></tr></thead><tbody >"
	var startIndex = pager.total - (10 * (page - 1)) - 1;
	var endIndex = pager.total - (10 * page);
	for (; startIndex >= endIndex; startIndex--) {

		if (startIndex < 0)
			break;
		if (pager.list[startIndex].chain >= 0)
			html += "<tr><td><span >"
					+ exp1List[startIndex]
					+ " </span></td><td> <div style=\"width: 75px;height: 40px;margin: 0 auto;border: none;\"><img src=\"images3/arrow_up.png\" style=\"height:13px; margin-left: 3px;\"><span style=\"float: right;\">+";
		else
			html += "<tr><td><span style=\"\">"
					+ exp1List[startIndex]
					+ " </span></td><td><div style=\"width: 75px;height: 40px;margin: 0 auto;border: none;\"><img src=\"images3/arrow_down.png\" style=\"height:13px; \"><span style=\"float: right;\">";
		html += pager.list[startIndex].chain + "%</span></div></td><td>"
				+ pager.list[startIndex].year + " </td><td>"
				+ pager.list[startIndex].cycle + " </td><td>"
				+ pager.list[startIndex].periodTime + " </td></tr>";
	}

	html += "</tbody>"
	pager.pageNumber = page;
	$("#resultTable").html(html);
	$("#pageNumber").val(page);
	if (page == 1) {
		$("#lastPage").removeAttr("disabled");
		$("#lastPage").attr("class", "w_page_btn");
		$("#nextPage").removeAttr("disabled");
		$("#nextPage").attr("class", "w_page_btn");
		$("#firstPage").attr("disabled", "true");
		$("#firstPage").attr("class", "w_page_btn2");
		$("#prePage").attr("disabled", "true");
		$("#prePage").attr("class", "w_page_btn2");

	} else if (page == pager.pages) {
		$("#firstPage").removeAttr("disabled");
		$("#firstPage").attr("class", "w_page_btn");
		$("#prePage").removeAttr("disabled");
		$("#prePage").attr("class", "w_page_btn");
		$("#lastPage").attr("disabled", "true");
		$("#lastPage").attr("class", "w_page_btn2");
		$("#nextPage").attr("disabled", "true");
		$("#nextPage").attr("class", "w_page_btn2");
	} else {

		$("#firstPage").removeAttr("disabled");
		$("#firstPage").attr("class", "w_page_btn");
		$("#prePage").removeAttr("disabled");
		$("#prePage").attr("class", "w_page_btn");
		$("#lastPage").removeAttr("disabled");
		$("#lastPage").attr("class", "w_page_btn");
		$("#nextPage").removeAttr("disabled");
		$("#nextPage").attr("class", "w_page_btn");

	}
}

function priceInputOnKeyup(o) {
	if (!isPInt(o.value) && o.value != '') {
		o.value = preValue;
	} else {
		preValue = o.value;
	}

}

// 正整数
function isPInt(str) {
	var g = /^[1-9]*[1-9][0-9]*$/;
	return g.test(str);
}

var queryingButtonObj = null;

function queryingButton(id) {

	var i = 1;
	queryingButtonObj = setInterval(function() {
		if (i % 4 == 1)
			intervalQuery(id, '  正在查询.')
		else if (i % 4 == 2)
			intervalQuery(id, '   正在查询..')
		else if (i % 4 == 3)
			intervalQuery(id, '    正在查询...')
		else if (i % 4 == 0)
			intervalQuery(id, '正在查询')

		i++;
	}, 300);

}
function intervalQuery(id, val) {

	$("#" + id).html(val);
	$("#" + id).attr("disabled", "true");
}
