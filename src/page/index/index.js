/*
* @Author: cewei
* @Date:   2018-02-09 16:33:52
* @Last Modified by:   cewei
* @Last Modified time: 2018-05-08 13:00:09
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var banner  = require("page/common/banner/index.js");

(function(){
	var slide = new banner({
		autoPlay : true,
		delay    : 3
	});
	slide.init()
})();