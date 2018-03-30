/*
* @Author: cewei
* @Date:   2018-02-09 16:45:02
* @Last Modified by:   cewei
* @Last Modified time: 2018-03-08 21:06:38
*/
require("./index.css");


const banner = {
	curIndex : 0,
	imgs 	 : document.querySelectorAll(".banner ul li"),
	init 	 : function(){
		this.onload();
		this.bindEvent();
	},
	onload : function(){
		var _this = this;
		_this.imgs.forEach(function(cur,index,arr){
			_this.imgs[index].style.display = "none";
		});
		_this.imgs[_this.curIndex].style.display = "block";
	},
	bindEvent : function(){
		var _this = this;
		document.querySelector(".banner-arrow.prev").addEventListener("click",function(){
			_this.sliderPrev();
		});
		document.querySelector(".banner-arrow.next").addEventListener("click",function(){
			_this.sliderNext();
		})
	},
	sliderPrev : function(){
		var _this = this;
		//如果是第一张图
		if(_this.curIndex === 0){
			_this.imgs[_this.curIndex].style.display = "none";
			_this.curIndex = _this.imgs.length-1;
			_this.imgs[_this.curIndex].style.display = "block";
		}//不是第一张图
		else if(_this.curIndex > 0 ){
			_this.imgs[_this.curIndex].style.display = "none";
			_this.curIndex -= 1;
			_this.imgs[_this.curIndex].style.display = "block";
		}
	},
	sliderNext : function(){
		var _this = this;
		//如果是最后一张图
		if(_this.curIndex === _this.imgs.length-1){
			_this.imgs[_this.curIndex].style.display = "none";
			_this.curIndex = 0;
			_this.imgs[_this.curIndex].style.display = "block";
		}//如果不是最后一张图
		else if(_this.curIndex < _this.imgs.length-1 ){
			_this.imgs[_this.curIndex].style.display = "none";
			_this.curIndex += 1;
			_this.imgs[_this.curIndex].style.display = "block";
		}
	}
};
module.exports = banner;