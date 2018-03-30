/*
* @Author: cewei
* @Date:   2018-02-18 22:33:46
* @Last Modified by:   cewei
* @Last Modified time: 2018-03-01 17:58:36
*/
var _xs = require('util/_xs.js');

var _order = {
   //获取商品列表
   getProductList : function(resolve,reject) {
   	_xs.request({
   		url 	: _xs.getServerUrl("/order/get_order_cart_product.do"),
   		success : resolve,
   		error   :reject
   	})
   },
   //获取商品列表
   createOrder : function(params,resolve,reject) {
   	_xs.request({
   		url 	  : _xs.getServerUrl("/order/create.do"),
   		data    : params,
   		success : resolve,
   		error   :reject
   	})
   },
   //获取订单列表
   getOrderList : function(resolve,reject) {
      _xs.request({
         url     : _xs.getServerUrl("/order/list.do"),
         success : resolve,
         error   :reject
      })
   },
   //获取订单详情
   getOrderDetail : function(orderNo , resolve ,reject){
      _xs.request({
         url     : _xs.getServerUrl("/order/detail.do"),
         data    : {
            orderNo : orderNo
         },
         success : resolve,
         error   :reject
      })
   },
   //删除订单
   cancelOrder : function(orderNo , resolve ,reject){
      _xs.request({
         url     : _xs.getServerUrl("/order/cancel.do"),
         data    : {
            orderNo : orderNo
         },
         success : resolve,
         error   :reject
      })
   },
}
module.exports = _order;