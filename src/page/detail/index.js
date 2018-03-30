/*
* @Author: cewei
* @Date:   2018-02-10 10:22:13
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-10 13:13:53
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _xs             = require('util/_xs.js');
var _product        = require('service/product-service.js');
var _cart           = require('service/cart-service.js');
var templateIndex   = require('./index.string');

var page = {
    data : {
        productId : _xs.getUrlParam('productId') || '',
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 如果没有传productId, 自动跳回首页
        if(!this.data.productId){
            _xs.goHome();
        }
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        // 图片预览
        document.addEventListener("click",function(e){
            var target = e.target;
            if(target.className.toLowerCase() ==='p-img'){
                document.querySelector(".main-img").src = target.src;
            }
        });
        //count操作
        document.addEventListener("click",function(e){
            var target = e.target;
            if(/p-count-btn/.test(target.className)){
                var type        = !/minus/.test(target.className) ? 'plus' : 'minus',
                    pCount     = document.querySelector('.p-count'),
                    currCount   = parseInt(pCount.value),
                    minCount    = 1,
                    maxCount    = _this.data.detailInfo.stock || 1;
                if(type === 'plus'){
                    pCount.value = currCount < maxCount ? currCount + 1 : maxCount;
                }
                else if(type === 'minus'){
                    pCount.value = currCount > minCount ? currCount - 1 : minCount;
                }
            }
        });
        
        document.addEventListener("click",function(e){
            var target = e.target;
            if(/cart-add/.test(target.className)){
                _cart.addToCart({
                    productId   : _this.data.productId,
                    count       : document.querySelector('.p-count').value
                }, function(res){
                    window.location.href = './result.html?type=cart-add';
                }, function(errMsg){
                    _xs.errorTips(errMsg);
                });
            }
        });

        // // 加入购物车
        // $(document).on('click', '.cart-add', function(){
            // _cart.addToCart({
            //     productId   : _this.data.productId,
            //     count       : $('.p-count').val()
            // }, function(res){
            //     window.location.href = './result.html?type=cart-add';
            // }, function(errMsg){
            //     _xs.errorTips(errMsg);
            // });
        // });
    },
    // 加载商品详情的数据
    loadDetail : function(){
        var _this       = this,
            html        = '',
            pageWrap   = document.querySelector('.page-wrap');
        // loading
        pageWrap.innerHTML = '<div class="loading"></div>';
        // 请求detail信息
        _product.getProductDetail(this.data.productId, function(res){
            _this.filter(res.data);

            res.data.name = res.data.name.replace('【测试学习使用】','');
            // 缓存住detail的数据
            _this.data.detailInfo = res.data;
            // render
            html = _xs.renderHtml(templateIndex, res.data);
            pageWrap.innerHTML = html;
        }, function(errMsg){
            pageWrap.innerHTML ='<p class="err-tip">此商品太淘气，找不到了</p>';
        });
    },
    // 数据匹配
    filter : function(data){
        data.subImages = data.subImages.split(',');
    }
};
page.init();