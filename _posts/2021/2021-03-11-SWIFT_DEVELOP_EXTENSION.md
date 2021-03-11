---
layout: post
category : code
title: SWIFT开发extension
description: SWIFT编写和应用extension变得很简单
keyword: 麒麟工作室,林长宇
tagline: 【日志】
tags : [CODE]
postid: 34
headimage : https://cdn.pixabay.com/photo/2016/11/19/15/32/business-1839876_960_720.jpg
---

# Extension

 SWIFT编写和应用extension变得很简单。

 直接在项目中增加UIColor+Extension.swift，就可以在其他文件中直接使用了。

 例子：使用 #FFFFFF 或 #FFFFFFFF 来设置颜色值，快速与Web开发同步参数。

~~~
//
//  UIColor+Extension.swift
//  

import UIKit

extension UIColor {
    public convenience init?(hex: String) {
        let r, g, b, a: CGFloat

        if hex.hasPrefix("#") {
            let start = hex.index(hex.startIndex, offsetBy: 1)
            let hexColor = String(hex[start...])

            if hexColor.count == 8 {
                let scanner = Scanner(string: hexColor)
                var hexNumber: UInt64 = 0

                if scanner.scanHexInt64(&hexNumber) {
                    r = CGFloat((hexNumber & 0xff000000) >> 24) / 255
                    g = CGFloat((hexNumber & 0x00ff0000) >> 16) / 255
                    b = CGFloat((hexNumber & 0x0000ff00) >> 8) / 255
                    a = CGFloat(hexNumber & 0x000000ff) / 255

                    self.init(red: r, green: g, blue: b, alpha: a)
                    return
                }
            }

            if hexColor.count == 6 {
                let scanner = Scanner(string: hexColor)
                var hexNumber: UInt64 = 0

                if scanner.scanHexInt64(&hexNumber) {
                    r = CGFloat((hexNumber & 0xff0000) >> 16) / 255
                    g = CGFloat((hexNumber & 0x00ff00) >> 8) / 255
                    b = CGFloat(hexNumber & 0x0000ff) / 255

                    self.init(red: r, green: g, blue: b, alpha: 255)
                    return
                }
            }
        }

        return nil
    }
}
 ~~~

> 调用举例：

~~~
 UIColoe.init(hex:"#FFFFFF")
 UIColoe.init(hex:"#00000088") // 88 表示透明度 alpha
~~~
