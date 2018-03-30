/*
* @Author: cewei
* @Date:   2018-03-02 14:27:36
* @Last Modified by:   cewei
* @Last Modified time: 2018-03-02 15:46:15
*/
require('./index.css');
require('page/common/header/index.js');
var nav            	  = require('page/common/nav/index.js');
var _xs           	  = require('util/_xs.js');
var _payment          = require('service/payment-service.js');
var templatePayment   = require('./index.string');


var orderDetail = {
    init : function(){
        this.orderNo = _xs.getUrlParam("orderNumber");
        this.onLoad();
    },
    onLoad : function(){
        this.loadPaymentInfo();
    },
    //加载订单列表
    loadPaymentInfo : function(){
        var _this = this;
        _payment.getPaymentInfo(this.orderNo,function(res){
            var html = _xs.renderHtml(templatePayment,res.data);
            document.querySelector(".page-wrap").innerHTML = html;

            //轮询查看订单状态
            _this.checkOrderStatus();
        },function(errMsg){
            _xs.errorTips(errMsg);
        })
    },
    checkOrderStatus : function(){
        var _this = this;
        _this.paymentStatus = window.setInterval(function(){
            _payment.checkOrderStatus(_this.orderNo,function(res){
                if(res.data){
                    window.location.href = "./result.html?type=payment&orderNumber=" + _this.orderNo;
                }
            },function(errMsg){
                _xs.errorTips(errMsg);
            })
        },5e3);
    }
};
orderDetail.init();