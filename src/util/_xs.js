/*
* @Author: cewei
* @Date:   2018-02-05 12:55:25
* @Last Modified by:   cewei
* @Last Modified time: 2018-04-27 13:02:21
*/
const url   = require("url");
const qs    = require("querystring");
const Hogan = require("hogan.js");
const conf  = {
	serverHost : ''
};
const _xs  ={
	request : function(param){
		var _this = this;
		var method = param.method || 'GET',
			url    = param.url    || '',
			async  = param.async  || true,
			data   = param.data   || '';
			
		var xhr = null;
		//创建XHR对象，ie和非ie
		if(typeof XMLHttpRequest !== "undefined"){
			xhr = new XMLHttpRequest();
		}else if(typeof ActiveXObject !== "undefined"){
			xhr = new ActiveXObject("Microsoft.XMLHTTP")
		}

		//区分post和get
		if(method === "POST"){
			xhr.open(method,url,async);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhr.send(this.toStr(data));
		}else if(method === "GET"){
			url = url +"?"+ this.toStr(data);
			xhr.open(method,url,async);
			xhr.send(null);
		}
		
		xhr.onload = function(){
			if(xhr.readyState === 4){
				if((xhr.status >= 200 && xhr.status<300) || xhr.status ==304){
					var res = JSON.parse(xhr.responseText);
					//请求成功
					if(res.status===0){
						typeof param.success === 'function' && param.success(res);
					}
					//没有登录状态，需要强制登录
					else if(res.status===10){
						_this.doLogin();
					}
					//请求数据错误
					else if(res.status===1){
						typeof param.error === 'function' && param.error(res.msg)
					}
				}else{
					typeof param.error === 'function' && param.error(xhr.status)
				}
			}
		}
		
	},
	//把一个对象拼接成URL参数
	toStr : function(obj){
		if(obj===null){
				return obj;
		}
		var arr = [];
		for(var i in obj){
			var str = encodeURIComponent(i)+'='+encodeURIComponent(obj[i]);
			arr.push(str);
		}
		return arr.join('&');
		
	},
	//获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	//获取url参数
	getUrlParam : function(name){
		var query       = url.parse(window.location.href).query;
		var queryObject = qs.parse(query);
		if(decodeURIComponent(queryObject[name])==="undefined")
		{
			return;
		}
		return decodeURIComponent(queryObject[name]);
	},
	//统一跳转
	doLogin : function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	//渲染HTML模板
	renderHtml : function(htmlTamplate,data){
		var template = Hogan.compile(htmlTamplate);
		var result   = template.render(data);
		return result;
	},
	//成功提示
	successTips : function(msg){
		alert(msg || '操作成功！');
	},
	//错误提示
	errorTips  : function(msg){
		alert(msg || '哪里不对了？');
	},
	//字段验证
	validate  : function(value,type){
		var value = value.trim();
		//非空验证
		if(type === "require"){
			return !!value;
		}
		//手机验证
		else if(type === "phone"){
			return /^1[358]\d{9}/.test(value);
		}
		//邮箱验证
		else if(type === "email"){
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	//回首页
	goHome : function(){
		window.location.href = "./index.html";
	},
	//事件绑定
	eventBind : function(elem, type, selected, fn){
		if(fn == null){
			fn       = selected;
			selected = null;
		}

		elem.addEventListener(type, function(e){
			var target;
			if(selected){
				target = e.target;
				if(target.matches(selected)){
					fn.call(target,e);
				}
			}else{
				fn.call(elem,e);
			}
		})
	}
};
module.exports = _xs;
