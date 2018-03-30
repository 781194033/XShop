/*
* @Author: cewei
* @Date:   2018-02-21 10:01:50
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-28 14:17:13
*/
var _xs = require('util/_xs.js');

var _address = {
   //获取地址列表
   getAddressList : function(resolve,reject){
   		_xs.request({
   			url     : _xs.getServerUrl("/shipping/list.do"),
   			data    : {
   				pageSize : 50
   			},
   			success : resolve,
   			error   : reject
   		})
   },
   //添加地址
   save : function(receiverInfo,resolve,reject){
         _xs.request({
            url     : _xs.getServerUrl("/shipping/add.do"),
            data    : receiverInfo,
            success : resolve,
            error   : reject
         })
   },
   //删除地址
   delete : function(shippingId,resolve,reject){
         _xs.request({
            url     : _xs.getServerUrl("/shipping/del.do"),
            data    : {
               shippingId : shippingId
            },
            success : resolve,
            error   : reject
         })
   },
   //编辑地址
   update : function(userInfo,resolve,reject){
         _xs.request({
            url     : _xs.getServerUrl("/shipping/update.do"),
            data    : userInfo,
            success : resolve,
            error   : reject
         })
   },
   //获取单条收件人信息
   getAddressInfo : function (shippingId,resolve,reject) {
      _xs.request({
            url     : _xs.getServerUrl("/shipping/select.do"),
            data    : {
               shippingId : shippingId
            },
            success : resolve,
            error   : reject
         })
   }
}
module.exports = _address;