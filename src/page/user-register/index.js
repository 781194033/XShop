/*
* @Author: cewei
* @Date:   2018-02-07 16:11:51
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-07 17:17:16
*/
require("./index.css");
const _user = require("service/user-service.js");
const _xs   = require("util/_xs.js");
//表单错误处理
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
const login = {
	init : function(){
		this.bindEvent();
	},
	//事件绑定
	bindEvent : function(){
		var _this = this;
		document.querySelector(".submit").addEventListener("click",function(event){
			_this.submit();
		});
		document.querySelector(".user-con").addEventListener("keyup",function(event){
			if(event.keyCode === 13){
				_this.submit();
			}
		});
		var username = document.querySelector("#username");
		username.addEventListener("blur",function(){
			if(!username.value.trim()){
				return;
			}
			_user.checkUsername(username.value.trim(),function(res){
				formError.hide();
			},function(err){
				formError.show(err);
			});
		});
	},
	//表单提交
	submit : function(){
		var formData = {
			username        : document.querySelector("#username").value.trim(),
			password        : document.querySelector("#password").value.trim(),
			passwordConfirm : document.querySelector("#password-confirm").value.trim(),
			phone           : document.querySelector("#phone").value.trim(),
			email           : document.querySelector("#email").value.trim(),
			question        : document.querySelector("#question").value.trim(),
			answer          : document.querySelector("#answer").value.trim(),
		};
		var validateResult = this.formValidate(formData);
		if(validateResult.status){
			_user.register(formData,function(res){
				window.location.href = "./result.html?type=register";
			},function(err){
				formError.show(err);
			})
		}else{
			formError.show(validateResult.msg);
		}
	},
	 //表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_xs.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_xs.validate(formData.password, 'require')){
            result.msg = '密码不能为空';
            return result;
        }
        if(formData.password.length < 6){
        	result.msg = "密码长度不能少于6位";
        	return result;
        }
        if(formData.password !== formData.passwordConfirm)
        {
        	result.msg = "两次密码输入不一致";
        	return result;
        }
        if(!_xs.validate(formData.phone, 'phone')){
        	result.msg = "手机格式不正确";
        	return result;
        }
        if(!_xs.validate(formData.email, 'email')){
        	result.msg = "邮箱格式不正确";
        	return result;
        }
        if(!_xs.validate(formData.question, 'require')){
        	result.msg = "密码提示问题不能为空";
        	return result;
        }
        if(!_xs.validate(formData.answer, 'require')){
        	result.msg = "密码提示答案不能为空";
        	return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
login.init();

