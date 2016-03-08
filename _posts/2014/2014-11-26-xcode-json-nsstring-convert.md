---
layout: post
title: 苹果iOS5下的的NSJSONSerialization类
category : iOS
description: 【教程】苹果iOS5下的的NSJSONSerialization类
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇,苹果开发者,推送,raywenderlich
tagline: 【教程】
tags: [apple, json, xcode, mac]
postid: 5
---

在iOS 5 中，苹果引入了一个解析JSON串的NSJSONSerialization类。
通过该类，我们可以完成JSON数据与NSDictionary和NSArray之间的转化。

以前，我记得我用的是第三方的插件。但是，苹果出了这套解析后，效率也大大了超过了其他的JSON解析第三方类库。所以，推荐使用NSJSONSerialization类来完成转化。

##将NSDictionary或NSArray转化为JSON串

将字典或者数组转化为JSON串

    - (NSData *)toJSONData:(id)theData{

        NSError *error = nil;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:theData
                                                           options:NSJSONWritingPrettyPrinted
                                                             error:&error];

        if ([jsonData length] > 0 && error == nil){
            return jsonData;
        }else{
            return nil;
        }
    }

使用这个方法的返回，我们就可以得到想要的JSON串

    NSString *jsonString = [[NSString alloc] initWithData:jsonData
                                                 encoding:NSUTF8StringEncoding];

##将JSON串转化为NSDictionary或NSArray

将NSString转化为NSData

    [jsonString dataUsingEncoding:NSASCIIStringEncoding];

将JSON串转化为字典或者数组

    - (id)toArrayOrNSDictionary:(NSData *)jsonData{
        NSError *error = nil;
        id jsonObject = [NSJSONSerialization JSONObjectWithData:jsonData
                                                        options:NSJSONReadingAllowFragments
                                                          error:&error];

        if (jsonObject != nil && error == nil){
            return jsonObject;
        }else{
            // 解析错误
             return nil;
        }

    }

##将JSON串与NSArray和NSDictionary的操作进行封装

当然，也有很多时候，我们将这些操作，分别定义在NSObject和NSString的一个分类中

直接贴：

###将NSString转化为NSArray或者NSDictionary

    #import "NSString+JSONCategories.h"
    @implementation NSString(JSONCategories)
    -(id)JSONValue;
    {
        NSData* data = [self dataUsingEncoding:NSUTF8StringEncoding];
        __autoreleasing NSError* error = nil;
        id result = [NSJSONSerialization JSONObjectWithData:data
                                                    options:kNilOptions
                                                      error:&error];
        if (error != nil) return nil;
        return result;
    }
    @end

###将NSArray或者NSDictionary转化为NSString

    import "NSObject+JSONCategories.h"
    @implementation NSObject (JSONCategories)
    -(NSData*)JSONString;
    {
        NSError* error = nil;
        id result = [NSJSONSerialization dataWithJSONObject:self
                                                    options:kNilOptions
                                                      error:&error];
        if (error != nil) return nil;
        return result;
    }
    @end
