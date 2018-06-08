/*
 * @Author: cewei
 * @Date:   2018-02-09 16:33:52
 * @Last Modified by:   cewei
 * @Last Modified time: 2018-06-05 20:22:26
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var banner = require("page/common/banner/index.js");

(function() {
	var slide = new banner();
	slide.init()
})();