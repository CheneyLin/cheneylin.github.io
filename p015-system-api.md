---
layout: page
title: 【015】系统设计：接口
tagline: Project No.015
project: 015
---
{% include JB/setup %}
##规范

接口统一返回jsonp格式数据

    //返回正常
    callback({
      "status":0,
      "name":"login",
      "data":"server is running."
      });
    //返回错误
    callback({
      "status":-1,
      "name":"login",
      "data":"server is running."
      });
    //返回数据
    callback({
      "status":0,
      "name":"userinfo",
      "data":[{
        "username": "vip",
        "userlevel": 5
        }]
      });

##接口路径

* 接口：?a=Login&p=ProjectID

##接口列表

###info

输入

    {
      "p": 1
    }

输出

    //登录成功
    {
      "status":0,
      "name":"login",
      "data":[{
        "optionname": "Happy New Year",
        "optionIntro": "",
        "data1": 1,
        "data2": 1,
        "data3": 1
        }
        ,{
        "optionname": "Happy New Year",
        "optionIntro": "",
        "data1": 1,
        "data2": 1,
        "data3": 1
        }
        ,{
        "optionname": "Happy New Year",
        "optionIntro": "",
        "data1": 1,
        "data2": 1,
        "data3": 1
        }]
    }
    //登录失败
    {
      "status":-1,
      "name":"login",
      "data":"server error."
    }

###login

输入

    {
      "p": 1,
      "username":"lin",
      "userphone":"13888888888"
    }

输出

    //登录成功
    {
      "status":0,
      "name":"login",
      "data":"sessionid"
    }
    //登录失败
    {
      "status":-1,
      "name":"login",
      "data":"server error."
    }

###vote

输入

    {
      "p": 1,
      "sessionid":"sessionid",
      "options":"1,2"
    }

输出

    //成功
    {
      "status":0,
      "name":"vote",
      "data":[{
        "logstatus": 1,
        "logdata1": 1,
        "logdata2": 1
        }]
    }
    //失败
    {
      "status":-1,
      "name":"vote",
      "data":"server error."
    }

###lottery

输入

    {
      "p": 1,
      "sessionid":"sessionid"
    }

输出

    //成功
    {
      "status":0,
      "name":"lottery",
      "data":[{
        "logstatus": 1,
        "logdata1": 1,
        "logdata2": 1
        }]
      }
      //失败
      {
        "status":-1,
        "name":"lottery",
        "data":"server error."
      }
