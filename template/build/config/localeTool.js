var path = require('path')
var fs = require('fs')
var chokidar = require('chokidar')

var localeDir = path.resolve(__dirname, '../../src/config/i18n')
var distFile = path.resolve(__dirname, '../tmp/i18n.json')

/**
 * 查找所有的多语言文件
 */
var findLangs = function(dir) {
    if (!fs.existsSync(dir)) {
        return null
    }

    var dirs = fs.readdirSync(dir)
    if (!dirs || dirs.length === 0) {
        return null
    }

    return dirs.filter(function(fileName) {
        return /\.json/.test(fileName)
    }).map(function(fileName) {
        return path.resolve(localeDir, fileName)
    })
}

/**
 * 合并多语言文件到 locales.json
 */
var mergeLangs = function(files) {
    if (!files || files.length === 0) {
        return {cn: {}}
    }

    return files.reduce(function(ret, item) {
        var reg = /(\w+)\.json$/
        var m = item.match(reg)
        if (m && m.length === 2) {
            var langName = m[1]
            var content = fs.readFileSync(item, 'utf-8')
            ret[langName] = JSON.parse(content)
        }

        return ret
    }, {})
}

var makeAll = function() {
    var langFiles = findLangs(localeDir)
    var merged = mergeLangs(langFiles)
    fs.writeFileSync(distFile, JSON.stringify(merged), 'utf-8')

    console.log('make i18n file successfully !')

    return langFiles
}

module.exports = {
    make: function() {
        var langFiles = makeAll()
        // 监听多语言文件发送变化重新则重新打包 i18n 文件
        // TODO：目前新增多语言文件不会触发变化
        var watcher = chokidar.watch(langFiles)
        watcher.on('change', makeAll)
    }
}
