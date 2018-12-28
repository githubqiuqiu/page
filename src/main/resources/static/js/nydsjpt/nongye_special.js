// JavaScript Document
$(function () {
    $(".list_classify li").addClass("li_normal");
    $(".list_classify li").unbind().bind({
        mousedown: function () {
            $(this).removeClass("li_normal").addClass("li_click").siblings("li").removeClass("li_click").addClass("li_normal");
        }
    })
    $(".type_content li").unbind().bind({
        mousedown: function () {
            $(this).removeClass("normal").addClass("click").siblings("li").removeClass("click").addClass("normal");
        }
    })

    $(".list_img").unbind().bind({
        mousedown: function () {
            $(this).removeClass("list_img_normal").addClass("list_img_click").siblings("span").removeClass("list_li_click").addClass("list_li_normal");
            $(".ul").fadeIn().siblings(".list_div").hide();
        }
    })
    $(".list_li").unbind().bind({
        mousedown: function () {
            $(this).removeClass("list_li_normal").addClass("list_li_click").siblings("span").removeClass("list_img_click").addClass("list_img_normal");
            $(".list_div").fadeIn().siblings(".ul").hide();
        }
    })
    /*鼠标经过 文字动画*/
    $(".app_sample ul li .wen").hide()
    $(".app_sample ul li a").unbind().bind({
        mouseenter: function () {
            $(this).find(".wen").stop(true, true).slideDown()

        }, mouseleave: function () {
            $(this).find(".wen").fadeOut();

        }
    })
    /*鼠标经过 文字动画*/
    $(".special_left_list ul li .wen").hide()
    $(".special_left_list ul li a").unbind().bind({
        mouseenter: function () {
            $(this).find(".wen").stop(true, true).slideDown()

        }, mouseleave: function () {
            $(this).find(".wen").fadeOut();
        }
    })

    /*图片list 动画效果*/
    var special_left_list = $(".special_left_list ul li");
    $(".special_left_list ul li").each(function () {
        if (special_left_list.index(this) % 3 == 2) {
            $(this).css("float", "right").css("margin-right", "0px");
        } else {
            $(this).css("float", "left");
        }
    })

    /*图片list 动画效果*/
//    var app_sample = $(".app_sample ul li");
//    $(".app_sample ul li").each(function () {
//        if (app_sample.index(this) % 4 == 3) {
//            $(this).css("float", "right").css("margin-right", "0px");
//        } else {
//            $(this).css("float", "left");
//        }
//    })


    /*展开折叠按钮*/
    $(".app_sample .more span").addClass("more_normal");
    $(".app_sample .more span").unbind().bind({
        mousedown: function () {
            if ($(this).hasClass("more_normal")) {
                $(this).removeClass("more_normal").addClass("more_click").text("点击关闭更多");
            } else {
                $(this).removeClass("more_click").addClass("more_normal").text("点击展开更多");
            }
        }
    })


    $(".list_div .more span").addClass("more_normal");
    $(".list_div .more span").unbind().bind({
        mousedown: function () {
            if ($(this).hasClass("more_normal")) {
                $(this).removeClass("more_normal").addClass("more_click").text("点击关闭更多");
            } else {
                $(this).removeClass("more_click").addClass("more_normal").text("点击展开更多");
            }
        }
    })

    /*内页 chart title布局*/

    /*发布*/
    $(".chart_title .fabu").addClass("fabu_normal");
    $(".chart_title .fabu").unbind().bind({
        mousedown: function () {
            $(this).removeClass("fabu_normal").addClass("fabu_click");
        }, mouseup: function () {
            $(this).removeClass("fabu_click").addClass("fabu_normal");
        }
    })

    /*右侧导出 收藏*/
    $(".chart_title_right_office li").addClass("office_normal");
    $(".chart_title_right_office li").unbind().bind({
        mousedown: function () {
            $(this).removeClass("office_normal").addClass("office_click");
        }, mouseup: function () {
            $(this).removeClass("office_click").addClass("office_normal");
        }
    })//end
    /*右侧 分享*/
    $(".fenxiang").addClass("office_normal");
    $(".fenxiang_content").hide();
    $(".office_03").unbind().bind({
        mousedown: function () {
            $(this).closest(".fenxiang").removeClass("office_normal").addClass("office_click");
            $(this).siblings(".fenxiang_content").slideDown();
        }
    })//end
    $(".fenxiang_content ul li").unbind().bind({
        mousedown: function () {
            $(this).closest(".fenxiang_content").slideUp(300).closest(".fenxiang").removeClass("office_click").addClass("office_normal");
            //alert("分享成功")
        }
    })
    $(".fenxiang").unbind().bind({
        mouseleave: function () {
            $(this).find(".fenxiang_content").slideUp(300);
            $(this).removeClass("office_click").addClass("office_normal");
        }
    })

//    $(".list_sort ul li a").bind({
//        mousedown: function () {
//            /*关注度按钮*/
//            var sKey = $(this).attr("data-value");
//            if ($(this).hasClass("a_down")) {
//                $(this).removeClass().addClass("a_up");
////                sort(sKey, true);
//            } else {
//
//                $(this).removeClass("a_up").addClass("a_down");
////                sort(sKey, false);
//            }
//        }
//    })
    /*排序功能     结束*/
})


