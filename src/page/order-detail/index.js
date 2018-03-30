/*
* @Author: cewei
* @Date:   2018-03-01 14:50:01
* @Last Modified by:   cewei
* @Last Modified time: 2018-03-02 14:41:07
*/
require('./index.css');
require('page/common/header/index.js');
var nav            	  = require('page/common/nav/index.js');
var navSide           = require('page/common/nav-side/index.js');
var _xs           	  = require('util/_xs.js');
var _order            = require('service/order-service.js');
var templateOrder     = require('./index.string');


var orderDetail = {
    init : function(){
        this.orderNo =  _xs.getUrlParam("orderNumber");
        this.onLoad();
        navSide.init("order-list");
        this.bindEvent();
    },
    onLoad : function(){
        this.loadDetailtList();
    },
    //事件的绑定
    bindEvent : function(){
        var _this = this;
        //点击立即支付
       _xs.eventBind(document,"click",".payBtn",function(e){
            window.location.href = "./payment.html?orderNumber="+_this.orderNo;
       });
       //点击取消订单
       _xs.eventBind(document,"click",".cancelBtn",function(e){
            if(window.confirm("确认要删除该订单吗？"))
            {
                _order.cancelOrder(_this.orderNo,function(res){
                    _xs.successTips("订单删除成功！")
                    _this.loadDetailtList();
                },function(errMsg){
                    _xs.errorTips(errMsg);
                })
            }
       });
    },
    //加载订单列表
    loadDetailtList : function(){
        var _this = this;
 		_order.getOrderDetail(this.orderNo,function(res){
            _this.dataFilter(res.data);
            var html = _xs.renderHtml(templateOrder,res.data);
            document.querySelector(".panel").innerHTML = html;
        },function(errMsg){
            _xs.errorTips(errMsg);
        })
    },
    dataFilter : function(data){
        data.needPay        = data.status == 10;
        data.isCancelable   = data.status == 10;
    }
};
orderDetail.init();