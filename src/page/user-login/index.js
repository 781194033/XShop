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
		})
	},
	//表单提交
	submit : function(){
		var formData = {
			username : document.querySelector("#username").value.trim(),
			password : document.querySelector("#password").value.trim()
		};
		var validateResult = this.formValidate(formData);
		if(validateResult.status){
			_user.login(formData,function(res){
				window.location.href ='./index.html';
			},function(err){
				formError.show(err);
			});
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
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};
login.init();

