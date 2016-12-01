---
layout: post
category : chrome
title: 开发谷歌Chrome扩展解决大陆无法访问googleapis公用库问题
description: 【扩展】开发谷歌Chrome扩展解决大陆无法访问googleapis公用库问题
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇,谷歌浏览器,googleapis
tagline: 【扩展】
tags : [chrome, googleapis, cdnjs]
postid: 16
---

访问国外很多网站时，发现调用googleapis的js失败，只能自己想办法解决。

网上有用Chrome扩展解决这个问题的例子，自己研究了一下，分享给大家：

crx下载：[extension.crx](https://github.com/CheneyLin/ChromeGoogleApiChange/blob/master/extension.crx?raw=true)

需要打开Chrome的扩展设置页，将crx文件拖入安装。


使用了Chrome的内部对象：

chrome.webRequest.onBeforeRequest.addListener

源代码：

github：[ChromeGoogleApiChange](https://github.com/CheneyLin/ChromeGoogleApiChange)
