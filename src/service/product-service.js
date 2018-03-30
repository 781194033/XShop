/*
* @Author: cewei
* @Date:   2018-02-06 09:37:34
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-09 20:22:57
*/
var _xs = require('util/_xs.js');

var _product = {
    // 获取商品列表
    getProductList : function(listParam, resolve, reject){
        _xs.request({
            url     : _xs.getServerUrl('/product/list.do'),
            data    : listParam,
            success : resolve,
            error   : reject
        });
    },
    // 获取商品详细信息
    getProductDetail : function(productId, resolve, reject){
        _xs.request({
            url     : _xs.getServerUrl('/product/detail.do'),
            data    : {
                productId : productId
            },
            success : resolve,
            error   : reject
        });
    }
}
module.exports = _product;