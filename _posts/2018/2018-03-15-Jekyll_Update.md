---
layout: post
category : web
title: 解决Jekyll更新遇到的问题
description: 用GEM更新Jekyll居然出错了
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇,Jekyll,Gem
tagline: 【教程】
tags : [Jekyll, Gem]
postid: 20
headimage : /images/2018/update-1672363_1280.jpg
---

# 问题 new

2019年又升级Mac了，Jekyll 又无法启动了。

```
$ jekyll s
-bash: /usr/local/bin/jekyll: /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/bin/ruby: bad interpreter: No such file or directory
```

# 解决

判断是升级了RUBY版本，Jekyll找不到了

顺便就重新升级了一下Jekyll到4.0.0

先查询ruby版本，然后重新设置ruby的PATH

```
$ ruby -v
ruby 2.6.3p62 (2019-04-16 revision 67580) [universal.x86_64-darwin19]
```
查询版本为2.6.x
```
export PATH=$HOME/.gem/ruby/X.X.0/bin:$PATH
```
X.X填入2.6
```
$ export PATH=$HOME/.gem/ruby/2.6.0/bin:$PATH
```

# 问题

升级Mac后，Jekyll 无法启动了。
用GEM更新Jekyll居然出错了。

```
$ gem install jekyll
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions for the /usr/bin directory.
```

最后参考了 墨狂之逸才 的解决方法，成功更新并启动了jekyll


---------------------------

 这是因为taobao Gems 源已停止维护，现由 ruby-china 提供镜像服务，正确的操作是：

```
$ sudo gem update --system
$ gem sources --remove https://rubygems.org/
$ gem sources --remove https://ruby.taobao.org/       //如果安装了淘宝的镜像
```
//等有反应之后再敲入以下命令

```
gem sources -a https://gems.ruby-china.com/
```



为了验证你的Ruby镜像是并且仅是ruby-china，可以用以下命令查看：

```
$ gem sources -l
```

只有在终端中出现下面文字才表明你上面的命令是成功的：
```
*** CURRENT SOURCES ***

https://gems.ruby-china.com/
```

：）备案不了：org 改为 com

确保只有 gems.ruby-china.org

(2018.1.11更新)

---------------------------

然后更新jekyll

```
$ sudo gem install jekyll
```

顺便记录一下jekyll的使用

```
$ jekyll s
```



# 参考

 1. [安装CocoaPods遇到的问题](https://www.jianshu.com/p/f5ebfadb0a20)
 2. [Jekyll官网](https://jekyllrb.com/)
