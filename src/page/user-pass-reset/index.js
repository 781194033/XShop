/*
* @Author: cewei
* @Date:   2018-02-07 22:43:41
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-08 18:01:07
*/
require('./index.css');
var _user   = require('service/user-service.js');
var _xs     = require('util/_xs.js');

// 表单里的错误提示
const formError = {
    show : function(errMsg){
        document.querySelector('.err-box').style.display="block";
        document.querySelector('.errMsg').innerHTML = errMsg;
    },
    hide : function(){
        document.querySelector('.err-box').style.display="none";
        document.querySelector('.errMsg').innerHTML = '';
    }
};

// page 逻辑部分
var page = {
    data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        // 输入用户名后下一步按钮的点击
        document.querySelector('#submit-username').addEventListener("click",function(){
            var username = document.querySelector('#username').value.trim();
            // 用户名存在
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res.data;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else{
                formError.show('请输入用户名');
            }
        });
        // 输入密码提示问题答案中的按钮点击
        document.querySelector('#submit-question').addEventListener("click",function(){
            var answer =document.querySelector('#answer').value.trim();
            // 密码提示问题答案存在
            if(answer){
                // 检查密码提示问题答案
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                }, function(res){
                    _this.data.answer   = answer;
                    _this.data.token    = res.data;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else{
                formError.show('请输入密码提示问题答案');
            }
        });
        // 输入新密码后的按钮点击
        document.querySelector('#submit-password').addEventListener("click",function(){
            var password = document.querySelector('#password').value.trim();
            // 密码不为空
            if(password && password.length >= 6){
                // 检查密码提示问题答案
                _user.resetPassword({
                    username        : _this.data.username,
                    passwordNew     : password,
                    forgetToken     : _this.data.token
                }, function(res){
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 密码为空
            else{
                formError.show('请输入不少于6位的新密码');
            }
        });
        
    },
    // 加载输入用户名的一步
    loadStepUsername : function(){
        document.querySelector('.step-username').style.display="block";
    },
    // 加载输入密码提示问题答案的一步
    loadStepQuestion : function(){
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        document.querySelector('.step-username').style.display = "none";
        document.querySelector('.step-question').style.display = "block"
        document.querySelector('.question').innerHTML = this.data.question;
    },
    // 加载输入password的一步
    loadStepPassword : function(){
        // 清除错误提示
        formError.hide();
        // 做容器的切换
        document.querySelector('.step-question').style.display = "none";
        document.querySelector('.step-password').style.display = "block";
    }
};
page.init();
