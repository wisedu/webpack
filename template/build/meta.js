/* eslint-disable */
require('shelljs/global');

var path = require('path');
var fetcher = require('fetch-remote-dir');
var globalConf = require('../build.config.js'); // 全局参数

var getMeta = function() {
    if (!globalConf.meta || !globalConf.meta.url) {
        console.error('未配置远程 meta 服务器地址');
        return;
    }

    rm('-rf', path.resolve(globalConf.meta.dir));

    fetcher.run({
        remote: globalConf.meta.url,
        selector: 'file > anchor > selector',
        target: globalConf.meta.dir
    });
};

getMeta();
