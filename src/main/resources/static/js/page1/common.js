$(function() {
	var jpg = [ "../images3/1920-500-3.jpg", "../images3/1920-500-2.jpg",
			"../images3/1920-500-4.jpg" ];
	var jpgCount = 1;
	setInterval(function() {
		$("#bannerBg").css("background-image", "url(" + jpg[jpgCount] + ")");
		jpgCount++;

		if (jpgCount >= 3)
			jpgCount = 0;

	}, 5000);
});

function numInput(o) {
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
function jumpPage(url, action) {

	var page = document.getElementById('pageNum');

	if (page.value == '') {
		alert('请输入页数');
		return;
	} else if (page.value == 1)
		location = url + action;
	else
		location = url + "_" + page.value + action;
}