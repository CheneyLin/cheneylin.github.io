---
layout: post
title: APP调用Custom URL Scheme
category : app
description: iOS和Android下应用间跳转实践
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇
tagline: 【教程】
tags: [app, iOS, android]
postid: 8
headimage: https://cdn.pixabay.com/photo/2017/02/20/15/15/check-2082845_1280.jpg
---

Custom URL scheme 的好处就是，你可以在其它程序中通过这个url打开应用程序。如Ａ应用程序注册了一个url scheme:myApp,  那么就在mobile浏览器中就可以通过<href='myApp://'>打开你的应用程序Ａ。

##Android

首先在AndroidManifast.xml要被指定Scheme的Activity下设置如下参数

    <intent-filter>  
      <category android:name="android.intent.category.DEFAULT"></category>  
      <action android:name="android.intent.action.VIEW"></action>  
      <data android:scheme="mgtv"></data>  
    </intent-filter>  

这样即指定了接收Uri的Scheme为 mgtv 且 Action为View的Intent。


利用如下Intent调用Activity

    startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse("mgtv://?action=play&data=12345")));

或在浏览器中调用A链接打开

    <a href="mgtv://?action=play&data=12345">打开你的应用程序</a>

在接收的Activity中使用如下代码获得数据

    //获得Scheme名称  
    this.getIntent().getScheme();
    //获得Uri全部路径
    this.getIntent().getDataString();

##iOS
<img src="/images/xcodeurlscheme.jpg">

1.  如果没有URL types，随意点一个key行后面＋号，输入大写URL选择URL types
2.  右键URL types，选择add row
3.  item0下改成url identifier，后面的value值随意写，com.xx,xx
4.  加一行，选择url schemes，item后面值写成你需要的，譬如上面的todolist

在其他应用里就可以用以下语句启动你的app

    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"todolist://"]];

在自定义了 URL scheme 的应用中，app delegate 必须实现以下方法：

    - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
                                           sourceApplication:(NSString *)sourceApplication
                                                  annotation:(id)annotation

例如，假设我们使用以下的 URL scheme，我们可以像这样创建一个 URL：

    NSString *customURL = @"mgtv://?action=play&data=12345";

在 web 开发中，字符串 ?action=play&data=12345 被称作查询询串(query string)。

在被调用(设置了自定义 URL)的应用的 app delegate 中，获取参数的代码如下:

    - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
                                           sourceApplication:(NSString *)sourceApplication
                                                  annotation:(id)annotation
    {
      NSLog(@"Calling Application Bundle ID: %@", sourceApplication);
      NSLog(@"URL scheme:%@", [url scheme]);
      NSLog(@"URL query: %@", [url query]);

      return YES;
    }

以上代码在应用被调用时的输出为：

    Calling Application Bundle ID: com.hunantv.app
    URL scheme:mgtv
    URL query: action=play&data=12345

###额外功能

果处理成功的Scheme如包含了TestBAPP://callsuccess，那么说明你调用其他的APP成功了。
如果不是，那么说明是别的APP如TestAAPP调用了你的APP，此时在你的APPDelegate里面添加如下函数以及实现处理，这里是直接返回告诉TestAAPP调用成功的标识TestAAPP://callsuccess：


    - (BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url  
    {  
        // Do something with the url here  
        if (!url)  
        {  
            return NO;  
        }  
        NSString *handleUrl = [url absoluteString];  
        if ([handleUrl isEqualToString:@"TestBApp://callsuccess"]) {  
            return YES;  
        }else{  
            NSString *urlstr = @"TestAAPP:/com.baidu.sidepath.TestA&_callback=TestAApp://callsuccess";  
            NSURL *handlbackeUrl = [NSURL URLWithString:urlstr];  
            [[UIApplication sharedApplication] openURL:handlbackeUrl];  

        }
    }  

如果你不想直接返回callback，而是想启动一个页面那么，此时要考虑你的应用是否已经启动，可以如下判断使用：

    - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url  
      sourceApplication:(NSString *)sourceApplication annotation:(id)annotation{  
        NSString *handleUrl = [url absoluteString];  
        if ([handleUrl isEqualToString:@"TestBApp://callsuccess"]) {  
            return YES;  
        }else{  
            UINavigationController *vc = (UINavigationController *)_window.rootViewController;  
            if (vc == nil) {  
                PathViewController *controller = [[PathViewController alloc] initWithNibName:@"PathViewController" bundle:nil];  

                self.window = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];  
                self.mUINavigationController = [[UINavigationController alloc] init];  


                [self.mUINavigationController pushViewController:controller animated:YES];  
                [self.window addSubview:self.mUINavigationController.view];  


                // Override point for customization after application launch.  
                self.window.backgroundColor = [UIColor whiteColor];  
                [self.window makeKeyAndVisible];  
            }  
            return YES;  
        }
      }

也就是把appdelegate里面的didFinishLaunchingWithOptions初始化app的代码拷贝进去。此时会启动PathViewController这个页面。然后在这个页面里面可以添加一个返回按钮来返回到调用APP。

再次 在TestAAPp里面使用URl Scheme调起你的APP

    - (void)buttonPressed:(UIButton *)button
    {
      NSString *customURL = @"mgtv://play/12345";

      if ([[UIApplication sharedApplication]
        canOpenURL:[NSURL URLWithString:customURL]])
      {
        [[UIApplication sharedApplication] openURL:[NSURL URLWithString:customURL]];
      }
      else
      {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"URL error"
                              message:[NSString stringWithFormat:
                                @"No custom URL defined for %@", customURL]
                              delegate:self cancelButtonTitle:@"Ok"
                              otherButtonTitles:nil];
        [alert show];
      }
    }

查看更多苹果官方资料：

<https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplicationDelegate_Protocol/Reference/Reference.html>


##其他

iOS与Android在这儿有点小区别，在iOS中如果系统注册了url scheme且安装了那个应用程序，通过上面那种网页的方式就可以启动应用程序，如果没有注册或没有安装那个应用程序，就没有任何效果（你注册的url scheme不能是http://xxx 这样的）。

在Android系统中注册了url scheme且安装了那个应用程序，通过上面那种网页的方式就可以启动应用程序，如果没有注册或没有安装那个应用程序，就没有任何效果；如果注册了是http://xxx这样的，就会弹了一个对话框让你选，是打开网页还是程序。

iOS中不能注册http://xxx这样的url scheme,而Android是可以的。
