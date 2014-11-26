---
layout: post
category : web
description: rubygems.org is slowly to visite in China
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇
tagline: "Speed Ruby GEM"
tags : [ruby, gem, mac]
postid: 3
---
{% include JB/setup %}

rubygems.org is slowly to visite in China, Use Taobao source to speen gem install.

More information visit <http://ruby.taobao.org/>.

## Terminal Command

    $ gem source -l
    *** CURRENT SOURCES ***

    https://rubygems.org/
    $ gem sources --remove http://rubygems.org/  
    $ gem sources -a http://ruby.taobao.org/  
    $ gem sources -l  
    *** CURRENT SOURCES ***  

    http://ruby.taobao.org  
    # 请确保只有 ruby.taobao.org  
    $ gem install jekyll
    ...
