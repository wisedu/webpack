# vue-webpack-boilerplate

> webpack + vue + vuex + vue-router + axios 多页/单页启动模板

> 升级到 vue2.0 (webpack2 + vue2 + vuex2 + vue-router2) 请使用[Vue2 快速开发模板](https://github.com/wisedu/webpack/tree/app2)

> 需要默认集成 element-ui(vue2) 请使用[element-ui 快速开发模板](https://github.com/lkiarest/element-ui-startkit)

仅提供模板工程，不做任何多余的事情(The Single Responsibility Principle)

### 安装方式（基于vue-cli）
``` bash
$ npm install -g vue-cli
$ vue init wisedu/webpack my-project
$ cd my-project
$ npm install
$ npm run dev # dev mode
$ npm run build # publish mode
```

### 多语言(optional)

1. 将多语言文件(cn.json , en.json ...) 放在src/config/i18n 目录下，编译工具会自动使用 vue-i18n 将多语言注入到app中。
1. 页面中只要按照 vue-i8n 的[文档](https://github.com/kazupon/vue-i18n) 书写即可

### Vuex (optional)

### 可在一个项目中发布多个独立应用或单个应用

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
