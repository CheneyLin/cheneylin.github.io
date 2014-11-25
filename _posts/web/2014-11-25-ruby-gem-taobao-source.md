---
layout: post
category : web
tagline: "Speed Ruby GEM"
tags : [ruby, gem, mac]
---
{% include JB/setup %}

rubygems.org is slowly to visite in Chinese, Use Taobao source to speen gem install.

## COLLIEJS Framework

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
