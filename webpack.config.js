const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WEBPACK_ENV = process.env.WEBPACK_ENV;

function getHtmlPlugin(name, title) {
    return (new HtmlWebpackPlugin({
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        favicon: './favicon.ico',
        title: title,
        hash: true,
        inject: 'body',
        chunks: ['common', name]
    }))
};


const config = {
    mode:WEBPACK_ENV ? 'production' : 'development',
    entry: {
        'index': ['./src/page/index/index.js'],
        'common': ['./src/page/common/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-center': ['./src/page/user-center/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'],
        'user-center-update': ['./src/page/user-center-update/index.js'],
        'result': ['./src/page/result/index.js'],
        'list': ['./src/page/list/index.js'],
        'detail': ['./src/page/detail/index.js'],
        'cart': ['./src/page/cart/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'payment': ['./src/page/payment/index.js'],
        'about': ['./src/page/about/index.js']
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: WEBPACK_ENV ? '//s.dongcewei.com/XShop/dist/':'/dist/',
        // publicPath: '/dist/',
        filename: 'js/[name].js'
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use : [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader : 'url-loader',
                        options:{
                            limit:100,
                            name:'resource/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.string$/,
                use: ["html-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        }),
        //单独打包html
        getHtmlPlugin('index', "首页"),
        getHtmlPlugin('user-login', "用户登录"),
        getHtmlPlugin('user-register', "用户注册"),
        getHtmlPlugin('result', "操作结果"),
        getHtmlPlugin('user-pass-reset', "找回密码"),
        getHtmlPlugin('user-center', "个人中心"),
        getHtmlPlugin('user-pass-update', "修改密码"),
        getHtmlPlugin('user-center-update', "修改个人信息"),
        getHtmlPlugin('list', "商品列表"),
        getHtmlPlugin('detail', "商品详情"),
        getHtmlPlugin('cart', "我的购物车"),
        getHtmlPlugin('order-confirm', "订单确认"),
        getHtmlPlugin('order-list', "我的订单"),
        getHtmlPlugin('order-detail', "订单详情"),
        getHtmlPlugin('payment', "订单支付"),
        getHtmlPlugin('about', "关于我们")
    ],
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            page: __dirname + '/src/page',
            image: __dirname + '/src/image',
            service: __dirname + '/src/service',
            util: __dirname + '/src/util',
            view: __dirname + '/src/view'
        }
    },
    optimization:{
        splitChunks:{
            cacheGroups:{
                common:{
                    minSize:0,
                    minChunks:2,
                    chunks:'initial'
                }
            }
        }
    },
    devServer:{
        port:'8000',
        disableHostCheck: true,
        host:"0.0.0.0",
        proxy:{
            '**':{
                target:'http://www.dongcewei.com',
                changeOrigin:true 
            }
           
        }
    }
}

module.exports = config;