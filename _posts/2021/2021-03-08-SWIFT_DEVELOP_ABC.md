---
layout: post
category : code
title: SWIFT开发入门
description: SWIFT开发入门
keyword: 麒麟工作室,林长宇
tagline: 【日志】
tags : [CODE]
postid: 32
headimage : https://cdn.pixabay.com/photo/2016/11/23/14/45/coding-1853305_960_720.jpg
---

# 概念

## 项目文件管理

  * 项目中的所有.swift文件都会被引入，不再需要在单个文件中用import引入
  * 没有了宏定义 #define，直接用let定义即可


# 常用变量操作

## var 和 let

 * var 定义变量，可以在后面的代码中修改变量的值
 * let 定义常量，值不能被修改
 * 可以在一行中声明多个变量或常量，用逗号分隔

~~~
let myName : String = "Cheney Lin"
var userName : String = "Jack"
~~~

## 可选对象变量（Optional）

 * 在定义对句变量时，在类型后加一个?表示可选对象变量（可为空的意思）
 * 在定义对句变量时，在类型后加一个!用于明确赋值
 * 在 Swift 中， nil 不是指针，他是值缺失的一种特殊类型，任何类型的可选项都可以设 置成 nil 而不仅仅是对象类型

~~~
var myName : String?
var myName : String? = nil

var myName : String! = "Cheney Lin"
~~~

使用可选对象变量时，有几种方式：

* 正常使用：在变量后面加一个?，需要进一步处理或函数调用
* 强制使用：在变量后面加一个!，一般用于明确之前代码已经赋值的情况下使用
* 默认值使用：在变量后面加个??，用于给出默认值
* 引用使用：新建一个变量，引用要处理的变量，用IF语句来做控制逻辑

~~~
 NSLog(%@,myName!)
~~~

~~~
 NSLog(%@,myName??"Cheney Lin")
~~~

~~~
if let newName = myName?
{
    NSLog(%@,newName)
}
~~~

# 字符串处理

## 基本操作

 * 定义字符串，用双引号"Cheney Lin"，不需要前面加@
 * 用+连接字符串即可合并字符串
 * 用String.init(value:Int64)即可将数字转换为字符串
 * 用isEmpty判断空字符串
 * 多行字符串是用三个双引号引起来的一系列字符

~~~
let memo:String = """Hello World,\n
I am Cheney Lin."""
~~~


## 遍历字符

for-in 循环遍历 String 中的每一个独立的 Character

~~~
func isIncludeChineseIn(string: String) -> Bool
{
    for value in string
    {
        if ("\u{4E00}" <= value  && value <= "\u{9FA5}") {
            return true
        }
    }
    return false
}
~~~

## 字符串-访问和修改

### 字符串索引

 * 每一个 String 值都有相关的索引类型， String.Index，它相当于每个 Character 在字符串中的位置
 * startIndex 属性来访问 String 中第一个 Character 的位置。
 * endIndex 属性就是 String中最后一个 字符后的位置
 * endIndex 属性并不是字符串下标脚本的合法实际参数 如果 String 为空，则 startIndex 与 endIndex 相等
 * 使用 index(before:) 和 index(after:) 方法来访问给定索引的前后
 * 要访问给定索引更远的索引，你可以使用 index(_:offsetBy:)
 * 使用 indices 属性来访问字符串中每个字符的索引

### 插入

 * 插入字符，使用 insert(_:at:) 方法
 * 插入另一个字符串的内容到特定的索引，使用 insert(contentsOf:at:) 方法

### 删除
 * 移除字符，使用 remove(at:)方法
 * 移除一小段特定范围的字符串，使用 removeSubrange(_:) 方法

## 字符串-子串和字符串比较

### 子字符串
 * 使用下标或者类似 prefix(_:) 的方法得到的子字符串是
 * Substring 类型 Substring 拥有 String 的大部分方法
 * Substring 可以转成 String 类型
 * 子字符串重用一部分原字符串的内存
 * 修改字符串或者子字符串之前都不需要花费拷贝内存的代价
 * String 和 Substring 都遵循 StringProtocol 协议，也就是说它基本上能很方便地兼容所有 接受 StringProtocol 值的字符串操作函数

### 字符串比较

 * 字符串和字符相等性(==和!=)
 * 前缀相等性 hasPrefix(_:)
 * 后缀相等性 hasSuffix(_:)

# 本地存储 UserDefaults

UserDefaults可用于存储一些设置参数，不建议存储复杂的数据结构。

~~~
struct defaultsKeys {
    static let key1 = "key1"
    static let key2 = "key2"
    static let key3 = "key3"
}

let defaults = UserDefaults.standard

// 写入
defaults.setValue("Some String Value", forKey: defaultsKeys.key1)
defaults.setValue(100.0, forKey: defaultsKeys.key2)
defaults.setValue(true, forKey: defaultsKeys.key3)


// 读取
if let value1 = defaults.string(forKey: defaultsKeys.key1) {
    print(value1)
}

let value2 = defaults.float(forKey: defaultsKeys.key2)
print(value2)

let value3 = defaults.bool(forKey: defaultsKeys.key3)
print(value3)
~~~
