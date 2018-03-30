/*
* @Author: cewei
* @Date:   2018-02-09 11:58:36
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-09 14:43:54
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _xs            = require('util/_xs.js');
var _user           = require('service/user-service.js');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init('user-pass-update' );
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        document.querySelector('.btn-submit').addEventListener('click',function(){
            var userInfo = {
                password        : document.querySelector('#password').value.trim(),
                passwordNew     : document.querySelector('#password-new').value.trim(),
                passwordConfirm : document.querySelector('#password-confirm').value.trim()
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户密码
                _user.updatePassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function(res, msg){
                    window.location.href = './result.html?type=userPassUpdate'
                }, function(errMsg){
                    _xs.errorTips(errMsg);
                });
            }
            else{
                _xs.errorTips(validateResult.msg);
            }
        });
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证原密码是否为空
        if(!_xs.validate(formData.password, 'require')){
            result.msg = '原密码不能为空';
            return result;
        }
        // 验证新密码长度
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.msg = '密码长度不得少于6位';
            return result;
        }
        // 验证两次输入的密码是否一致
        if(formData.passwordNew !== formData.passwordConfirm){
            result.msg = '两次输入的密码不一致';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
page.init();
