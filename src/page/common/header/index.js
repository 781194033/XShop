/*
* @Author: cewei
* @Date:   2018-02-07 12:38:58
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-10 10:27:41
*/
require("./index.css");
const _xs = require("util/_xs.js");
const header = {
	init      : function(){
		this.reload();
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		document.querySelector(".product-btn").addEventListener("click",function(){
			_this.searchSubmit();
		});
		document.querySelector(".search").addEventListener("keyup",function(event){
			if(event.keyCode===13){
				_this.searchSubmit()
			}
		})
	},
	reload : function(){
		var keyword = _xs.getUrlParam("keyword");
		if(keyword){
			document.querySelector(".search").value = keyword;
		}
	},
	searchSubmit : function(){
		var keyword = document.querySelector(".search").value.trim();
		if(keyword){
			window.location.href = "./list.html?keyword="+keyword;
		}else{
			_xs.goHome();
		}
	}
}

header.init();