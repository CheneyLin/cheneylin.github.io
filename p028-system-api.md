---
layout: page
title: 【028】系统设计：接口
tagline: Project No.028
project: 028
---
{% include JB/setup %}
##规范

接口统一返回json格式数据

    //返回正常
    {
      "status":0,
      "info":"server is running."
    }
    //返回错误
    {
      "status":-1,
      "info":"server is not running."
    }

##接口路径

* 开发接口：http://xxx.xxx.xxx.xxx/dev/api/
* 测试接口：http://xxx.xxx.xxx.xxx/test/api/
* 线上接口：http://xxx.xxx.xxx.xxx/v1/api/

##接口列表

###login.php：用户登录

输入

    {
      "username":"13900000000",
      "password":"098f6bcd4621d373cade4e832627b4f6",
      "device":"e57b9648d9f0ca9620eff0fa42162273"
    }

输出

    //登录成功
    {
      "status":0,
      "info":"登录成功",
      "userid":1,
      "username":"13900000000",
      "unique_code":"098f6bcd4621d373cade4e832627b4f6"
    }
    //登录失败
    {
      "status":-1,
      "info":"登录失败"
    }

###register.php：用户注册

输入

    {
      "username":"13900000000",
      "password":"098f6bcd4621d373cade4e832627b4f6",
      "device":"e57b9648d9f0ca9620eff0fa42162273"
    }

输出

    //注册成功
    {
      "status":0,
      "info":"注册成功",
      "userid":1,
      "username":"13900000000",
      "unique_code":"098f6bcd4621d373cade4e832627b4f6"
    }
    //注册失败
    {
      "status":-1,
      "info":"注册失败"
    }

###user_info.php：用户信息

输入

    {
      "username":"13900000000",
      "unique_code":"098f6bcd4621d373cade4e832627b4f6"
    }

输出

    //成功
    {
      "status":0,
      "info":"ok",
      "userid":1,
      "username":"13900000000",
      "usericon":"http://xx.xxx.xxx.xxx/images/xx.png"
    }
    //失败
    {
      "status":-1,
      "info":"失败"
    }


###user_update_icon.php：用户修改头像

输入

    {
      "username":"13900000000",
      "unique_code":"098f6bcd4621d373cade4e832627b4f6"
      "image":"文件流"
    }

输出

    //成功
    {
      "status":0,
      "info":"ok",
      "usericon":"http://xx.xxx.xxx.xxx/images/xx.png"
    }
    //失败
    {
      "status":-1,
      "info":"失败"
    }


###user_update_password.php：用户修改密码

输入

    {
      "username":"13900000000",
      "unique_code":"098f6bcd4621d373cade4e832627b4f6",
      "password":"098f6bcd4621d373cade4e832627b4f6",
      "newpassword":"098f6bcd4621d373cade4e832627b4f6"
    }

输出

    //成功
    {
      "status":0,
      "info":"ok"
    }
    //失败
    {
      "status":-1,
      "info":"失败"
    }
