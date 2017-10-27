## 简介

- 根据 SQL 语句进行数据库操作
- 运行后初始化 MySQL 表
- 基于 Flask 框架对外提供 api ，包括 GET 和 POST 方法，通过 JSON 进行交互
- 支持跨域

## 环境

- Python 3.6.1
- MySQL 5.6.11

## 目录结构

```
├── README.md                   // help
├── run.py                      // web入口
├── requirements.txt            // python相关依赖
├── app                         // 页面模板
│   ├── __init__.py             // 构建数据库、运行web服务、构建蓝图
│   ├── common.py               // 频繁使用的函数
│   ├── config.py               // 相关配置
│   └── model.py                // 建表SQL
├── api                         // 提供接口api
│   ├── __init__.py             
│   ├── info.py                 
│   └── user.py                 
└── .vscode                     // python调试
```

## 部署

```
MySQL中建立plate库

//安装依赖包
pip install -r requirements.txt

python run.py

//导出requirements.txt
pipreqs --encoding=utf8 --force .
```

## 参考资料

- [Flask](http://docs.jinkan.org/docs/flask/)
- [MySQLdb](http://www.lijiejie.com/python-mysqldb-api-doc/)
- [Blueprint](http://python.usyiyi.cn/documents/flask_011_ch/blueprints.html)
- [__ init __ jb51](http://www.jb51.net/article/87080.htm)，[__ init __ 知乎](https://www.zhihu.com/question/28688151)
- [Flask-CORS](https://codinglonglong.github.io/posts/flask-corsjie-jue-ajaxkua-yu-qing-qiu-wen-ti/)