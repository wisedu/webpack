/**
 * 编译、打包参数配置
 */
/**
 * 全局参数配置
 */
var path = require('path')

const __DEBUG__ = process.env.NODE_ENV === 'development' // 是否开发模式

const _jsUrl = (base) => {
    return base + (__DEBUG__ ? '.js' : '.min.js')
}

// const FE_BOWER_BASE = 'http://res.wisedu.com/bower_components'
const BOOTCDN_BASE = 'https://cdn.bootcss.com'

module.exports = {
    proxy: { // DEV 模式下访问后端 api 时防止跨域使用的代理
        // '/wec-portal-nk': 'http://172.16.7.75:8000'
    },
    alias: { // 自定义webpack依赖的别名，默认已支持 src/pages/config/node_modules
        'components': 'src/components', // 公共组件
        'api': 'src/config/api', // 定义后端公共接口
        'services': 'src/services', // 公共服务层
        'utils': 'src/utils', // 通用处理模块
        'vuex': 'src/vuex', // 指向负责全局状态管理工具vuex
        'statics': 'src/statics', // 静态文件目录
        'res': 'src/statics/resources', // 静态资源
        'img': 'src/statics/resources/img', // 图片
        'conf': 'src/config' // 各种配置信息
    },
    babelDir: [], // 指定允许使用babel-loader编译的文件目录或路径匹配，默认已支持src
    loaders: [], // 增加其他文件类型的loader，默认已支持 vue
    csslibs: [], // 在index.html中需要引入的 css lib
    jslibs: [ // 在 index.html 中需要引入的 js lib， vue 和 router 必须引入，其余可选
        '//cdn.bootcss.com/vue/1.0.28/vue.min.js',
	{{#i18n}}
        '//cdn.bootcss.com/vue-i18n/4.10.0/vue-i18n.min.js',
	{{/i18n}}
	{{#vuex}}
        '//cdn.bootcss.com/vuex/1.0.1/vuex.min.js',
	{{/vuex}}
        '//cdn.bootcss.com/vue-router/0.7.13/vue-router.min.js',
        '//cdn.bootcss.com/axios/0.15.3/axios.min.js'
    ],
    distDir: path.resolve(__dirname, 'docs') // 执行 build 时发布的路径，可以指定其他路径比如 '../webapp'
}
