/*
* @Author: cewei
* @Date:   2018-02-05 23:08:46
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-26 21:33:46
*/
require("./index.css");
const _xs = require("util/_xs.js");
const _user = require("service/user-service.js");
const _cart = require("service/cart-service.js");
const nav = {
	init      : function(){
		this.bindEvent();
		this.loadUerInfo();
		this.loadCartInfo();
		return this;
	},
	bindEvent : function(){
		//点击登录
		document.querySelector(".js-login").addEventListener('click',function(event){
			_xs.doLogin();
		});
		//点击注册
		document.querySelector(".js-register").addEventListener('click',function(event){
			window.location.href = './user-register.html';
		});
		//点击退出
		document.querySelector(".js-logout").addEventListener('click',function(event){
			_user.logout(function(res){
				window.location.href = "./index.html";
			},function(err){
				_xs.errorTips(err);
			})
		});
	},
	//加载用户信息
	loadUerInfo : function(){
		_user.checkLogin(function(res){
			document.querySelector(".user.not-login").style.display = "none";
			document.querySelector(".user.login").style.display = 'inline';
			document.querySelector(".username").innerHTML = res.data.username;
		},function(err){
			//do nothing
		})
	},
	//加载购物车数量
	loadCartInfo : function(){
		_cart.getCartCount(function(res){
			document.querySelector(".nav-item .cart-count").innerHTML = (res.data || 0);
		},function(err){
			document.querySelector(".nav-item .cart-count").innerHTML = 0;
		})
	}
}

module.exports = nav.init();