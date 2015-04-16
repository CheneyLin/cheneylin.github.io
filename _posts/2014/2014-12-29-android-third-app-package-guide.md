---
layout: post
title: 安卓第三方应用调起常见问题
category : app
description: 【教程】安卓第三方应用调起常见问题
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇
tagline: 【教程】
tags: [app, android, app, 安卓]
postid: 11
---
{% include JB/setup %}

##调用第三方APP

    Intent intent = new Intent();
    ComponentName cmp = new ComponentName("com.sina.weibo","com.sina.weibo.EditActivity");
    intent.setAction(Intent.ACTION_MAIN);
    intent.addCategory(Intent.CATEGORY_LAUNCHER);
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    intent.setComponent(cmp);
    startActivityForResult(intent, 0);


另：几个常用的Package命令：

1.新浪微博（编辑界面）：com.sina.weibo,com.sina.weibo.EditActivity

2.腾讯微博（编辑界面）：com.tencent.WBlog,com.tencent.WBlog.activity.MicroblogInput

3.微信：com.tencent.mm,com.tencent.mm.ui.LauncherUI

4.QQ:com.tencent.mobileqq,com.tencent.mobileqq.activity.HomeActivity

##判断是否应用已经安装

    //打开微博
    private void openWeiBo(Context context, String uid){
      if(isHasWeiBo(context)){
        Intent intent = new Intent(Intent.ACTION_VIEW);
        Uri uri = Uri.parse("sinaweibo://userinfo?uid=" + uid);
        intent.setData(uri);
        Intent chooseIntent = Intent.createChooser(intent, "Weibo");
        startActivity(chooseIntent);
        }
      else{
        Intent intent = new Intent(Intent.ACTION_VIEW);
        Uri uri = Uri.parse("http://weibo.cn/qr/userinfo?uid=" + uid);
        intent.setData(uri);
        Intent chooseIntent = Intent.createChooser(intent, "Weibo");
        startActivity(chooseIntent);
        }
      }

    //检查是否有安装微博客户端
    private boolean isHasWeiBo(Context context){
      final PackageManager packageManager = context.getPackageManager();// 获取packagemanager
      List<PackageInfo> pinfo = packageManager.getInstalledPackages(0);// 获取所有已安装程序的包信息
      List<String> pName = new ArrayList<String>();// 用于存储所有已安装程序的包名
      // 从pinfo中将包名字逐一取出，压入pName list中
      if (pinfo != null){
        for (int i = 0; i < pinfo.size(); i++){
          String pn = pinfo.get(i).packageName;
          pName.add(pn);
          }
        }
      return pName.contains("com.sina.weibo");// 判断pName中是否有目标程序的包名，有TRUE，没有FALSE
      }
