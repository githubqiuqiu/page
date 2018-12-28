//全局对象
var ScreenCaptureError = {
	"0": "连接服务器失败"
	, "1": "发送数据错误"
	, "2": "未设置上传地址"
	, "3": "公司未授权"
	, "4": "域名未授权"
};

/*
	截屏对象管理类，提供常用配置功能
	参数
		infDivID 截屏信息层
*/
function CaptureManager(infDivID, ctx, htmlDiv, htmlCut)
{
	var _this = this;
	this.StateType = {
		Ready				: 0
		,Posting			: 1
		,Stop				: 2
		,Error				: 3
		,GetNewID			: 4
		,Complete			: 5
		,WaitContinueUpload	: 6
		,None				: 7
		,Waiting			: 8
	};
	_this.State = _this.StateType.None;
	_this.CaptureDlgID = infDivID;
	_this.Inited = false;

	//全局配置信息
	this.Config = {
		"PostUrl"		: ""
		,"EncodeType"	: "utf-8"
		, "Version"		: "1,6,62,21272"
		, "Company"		: "龙信数据(北京)有限公司"
		, "License"		: "88A204D043387A5F449EDE31931D516C399286488DEC578916CFB60F3326A8B095F447326B3827E5922FA1A38F39"
		, "FileFieldName": "img"//文件字段名称。
		, "Language"	: "zhcn"//语言设置，en,zhcn
		, "Quality"     : 100//图片质量，仅对jpg格式有效
		, "ImageType"	: "png"//上传图片格式。jpg,png,bmp
		, "Clsid"		: "6322CFEA-1376-494D-AF58-B53E5C083E09"
		, "ProjID"		: "LXSJ.ScreenCapture"
		, "CabPath"		: ctx + "/resources/script/agriculture/ScreenCapture/ScreenCapture.cab"
		, "IcoPath"		: ctx + "/resources/script/agriculture/ScreenCapture/SL_Uploading.gif"
		//IE64
		, "Clsid64"		: "7F0B5BAF-D703-4330-86BD-6B34FEFE622E"
		, "ProjID64"	: "LXSJ.ScreenCapture64"
		, "CabPath64"	: ctx + "/resources/script/agriculture/ScreenCapture/ScreenCapture64.cab"
		//FireFox
		, "MimeType"	: "application/npScpLXSJ"
		, "XpiPath"		: ctx + "/resources/script/agriculture/ScreenCapture/ScreenCapture.xpi"
        , "PluginUrl"   : ctx + "/resources/script/agriculture/ScreenCapture/ScreenCapture.xpi"
		//Chrome
		, "CrxName"		: "npScpLXSJ"
		, "MimeTypeChr"	: "application/npScpLXSJ"
		, "CrxPath"		: ctx + "/resources/script/agriculture/ScreenCapture/ScreenCapture.crx"
	};

	//附加对象
	this.Fields = {
		"UserName"	: "test"
		, "UserPass": "test"
	};

	//FireFox浏览器信息管理对象
	_this.BrowserFF = {
		"GetHtml": function()
		{
			var html = '<embed type="' + _this.Config["MimeType"] + '" pluginspage="' + _this.Config["XpiPath"] + '" width="1" height="1" id="objScreenCapture">';
			return html;
		}
		, "GetPlugin": function()
		{
			return document.getElementById("objScreenCapture");
		} //检查插件是否已安装
		, "Check": function()
		{
			var mimetype = navigator.mimeTypes;
			if (typeof mimetype == "object" && mimetype.length){
				for (var i = 0;i < mimetype.length; i++){
					if (mimetype[i].type == _this.Config["MimeType"]){
						return mimetype[i].enabledPlugin;
					}
				}
			}
			else {
				mimetype = [_this.Config["MimeType"]];
			}
			if(mimetype) {
				return mimetype.enabledPlugin;
			}
			return false;
		} //安装插件
		, "Setup": function()
		{
			var xpi = new Object();
			xpi[_this.Config["MimeType"]] = _this.Config["PluginUrl"];
			InstallTrigger.install(xpi, function(name, result) { });
		}
	};
	//Chrome浏览器信息管理对象
	_this.BrowserChrome =
	{
		"GetHtml": function()
		{
			var html = '<embed type="' + _this.Config["MimeTypeChr"] + '" pluginspage="' + _this.Config["CrxPath"] + '" width="1" height="1" id="objScreenCapture">';
			return html;
		}
		, "GetPlugin": function()
		{
			return document.getElementById("objScreenCapture");
		} //检查插件是否已安装
		, "Check": function()
		{
			for (var i = 0, l = navigator.plugins.length; i < l; i++)
			{
				if (navigator.plugins[i].name == _this.Config["CrxName"])
				{
					return true;
				}
			}
			return false;
		} //安装插件
		, "Setup": function()
		{
            document.getElementById(htmlCut).innerHTML = '<iframe style="display:none;" src="' + _this.Config["CrxPath"] + '"></iframe>';
//			document.write('<iframe style="display:none;" src="' + _this.Config["CrxPath"] + '"></iframe>');
		}
	};
	//IE浏览器信息管理对象
	_this.BrowserIE = {
		"GetHtml": function()
		{
			/*ActiveX的静态加载方式，如果在框架页面中使用此控件，推荐使用静态加截方式。
			<div style="display: none">
			<object id="objScreenCapture" classid="clsid:B10327CB-56EC-43D9-BED0-C91E4AE8F42E" codebase="http://www.ncmem.com/products/screencapture/demo/ScreenCapture.cab#version=1,6,26,54978" width="1" height="1"></object>
			</div>
			*/
			var acx = '<div style="display: none">';
			acx += '<object id="objScreenCapture" classid="clsid:' + _this.Config["Clsid"] + '"';
			acx += ' codebase="' + _this.Config["CabPath"] + '#version=' + _this.Config["Version"] + '" width="1" height="1"></object>';
			acx += '</div>';
			return acx;
		}
		, "GetPlugin": function()
		{
			return document.getElementById("objScreenCapture");
		} //检查插件是否已安装
		, "Check": function()
		{
			try
			{
				var com = new ActiveXObject(_this.Config["ProjID"]);
				return true;
			}
			catch (e) { return false; }
		}
	};
	_this.Browser = _this.BrowserIE;
	var browserName = navigator.userAgent.toLowerCase();
	this.ie = browserName.indexOf("msie") > 0;
	//IE11
	this.ie = _this.ie ? _this.ie : browserName.search(/(msie\s|trident.*rv:)([\w.]+)/)!=-1;
	this.firefox = browserName.indexOf("firefox") > 0;
	this.chrome = browserName.indexOf("chrome") > 0;

	if ( this.ie )
	{
		//Win64
		if (window.navigator.platform == "Win64")
		{
			this.Config["Clsid"] = this.Config["Clsid64"];
			this.Config["ProjID"] = this.Config["ProjID64"];
			this.Config["CabPath"] = this.Config["CabPath64"];
		}
	}//Firefox
	else if ( this.firefox )
	{
		_this.Config["CabPath"] = _this.Config["XpiPath"];
		_this.Browser = this.BrowserFF;
		if (!_this.Browser.Check()) {_this.Browser.Setup();}
	}//chrome
	else if ( this.chrome )
	{
		_this.Config["CabPath"] = _this.Config["CrxPath"];
		_this.Browser = this.BrowserChrome;
		if (!_this.Browser.Check()) {_this.Browser.Setup();}
    }

	this.Load = function()
	{
		document.write( _this.Browser.GetHtml() );
	};

	//加截到指定对象内部
	this.LoadTo = function(oid)
	{
		var obj = document.getElementById(oid);
		obj.innerHTML = _this.Browser.GetHtml();
	};

	//加载CAB控件
	this.LoadTo(htmlDiv);

	//初始化截屏控件，一般在window.onload中调用
	this.Init = function()
	{
		if (_this.Inited) return;

		//插件名称
		_this.ATL = _this.Browser.GetPlugin();
		_this.ATL.Object = _this;
		_this.ATL.License = _this.Config["License"];
		_this.ATL.PostUrl = _this.Config["PostUrl"];
		_this.ATL.EncodeType = _this.Config["EncodeType"];
		_this.ATL.Language = _this.Config["Language"];
		_this.ATL.Quality = _this.Config["Quality"];
		_this.ATL.Company = _this.Config["Company"];
		_this.ATL.FileFieldName = _this.Config["FileFieldName"];
		_this.ATL.ImageType = _this.Config["ImageType"];
		_this.ATL.OnComplete = ScreenCapture_Complete;
		_this.ATL.OnPost = ScreenCapture_OnProcess;
		_this.ATL.OnStop = ScreenCapture_Stop;
		_this.ATL.OnError = ScreenCapture_OnError;
		_this.ATL.OnConnected = ScreenCapture_Connected;
		_this.ATL.AfterCapture = ScreenCapture_AfterCapture;
		//
		_this.CapturePanel = $("#"+_this.CaptureDlgID); //获取截屏信息层
		_this.Message = _this.CapturePanel.find("span[name='msg']");
		_this.Progress = _this.CapturePanel.find("span[name='process']");
		_this.Inited = true;
	};

	//截屏函数
	this.Capture = function()
	{
		_this.Init();
		_this.ATL.ClearFields(); //清空附加字段
		var pname;
		for (pname in _this.Fields)
		{
			_this.ATL.AddField(pname, _this.Fields[pname]);
		}
		_this.ATL.Capture();
	};

	//截取整个屏幕
	this.CaptureScreen = function()
	{
		_this.Init();
		_this.ATL.ClearFields(); //清空附加字段
		var pname;
		for (pname in _this.Fields)
		{
			_this.ATL.AddField(pname, _this.Fields[pname]);
		}
		_this.OpenInfPanel();
		_this.ATL.CaptureScreen();
	};

	//截取指定区域
	this.CaptureRect = function(x,y,width,height)
	{
		_this.Init();
		_this.ATL.ClearFields(); //清空附加字段
		var pname;
		for (pname in _this.Fields)
		{
			_this.ATL.AddField(pname, _this.Fields[pname]);
		}
		_this.OpenInfPanel();
		_this.ATL.CaptureRect(x,y,width,height);
	};

	this.OpenInfPanel = function()
	{
		_this.CapturePanel.css("display","block");
	};

	this.CloseInfPanel = function()
	{
		_this.CapturePanel.css("display","none"); //隐藏信息层
	};
}

//事件-连接成功
function ScreenCapture_Connected(obj)
{
	obj.Progress.css("10%");
}

//事件-传输完毕
function ScreenCapture_Complete(obj)
{
	obj.Progress.css("100%");
	obj.Message.css("上传完成");
	obj.State = obj.StateType.Complete;
	obj.CloseInfPanel(); //隐藏信息层
	//显示截取的屏幕图片
//	var img = $("#imgShow");
//	img.attr("src", obj.ATL.Response.replace(/null/,""));
    var scpImg = obj.ATL.Response.replace(/null/,"");
    if(obj.success){
        obj.success(scpImg);
    }
    //showDialog('dialog_box');
}

/*
	事件-传输中....
	参数:
		obj		JS对象
		speed	传输速度
		postedLength 已传输长度。1Byte,1KB,1MB,1GB
		percent 上传百分比
		time 剩余时间
*/
function ScreenCapture_OnProcess(obj,speed,postedLength,percent,time)
{
	obj.Progress.css(percent);
	//obj.pProcess.style.width = arguments[3] + "%";
	//obj.pMsg.innerText = "已上传:" + arguments[2];
	//obj.pMsg.innerText += " 速度:" + arguments[1] + "/s";
	//obj.pMsg.innerText += " 剩余时间:" + arguments[4];
}

//事件-传输停止
function ScreenCapture_Stop(obj)
{
	obj.State = obj.StateType.Stop;
}
/*
	事件-传输错误
	参数:
		obj
		errCode
*/
function ScreenCapture_OnError(obj,errCode)
{
	alert(ScreenCaptureError[errCode]);
	obj.Progress.css("");
	//obj.pButton.innerText = "重试";
	obj.State = obj.StateType.Error;
}

function ScreenCapture_AfterCapture(obj)
{
	//obj.OpenInfPanel();//打开信息面板
}