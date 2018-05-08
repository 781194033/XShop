/*
* @Author: cewei
* @Date:   2018-02-09 16:45:02
* @Last Modified by:   cewei
* @Last Modified time: 2018-05-08 12:26:04
*/
require("./index.css");


var Slide = function(params){
		this.autoPlay = params.autoPlay;//是否自动轮播，true代表自动轮播，false代表手动
		this.delay    = params.delay;//自动轮播的时间间隔，单位是秒
	};

var toDo = {
	init : function(){
		this.load();
		if(this.autoPlay){
			this.slide();
		}
	},
	load : function(){
		this.timer = null;
		this.lis  = document.querySelectorAll(".container li");
		this.oUl  = document.querySelector(".container");
		this.currentImg = 0;
		this.lis.forEach(function(cur){
			cur.style.display = 'none';
		});
		this.lis[this.currentImg].style.display = 'block';
		this.renderDots();
		this.dots = document.querySelectorAll(".container .dot");
		this.bindEvent();
	},
	//绑定事件
	bindEvent : function(){
		var imgNum = this.lis.length,
			_this = this,
			current = this.currentImg;
		//给前一张按钮绑定事件
		var pre = document.querySelector(".container .arrow.pre");
		pre.addEventListener('click',slidePre);
		//给后一张按钮绑定事件
		var next = document.querySelector(".container .arrow.next");
		next.addEventListener('click',slideNext);

		//向前
		function slidePre(){
			if(current === 0){
				_this.lis[current].style.display ="none";
				_this.lis[imgNum-1].style.display ="block";
				current = imgNum-1;
			}else{
				_this.lis[current].style.display ="none";
				_this.lis[current-1].style.display ="block";
				current--;
			}
			_this.dots.forEach(function(cur){
				cur.className = "dot";
			});
			_this.dots[current].className = 'dot active';
		}
		//向后
		function slideNext(){
			if(current === imgNum-1){
				_this.lis[current].style.display ="none";
				_this.lis[0].style.display ="block";
				current = 0;
			}else{
				_this.lis[current].style.display ="none";
				_this.lis[current + 1].style.display ="block";
				current++;
			}

			_this.dots.forEach(function(cur){
				cur.className = "dot";
			});
			_this.dots[current].className = 'dot active';
		}

		//给圆点绑定事件
		document.addEventListener("click",function(e){
			var target = e.target;

			if(target.matches(".dot")){
				//切换图片
				_this.currentImg = [..._this.dots].indexOf(target);
				_this.lis.forEach(function(cur){
					cur.style.display = 'none';
				})
				_this.lis[_this.currentImg].style.display = "block";

				//切换点焦点
				_this.dots.forEach(function(cur){
					cur.className = "dot";
				});
				target.className = 'dot active';
			}
		})
	},
	//渲染需要的圆点
	renderDots : function (){
		var dot,
			len     = this.lis.length,
			dotsDiv = document.createElement("div");
		dotsDiv.className = "dotsDiv";
		for(let i=0;i<len;i++){
			dot = document.createElement("div");
			if(i === this.currentImg){
				dot.className = 'dot active';
			}else{
				dot.className = 'dot';
			}
			dotsDiv.appendChild(dot);
		}
		this.oUl.appendChild(dotsDiv);
	},
	slide : function(){
		var _this   = this,
			imgNum  = this.lis.length,
			current = this.currentImg;

		//当鼠标在banner图上的时候，停止自动轮播
		this.oUl.addEventListener("mouseover",function(e){
			clearInterval(_this.timer);
		});
		//当鼠标离开banner图，自动轮播
		this.oUl.addEventListener("mouseout",function(e){
			_this.timer = setInterval(function(){
			if(current === imgNum-1){
				_this.lis[current].style.display ="none";
				_this.lis[0].style.display ="block";
				current = 0;
			}else{
				_this.lis[current].style.display ="none";
				_this.lis[current + 1].style.display ="block";
				current++;
			}
			_this.dots.forEach(function(cur){
				cur.className = "dot";
			});
			_this.dots[current].className = 'dot active';
		},_this.delay*1000);
		})
	}

};

Slide.prototype = toDo;

module.exports=Slide;