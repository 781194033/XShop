/*
* @Author: cewei
* @Date:   2018-02-17 13:02:25
* @Last Modified by:   cewei
* @Last Modified time: 2018-03-02 14:35:28
*/
require('./index.css');
require('page/common/header/index.js');
var nav            	  = require('page/common/nav/index.js');
var _xs           	  = require('util/_xs.js');
var _order            = require('service/order-service.js');
var _address          = require('service/address-service.js');
var templateProduct   = require('./product-list.string');
var templateAddress   = require('./address-list.string');
var addressModal      = require('./address-modal.js');


var page = {
    data : {
        selectedAddressId : null
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        // 选择地址
        document.addEventListener('click', function(e){
        	var target = e.target;
        	if(/address-detail/.test(target.className)){
        		target.parentNode.className = "address-item active";
        		var nodeList = document.querySelectorAll(".address-item");
        		for(var i=0,len=nodeList.length;i<len;i++){
        			if(target.parentNode !== nodeList[i]){
        				nodeList[i].className = "address-item";
        			}
        		}
        		_this.data.selectedAddressId = target.parentNode.getAttribute("data-id");
        	}
        });
        //提交订单
        document.addEventListener('click', function(e){
        	var target = e.target;
        	if(/order-submit/.test(target.className)){
        		var shippingId = _this.data.selectedAddressId;
        		if(shippingId){
        			_order.createOrder({
        				shippingId : shippingId
        			},function(res){
        				window.location.href = "./payment.html?orderNumber=" + res.data.orderNo;
        			},function(errMsg){
        				_xs.errorTips(errMsg);
        			})
        		}else{
                    _xs.errorTips("请选择地址后提交订单")
                }
        	}
        });
        //点击添加地址
        _xs.eventBind(document,'click',".fa-plus",function(e){
            addressModal.show({
                isUpdate : false ,
                onSuccess : function (){
                    _this.loadAddressList();
                }
            })
        });
        //删除地址
        _xs.eventBind(document,'click',".address-delete",function(e){
            _this.data.selectedAddressId = this.parentNode.parentNode.getAttribute("data-id");
            if(window.confirm("确认要删除该地址吗？")){
                _address.delete(_this.data.selectedAddressId,function(res){
                    _this.loadAddressList();
                },function(errMsg){
                    _xs.errorTips(errMsg)
                })
            }
        });
        //编辑地址
        _xs.eventBind(document,'click',".address-edit",function(e){
            _this.data.selectedAddressId = this.parentNode.parentNode.getAttribute("data-id");
            _address.getAddressInfo(_this.data.selectedAddressId,function(res){
                addressModal.show({
                isUpdate  : true,
                data      : res.data,
                onSuccess : function(){
                    _this.loadAddressList();
                }
            })
            },function(errMsg){
                _xs.errorTips(errorTips)
            })
            
        });
        //点击提交订单
        _xs.eventBind(document,"click",".order-submit",function(e){
            window.location.href = "./payment.html?orderNumber=" + this.data.orderNo;
        })
    },
    // 加载地址列表
    loadAddressList : function(){
        var _this       = this;
        
        _address.getAddressList(function(res){
            var addressListHtml = _xs.renderHtml(templateAddress,res.data);
            document.querySelector(".address-con").innerHTML = addressListHtml;
        }, function(errMsg){
            document.querySelector(".address-con").innerHTML = "<p class='err-tip'>地址加载失败，请刷新后重试</p>";
        })
    },
    //加载商品信息列表
    loadProductList : function(){
        var _this       = this;
      
        _order.getProductList(function(res){
            res.data.orderItemVoList.forEach(function(cur,index,arr){
                cur['productName'] = cur['productName'].replace('【测试学习使用】','');
            });
            var productListHtml = _xs.renderHtml(templateProduct,res.data);
            document.querySelector(".product-con").innerHTML = productListHtml;
        }, function(errMsg){
            document.querySelector(".product-con").innerHTML = "<p class='err-tip'>商品信息加载失败，请刷新后重试</p>";
        })
    },
};
page.init();