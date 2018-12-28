function openLoginDialog() {
    var ele = 'dialog_box';
    var dialogBox = document.getElementById(ele);
    if (dialogBox) {
        window._REFERENCES_PAGE = true;
        $.ajax({
            type: 'GET',
            url: ctx + '/agriculture/login_dialog.jsp',
            dataType: 'HTML',
            success: function (data) {
                $("#" + ele).css("display", "block").find(".deta_up_main").html(data);
            }
        });
        openDialog('dialog_box', 426, 300);
    }
}
function resultHandler(data, options) {
    try {
        if ((typeof data == "string") || (data instanceof String)) {
            try{
                data = eval('(' + data + ')');
            } catch (e){
            }
        }
        if (data && data.result && data.result === 'error') {
            throw new Error(data.message);
        }
        if (options.success) {
            options.success(data)
        }
    } catch (e) {
        if (data.code && data.code === 'system.error.undefined.login') {
            openLoginDialog();
        } else if (options.error) {
            options.error(e.message);
        } else {
            alert(e.message);
        }
    }
}
/**
 * Jquery 扩展
 * User: tango
 * Date: 13-6-18
 * Time: 上午10:13
 */
jQuery.extend({
    //ajax
    req: function (options) {
        if (!options.url) {
            throw new TypeError('the url is required in options');
        }

        var ajaxProp = {
            type: options.type || "POST",
            url: options.url,
            data: options.data || {},
            dataType: options.dataType || "JSON",
            cache: false,
            beforeSend: function (XHR) {
                if (options.beforeSend) {
                    options.beforeSend(XHR);
                }
            },
            complete: function (XHR, TS) {
                if (options.complete) {
                    options.complete(XHR, TS);
                }
            },
            success: function (data) {
                resultHandler(data, options);
            },
            error: function (err) {
                alert(err.message);
            }
        };
        $.ajax(ajaxProp);
    },
    sub: function (formId, options) {
        var defaults = {
            url: null,
            onSubmit: function (param) {
            },
            success: function (data) {

            }
        };

        function ajaxSubmit(target, options) {
            options = options || {};

            var param = {};
            if (options.onSubmit) {
                if (options.onSubmit.call(target, param) == false) {
                    return;
                }
            }

            var form = $(target);
            if (options.url) {
                form.attr('action', options.url);
            }
            var frameId = 'form_frame_' + (new Date().getTime());
            var frame = $('<iframe id=' + frameId + ' name=' + frameId + '></iframe>')
                .attr('src', window.ActiveXObject ? 'javascript:false' : 'about:blank')
                .css({
                    position: 'absolute',
                    top: -1000,
                    left: -1000
                });
            var t = form.attr('target'), a = form.attr('action');
            form.attr('target', frameId);

            var paramFields = $();
            try {
                frame.appendTo('body');
                frame.bind('load', cb);
                for (var n in param) {
                    var f = $('<input type="hidden" name="' + n + '">').val(param[n]).appendTo(form);
                    paramFields = paramFields.add(f);
                }
                form[0].submit();
            } finally {
                form.attr('action', a);
                t ? form.attr('target', t) : form.removeAttr('target');
                paramFields.remove();
            }

            var checkCount = 10;

            function cb() {
                frame.unbind();
                var body = $('#' + frameId).contents().find('body');
                var data = body.html();
                if (data == '') {
                    if (--checkCount) {
                        setTimeout(cb, 100);
                        return;
                    }
                    return;
                }
                var ta = body.find('>textarea');
                if (ta.length) {
                    data = ta.val();
                } else {
                    var pre = body.find('>pre');
                    if (pre.length) {
                        data = pre.html();
                    }
                }
                resultHandler(data, options);
                setTimeout(function () {
                    frame.unbind();
                    frame.remove();
                }, 100);
            }
        }

        ajaxSubmit($('#' + formId), $.extend({}, defaults, options || {}));
    }
});
function scrollFunc (e) {
    e = e || window.event;
    if(navigator.userAgent.toLowerCase().indexOf('msie') >=0){
        e.returnValue = false;
    } else {
        e.preventDefault();
        if (e.stopPropagation)
            e.stopPropagation();
        else {
            e.cancelBubble = true;
        }
    }
}

function scrollFail(){
    if(document.addEventListener){
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
    window.onmousewheel = document.onmousewheel = scrollFunc;
}

function scrollOk(){
    if(document.addEventListener){
        document.removeEventListener('DOMMouseScroll', scrollFunc, false);
    }
    window.onmousewheel = document.onmousewheel = function(e){};
}
jQuery.extend({
    scrollFail: function(){
        if(document.addEventListener){
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        }
        window.onmousewheel = document.onmousewheel = scrollFunc;
    },
    scrollOk: function(){
        if(document.addEventListener){
            document.removeEventListener('DOMMouseScroll', scrollFunc, false);
        }
        window.onmousewheel = document.onmousewheel = function(e){};
    }
});
