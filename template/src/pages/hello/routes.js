/**
 * 页面内路由定义
 */
// const hello = resolve => require(['./hello'], resolve);
const sub = resolve => require(['./sub'], resolve);

export default {
    'sub': {
        component: sub
    }
};
