/*
* @Author: cewei
* @Date:   2018-02-07 13:30:37
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-09 11:57:50
*/
require("./index.css");
const _xs = require("util/_xs.js");
const template = require("./index.string");
const navSide = {
	option : {
		name : '',
		navList : [
			{name : "user-center", desc : "个人中心", href : "./user-center.html"},
			{name : "order-list", desc : "我的订单", href : "./order-list.html"},
			{name : "user-pass-update", desc : "修改密码", href : "./user-pass-update.html"},
			{name : "about", desc : "关于我们", href : "./about.html"}
		]
	},
	init : function(name){
		this.option.name = name;
		this.renderNav();
	},
	renderNav : function(){
		for(var i=0,len=this.option.navList.length;i<len;i++){
			if(this.option.name===this.option.navList[i].name){
				this.option.navList[i].isActive = true;
			}
		}
		//渲染模板
		var navHtml = _xs.renderHtml(template,{navList:this.option.navList});
		document.querySelector(".nav-side").innerHTML = navHtml;
	},
};
module.exports = navSide;