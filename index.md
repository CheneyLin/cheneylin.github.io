---
layout: page
title: Cheney Lin
tagline: Welcome to my page
---
{% include JB/setup %}

## Laster Posts

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>

## Contact Me

Email:<cio@gpwzw.com>

Website:[http://www.70apps.com]

iOS Works:[https://itunes.apple.com/us/artist/gpwzw.com/id483504269]

Android Works:[https://play.google.com/store/apps/details?id=com.gpwzw.appchinesewordcross]
