/**
 * 页面内路由定义
 */
const hello = resolve => require(['./hello'], resolve);
const sub = resolve => require(['./sub'], resolve);

export default {
    '/': {
        component: hello,
        meta: {title: 'hello 首页'}
    },
    'sub': {
        component: sub,
        meta: {title: 'hello 首页 - 子页面'}
    }
};
