$(function () {


    /*用户登录 肖何 修改添加 样式操作*/
    $(".user_content").hide();
    $(".user_title").unbind().bind({
        mouseenter: function () {
            $(this).siblings(".user_content").stop(true, true).slideDown("300");
        }
    })
    $(".user").unbind().bind({
        mouseleave: function () {
            $(this).find(".user_content").slideUp("300");
        }

    })
    $(".user_content ul li").unbind().bind({
        mouseup: function () {
            $(this).closest(".user_content").slideUp("300");
        }
    })

    /*搜索栏事件 肖何 修改添加 开始 2014.08.01*/
    $(".right_search_btn").addClass("right_search_btn_normal");
//    $(".right_search_btn").unbind().bind({
//        mousedown: function () {
//            $(this).removeClass("right_search_btn_normal").addClass("right_search_btn_click");
//            alert("点击获得搜索框的值  " + $(this).siblings("input").val())
//        }, mouseup: function () {
//            $(this).removeClass("right_search_btn_click").addClass("right_search_btn_normal");
//        }
//    })//end

    /*处理右侧排序样式 临时*/
    $(".ul_1_top:eq(0)").addClass("first");
    $(".ul_1_top:eq(1)").addClass("second");
    $(".ul_1_top:eq(2)").addClass("third");
    $(".ul_1_top:gt(2)").addClass("more");

    $(".ul_2_top:eq(0)").addClass("first");
    $(".ul_2_top:eq(1)").addClass("second");
    $(".ul_2_top:eq(2)").addClass("third");
    $(".ul_2_top:gt(2)").addClass("more");

    /*搜索栏事件 肖何 修改添加 结束 2014.08.01*/
//底部二维码
    $('.bottom_button div:eq(0)').on({
        mouseenter:function(){
           $('.bottom_btn .code').stop(true,true).fadeIn().animate({
               top:-225
           })
        },mouseleave:function(){
            $('.bottom_btn .code').fadeOut().css('top','225px');
        }
    })

});

var LongCredit = LongCredit || {};
LongCredit.DefaultLineColor = ['#bb4871', '#c5e02f', '#666666', '#45bdd8', '#fd9965', '#b4deba', '#bc9cff', '#a7daff', '#f985a0', '#5c58c0',
    '#287fb4', '#e7b423', '#2c9333', '#ce4b6a', '#4d7de2', '#ffa12d', '#347d47', '#bb3b38', '#4965c1', '#e38e33',
    '#779a40', '#744184', '#39a2b5', '#bb7538', '#9fa545', '#8468b2', '#58a8c7', '#ff9744', '#bdc45d', '#a84f78', '#04bbb7', '#f17d65',
    '#22c170', '#5c4888', '#972d67', '#ab8755', '#76c447', '#8c3a61', '#e08252', '#ab6f55', '#9e3a8e', '#58a8c7', '#b078c2'];
/* 仅实现了字符数组的克隆 */
var cloneArray = function (oldArray) {
    var array = [];
    for (var i = 0; i < oldArray.length; i++) {
        if (typeof oldArray[i] === 'string') {
            array.push(oldArray[i]);
        }
    }
    return array;
}
var Themes = {
    line: {
        "default": ['#bb4871', '#c5e02f', '#666666', '#45bdd8', '#fd9965', '#b4deba', '#bc9cff', '#a7daff', '#f985a0', '#5c58c0',
            '#287fb4', '#e7b423', '#2c9333', '#ce4b6a', '#4d7de2', '#ffa12d', '#347d47', '#bb3b38', '#4965c1', '#e38e33',
            '#779a40', '#744184', '#39a2b5', '#bb7538', '#9fa545', '#8468b2', '#58a8c7', '#ff9744', '#bdc45d', '#a84f78', '#04bbb7', '#f17d65',
            '#22c170', '#5c4888', '#972d67', '#ab8755', '#76c447', '#8c3a61', '#e08252', '#ab6f55', '#9e3a8e', '#58a8c7', '#b078c2'],
        "navyblue": ["#106d9c", "#5a92ad", "#00a2de", "#08baff",
            "#106d9c", "#5a92ad", "#00a2de", "#08baff",
            "#106d9c", "#5a92ad", "#00a2de", "#08baff",
            "#106d9c", "#5a92ad", "#00a2de", "#08baff"],
        "focus": ["#52596b", "#bd2010", "#e7ba10", "#639629", "#9c55ad", "#cec3c6",
            "#52596b", "#bd2010", "#e7ba10", "#639629", "#9c55ad", "#cec3c6",
            "#52596b", "#bd2010", "#e7ba10", "#639629", "#9c55ad", "#cec3c6"],
        "redblue": ["#08599c", "#ef0808",
            "#08599c", "#ef0808", "#08599c", "#ef0808", "#08599c", "#ef0808", "#08599c", "#ef0808"],
        "1": ["#52596b", "#bd2010", "#e8ba10", "#639629"],
        "2": ["#004c7b", "#ff8e01"],
        "3": ["#106d9c", "#5a92ad", "#00a2de"],
        "4": ["#000000", "#d6df29"],
        "5": ["#003873", "#f70000"],
        "6": ["#00a652", "#ff8618", "#cedb29","#52596b"],
        "7": ["#00516b", "#5a92b5", "#00a6e7"],
        "8": ["#e8ba10", "#639629", "#9c55ad", "#52596b"],
        "9": ["#106d9c", "#5a92ad", "#00a2de", "#08baff"],
        "10": ["#000000", "#d6df29", "#c6c3c6"],
        "11": ["#3fafd2", "#383a37", "#94be4a", "#505b25", "#dfaf06", "#813b33", "#407434", "#a5a5a5" ,'#bb4871', '#c5e02f', '#666666', '#45bdd8', '#fd9965', '#b4deba', '#bc9cff', '#a7daff', '#f985a0', '#5c58c0',
            '#287fb4', '#e7b423', '#2c9333', '#ce4b6a', '#4d7de2', '#ffa12d', '#347d47', '#bb3b38', '#4965c1', '#e38e33',
            '#779a40', '#744184', '#39a2b5', '#bb7538', '#9fa545', '#8468b2', '#58a8c7', '#ff9744', '#bdc45d', '#a84f78', '#04bbb7', '#f17d65',
            '#22c170', '#5c4888', '#972d67', '#ab8755', '#76c447', '#8c3a61', '#e08252', '#ab6f55', '#9e3a8e', '#58a8c7', '#b078c2'],

        getThemes: function (name) {
            var lineThemes = Themes.line;
            name = name != undefined && name != null && name && lineThemes[name] ? name : "default";
            return cloneArray(lineThemes[name]);
        }
    }
}
Array.prototype.dataFilter = function (callBack) {
    var array = [];
    for (var i = 0; i < this.length; i++) {
        if (callBack.call(this, this[i])) {
            array.push(this[i]);
        }
    }
    return array;
}
