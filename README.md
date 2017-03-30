# vue-webpack-boilerplate

基于[element组件库](http://element.eleme.io)

> webpack + vue2 + vuex2 + vue-router2 + axios + element 多页/单页启动模板

仅提供模板工程，不做任何多余的事情(The Single Responsibility Principle)

### install（vue-cli）
``` bash
$ npm install -g vue-cli
$ vue init lkiarest/webpack#element my-project
$ cd my-project
$ npm install
$ npm run dev # dev mode
$ npm run build # publish mode
```

### i18n (optional)

1. 将多语言文件(cn.json , en.json ...) 放在src/config/i18n 目录下，编译工具会使用 vue-i18n 将多语言注入到app中。
1. 页面按照 vue-i8n 的[文档](https://github.com/kazupon/vue-i18n) 书写即可

### Vuex (optional)

### develop one or more apps in one project

1. src/pages 目录下包含多个应用(hello1, hello2)

    打包后会在dist中生成多个独立的app发布目录，使用app名称区分。

    ```
    // 开发模式
    npm run dev
    // 发布模式
    npm run build
    ./startup.bat #启动http server
    // 访问 http://localhost:3000/hello1/index.html
    // 访问 http://localhost:3000/hello2/index.html
    ```

1. src/pages 目录下包含单个应用(hello1)

    打包后会在dist中生成独立的发布目录，直接放在根目录下。
    ```
    // 开发模式
    npm run dev
    // 发布模式
    npm run build
    ./startup.bat #启动http server
    // 访问 http://localhost:3000/index.html
    ```
### structure
```
.
├── build                         # webpack config files (not suggest to modify build files)
│   ├── template/                 # template of index and router settings
|   └── config/                   # build configurations
|
├── src/
│   ├── components/               # reusable components (optional)
│   │   └── ...
│   ├── config/                   # global configurations like i18n, APIs etc
│   │   └── ...
│   ├── pages/                    # the location of all SPA apps
│   │   ├── app1                  # app1 will be built as a single app
|   |   |    ├── routes.js        # vue-router config for app1
|   |   |    ├── config.json      # app config(optional) will overwrite settings in build.config.js
|   |   |    └── ...
│   │   └── app2                  # another SPA app
│   │        └── ...
│   ├── services                  # services (optional)
│   │   └── ...
│   ├── statics                   # pure static assets (directly copied)
│   │   └── ...
│   └── vuex/                     # Vuex store file (optional)
│       └── ...
│
├── .babelrc                      # babel config
├── .editorconfig                 # editor config
├── .eslintrc.js                  # eslint config
├── build.config.js               # global build config like external js/css libs, alias etc
├── server.js                     # a simple server to check result of `npm run build`, start with `node server.js`
└── package.json                  # build scripts and dependencies

```
