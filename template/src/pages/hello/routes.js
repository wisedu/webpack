/**
 * 页面内路由定义
 */
const main = resolve => require(['./main'], resolve);
const sub = resolve => require(['./sub'], resolve);

export default {
    '/': {
        component: main,
        meta: {title: 'main 首页'}
    },
    'sub': {
        component: sub,
        meta: {title: 'hello 首页 - 子页面'}
    }
};
