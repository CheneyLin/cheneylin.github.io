---
layout: post
category : iOS
title: iOS开发检测通讯录权限并申请开启
description: 【源码】iOS开发检测通讯录权限并申请开启
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇,苹果开发者,url scheme
tagline: 【源码】
tags : [apple, iOS, OC, AddressBook, ABAuthorizationStatus, ABAddressBookGetAuthorizationStatus, ABAddressBookRequestAccessWithCompletion]
postid: 15
---
{% include JB/setup %}

在iOS 6中，以前工作正常的访问通讯录的iPhone程序可能会出错，现象是程序启动时不提醒用户是否允许程序访问通讯录，同时在“设置->隐私->通讯录”中看不到你的程序。另外，对通讯录进行操作的代码会报类似于以下消息的错误：

    Could not compile statement for query (ABCCopyArrayOfAllInstancesOfClassInSourceMatchingProperties):  
    SELECT ROWID, Name, ExternalIdentifier, Type, ConstraintsPath, ExternalModificationTag, ExternalSyncTag, AccountID, Enabled, SyncData, MeIdentifier, Capabilities FROM ABStore WHERE Enabled = ?;  

其原因是iOS 6加强了通讯录访问控制，要求开发人员显式声明需要访问通讯录，方法是调用 ABAddressBookRequestAccessWithCompletion
方法，具体参见官方文档：

http://developer.apple.com/library/ios/#releasenotes/General/RN-iOSSDK-6_0/index.html


我自已写了一个过程CheckAddressBookAuthorization放在helper里

    +(void)CheckAddressBookAuthorization:(void (^)(bool isAuthorized))block
    {
        ABAddressBookRef addressBook = ABAddressBookCreateWithOptions(NULL, NULL);
        ABAuthorizationStatus authStatus = ABAddressBookGetAuthorizationStatus();

        if (authStatus != kABAuthorizationStatusAuthorized)
        {
            ABAddressBookRequestAccessWithCompletion(addressBook, ^(bool granted, CFErrorRef error)
             {
                 dispatch_async(dispatch_get_main_queue(), ^{
                     if (error)
                     {
                         NSLog(@"Error: %@", (__bridge NSError *)error);
                     }
                     else if (!granted)
                     {

                         block(NO);
                     }
                     else
                     {
                         block(YES);
                     }
                 });  
             });  
        }
        else
        {
            block(YES);
        }

    }

可以在load页调用以让用户打开权限，以后在调用AddressBook相关操作时都使用此方法来调用，便是实际上只有第一次调用才会弹出允许的提示窗口，所以如果第一次被拒绝了，就只能跪求用户去设置里打开了。

    [ActionHelper CheckAddressBookAuthorization:^(bool isAuthorized){
        if(isAuthorized)
        {
            [self appViewPromptLoad:@"导入通讯录"];
            ...
        }
        else
        {
            [self appViewPromptInfo:@"请到设置>隐私>通讯录打开本应用的权限设置"];
        }
    }];
