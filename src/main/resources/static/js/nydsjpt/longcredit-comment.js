/**
 * User: huoshanshan
 * Date: 14-10-17
 * Time: 上午11:55
 */
var userComment = {
    id: {
        commentFormId: '#commentForm',
        replayFormId: '#replayForm_',
        commentReplayPageId: '#commentReplayPage'
    },
    url: {
        pageCommentUrl: 'page_comment.action',
        commentReplyUrl: 'comment_reply_report.action',
        commentEssenceUrl: 'comment_essence.action',
        commentDeleteUrl: 'comment_reply_delete.action'
    },
    pageParams: {
        type: '',
        reportId: ''
    },
    setPageParams: function (type, reportId) {
        this.pageParams.type = (typeof type === 'undefined') ? this.pageParams.type : type;
        this.pageParams.reportId = (typeof reportId === 'undefined') ? this.pageParams.reportId : reportId;
    },
    init: {
        commentOrder: 0,
        initPageComment: function (reportId, type) {//type undefined时报表否则专题 报表1 专题2
            userComment.setPageParams(type, reportId);
            $.ajax({
                type: 'GET',
                url: userComment.url.pageCommentUrl,
                data: {
                    'reportComment.reportId': userComment.pageParams.reportId,
                    'reportComment.commentSubjectType': userComment.pageParams.type,
                    'commentOrder': userComment.init.commentOrder,
                    'rm': Math.random()
                },
                dataType: 'html',
                success: function (data) {
                    $(userComment.id.commentReplayPageId).html(data);
                }
            });
        }
    },
    operate: {
        commentReport: function (that) {
            if ($("#commentForm_reportComment_commentContent").val() == null ||
                $("#commentForm_reportComment_commentContent").val() == "") {
                alert("请填写评论信息")
            } else if ($('#commentForm_reportComment_commentContent').val().length > 1000) {
                alert('您输入的评论字数太多！')
            } else {
                if (confirm("确定发表评论？")) {
                    $.req({
                        type: 'POST',
                        url: userComment.url.commentReplyUrl +
                            "?type=comment&reportComment.reportId=" + userComment.pageParams.reportId +
                            "&reportComment.commentSubjectType=" + userComment.pageParams.type,
                        data: $(userComment.id.commentFormId).serialize(),
                        dataType: 'JSON',
                        success: function (data) {
                            console.log(data)
                            userComment.init.initPageComment(userComment.pageParams.reportId, userComment.pageParams.type);
                            if (data == 1) {
                                $(that).prev().val('');
                            } else {
                                console.log(2)
                                alert("评论失败");
                            }
                        }
                    });
                }
            }

        },
        replayComment: function (id) {
            if ($("#replayForm_" + id + " .comment_input_box_right").val() == null ||
                $("#replayForm_" + id + " .comment_input_box_right").val() == "") {
                alert("请填写回复信息");
            } else if ($("#replayForm_" + id + " .comment_input_box_right").val().length > 1000) {
                alert("您输入的回复字数太多!");
            } else {
                if (confirm("确定要回复此评论？")) {
                    $.req({
                        type: 'POST',
                        url: userComment.url.commentReplyUrl +
                            "?type=replay&reportComment.reportId=" + userComment.pageParams.reportId +
                            "&reportComment.commentSubjectType=" + userComment.pageParams.type,
                        data: $(userComment.id.replayFormId + id).serialize(),
                        dataType: 'JSON',
                        success: function (data) {
                            userComment.init.initPageComment(userComment.pageParams.reportId, userComment.pageParams.type);
                            if (data != 1) {
                                alert("回复失败");
                            }
                        }
                    });
                }
            }


        },
        replayView: function (that, isShow) {
            if (isShow) {
                $(that).closest(".huifu").siblings(".comment_li_bottom").show();
                $(that).closest(".comment_li_top_right_time").siblings(".comment_li_bottom").show();
            }
        },
        hideView: function (self) {
            $(self).parent().parent().parent().parent().hide();
        },
        hasWord: function (self) {
            var me = $(self);
            var length = me.val().length;
            if (length <= 1000) {
                length = 1000 - length
                me.siblings('p').html('还可以输入<span style="float: none;">' + length + '</span>字')
            } else {
                length = length - 1000;
                me.siblings('p').html('您已经超出了<span style="float: none;">' + length + '</span>字');
            }
        },
        commentDelete: function (id, reportId) {
            if (confirm("是否删除评论？")) {
                $.req({
                        type: 'POST',
                        url: userComment.url.commentDeleteUrl,
                        data: "uuid=" + id,
                        dataType: 'JSON',
                        success: function (data) {
                            if (data != 1) {
                                alert("删除失败!");
                            }
                            else {
                                userComment.init.initPageComment(reportId);
                            }
                        }
                    }
                )
                ;
            }
        },
        commentEssence: function (id, type, reportId) {
            if (confirm(type == 1 ? "确认加精该评论？" : "取消加精该评论？")) {
                $.req({
                    type: 'POST',
                    url: userComment.url.commentEssenceUrl,
                    data: "reportComment.id=" + id + "&reportComment.essence=" + type,
                    dataType: 'JSON',
                    success: function (data) {
                        if (data != 1) {
                            alert(type == 1 ? "加精失败" : "取消加精失败");
                        }
                        else {
                            userComment.init.initPageComment(reportId);
                        }
                    }
                });
            }
        }
    }
}


//共享数据详情

var DEXComment = {
    id: {
        commentFormId: '#commentForm',
        replayFormId: '#replayForm_',
        commentReplayPageId: '#commentReplayPage'
    },
    url: {
        pageCommentUrl: 'page_comment.action',
        commentReplyUrl: 'comment_reply_report.action',
        commentEssenceUrl: 'comment_essence.action',
        commentDeleteUrl: 'comment_reply_delete.action'
    },
    pageParams: {

        reportId: ''
    },
    setPageParams: function (reportId) {
        this.pageParams.reportId = (typeof reportId === 'undefined') ? this.pageParams.reportId : reportId;
    },
    init: {
        commentOrder: 0,
        initPageComment: function (reportId, commentSubjectType, showType) {//type undefined时报表否则专题 报表1 专题2
            if (reportId == undefined) {
                $.ajax({
                    type: 'GET',
                    url: DEXComment.url.pageCommentUrl,
                    cache: false,
                    data: {
                        'reportComment.reportId': DEXComment.pageParams.reportId,
                        'commentOrder': DEXComment.init.commentOrder,
                        'commentSubjectType': commentSubjectType,
                        'showType': showType
                    },
                    dataType: 'html',
                    success: function (data) {
                        $(DEXComment.id.commentReplayPageId).html(data);
                    }
                });

            } else {
                DEXComment.setPageParams(reportId);
                $.ajax({
                    type: 'GET',
                    url: DEXComment.url.pageCommentUrl,
                    cache: false,
                    data: {
                        'reportComment.reportId': reportId,
                        'commentOrder': DEXComment.init.commentOrder,
                        'commentSubjectType': commentSubjectType,
                        'showType': showType
                    },
                    dataType: 'html',
                    success: function (data) {
                        $(DEXComment.id.commentReplayPageId).html(data);
                    }
                });

            }

        }
    },
    operate: {
        commentReport: function (that, id, type, showType, organ) {
            var context = organ == 'organ' ? '留言' : '评论';
            if ($("#commentForm_reportComment_commentContent").val() == null ||
                $("#commentForm_reportComment_commentContent").val() == "") {
                alert("请填写" + context + "信息");
            } else if ($("#commentForm_reportComment_commentContent").val().length > 1000) {
                alert('您输入的评论字数太多！')
            } else {
                if (confirm("确定发表" + context + "？")) {
                    $.req({
                        type: 'POST',
                        url: DEXComment.url.commentReplyUrl +
                            "?type=comment&showType=1&reportComment.reportId=" + id,
                        data: $(DEXComment.id.commentFormId).serialize(),
                        dataType: 'JSON',
                        success: function (data) {
                            DEXComment.init.initPageComment(id, type, showType);
                            if (data == 1) {
                                $(that).prev().val('');
                            } else {
                                console.log(3)
                                alert("评论失败");
                            }
                        }
                    });
                }
            }
        },

        replayComment: function (id, reportId, type) {
            if ($("#replayForm_" + id + " .comment_input_box_right").val() == null ||
                $("#replayForm_" + id + " .comment_input_box_right").val() == "") {
                alert("请填写回复信息");
            } else if ($("#replayForm_" + id + " .comment_input_box_right").val().length > 1000) {
                alert("您输入的回复字数太多!");
            } else {
                if (confirm("确定要回复此评论？")) {
                    $.req({
                        type: 'POST',
                        url: DEXComment.url.commentReplyUrl +
                            "?commentSubjectType=2&type=replay&reportComment.reportId=" + reportId,
                        data: $(DEXComment.id.replayFormId + id).serialize(),
                        dataType: 'JSON',
                        success: function (data) {
                            DEXComment.init.initPageComment(reportId, type);
                            if (data != 1) {
                                alert("回复失败");
                            }
                        }
                    });
                }
            }

        },
        replayView: function (that, isShow) {
            if (isShow) {
                $(that).closest(".huifu").siblings(".comment_li_bottom").show();
                $(that).closest(".comment_li_top_right_time").siblings(".comment_li_bottom").show();
            }
        },
        hideView: function (self) {
            $(self).parent().parent().parent().parent().hide();
        },
        hasWord: function (self, organ) {
            var contextNum = organ == 'organ' ? 200 : 1000;
            var me = $(self);
            var length = me.val().length;
            if (length <= contextNum) {
                length = contextNum - length
                me.siblings('p').html('还可以输入<span style="float: none;">' + length + '</span>字')
            } else {
                length = length - contextNum;
                me.siblings('p').html('您已经超出了<span style="float: none;">' + length + '</span>字');
            }
        },
        commentDelete: function (id, reportId) {
            if (confirm("是否删除评论？")) {
                $.req({
                        type: 'POST',
                        url: DEXComment.url.commentDeleteUrl,
                        data: "uuid=" + id,
                        dataType: 'JSON',
                        success: function (data) {
                            if (data != 1) {
                                alert("删除失败!");
                            }
                            else {
                                DEXComment.init.initPageComment(reportId);
                            }
                        }
                    }
                )
                ;
            }
        },
        commentEssence: function (id, type, reportId) {
            if (confirm(type == 1 ? "确认加精该评论？" : "取消加精该评论？")) {
                $.req({
                    type: 'POST',
                    url: DEXComment.url.commentEssenceUrl,
                    data: "reportComment.id=" + id + "&reportComment.essence=" + type,
                    dataType: 'JSON',
                    success: function (data) {
                        if (data != 1) {
                            alert(type == 1 ? "加精失败" : "取消加精失败");
                        }
                        else {
                            DEXComment.init.initPageComment(reportId);
                        }
                    }
                });
            }
        }
    }
}
/**
 *新闻资讯评论
 */
var ORGANComment = {
    id: {
        commentFormId: '#commentForm',
        replayFormId: '#replayForm_',
        commentReplayPageId: '#commentReplayPage'
    },
    url: {
        pageCommentUrl: 'page_comment.action',
        commentReplyUrl: 'comment_reply_report.action',
        commentEssenceUrl: 'comment_essence.action',
        commentDeleteUrl: 'comment_reply_delete.action'
    },
    pageParams: {

        reportId: ''
    },
    setPageParams: function (reportId) {
        this.pageParams.reportId = (typeof reportId === 'undefined') ? this.pageParams.reportId : reportId;
    },
    init: {
        commentOrder: 0,
        initPageComment: function (reportId, commentSubjectType, newsSearchType) {//type undefined时报表否则专题 报表1 专题2
            if (reportId == undefined) {
                $.ajax({
                    type: 'GET',
                    url: ORGANComment.url.pageCommentUrl,
                    cache: false,
                    data: {
                        'reportComment.reportId': ORGANComment.pageParams.reportId,
                        'commentOrder': ORGANComment.init.commentOrder,
                        'commentSubjectType': commentSubjectType,
                        'newsSearchType': newsSearchType
                    },
                    dataType: 'html',
                    success: function (data) {
                        $(ORGANComment.id.commentReplayPageId).html(data);
                    }
                });

            } else {
                ORGANComment.setPageParams(reportId);
                $.ajax({
                    type: 'GET',
                    url: DEXComment.url.pageCommentUrl,
                    cache: false,
                    data: {
                        'reportComment.reportId': reportId,
                        'commentOrder': ORGANComment.init.commentOrder,
                        'commentSubjectType': commentSubjectType,
                        'newsSearchType': newsSearchType
                    },
                    dataType: 'html',
                    success: function (data) {
                        $(ORGANComment.id.commentReplayPageId).html(data);
                    }
                });

            }

        }
    },
    operate: {
        /**
         *
         * @param that 当前点击的target
         * @param id 当前报表的id
         * @param type 评论的类型，1.评论，2.回复
         * @param commentSubjectType 评论的资源的类型：1.机构信息，2.机构新闻，3.机构资源
         */
        commentReport: function (that, id, type, commentSubjectType, newsSearchType) {
            if ($("#contents").val() == null || $("#contents").val() == "") {
                alert("请填写评论信息");
            } else if ($("#contents").val().length > 1000) {
                alert('您输入的评论字数太多！')
            } else {
                if (confirm("确定发表评论？")) {
                    $.req({
                        type: 'POST',
                        url: ORGANComment.url.commentReplyUrl +
                            "?type=comment&reportComment.reportId=" + id + "&commentSubjectType=" + commentSubjectType + "&newsSearchType" + newsSearchType,
                        data: $(ORGANComment.id.commentFormId).serialize(),
                        dataType: 'JSON',
                        cache: false,
                        success: function (data) {
                            ORGANComment.init.initPageComment(id, commentSubjectType, newsSearchType);
                            if (data == 1) {
                                $(that).prev().val('');
                            } else {
                                console.log(4)
                                alert("评论失败");
                            }
                        }
                    });
                }
            }
        },

        replayComment: function (that, id, type, commentSubjectType, newsSearchType) {
            if ($("#replayForm_" + id + " .comment_input_box_right").val() == null
                || $("#replayForm_" + id + " .comment_input_box_right").val() == "") {
                alert("请填写回复信息");
            } else if ($("#replayForm_" + id + " .comment_input_box_right").val().length > 1000) {
                alert("您输入的回复字数太多!");
            } else {
                if (confirm("确定要回复此评论？")) {
                    $.req({
                        type: 'POST',
                        url: ORGANComment.url.commentReplyUrl +
                            "?type=replay" + "&commentSubjectType=" + commentSubjectType + "&newsSearchType=" + newsSearchType,
                        data: $(ORGANComment.id.replayFormId + id).serialize(),
                        dataType: 'JSON',
                        cache: false,
                        success: function (data) {
                            ORGANComment.init.initPageComment(ORGANComment.pageParams.reportId, commentSubjectType, newsSearchType);
                            if (data != 1) {
                                alert("回复失败");
                            }
                        }
                    });
                }
            }

        },
        replayView: function (that, isShow) {
            if (isShow) {
                $(that).closest(".huifu").siblings(".comment_li_bottom").show();
                $(that).closest(".comment_li_top_right_time,.comment_li_top_right").siblings(".comment_li_bottom").show();
            }
        },
        hideView: function (self) {
            $(self).parent().parent().parent().parent().hide();
        },
        hasWord: function (self) {
            var me = $(self);
            var length = me.val().length;
            if (length <= 1000) {
                length = 1000 - length
                me.siblings('p').html('还可以输入<span style="float: none;">' + length + '</span>字')
            } else {
                length = length - 1000;
                me.siblings('p').html('您已经超出了<span style="float: none;">' + length + '</span>字');
            }
        },
        commentDelete: function (id, reportId, commentSubjectType, newsSearchType) {
            if (confirm("是否删除评论？")) {
                $.req({
                        type: 'POST',
                        url: ORGANComment.url.commentDeleteUrl,
                        data: "uuid=" + id,
                        dataType: 'JSON',
                        success: function (data) {
                            if (data != 1) {
                                alert("删除失败!");
                            }
                            else {
                                commentSubjectType = commentSubjectType.trim();
                                ORGANComment.init.initPageComment(reportId, commentSubjectType, newsSearchType);
                            }
                        }
                    }
                )
                ;
            }
        },
        commentEssence: function (id, type, reportId, commentSubjectType, newsSearchType) {
            if (confirm(type == 1 ? "确认加精该评论？" : "取消加精该评论？")) {
                $.req({
                    type: 'POST',
                    url: ORGANComment.url.commentEssenceUrl,
                    data: "reportComment.id=" + id + "&reportComment.essence=" + type,
                    dataType: 'JSON',
                    success: function (data) {
                        if (data != 1) {
                            alert(type == 1 ? "加精失败" : "取消加精失败");
                        }
                        else {
                            ORGANComment.init.initPageComment(reportId, commentSubjectType, newsSearchType);
                        }
                    }
                });
            }
        }
    }
}

//平台动态

var PlatformDynamicComment = {
    id: {
        commentFormId: '#commentForm',
        replayFormId: '#replayForm_',
        commentReplayPageId: '#commentReplayPage'
    },
    url: {
        pageCommentUrl: 'page_comment.action',
        commentReplyUrl: 'comment_reply_report.action',
        commentEssenceUrl: 'comment_essence.action',
        commentDeleteUrl: 'comment_reply_delete.action'
    },
    pageParams: {

        reportId: ''
    },
    init: {
        essence: 0,
        initPageComment: function (reportId) {//type undefined时报表否则专题 报表1 专题2
            if (PlatformDynamicComment.pageParams.reportId == null || PlatformDynamicComment.pageParams.reportId == "") {
                PlatformDynamicComment.pageParams.reportId = reportId;
            }
            $.ajax({
                type: 'GET',
                url: PlatformDynamicComment.url.pageCommentUrl,
                cache: false,
                data: {
                    'platformDynamicComment.pdiId': PlatformDynamicComment.pageParams.reportId,
                    'essence': PlatformDynamicComment.init.essence
                },
                dataType: 'html',
                success: function (data) {
                    $(PlatformDynamicComment.id.commentReplayPageId).html(data);
                }
            });
        }
    },
    operate: {
        commentReport: function (that, id) {
            if ($("#commentForm_platformDynamicComment_commentContent").val() == "" ||
                $("#commentForm_platformDynamicComment_commentContent").val() == null) {
                alert("请填写评论内容");
            } else if ($("#commentForm_platformDynamicComment_commentContent").val().length > 1000) {
                alert('您输入的评论字数太多！')
            } else {
                if (confirm("确定发表评论？")) {
                    $.req({
                        type: 'POST',
                        url: PlatformDynamicComment.url.commentReplyUrl +
                            "?type=comment&platformDynamicComment.pdiId=" + id,
                        data: $(PlatformDynamicComment.id.commentFormId).serialize(),
                        dataType: 'JSON',
                        success: function (data) {
                            PlatformDynamicComment.init.initPageComment(id);
                            if (data.result == 1) {
                                $(that).prev().val('');
                            } else {
                                console.log(5)
                                alert("评论失败");
                            }
                        }
                    });
                }
            }


        },

        replayComment: function (id) {
            if ($("#replayForm_" + id + " .comment_input_box_right").val() == null ||
                $("#replayForm_" + id + " .comment_input_box_right").val() == "") {
                alert("请填写回复信息");
            } else if ($("#replayForm_" + id + " .comment_input_box_right").val().length > 1000) {
                alert("您输入的回复字数太多!");
            } else {
                if (confirm("确定要回复此评论？")) {
                    $.req({
                        type: 'POST',
                        url: PlatformDynamicComment.url.commentReplyUrl +
                            "?type=replay&platformDynamicComment.pdiId=" + PlatformDynamicComment.pageParams.reportId,
                        data: $(PlatformDynamicComment.id.replayFormId + id).serialize(),
                        dataType: 'JSON',
                        success: function (data) {
                            PlatformDynamicComment.init.initPageComment(PlatformDynamicComment.pageParams.reportId);
                            if (data.result != 1) {
                                alert("回复失败");
                            }
                        }
                    });
                }
            }

        },
        replayView: function (that, isShow) {
            if (isShow) {
                $(that).closest(".huifu").siblings(".comment_li_bottom").show();
                $(that).closest(".comment_li_top_right_time").siblings(".comment_li_bottom").show();
            }
        },
        hideView: function (self) {
            $(self).parent().parent().parent().parent().hide();
        },
        hasWord: function (self) {
            var me = $(self);
            var length = me.val().length;
            if (length <= 1000) {
                length = 1000 - length
                me.siblings('p').html('还可以输入<span style="float: none;">' + length + '</span>字')
            } else {
                length = length - 1000;
                me.siblings('p').html('您已经超出了<span style="float: none;">' + length + '</span>字');
            }
        },
        commentDelete: function (id) {
            if (confirm("是否删除评论？")) {
                $.req({
                        type: 'POST',
                        url: PlatformDynamicComment.url.commentDeleteUrl,
                        data: "dynamicCommentId=" + id,
                        dataType: 'JSON',
                        success: function (data) {
                            if (data != 1) {
                                alert("删除失败!");
                            }
                            else {
                                PlatformDynamicComment.init.initPageComment(PlatformDynamicComment.pageParams.reportId);
                            }
                        }
                    }
                )
                ;
            }
        },
        commentEssence: function (id, type) {
            if (confirm(type == 1 ? "确认加精该评论？" : "取消加精该评论？")) {
                $.req({
                    type: 'POST',
                    url: PlatformDynamicComment.url.commentEssenceUrl,
                    data: "dynamicCommentId=" + id + "&essence=" + type,
                    dataType: 'JSON',
                    success: function (data) {
                        if (data != 1) {
                            alert(type == 1 ? "加精失败" : "取消加精失败");
                        }
                        else {
                            PlatformDynamicComment.init.initPageComment(PlatformDynamicComment.pageParams.reportId);
                        }
                    }
                });
            }
        }
    }
}