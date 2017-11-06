## 1 数据库设计

![](ER.png)

## 2 接口规范

### 2.1 用户注册

- URL 和 请求方式

> http://localhost:7000/sign-up POST

- 请求参数

|参数|类型|说明|
|:----- |:-------|:----- |
|username |string |用户名 |
|email |string |邮箱 |
|password |string |密码 |
|team |string |团队名 |

- 返回字段

|返回字段|字段类型|说明 |
|:----- |:------|:----------------------------- |
|status | int |返回结果状态。0：正常；1：错误。 |
|content | string |错误内容。"email-existed" |

- 接口示例

```
地址：http://localhost:7000/sign-up
请求参数：
{
    "username": "guanpeng",
    "email": "875499765@qq.com",
    "password": "123456",
    "team": "UCAS"
}
返回字段：
{
    "state": 1，
	"content": "email-existed"
}
```

### 2.2 用户登陆

- URL 和 请求方式

> http://localhost:7000/sign-in POST

- 请求参数

|参数|类型|说明|
|:----- |:-------|:----- |
|email |string |邮箱 |
|password |string |密码 |

- 返回字段

|返回字段|字段类型|说明 |
|:----- |:------|:----------------------------- |
|status | int |返回结果状态。0：成功；1：失败。 |
|content | string |错误内容。"email-pwd-error" |

- 接口示例

```
地址：http://localhost:7000/sign-in
请求参数：
请求参数：
{
    "email": "875499765@qq.com",
    "password": "123456"
}
返回字段：
{
    "state": 1,
	"content": "email-pwd-error"
}
```