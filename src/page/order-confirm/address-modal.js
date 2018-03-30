/*
* @Author: cewei
* @Date:   2018-02-26 13:35:23
* @Last Modified by:   cewei
* @Last Modified time: 2018-02-28 14:27:33
*/
var _xs           	= require('util/_xs.js');
var _order          = require('service/order-service.js');
var templateModal   = require('./address-modal.string');
var _cities         = require('util/cities/_cities.js');
var _address         = require('service/address-service.js');



var addressModal = {
	show : function (option) {
		//option的绑定
		this.option = option;
		this.modalWrap = document.querySelector(".modal-wrap");
		//渲染页面
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},
	hide : function () {
		this.modalWrap.innerHTML = '';
	},
	loadModal : function(){
		var addressModalHtml = _xs.renderHtml(templateModal,{
			isUpdate : this.option.isUpdate,
			data     : this.option.data
		});
		this.modalWrap.innerHTML = addressModalHtml;
		//加载省份
		this.loadProvinces();
		// //加载城市
		// this.loadCities();
	},
	//事件绑定
	bindEvent : function(){
		var _this = this;
		//省份城市二级联动
		var city = this.modalWrap.querySelector("#receiver-city");
		_xs.eventBind(city,"change",function(e){
			var selectedCity = this.value;
			_this.loadCities(selectedCity);
			
		});
		//点击保存按钮
		var saveBtn = this.modalWrap.querySelector(".save-btn");
		_xs.eventBind(saveBtn,"click",function(e){
			var result = _this.getReceiverInfo(),
				isUpdate = _this.option.isUpdate;
			//使用新地址，并且验证通过
			if(!isUpdate && result.status){
				_address.save(result.data,function(res){
					_xs.successTips("地址添加成功");
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				},function(errMsg){
					_xs.errorTips(errMsg);
				})
			}
			//更新地址，并且验证通过
			else if(isUpdate && result.status){
				_address.update(result.data,function(res){
					_xs.successTips("地址更新成功");
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				},function(errMsg){
					_xs.errorTips(errMSG)
				})
			}
			//验证不通过
			else{
				_xs.errorTips(result.msg || "哪里不对了~~")
			}

		});
		//点击x关闭
		var x = document.querySelector(".fa-close");
		_xs.eventBind(x,"click",function(e){
			_this.hide();
		});
		//点击透明区域关闭
		var blank = document.querySelector(".modal-wrap");
		_xs.eventBind(blank,"click",function(e){
			_this.hide();
		});
		//阻止冒泡
		var container = document.querySelector(".modal-container");
		_xs.eventBind(container,"click",function(e){
			e.stopPropagation();
		});
	},
	//表单字段验证
	getReceiverInfo : function () {
		//表单内容
		var data = {
			id               :document.querySelector(".Id").value.trim(),
			receiverName     :document.querySelector("#receiver-name").value.trim(),
			receiverProvince :document.querySelector("#receiver-city").value,
			receiverCity     :document.querySelector("#receiver-subcity").value,
			receiverAddress  :document.querySelector("#receiver-address").value.trim(),
			receiverPhone    :document.querySelector("#receiver-phone").value.trim(),
			receiverZip      :document.querySelector("#receiver-zip").value.trim(),
		},
		result = {
			status : false
		};

		// 字段验证
		if(!data.receiverName){
			result.msg = "请输入收件人姓名";
		}
		else if(!data.receiverProvince){
			result.msg = "请选择收件人省份"
		}
		else if(!data.receiverCity){
			result.msg = "请选择收件人城市"
		}
		else if(!data.receiverAddress){
			result.msg = "请输入详细地址"
		}
		else if(!data.receiverPhone){
			result.msg = "请输入收件人手机号"
		}
		//验证成功
		else{
			result.status = true;
			result.data = data;
		}
		//如果是验证失败，result包含msg，成功reslut包含receiverInfo
		return result;

	},
	//省份的加载
	loadProvinces : function(){
		var provinces = _cities.getProvinces(),
			provincesSelect = this.modalWrap.querySelector("#receiver-city");
		provincesSelect.innerHTML = this.getSelectOption(provinces);

		// 判断是否是isUpdate，如果有省份，则回填省份
		if(this.option.isUpdate && this.option.data.receiverProvince){
			provincesSelect.value = this.option.data.receiverProvince;
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	//省份对应的城市加载
	loadCities : function(provinceName){
		var subCity = _cities.getCities(provinceName) || [],
			subCitySelect = this.modalWrap.querySelector("#receiver-subcity");
		subCitySelect.innerHTML = this.getSelectOption(subCity);

		//判断是否是isUpdate，如果有城市，则回填城市
		if(this.option.isUpdate && this.option.data.receiverCity){
			subCitySelect.value = this.option.data.receiverCity;
		}
	},
	//获取所有的选项，输入array，输出html
	getSelectOption : function (optionArray){
		var html = "<option value=''>请选择</option>";
		optionArray.forEach(function(cur,index){
			html += "<option value='"+cur+ "'>"+ cur+"</option>";
		});
		return html;
	}
};
module.exports = addressModal;