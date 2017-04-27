import router from 'router';

// 多语言支持
import langs from '../i18n.json';
import index from 'src/pages/[PAGE_NAME]/[ENTRY_NAME]';

const locale = '[LANG_NAME]'; // 页面多语言定义
Vue.config.lang = locale;
Object.keys(langs).forEach(function (lang) {
    Vue.locale(lang, langs[lang]);
});

// 启用 vue 开发者工具
if (process.env.NODE_ENV === 'development') {
    Vue.config.devtools = true;
}

/* [IMPORT_ROUTER] */
router.start(index, '#app');
