/**
 * User: huoshanshan
 * Date: 14-4-29
 * Time: 上午11:55
 */
var commentReplay = {
    id: {
        commentFormId: '#commentForm',
        replayFormId: '#replayForm_',
        saveAndReleaseFormId: '#saveAndReleaseForm',
        commentReplayPageId: '#commentReplayPage'
    },
    url: {
        commentReplyUrl: 'comment_reply_report.action',
        storeUrl: 'store_report.action',
        saveReleaseUrl: 'save_release_report.action',
        pageCommentUrl: 'page_comment.action',
        viewReleaseUrl: 'view_release.action',
        commentEssenceUrl: 'comment_essence.action',
        commentDeleteUrl: 'comment_reply_delete.action'
    },
    param: {
        params: ''
    },
    init: {
        commentOrder: 0,
        initPageComment: function (reportId) {

            $.ajax({
                type: 'GET',
                url: commentReplay.url.pageCommentUrl,
                data: {
                    'reportComment.reportId': reportId,
                    'commentOrder': commentReplay.init.commentOrder
                },
                dataType: 'html',
                success: function (data) {
                    $(commentReplay.id.commentReplayPageId).html(data);
                }
            });

        },
        getPageComment: function (url, data) {
            $.ajax({
                type: 'POST',
                url: url,
                dataType: 'html',
                data: {
                    'rm': Math.random()
                },
                success: function (data) {
                    $(commentReplay.id.commentReplayPageId).html(data);
                }
            });
        }
    },
    operate: {
        viewRelease: function (reportId, viewId, params, src) {
            commentReplay.param.params = params;
            $.req({url: commentReplay.url.viewReleaseUrl, data: {'report.id': reportId}, dataType: 'HTML', success: function (data) {
                $("#" + viewId).find(".deta_up_main").html(data);
//                $("#reportLoadParam").val(params);
                if (typeof src != 'undefined') {
                    $("#saveSubject").val(src);
                }
                openDialog(viewId, 865);
            }});
        },
        saveReleaseReport: function (basePath, id, type) {
            var subData = $(commentReplay.id.saveAndReleaseFormId).serialize().replace(/__multiselect_selectReportTypes=&/, "");
            if (new RegExp(".*report.title=\\+*&.*|^.*report.title=\\+*$").test(subData)) {
                alert("请输入主标题");
                return false;
            } else if ($("#reportTitle").val().length > 30) {
                alert("主标题只允许30个字");
                return false;
            }
            if (new RegExp(".*report.subtitle=\\+*&.*|^.*report.subtitle=\\+*$").test(subData)) {
                alert("请输入说明");
                return false;
            } else if ($("#reportSubtitle").val().length > 35) {
                alert("说明只允许35个字");
                return false;
            }
            if (new RegExp(".*report.remark=\\+*&.*|^.*report.remark=\\+*$").test(subData)) {
                alert("请输入简介");
                return false;
            }
            if (!new RegExp(".*selectReportTypes=.+").test(subData)) {
                alert("请选择分类");
                return false;
            }
            if (new RegExp(".*report.image=\\+*&.*|^.*report.image=\\+*$").test(subData)) {
                alert("请选择图片");
                return false;
            }

            if (confirm("确定要保存/发布此报表？")) {
                $.ajax({
                    type: 'POST',
                    url: commentReplay.url.saveReleaseUrl + "?type=" + type + "&report.loadParam=" + commentReplay.param.params,
                    data: $(commentReplay.id.saveAndReleaseFormId).serialize(),
                    dataType: 'JSON',
                    success: function (data) {
                        if (data != 0) {

                            if ("save" == type) {
                                location.href = basePath + '/agriculture/subject/detail.action?uuid=' + data;
                            } else {
                                location.href = basePath + '/agriculture/subject/detail.action?uuid=' + data;
                            }
                        } else {
                            if ("save" == type) {
                                alert("保存失败");
                            } else {
                                alert("发布失败");
                            }
                        }
                    },
                    error: function (data) {
                        alert("保存/发布异常");
                    }
                });
            }
        },
        storeReport: function (id, type) {
            if (confirm("确定要收藏此报表？")) {
                $.ajax({
                    type: 'POST',
                    url: commentReplay.url.storeUrl,
                    data: {
                        'uuid': id,
                        type: type
                    },
                    dataType: 'JSON',
                    success: function (data) {
                        if (data == 1) {
                            alert("收藏成功");
                        } else {
                            alert("收藏失败");
                        }
                    }
                });
            }
        },
        commentReport: function (reportId, self) {
            if (confirm("确定要评论此报表？")) {

                $.req({
                    type: 'POST',
                    url: commentReplay.url.commentReplyUrl + "?type=comment&reportComment.reportId=" + reportId,
                    data: $(commentReplay.id.commentFormId).serialize(),
                    dataType: 'JSON',
                    success: function (data) {
                        commentReplay.init.initPageComment(reportId);
                        if (data == 1) {
                            $(self).prev().val('');
                        } else {
                            console.log(1)
                            alert("评论失败");
                        }
                    }
                });
            }
        },
        replayComment: function (reportId, id) {
            if (confirm("确定要回复此评论？")) {
                $.req({
                    type: 'POST',
                    url: commentReplay.url.commentReplyUrl + "?type=replay&reportComment.reportId=" + reportId,
                    data: $(commentReplay.id.replayFormId + id).serialize(),
                    dataType: 'JSON',
                    success: function (data) {
                        commentReplay.init.initPageComment(reportId);
                        if (data != 1) {
                            alert("回复失败");
                        }
                    }
                });
            }
        },
        commentDelete: function (id, reportId) {
            if (confirm("是否删除评论？")) {
                $.req({
                        type: 'POST',
                        url: commentReplay.url.commentDeleteUrl,
                        data: "uuid=" + id,
                        dataType: 'JSON',
                        success: function (data) {
                            if (data != 1) {
                                alert("删除失败!");
                            }
                            else {
                                commentReplay.init.initPageComment(reportId);
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
                    url: commentReplay.url.commentEssenceUrl,
                    data: "reportComment.id=" + id + "&reportComment.essence=" + type,
                    dataType: 'JSON',
                    success: function (data) {
                        if (data != 1) {
                            alert(type == 1 ? "加精失败" : "取消加精失败");
                        }
                        else {
                            commentReplay.init.initPageComment(reportId);
                        }
                    }
                });
            }
        },
        hideView: function (self) {
            //$(self).parent().parent().parent().parent().prev().show();
            $(self).parent().parent().parent().parent().hide();
        },
        replayView: function (th, isShow) {
            if (isShow) {
                $(th).closest(".huifu").siblings(".comment_li_bottom").show();
                $(th).closest(".comment_li_top_right_time").siblings(".comment_li_bottom").show();
                //$(th).parent().hide();
//                if($(this).closest(".huifu").hasClass("huifu")){
//                                                            alert(1)
//
//                }else{
//                    alert(2)
//
//
//                }
            }
        },
        hasWord: function (self) {
            var me = $(self);
            var length = me.val().length;
            me.siblings('p').find('span').text(2000 - length)
        }
    }
}

function clearUnitToParam(data) {
    if (data != null) {
        return parseFloat(data.replace(/[^\d\\.]/g, ""));
    } else {
        return 0;
    }
}
function clearParamToUnit(data) {
    if (data != null) {
        return data.replace(/[\d\\.]/g, "");
    } else {
        return "";
    }
}
