---
layout: post
category : code
title: 使用Python下载m3u8视频文件
description: 使用Python的request模块下载m3u8视频文件及在MAC下合并TS文件
keyword: 麒麟工作室,林长宇
tagline: 【日志】
tags : [CODE]
postid: 31
headimage : https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_960_720.jpg
---

## 环境

 * macOS Catalina 10.15.4
 * Python 2.7
 * Chrome 浏览器
 * CURL转代码：https://curl.trillworks.com/

## 操作

### 取得M3U8

通过 Chrome 浏览器 模拟手机访问视频网站

进入network页，过滤m3u8或直接过滤ts

### 取得CURL脚本
右键点击TS文件请求项，选择菜单中的 Copy as cURL
![screen](http://www.linchangyu.com/images/2020/20200824/curl.png)

### 转换CURL代码

进入 https://curl.trillworks.com/，将复制的CURL脚本粘贴在左边
![screen](http://www.linchangyu.com/images/2020/20200824/curlcode.png)

### Python核心代码

~~~
#!/usr/bin/python3
import requests

def downloadTSbyID( id ):
    headers = {
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        'Accept': '*/*',
        'Origin': 'https://***.com',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Dest': 'empty',
        'Referer': 'https://***.com/m/?group=54',
        'Accept-Language': 'zh,zh-CN;q=0.9,en;q=0.8,zh-TW;q=0.7',
    }

    response = requests.get('https://*.com/aOzZnTwQWdF/000'+id+'.ts', headers=headers)
    ts = response.content
    with open(id+'.ts','wb') as data_file:
        data_file.write(ts)
    return id;

i = 0
cmdcombine = 'cat '
while i <= 99:
    s = "%03d" % i
    print(downloadTSbyID(s))
    cmdcombine = cmdcombine + s + '.ts '
    i=i+1
cmdcombine = cmdcombine + ' > combin.mpg'
print(cmdcombine)

~~~

 * TS文件没有规律的话，需要处理M3U8，此处略
 * 下载的TS文件需要根据M3U8的顺序排序，合并时需要排序，否则视频就乱了

### 合并TS文件

~~~
  cat 001.ts 002.ts > combin.mpg
~~~

复制打印出的脚本在终端里执行即可，TS本质是MPEGII文件，如果需要可以直接将.TS改为.mpg
