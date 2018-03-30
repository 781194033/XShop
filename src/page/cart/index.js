/*
* @Author: cewei
* @Date:   2018-02-10 13:17:46
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-21 18:26:09
*/
require('./index.css');
require('page/common/header/index.js');
var nav             = require('page/common/nav/index.js');
var _xs             = require('util/_xs.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadCart();
    },
    bindEvent : function(){
        var _this = this;
        // 商品的选择 / 取消选择
        document.addEventListener('click', function(e){
        	var target = e.target;
        	if(target.className === 'cart-select'){
        		var tab = target.parentNode.parentNode.parentNode.parentNode.parentNode;
        		var productId = tab.getAttribute("data-product-id");
        		if(target.checked===true){
	    			_cart.selectProduct(productId, function(res){
	                    _this.renderCart(res.data);
	                }, function(errMsg){
	                    _this.showCartError();
	                });
        		}else{
	    			_cart.unselectProduct(productId, function(res){
	                    _this.renderCart(res.data);
	                }, function(errMsg){
	                    _this.showCartError();
	                });
        		}
        	}
        });
        document.addEventListener('click', function(e){
        	var target = e.target;
        	if(target.className === 'cart-select-all'){
        		if(target.checked){
        			_cart.selectAllProduct(function(res){
	                    _this.renderCart(res.data);
	                }, function(errMsg){
	                    _this.showCartError();
	                });
        		}else{
			        _cart.unselectAllProduct(function(res){
	                    _this.renderCart(res.data);
	                }, function(errMsg){
	                    _this.showCartError();
	                });
        		}
        	}
        });
        // 商品数量的变化
        document.addEventListener('click', function(e){
        	var target = e.target;

        	if(/count-btn/.test(target.className)){
        		var type      = /plus/.test(target.className)?'plus':'minus',
	        		tab       = target.parentNode.parentNode.parentNode.parentNode,
	        		productId =tab.getAttribute("data-product-id"),
	        		minCount  = 1,
	        		pCount    = target.parentNode.childNodes[3],
	        		currCount = parseInt(pCount.value),
	        		newCount  = currCount - 1;
	        		maxCount  = parseInt(pCount.getAttribute("max"));

        		if(type ==='plus'){
        			if(currCount >= maxCount){
	                    _xs.errorTips('该商品数量已达到上限');
	                    return;
	                }
	                newCount = currCount + 1;
        		}else{  		
                	if(currCount <= minCount){
                    	return;
                	}
                	newCount = currCount - 1;
        		}
    			// 更新购物车商品数量
	            _cart.updateProduct({
	                productId : productId,
	                count : newCount
	            }, function(res){
	                _this.renderCart(res.data);
	            }, function(errMsg){
	                _this.showCartError();
	            });
			}
        });
        // 删除单个商品
        document.addEventListener('click', function(e){
        	var target = e.target;
        	if(/cart-delete/.test(target.className)){
        		var productId = target.parentNode.parentNode.parentNode.parentNode
        		.getAttribute("data-product-id");
        		_this.deleteCartProduct(productId);
        	}
        });
        // 删除选中商品
  		 document.addEventListener('click', function(e){
        	var target = e.target;

        	if(/delete-all/.test(target.className)){
        		if(window.confirm('确认要删除选中的商品？')){
	                var arrProductIds = [],
	                	arr = [],
	                    selectedItem = document.querySelectorAll('.cart-select');
	                    for(var i = 0, iLength = selectedItem.length; i < iLength; i ++){
	                    	if(selectedItem[i].checked){
	                    		arr.push(selectedItem[i]);
	                    	}
	                    }
	                //循环查找选中的productIds
	                for(var i = 0, iLength = arr.length; i < iLength; i ++){
	                	var tab = arr[i].parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-product-id");
	                    arrProductIds
	                        .push(tab);
	                }
	                if(arrProductIds.length){
	                    _this.deleteCartProduct(arrProductIds.join(','));
	                }
	                else{
	                    _mm.errorTips('您还没有选中要删除的商品');
	                }  
            	}
        	}
        });
        // // 提交购物车
       document.addEventListener('click', function(e){
       		var target = e.target;
       		if(/btn-submit/.test(target.className)){
       			//总价大于0，进行提交
	            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
	                window.location.href = './order-confirm.html';
	            }else{
	                _mm.errorTips('请选择商品后再提交');
	            }
       		}
            
        });
    },
    // 加载购物车信息
    loadCart : function(){
        var _this       = this;
        // 获取购物车列表
        _cart.getCartList(function(res){
            res.data.cartProductVoList.forEach(function(cur,index,arr){
                cur['productName'] = cur['productName'].replace('【测试学习使用】','');
            });
            _this.renderCart(res.data);
        }, function(errMsg){
            _this.showCartError();
        })
    },
//     // 渲染购物车
    renderCart : function(data){
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        // 生成HTML
        var cartHtml = _xs.renderHtml(templateIndex, data);
        document.querySelector('.page-wrap').innerHTML = cartHtml;
        // 通知导航的购物车更新数量
        nav.loadCartInfo();
    },
    // 删除指定商品，支持批量，productId用逗号分割
    deleteCartProduct : function(productIds){
        var _this = this;
        _cart.deleteProduct(productIds, function(res){
            _this.renderCart(res.data);
        }, function(errMsg){
            _this.showCartError();
        });
    },
    // 数据匹配
    filter : function(data){
        data.notEmpty = !!data.cartProductVoList.length;
    },
    // 显示错误信息
    showCartError: function(){
        document.querySelector('.page-wrap').innerHTML = '<p class="err-tip">哪里不对了，刷新下试试吧。</p>';
    }
};
page.init();