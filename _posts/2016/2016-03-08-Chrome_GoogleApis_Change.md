---
layout: post
category : google
title: 开发谷歌Chrome扩展实现访问googleapis公用库
description: 调用googleapis的js失败怎么办
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇,谷歌浏览器,googleapis
tagline: 【扩展】
tags : [chrome, googleapis, cdnjs]
postid: 16
headimage: https://cdn.pixabay.com/photo/2016/06/03/12/37/internet-search-engine-1433323_1280.jpg
---

访问国外很多网站时，发现调用googleapis的js失败，只能自己想办法解决。

网上有用Chrome扩展解决这个问题的例子，自己研究了一下，分享给大家：

crx下载：[extension.crx](https://github.com/CheneyLin/ChromeGoogleApiChange/blob/master/extension.crx?raw=true)

需要打开Chrome的扩展设置页，将crx文件拖入安装。


使用了Chrome的内部对象：

chrome.webRequest.onBeforeRequest.addListener

源代码：

github：[ChromeGoogleApiChange](https://github.com/CheneyLin/ChromeGoogleApiChange)
