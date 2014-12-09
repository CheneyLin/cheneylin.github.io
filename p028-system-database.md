---
layout: page
title: 【028】系统设计：数据库
tagline: Project No.028
project: 028
---
{% include JB/setup %}
##规范

###命名

命名采用小写加下划线格式。

* 表名：app_userinfo
* 字段：user_level

###其他

字符集：utf-8

##表定义

###userinfo

用户表

CREATE TABLE `userinfo` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL COMMENT 'MD5 encode',
  `device_no` varchar(255) DEFAULT NULL,
  `status` enum('NO','YES') DEFAULT NULL,
  `register_time` int(10) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_num` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';
