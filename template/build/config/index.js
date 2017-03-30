/**
 * 准备环境并使用 webpack 打包
 */

var globalConf = require('../../build.config.js') // 全局参数
var proxyTable = globalConf.proxy || {} // 代理设置

// 创建模板文件
var tmplTool = require('./tmplTool')
var apps = tmplTool.make()

// 创建多语言文件
var localeTool = require('./localeTool')
localeTool.make()

var buildConf = {
    'env': require('./prod.env'),
    'assetsRoot': globalConf.distDir, // 打包发布路径
    'assetsSubDirectory': '',
    'assetsPublicPath': '',
    'productionSourceMap': true,
    'productionGzip': false,
    'productionGzipExtensions': ['js', 'css']
}

module.exports = {
    // 可以在此处指定多个入口文件
    entry: apps.entries,
    build: Object.assign(buildConf, apps.buildConf),
    dev: {
        'env': require('./dev.env'),
        'port': 3000,
        'assetsSubDirectory': '',
        'assetsPublicPath': '/',
        'proxyTable': proxyTable,
        'cssSourceMap': false
    }
}
