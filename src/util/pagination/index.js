/*
* @Author: Rosen
* @Date:   2017-05-28 11:58:08
* @Last Modified by:   cewei
* @Last Modified time: 2018-03-13 23:13:50
*/

'use strict';
require('./index.css');
var _xs                 = require('util/_xs.js');
var templatePagination  = require('./index.string');

function Pagination(){
    var _this = this;
    this.defaultOption = {
        container       : null,
        pageNum         : 1,
        pageRange       : 3,
        onSelectPage    : null
    };
    // 事件的处理
    _xs.eventBind(document,'click','.pg-item',function(){
        if(this.matches('.active') || this.matches('.disabled')){
            return;
        }
        typeof _this.option.onSelectPage === 'function' 
            ? _this.option.onSelectPage(this.dataset.value) : null;
    })
};
// 渲染分页组件
Pagination.prototype.render = function(userOption){
    // 合并选项
    this.option = Object.assign({}, this.defaultOption, userOption);
    
    // 判断是否只有1页
    if(this.option.pages <= 1){
        return;
    }
    // 渲染分页内容
    this.option.container.innerHTML=this.getPaginationHtml();
};
// 获取分页的html, |上一页| 2 3 4 =5= 6 7 8|下一页|  5/9
Pagination.prototype.getPaginationHtml = function(){
    var html        = '',
        option      = this.option,
        pageArray   = [],
        start       = option.pageNum - option.pageRange > 0 
            ? option.pageNum - option.pageRange : 1,
        end         = option.pageNum + option.pageRange < option.pages
            ? option.pageNum + option.pageRange : option.pages;
    // 上一页按钮的数据
    pageArray.push({
        name : '上一页',
        value : this.option.prePage,
        disabled : !this.option.hasPreviousPage
    });
    // 数字按钮的处理
    for(var i = start; i <= end; i++){
        pageArray.push({
            name : i,
            value : i,
            active : (i === option.pageNum)
        });
    };
    // 下一页按钮的数据
    pageArray.push({
        name : '下一页',
        value : this.option.nextPage,
        disabled : !this.option.hasNextPage
    });
    html = _xs.renderHtml(templatePagination, {
        pageArray   : pageArray,
        pageNum     : option.pageNum,
        pages       : option.pages
    });
    return html;
};

module.exports = Pagination;