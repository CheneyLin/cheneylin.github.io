---
layout: post
category : iOS
title: iOS开发Extra系列：NSString***
description: 字符串的应用比较常见，记录在此
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇,苹果开发者,url scheme
tagline: 【源码】
tags : [apple, iOS, OC, NSString]
postid: 14
headimage : https://cdn.pixabay.com/photo/2017/10/31/19/05/web-design-2906159_1280.jpg
---


在iOS系统，NSString可能是最常用的对象，很多用法跟其他语言不一样。

##字符串对象NSString

###使用格式创建字符串

    + (id)stringWithFormat:(NSString *)format...
    - (id)initWithFormat:(NSString *)format...

    NSString *str = "hello";
    NSString *string = [NSString stringWithFormat:@"%@ world",str];
    NSLog(string); 结果：hello world

###常用的替换符

    %@ NSString实例
    %d,%D,%i 整数
    %4d,%4D,%4i 格式化整数
    %ld,%lD,%li 长整数
    %u,%U 无符号整数
    %x 将无符号整数以十六进制小写字母显示
    %X 将无符号整数以十六进制大写字母显示
    %f 小数
    %c 字符
    %s C语言字符串
    %% 显示％字符本身


##范围集合NSRange

###定义

    typedef struct _NSRange
    {
         unsigned int location;
         unsigned int length;
    }NSRange;

###NSMakeRange函数

这个函数比较特殊 返回一个NSRange的对象。

    NSMakeRanger(unsigned int location,unsigned int length);

例如：

    NSRange range = NSMakeRanger(0,5);
    NSLog(@"location is %d,length is %d",range.location,range.length);

###查找

如果找到就返回范围，否则NSRange的location项被设置为NSNotFound

     - (NSRange)rangeOfString:(NSString *)subString;
     - (NSRange)rangeOfString:(NSString *)subString option:(unsigned)mask;
     - (NSRange)rangeOfString:(NSString *)subString option:(unsigned)mask range:(NSRange)range;

    //mask常用选项列表
    //NSCaseInsensitiveSearch   不区分字母大小写
    //NSLiteralSearch           对字符串进行字节单位的比较，一般可提高检索速度
    //NSBackwardsSearch         从范围的末尾开始检索
    //NSAnchoredSearch          仅检索制定范围的前部。忽略字符串中间的检索字符

    NSString *string = @"hello world";
    NSRange range = [string rangeOfString:@"he"];
    if(range.location != NSNotFound)
    {
            NSLog(@" location=%d,length=%d",range.location,range.length);
    }


###截取字符串

     NSString  
     //返回字符串开头至index位的字符串 不包含索引位
     - (NSString *)substringToIndex:(unsigned)index;

     //返回字符串第index位至末尾的字符串 包含索引位
     - (NSString *)substringFromIndex:(unsigned)index;

      //返回字符串中范围range内的字符串
     - (NSString *)substringWithRange:(NSRange)range;

      //包含索引位
     NSString *string = [string substringWithRange:NSMakeRange(5,2)];

###比较字符串

    NSString *String1 = @"NSStringInformation.txt";

    //hasPrefix 前缀比较
    [String1 hasPrefix:@"NSString"] = = 1 ?  NSLog(@"YES") : NSLog(@"NO");

    //hasSuffix 后缀比较
    [String1 hasSuffix:@".txt"] = = 1 ?  NSLog(@"YES") : NSLog(@"NO");

    //isEqualToString 完全比较
    if([string1 isEqualToString:@""])
    {
        NSLog(@"string1 is blank");
    }

###替换字符串

     NSString *newString  = [oldString stringByReplacingOccurrencesOfString:@"x" withString:@"y"];

###分离字符串成数组

    NSString *string = @"A|B|C|D";
    NSArray *array = [string componentsSeparatedByString:@"|"];

###读取文本文件

    NSString
     + (id)stringWithContentsOfFile:(NSString *)path usedEncoding:(NSStringEncoding *)enc error:(NSError **)error     //自动释放内存

     - (id)initWithContentsOfFile:(NSString *)path encoding:(NSStringEncoding)enc error:(NSError **)error

     NSString *string = [NSString stringWithContentsOfFile:@"/user/test/yw.txt" encoding:NSUTF8StringEncoding error:&error];
     if(string){}

###输出文本文件

    NSString
     - (BOOL)writeToFile:(NSString *)path atomically:(BOOL)useAuxiliaryFile encoding:(NSStringEncoding)enc error:(NSError **)error
     //参数 atomically 暂时将文件保存到辅助文件中
     //path
     The file to which to write the receiver. If path contains a tilde (~) character, you must expand it withstringByExpandingTildeInPath before invoking this method.


    //扩展路径
    NSString *Path = @"~/NSData.txt";
    NSString *absolutePath = [Path stringByExpandingTildeInPath];
    NSLog(@"absolutePath:%@",absolutePath);
    NSLog(@"Path:%@",[absolutePath stringByAbbreviatingWithTildeInPath]);

    //文件扩展名
    NSString *Path = @"~/NSData.txt";
    NSLog(@"Extension:%@",[Path pathExtension]);
