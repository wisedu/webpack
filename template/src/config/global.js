/**
 * 全局参数配置
 */
const RES_HOST = 'http://res.wisedu.com';
const BOWER_BASE = `${RES_HOST}/bower_components`;
const FE_BASE = `${RES_HOST}/fe_components`;
const VER = '100003';

const _feLib = path => {
    return `${FE_BASE}/${path}?rv=${VER}`;
};

const _bowerLib = path => {
    return `${BOWER_BASE}/${path}?rv=${VER}`;
};

const BOWER_JS_LIBS = [
    'vue/dist/vue.min.js',
    'vue-i18n/vue-i18n.min.js',
    'vuex/dist/vuex.min.js',
    'vue-resource/vue-resource.min.js',
    'vue-router/dist/vue-router.min.js',
    'jquery/dist/jquery.min.js',
    'jquery.nicescroll/jquery.nicescroll.min.js',
    'moment/min/moment-with-locales.min.js'
];

const FE_JS_LIBS = [
    'bh_utils.js',
    'emap-1.2.min.js',
    'jqwidget/globalize.js',
    'jqwidget/jqxwidget.min.js',
    'bh-1.2.min.js',
    'mock/getmock.js'
];

const FE_CSS_LIBS = [
    'iconfont/iconfont.css',
    'jqwidget/blue/bh-1.2.min.css',
    'jqwidget/blue/bh-scenes-1.2.min.css'
];

module.exports = {
    proxy: { // DEV 模式下访问后端 api 时防止跨域使用的代理
        "/wec-smmp-app": "http://wecloud.wisedu.com/wec-smmp-app"
    },
    alias: { // 自定义webpack依赖的别名，默认已支持 src/pages/config/node_modules
        'components': 'src/components', // 公共组件
        'api': 'src/config/api', // 定义后端公共接口
        'services': 'src/services', // 公共服务层
        'bh-vue': 'node_modules/bh-vue/dist', // bh-vue 基础组件库
        'wec-vue': 'node_modules/wec-vue', // wec-vue (公有云业务)组件库
        'vuex': 'src/vuex', // 指向负责全局状态管理工具vuex
        'statics': 'src/statics', // 静态文件目录
        'res': 'src/statics/resources', // 静态资源
        'img': 'src/statics/resources/img' // 图片
    },
    babelDir: [/bh-vue/, /wec-vue/], // 指定允许使用babel-loader编译的文件目录或路径匹配，默认已支持src
    loaders: [], // 增加其他文件类型的loader，默认已支持 vue
    csslibs: FE_CSS_LIBS.map(item => _feLib(item)),
    jslibs: BOWER_JS_LIBS.map(item => _bowerLib(item)).concat(FE_JS_LIBS.map(item => _feLib(item)))
};
