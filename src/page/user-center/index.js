/*
* @Author: cewei
* @Date:   2018-02-08 21:49:54
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-09 15:23:50
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _xs             = require('util/_xs.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init('user-center');
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _xs.renderHtml(templateIndex, res.data);
            document.querySelector('.panel-body').innerHTML = userHtml;
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
page.init();
