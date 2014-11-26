---
layout: page
title: Cheney Lin
description: 风雨雷电堂，全栈程序员，手游疯狂填字（曾列苹果商店中国总榜第一）开发者。
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇
tagline: Welcome to my page
---
{% include JB/setup %}

## Laster Posts

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date: '%Y-%m-%d' }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

## Contact Me

Email:<cio@gpwzw.com>

Website:[www.70apps.com](http://www.70apps.com)

iOS Works:[itunes.apple.com](https://itunes.apple.com/us/artist/gpwzw.com/id483504269)

Android Works:[play.google.com](https://play.google.com/store/apps/details?id=com.gpwzw.appchinesewordcross)

Twitter:linchangyu(https://twitter.com/#!/linchangyu)
