/*
* @Author: cewei
* @Date:   2018-03-02 14:37:44
* @Last Modified by:   cewei
* @Last Modified time: 2018-03-02 15:35:04
*/
var _xs = require('util/_xs.js');

var _payment = {
   //获取支付信息
   getPaymentInfo : function (orderNumber ,resolve, reject){
   		_xs.request({
   			url    : _xs.getServerUrl("/order/pay.do"),
   			data   : {
   				orderNo : orderNumber
   			},
   			success:resolve,
   			error  :reject
   		})
   },
   //查看订单状态
   checkOrderStatus : function(orderNumber ,resolve, reject){
   		_xs.request({
   			url    : _xs.getServerUrl("/order/query_order_pay_status.do"),
   			data   : {
   				orderNo : orderNumber
   			},
   			success:resolve,
   			error  :reject
   		})
   },
}
module.exports = _payment;