---
layout: page
title: 风雨雷电堂主页
description: 风雨雷电堂，全栈程序员，手游疯狂填字（曾列苹果商店中国总榜第一）开发者。
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇
---
{% include JB/setup %}

## 最新日志

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date: '%m月%d日' }}</span> <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

## 联系我

电邮:<cio@gpwzw.com>

工作室:[www.70apps.com](http://www.70apps.com)

iOS作品:[itunes.apple.com](https://itunes.apple.com/us/artist/gpwzw.com/id483504269)

Android作品:[play.google.com](https://play.google.com/store/apps/details?id=com.gpwzw.appchinesewordcross)

Twitter:[linchangyu](https://twitter.com/#!/linchangyu)
