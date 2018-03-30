/*
* @Author: cewei
* @Date:   2018-02-09 13:51:54
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-09 15:36:20
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
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init('user-center');
        // 加载用户信息
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        var panel = document.querySelector('.panel-body');
        var btn   = document.querySelector('.btn-submit');
        btn.addEventListener('click',function(event){
            // var target = event.target;
            // while(target !== btn){
            //     if(target.tagName.toLowerCase() == btn){
                    var userInfo = {
                        phone       : document.querySelector('#phone').value.trim(),
                        email       : document.querySelector('#email').value.trim(),
                        question    : document.querySelector('#question').value.trim(),
                        answer      : document.querySelector('#answer').value.trim()
                    },
                    validateResult = _this.validateForm(userInfo);
                    if(validateResult.status){
                        // 更改用户信息
                        _user.updateUserInfo(userInfo, function(res, msg){
                            _xs.successTips(msg);
                            window.location.href = './user-center.html';
                        }, function(errMsg){
                            _xs.errorTips(errMsg);
                        });
                    }
                    else{
                        _xs.errorTips(validateResult.msg);
                    }
            //     }
            // }
        });
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _xs.renderHtml(templateIndex, res.data);
            document.querySelector('.panel-body').innerHTML = userHtml;
        }, function(errMsg){
            _xs.errorTips(errMsg);
        });
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证手机号
        if(!_xs.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_xs.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_xs.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_xs.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
page.init();