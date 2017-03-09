/**
 * 全局参数配置
 */
const MIN_JS = true; // 是否使用压缩版本的 js 库

const _jsUrl = (base) => {
    return base + (MIN_JS ? '.min.js' : '.js');
};

module.exports = {
    proxy: { // DEV 模式下访问后端 api 时防止跨域使用的代理
        "/wec-smmp-app": "http://wecloud.wisedu.com/wec-smmp-app"
    },
    alias: { // 自定义webpack依赖的别名，默认已支持 src/pages/config/node_modules
        'components': 'src/components', // 公共组件
        'api': 'src/config/api', // 定义后端公共接口
        'services': 'src/services', // 公共服务层
        'vuex': 'src/vuex', // 指向负责全局状态管理工具vuex
        'statics': 'src/statics', // 静态文件目录
        'res': 'src/statics/resources', // 静态资源
        'img': 'src/statics/resources/img' // 图片
    },
    babelDir: [], // 指定允许使用babel-loader编译的文件目录或路径匹配，默认已支持src
    loaders: [], // 增加其他文件类型的loader，默认已支持 vue
    csslibs: [
        '//cdn.bootcss.com/normalize/5.0.0/normalize.min.css',
        'https://unpkg.com/element-ui@1.0.0-rc.9/lib/theme-default/index.css'
    ], // 在index.html中需要引入的 css lib
    jslibs: [ // 在 index.html 中需要引入的 js lib， vue 和 router 必须引入，其余可选
        _jsUrl('https://unpkg.com/vue@2.2.2/dist/vue'),
         _jsUrl('https://unpkg.com/vue-router@2.3.0/dist/vue-router'),
         _jsUrl('https://unpkg.com/vue-i18n@5.0.3/dist/vue-i18n'),
         _jsUrl('https://unpkg.com/vuex@2.2.1/dist/vuex'),
         _jsUrl('https://unpkg.com/axios@0.15.3/dist/axios'),
         'https://unpkg.com/element-ui@1.2.4/lib/index.js'
    ]
}
