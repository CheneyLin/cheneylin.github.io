---
layout: post
category : web
title: 给你的网站增加免费HTTPS证书（SSL+WINDOWS+IIS）
description: 阿里云居然有免费的SSL证书
keyword: 麒麟工作室,林长宇,HTTPS,WINDOWS,SSL,ALIYUN
tagline: 【日志】
tags : [Web, Https,Aliyun,Windows,IIS]
postid: 22
headimage : /images/2019/safety-2659095_1280.jpg
---

# 问题

升级我的网站到HTTPS，来支持浏览器安全认证和支持微信小程序API开发等

# Step 1

登录你的阿里云控制台
（不要问我从哪里进，不知道的先去[注册阿里云](https://promotion.aliyun.com/ntms/act/ambassador/sharetouser.html?userCode=smatfm0j&utm_source=smatfm0j)）

 * 选择产品与服务 - 安全（云盾） - SSL证书(应用安全)
 * 在选择购买界面 - 选择免费型DV SSL


![阿里去选择购买](/images/aliyunssl.png "注意选择免费的那一项")


```
每个帐号只能购买20个，免费的不支持泛域名，只能指定支持的完整明细域名
```
# Step 2

购买完成后在已购产品里申请新证书

 * 根据要求配置DNS
 * 在阿里云后台申请新证书

![请求](/images/ssllist.png "SSL产品列表")

# Step 3

申请成功即可在后台下载一个ZIP

![下载](/images/ssldownload.png "SSL证书下载")

# Step 4

导入证书到服务器


![导入](/images/sslimport.png "SSL证书导入")

# Step 5

指定（修改）IIS中站点的证书

 * 指定端口为443
 * 重启IIS

![修改](/images/sslconfig.png "SSL证书修改")

# 参考

  1. [Windows IIS 安装SSL证书](https://help.aliyun.com/knowledge_detail/95502.html?spm=5176.2020520163.cas.36.4f574MYv4MYvfJ)
