---
layout: post
category : device
title: 小米路由器MT工具箱修复
description: Misstar Tools还蛮有用的
keyword: 麒麟工作室,林长宇
tagline: 【日志】
tags : [device]
postid: 23
headimage : https://cdn.pixabay.com/photo/2017/05/10/12/41/hacker-2300772_960_720.jpg
---

# 问题

小米路由器软固件升级后，进入MT工具箱的设置页面时出错

```
No page is registered at '/web/misstar/index' .

If this url belongs to an extension, make sure it is properly installed.

If the extension was recently installed, try removing the /tmp/luci-indexcache file.
```

# 重写插件路由代码


* 登录路由器
```
SSH root@192.168.31.1
```
输入口令，需要路由器安装开发版ROM，启用终端功能

* 编辑路由文件
```
vi /usr/lib/lua/luci/controller/web/index2.lua
```
* 粘贴如下内容
```
module("luci.controller.web.index2", package.seeall)
  function index()      
    local page   = node("web","misstar")          
    page.target  = firstchild()         
    page.title   = ("")          
    page.order   = 100          
    page.sysauth = "admin"          
    page.sysauth_authenticator = "jsonauth"          
    page.index = true          
    entry({"web", "misstar", "index"}, template("web/setting/misstar/index"), _("Tools"), 81)          
    entry({"web", "misstar", "add"}, template("web/setting/misstar/add"), _("Tools"), 82)          
    entry({"web", "misstar"}, alias("web","misstar","index"), _("Tools"), 80)          
    entry({"web", "misstar", "ss"}, template("web/setting/applications/ss/html/ss"), _("Tools"), 85)          
    entry({"web", "misstar","frp"}, template("web/setting/applications/frp/html/frp"), _("Tools"), 85)          
    entry({"web", "misstar","aliddns"}, template("web/setting/applications/aliddns/html/aliddns"), _("Tools"), 85)  
    entry({"web", "misstar","adm"}, template("web/setting/applications/adm/html/adm"), _("Tools"), 85)    
    entry({"web", "misstar","koolproxy"}, template("web/setting/applications/koolproxy/html/koolproxy"), _("Tools"), 85)
    entry({"web", "misstar","rm"}, template("web/setting/applications/rm/html/rm"), _("Tools"), 85)
    entry({"web", "misstar","aria2"}, template("web/setting/applications/aria2/html/aria2"), _("Tools"), 85)
    entry({"web", "misstar","webshell"}, template("web/setting/applications/webshell/html/webshell"), _("Tools"), 85)
    entry({"web", "misstar","pptpd"}, template("web/setting/applications/pptpd/html/pptpd"), _("Tools"), 85)  
    entry({"web", "misstar","ftp"}, template("web/setting/applications/ftp/html/ftp"), _("Tools"), 85)
    entry({"web", "misstar","kms"}, template("web/setting/applications/kms/html/kms"), _("Tools"), 85)  
end
```

* Vi 操作
```
> i
> Command + v
> ESC
> :wq
```
* 清理路由文件缓存
```
rm -rf /tmp/luci-indexcache
```


# 参考

  1. [小米路由器r2d MT工具箱打不开的解决办法](https://sixu.life/mi-router-r2d-misstar-tools.html)
