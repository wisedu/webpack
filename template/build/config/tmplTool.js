/**
 * 根据 src 中的各应用目录生成 template 文件，供打包使用
 */

require('babel-register')
require('shelljs/global')
var path = require('path')
var fs = require('fs')
var chokidar = require('chokidar')

// 全局打包参数
var globalConf = require('../../build.config.js')
var globalConfPath = path.resolve(__dirname, '../../build.config.js')

// 默认应用目录设置为 pages，目前不能自定义
var appDir = path.resolve(__dirname, '../../src/pages')

// 读取模板文件
var templateHtml = path.resolve(__dirname, '../template', 'index.tpl')
var templateJs = path.resolve(__dirname, '../template', 'index.js')

// 创建临时文件目录
var prepareTmpDir = function() {
    var tmpDir = path.resolve(__dirname, '../tmp')
    try {
        rm('-rf', tmpDir)
        mkdir(tmpDir) // 删除并重新创建临时目录
    } catch (e) {
        console.log(e)
    }

    return tmpDir
}

// 在 pages 目录中读取所有应用
var getAllApps = function() {
    var apps = fs.readdirSync(appDir)
    if (apps.length === 0) {
        throw new Error('no app defined in ./apps/')
    }

    return apps
}

var hasElement = function(arr) { // 判断数组是否不为空
    return arr && arr.length > 0
}

var getVendors = function(pageName) { // 读取页面需要额外加载的第三方库(js/css)
    var jslist = [], csslist = []

    // 先加载全局lib
    if (hasElement(globalConf.jslibs)) {
        jslist = globalConf.jslibs.map(item => `<script src="${item}"></script>`)
    }

    if (hasElement(globalConf.csslibs)) {
        csslist = globalConf.csslibs.map(item => `<link rel="stylesheet" href="${item}">`)
    }

    // 然后加载页面范围的lib
    var confPath = path.resolve(__dirname, `../../src/pages/${pageName}/config.json`)
    if (fs.existsSync(confPath)) {
        var pageConf = fs.readFileSync(confPath, 'utf-8')
        try {
            pageConf = JSON.parse(pageConf)

            if (hasElement(pageConf.jslibs)) {
                jslist = jslist.concat(pageConf.jslibs.map(item => `<script src="${item}"></script>`))
            }

            if (hasElement(pageConf.csslibs)) {
                csslist = csslist.concat(pageConf.csslibs.map(item => `<link rel="stylesheet" href="${item}">`))
            }
        } catch (e) {
            console.error('page config file is invalid:', e)
        }
    }

    return {
        js: jslist.join('\n'),
        css: csslist.join('\n')
    }
}

// 将短横线连接词转换为驼峰
var toCamel = function(word) {
    return word && word.replace(/-(\w)/g, function(a) { return a.charAt(1).toUpperCase() })
}

// 从routes文件中解析出 title
// var getTitle = function(routesContent) {
//     var m = routesContent.match(/title: '(.*?)',/)
//     if (m && m.length === 2) {
//         return m[1]
//     } else {
//         return ''
//     }
// }

// 获取每个 app 的配置
var getPageConf = function(confFile) {
    try {
        var content = fs.readFileSync(confFile, 'utf-8')
        return JSON.parse(content)
    } catch (e) {
        return {'lang': 'cn'}
    }
}

var prepareEntryFiles = function(app) {
    // 读取模板文件
    var tmpIndexHtml = fs.readFileSync(templateHtml, 'utf-8')
    var tmpIndexJs = fs.readFileSync(templateJs, 'utf-8')

    // var title = getTitle(fs.readFileSync(path.resolve(appDir, app, 'routes.js'), 'utf-8'))
    var pageConfig = getPageConf(path.resolve(appDir, app, 'config.json'))
    var pageLang = pageConfig.lang

    var tmpDir = prepareTmpDir() // 重建临时目录
    var tmpAppDir = path.resolve(tmpDir, app)
    var vendors = getVendors(app)

    try {
        console.log(tmpAppDir + ':' + fs.existsSync(tmpAppDir))
        if (!fs.existsSync(tmpAppDir)) {
            fs.mkdirSync(tmpAppDir)
        }
    } catch (e) {
        console.log(e)
    }

    var htmlContent = tmpIndexHtml /* .replace('[WIN_TITLE]', title || app) */
        .replace('[CSS_LIBS]', vendors.css) // 插入自定义 css
        .replace('[JS_LIBS]', vendors.js) // 插入自定义 js
    var entryName = toCamel(app)
    var jsContent = tmpIndexJs.replace(/\[PAGE_NAME\]/g, app)
        .replace(/\[ENTRY_NAME\]/g, entryName)
        .replace('[LANG_NAME]', pageLang)

    fs.writeFileSync(path.resolve(tmpAppDir, 'index.html'), htmlContent, 'utf-8')
    fs.writeFileSync(path.resolve(tmpAppDir, 'index.js'), jsContent, 'utf-8')
}

/**
 * 生成所有 app 的模板文件，并返回 app 入口供 webpack 打包使用
 */
var makeAll = function() {
    var entries = {}
    var buildConf = {}

    var apps = getAllApps()
    if (apps.length > 1) {
        apps.forEach(app => {
            prepareEntryFiles(app)
            entries[app] = `./build/tmp/${app}/index.js`
            buildConf[app] = `./${app}/index.html`
        })
    } else { // 若只有一个 app，则直接打包到根目录，不需要用子目录来区分
        var app = apps[0]
        prepareEntryFiles(app)
        entries[app] = `./build/tmp/${app}/index.js`
        buildConf[app] = path.resolve(globalConf.distDir, 'index.html')
    }

    return {
        entries: entries,
        buildConf: buildConf
    }
}

var makeTmpl = function() {
    // watchTmpl()
    return makeAll()
}

/*
var watchTmpl = function() {
    var watcher = chokidar.watch([globalConfPath, templateHtml, templateJs])
    watcher.on('change', makeAll)
}
*/

module.exports = {
    make: makeTmpl
}
