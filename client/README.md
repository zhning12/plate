# 简介

- 基于express和grunt的前后端分离框架
- 所有静态资源基于grunt md5压缩打包,css,js,img,html
- 模板引擎使用的是nunjucks，好处是可以实现模版继承，又不像jade一样把html标签都简化了
- 项目中app为原代码文件（开发用），dist为打包后的文件（用于线上），支持一键cdn部署，加速你的项目
- express提供路由服务，项目启动时，修改任何express代码，可以实现自动重启--基于nodemon

## 环境

- Node.js 8.9.0

## 目录结构

```
├── README.md                   // help
├── app.js                      // web入口
├── Gruntfile.js                // Grunt配置文件
├── routes    
│   └── web                    
│       └── site.js             // 路由配置
├── app                         // 提供接口api
│   ├── static                  // 静态文件
│   ├── views                   // html视图文件
│   └── favicon.ico             // 浏览器图标                
└── config                      // Grunt和web服务配置文件
```

## 部署:

clone 代码

启动命令行:

如果没有安装grunt，请先全局安装grunt
```bash
$ npm install grunt-cli -g
```

全局安装better-npm-run
```bash
$ npm install better-npm-run -g
$ npm install -g browser-sync
```

安装npm包(可能需要一段时间，请耐心等待)

```bash
$ npm install
```

开发模式(可以打开浏览器localhost:3001开始开发，端口配置文件里可以更改)

```bash
$ grunt
```

打包并运行打包后的代码

```bash
$ grunt build
$ npm run prod
```
打包成CDN模式(config/config.js中可配置cdn路径)

```bash
$ grunt buildCdn
```

browserSync(可以实现更改静态资源自动刷新了)

```bash
$ grunt serve
```

浏览器输入localhost:3001,你就可以看到漂亮的页面了

打包命令 grunt build  会生成dist文件夹，里面可以看到js、css都加了md5缀

## 参考资料

- [Numjuck](https://mozilla.github.io/nunjucks/cn/templating.html)
- [Material Design Lite](https://getmdl.io/)