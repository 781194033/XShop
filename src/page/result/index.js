/*
* @Author: cewei
* @Date:   2018-02-07 17:27:11
* @Last Modified by:   cewei
* @Last Modified time: 2018-03-02 15:51:13
*/
require('./index.css');
var _xs = require('util/_xs.js');

const res = {
	init : function(){
		var type        = _xs.getUrlParam('type') || 'default',
		    element    = '.' + type + '-success';
		if(type === "payment"){
			document.querySelector(".checkOrder").href = './order-detail.html?orderNumber=' + _xs.getUrlParam("orderNumber");
		}
	    document.querySelector(element).style.display = "block";
	}
}

res.init();