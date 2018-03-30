/*
* @Author: cewei
* @Date:   2018-02-09 18:31:37
* @Last Modified by:   cewei
<<<<<<< HEAD
* @Last Modified time: 2018-03-17 13:32:58
=======
* @Last Modified time: 2018-03-13 22:57:13
>>>>>>> 51bdda08f732121b80a1ce865ef378be06f76310
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _xs             = require('util/_xs.js');
var _product        = require('service/product-service.js');
var templateIndex   = require('./index.string');
var Pagination      = require('util/pagination/index.js');

var page = {
    data : {
        listParam : {
            keyword         : _xs.getUrlParam('keyword')    || '',
            categoryId      : _xs.getUrlParam('categoryId') || '',
            orderBy         : _xs.getUrlParam('orderBy')    || 'default',
            pageNum         : _xs.getUrlParam('pageNum')    || 1,
            pageSize        : _xs.getUrlParam('pageSize')   || 20
        }
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadList();
    },
    bindEvent : function(){
        var _this = this;
        // 排序的点击事件
        _xs.eventBind(document,'click','.sort-item',function(){
           _this.data.listParam.pageNum = 1;
            // 点击默认排序
            if(this.dataset['type'] === 'default'){
                // 已经是active样式
                if(this.matches('.active')) {
                    return;
                }
                // 其他
                else{
                    this.className = 'sort-item active';
                    document.querySelectorAll('.sort-item')[1].className = 'sort-item';
                    _this.data.listParam.orderBy = 'default';
                }
            }
            //点击价格排序
            else if(this.dataset['type'] === 'price'){
                // active class 的处理
                document.querySelectorAll('.sort-item')[0].className = 'sort-item';
                // 升序、降序的处理
                if(!this.matches('.asc')){
                    this.className = 'sort-item active asc';
                    _this.data.listParam.orderBy = 'price_asc';
                }else{
                    this.className = 'sort-item active desc';
                    _this.data.listParam.orderBy = 'price_desc';
                    console.log('1')
                }
            }
        // 重新加载列表
            _this.loadList();
        });
    },
    // 加载list数据
    loadList : function(){
        var _this       = this,
            listHtml    = '',
            listParam   = this.data.listParam,
             pListCon    = document.querySelector('.p-list-con');
        pListCon.innerHTML = '<div class="loading"></div>';
//         // 删除参数中不必要的字段
        listParam.categoryId
            ? (delete listParam.keyword) : (delete listParam.categoryId);
//         // 请求接口
        _product.getProductList(listParam, function(res){
            res.data.list.forEach(function(cur,index,arr){
                cur['name'] = cur['name'].replace('【测试学习使用】','');
            });
            listHtml = _xs.renderHtml(templateIndex, {
                list :  res.data.list
            });
            pListCon.innerHTML = listHtml;
            _this.loadPagination({
<<<<<<< HEAD
                hasPreviousPage : res.data.hasPreviousPage,
                prePage         : res.data.prePage,
                hasNextPage     : res.data.hasNextPage,
                nextPage        : res.data.nextPage,
                pageNum         : res.data.pageNum,
                pages           : res.data.pages
=======
                // hasPreviousPage : res.data.hasPreviousPage,
                // prePage         : res.data.prePage,
                // hasNextPage     : res.data.hasNextPage,
                // nextPage        : res.data.nextPage,
                // pageNum         : res.data.pageNum,
                // pages           : res.data.pages
>>>>>>> 51bdda08f732121b80a1ce865ef378be06f76310
            });
        }, function(errMsg){
            _xs.errorTips(errMsg);
        });
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render(Object.assign({}, pageInfo, {
            container : document.querySelector('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
};
page.init();
