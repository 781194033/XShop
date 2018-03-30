/*
* @Author: cewei
* @Date:   2018-02-28 14:40:52
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-28 20:17:59
*/
require('./index.css');
require('page/common/header/index.js');
var nav            	  = require('page/common/nav/index.js');
var navSide           = require('page/common/nav-side/index.js');
var _xs           	  = require('util/_xs.js');
var _order            = require('service/order-service.js');
var templateOrder     = require('./index.string');


var orderList = {
    init : function(){
        this.onLoad();
        navSide.init("order-list");
    },
    onLoad : function(){
        this.loadProductList();
    },
    //加载订单列表
    loadProductList : function(){
    	_order.getOrderList(function(res){
    		res.data.list.forEach(function(cur,index,arr){
                cur['orderItemVoList'].forEach(function(current,index1,Arr){
                	current["productName"] = current["productName"].replace('【测试学习使用】','');
                });
            });
    		var orderListHtml = _xs.renderHtml(templateOrder,res.data);
    		document.querySelector(".panel").innerHTML = orderListHtml;
    	},function(errMsg){
    		_xs.errorTips(errMsg);
    	})
 		
    },
};
orderList.init();