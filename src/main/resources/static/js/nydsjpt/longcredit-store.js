/**
 * User: tAngo
 * Date: 14-4-29
 * Time: 上午11:55
 */
var store = function (th, id, type) {
    var isClass = $(th).hasClass('office_01');
    var toggleClass = isClass ? 'office_01_click' : 'office_01';
    var pre = isClass ? '' : '取消';
    var title = isClass ? '取消收藏' : '收藏';
    var url = isClass ? ctx + '/agriculture/store.action' : ctx + '/agriculture/cancel_store.action';
    var message = '';
    if (type == 1) {
        message = '报表'
    } else if (type == 0) {
        message = '专题'
    } else if (type == 2) {
        message = '数据'
    }
    if (confirm("确定要" + pre + "收藏此${type}？".replace('${type}', message))) {
        $.req({url: url, data: {'uuid': id, type: type}, dataType: 'JSON', success: function (data) {
            if (data == 1) {
                $(th).removeClass().addClass(toggleClass);
                $(th).attr("title", title.length == 4 ? title : title + message);
            } else {
                alert(pre + "收藏失败");
            }
        }});
    }
};
