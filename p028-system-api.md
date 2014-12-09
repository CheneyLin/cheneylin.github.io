---
layout: page
title: 【028】系统设计：接口
tagline: Project No.028
project: 028
---
{% include JB/setup %}
##规范

接口统一返回json格式数据

###返回正常

    {"status":0,"info":"server is running."}

###返回错误

    {"status":-1,"info":"server is not running."}

##接口路径

* 开发接口：http://xxx.xxx.xxx.xxx/dev/api/
* 测试接口：http://xxx.xxx.xxx.xxx/test/api/
* 线上接口：http://xxx.xxx.xxx.xxx/v1/api/

##接口列表

###login.php

输入格式

    {"username":"test","password":"098f6bcd4621d373cade4e832627b4f6","device":"e57b9648d9f0ca9620eff0fa42162273"}

输入出格式

    {"status":0,"info":"\u767b\u5f55\u6210\u529f","userid":2,"username":"test","unique_code":"098f6bcd4621d373cade4e832627b4f6"}
