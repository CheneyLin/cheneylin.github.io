---
layout: post
category : code
title: SWIFT编程速查表
description: 方便快速掌握Swift编码规范
keyword: 麒麟工作室,林长宇
tagline: 【日志】
tags : [CODE]
postid: 37
headimage : https://cdn.pixabay.com/photo/2016/03/09/09/17/computer-1245714_960_720.jpg
---
# 目录

 * Class Implementation
 * Methods
 * Optionals
 * Collections
 * Declaring Variables
 * Control Flow
 * Initializers
 * Extensions
 * Coding Protocols
 * String Quick Examples
 * Array Quick Examples
 * Dictionary Quick Examples

# 定义常量和变量

~~~
  // 使用 let 定义常量
  let double: Double = 2.0
  //doubel = 3.0 返回错误：不能修改常量的值
  let inferredDouble = 2.0 //通过显式赋值定义浮点数字类型

  // 使用 var 定义变量
  var mutableInt: Int = 1
  mutableInt = 2
  // 正确：可以修改变量的值

~~~

# 数字类型转换

~~~
  let integerValue = 8
  let doubleValue = 8.0
  // let sum = integerValue + doubleValue
  // 错误：类型不匹配

  // 使用强制类型转换来避免隐藏的类型转换错误
  let sum = Double(integerValue) + doubleValue
  // 正确：两个值是同一类型了
~~~

# 字符串（Strings）

~~~
  // 使用字符串表达式来显式赋值定义变量或常量
  let helloWorld = "Hello, World!"

  // 使用多行字符串
  let helloWorldProgram = """
  A "Hello, World" program
  by Cheney Lin
  from China
  """

  // 空字符串
  let emptyString = "" // 使用字符串表达式
  let anotherEmptyString = String() //使用类初始化

  // 连接字符串
  var mutableString = "Swift"
  mutableString += " is awesome!"

  // 字符串插值
  print("The value is \(double)")
  // 字符串插值字符串
  print("This is my opinion: \(mutableString)")
~~~

# 元组（Tuples）

~~~
  //组合多个值的元组类型
  let httpError = (503, "Server Error")

  //赋值调用元组的值
  let (code, reason) = httpError
  //直接调用元组的值
  let codeByIndex = httpError.0
  let reasonByIndex = httpError.1
  //指定调用元组的值
  let (_, justTheReason) = httpError
~~~

# 可选预定义类型（Optionals）

~~~
  // 可选预定义的变量可以是空值（nil）
  var catchphrase: String? //默认为nil
  catchphrase = "Hey, what's up!"

  // 使用 ! 修饰符进行强制转换
  // 使用前需要保证变量有值，否则就异常错误了
  let count1: Int = catchphrase!.count

  // 使用 ? 修饰符调用变量，进行可选预定义绑定
  // 通过对赋值结果的判断来保证后续代码的正常执行
  if let count = catchphrase?.count {
    print(count)
  }

  // 使用空值合并运算符 ?? 设置一个默认值
  let count2: Int = catchphrase?.count ?? 0

  // 使用可选预定义类型链式取值
  // 如果原始值是nil，新变量的值也为nil
  let count3: Int? = catchphrase?.count

  // 强制解析可选预定义类型
  let forcedCatchphrase: String! = "Hey, what's up!"
  let implicitCatchphrase = forcedCatchphrase
  // 获取强制解析变量的值，就不需要加 !
~~~

# 集合类型：数组（Array）

~~~
  let immutableArray:[String]=["Alice", "Bob"]
  // 也可以显式定义字符串数组
  var mutableArray = ["Eve"，"Frank"]
  // 检测数组中的值
  let isEveThere = immutableArray.contains(“Eve")
  // 通过序号调用数组的值
  let name: String = immutableArray[0]

  // 更新数组中某项的值，注意别超过了数组项的总数
  mutableArray[1]="Bart"
  // immutableArray[1]="Bart"
  // 错误：数组常量的值不能被赋值
  mutableArray.append("Ellen") // 追加项
  // 指定位置插入值
  mutableArray.insert("Gemma",at:1)
  // 删除项
  let removederson = mutableArray.remove(at:1)

  // 数组常量（let collection）不能重新定义或对某一项进行赋值
  // 数组变量（var collection）可以重新定义或对某一项进行赋值
  mutableArray =["Ilary","David"]
  mutableArray[0]=“John"
~~~

# 集合类型：字典（Dictionary）

~~~
  // 通过键值对（key + value）管理数据
  let immutableDict: [String: String] = ["name": "Kirk", "rank": "captain"]
  // 也可以显式定义字典
  var mutableDict = ["name": "Kirk", "rank": "captain"]
  // 使用 key 调用字典的值，查找不到时返回nil
  let name2: String? = immutableDict["name"]
  // 更新字典的值
  mutableDict["name"] = "Janeway"
  // 增加新的值
  mutableDict["ship"] = "Voyager"
  // 删除值，查找不到时返回nil
  let rankWasRemoved: String? = mutableDict.removeValue(forKey: "rank")
~~~

# 集合类型：集合（Set）

~~~
  // 集合会自动忽略相同的值，所以下面的例子中 immutableSet 最后只会有两项值
  let immutableSet: Set = ["chocolate", "vanilla", "chocolate"]
  var mutableSet: Set = ["butterscotch", "strawberry"]
  // 测试集合是否包含某个值
  immutableSet.contains("chocolate")
  // 增加值
  mutableSet.insert("green tea")
  // 删除值，查找不到时返回nil
  let flavorWasRemoved: String? = mutableSet.remove("strawberry")
~~~


# 流程：循环

~~~
  // 遍历列表或集合
  for item in listOrSet {
    print(item)
  }
  // 遍历字典对象
  for (key, value) in dictionary {
    print("\(key) = \(value)")
  }

  // 遍历指定范围
  // 封闭指定范围操作符（...）
  for i in 0...10 {
    print(i) //0 到 10
  }
  // 半开放指定范围操作符（..<）
  for i in 0..<10 {
    print(i) //0 到 9
  }
  // while 关键字，可能不执行
  var x = 0
  while x < 10 {
    x += 1
    print(x)
  }
  // repeate-while 关键字，至少执行一次
  repeat {
    x -= 1
    print(x)
  } while(x > 0)
~~~

# 流程：判断

~~~
  // 使用 if 关键字来选择不同分支语句
  let number = 88
  if (number <= 10) {
    // 如果 number 小于等于10，执行这里的代码
  }else if (number > 10 && number <100) {
    // 如果 number 大于10且小于100，执行这里的代码
  } else {
    //否则，执行这里的代码
  }

  // 三目操作符
  // 是否判断的简写
  let height = 100
  let isTall = height > 200 ? true : false

  // 使用 guard 关键字优化判断语句的效率
  for n in 1...30 {
    guard n % 2 ==0 else {
      continue
    }
    print("\(n) is even")
  }

  // 使用 switch 关键字选择多个分支语句
  let year = 2021
  switch year {
    case 2003, 2004:
      // year的值为2003或2004
      print("Panther or Tiger")
    case 2010:
      print("Lion")
    case 2012...2015:
      print("Mountain Lion trrough El Captain")
    default:
      print("Not ready!")
  }
~~~

# 函数（Function）

~~~
  // 返回值为空的函数（void）
  func sayHello() {
    print("Hello")
  }

  // 带参数的函数
  func sayHello(name: String) {
    print("Hello \(name)!")
  }

  // 带参数的函数，同时设置默认值
  func sayHello(name: String = "Cheney") {
    print("Hello \(name)!")
  }

  // 带多个参数的函数，同时设置默认值
  func sayHello(name: String = "Cheney", age: Int) {
    print("\(name) is \(age) years old!")
  }
  // 指定没有设置默认值的参数就可以调用函数
  sayHello(age: 35)

  // 带参数且指定返回值的函数
  func add(x: Int, y: Int) -> Int {
    return x + y
  }
  let value = add(x: 8, y: 10)

  // 只有一个表达式时，可以省略 return 关键字
  func multiply(x: Int, y: Int) -> Int {
    x * y
  }
  // 额外指定参数命名标签
  func add(x xVal: Int, y yVal: Int) -> Int {
    return xVal + yVal
  }
  // 参数的省略写法
  func add(_ x: Int, y: Int) -> Int {
    return x + y
  }
  let value = add(8, y: 10)

  // 把函数作为参数
  func doMath(operation: (Int, Int), a: Int, b: Int) -> Int {
    return operation(a, b)
  }
~~~

# 闭包（Closures）

~~~
  let adder: (Int, Int) -> Int = { (x, y) in x + y }

  // 在闭包中使用简写参数名
  let square: (Int) -> Int = { $0 * $0 }

  // 把闭包函数作为参数
  func addWithClosure  = doMath(operation: adder, a: Int, b: Int) -> Int {
    return operation(a, b)
  }
~~~


# 枚举（Enumerations）

~~~
 enum Taste {
   case sweet, sour, salty, bitter, umami
 }
 let vinegarTaste = Taste.sour

 // 遍历枚举
 enum Food: CaseIterable {
   case pasta, pizza, hamburger
 }
 for food in Food.allCases {
   print(foot)
 }
 // 遍历字符串
 enum Currency: String {
   case euro = "EUR"
   case dollar = "USD"
   case pound = "GBP"
 }
 // 输出枚举的原始值
 let euroSymbol = Currency.euro.rawValue
 print("The currency symbl for Euro is \(euroSymbol)")

 // 枚举的可赋值性
 enum Content {
   case empty
   case text(Strig)
   case number(Int)
 }
 // 使用 switch 处理可赋值枚举
 let content = Content.text("Hello")
 swithc content {
   case .empty:
     print("Value is empty")
   case .text(let value):
     print("Value is \(value)")
   case .number(_): //不调用时，可以省略
     print("Value is a number")
 }

~~~


# 结构（Structs）

~~~
  struct User {
    var name: String
    var age: Int = 40
  }
  // 完全显式初始化需要对全部属性赋值
  let john = User(name: "John", age: 35)

  // 有默认值的属性可以不显式赋值
  let dave = User(name: "Dave")

  // 使用结构属性的值
  print("\(john.name) is \(john.age) years old")
~~~


# 类（Classes）

~~~
  class Person {
    let name: String
    // 类初始化
    init(name: String) {
      self.name = name
    }

    // 使用 deinit 销毁类
    deinit {
      print("正在销毁")
    }

    var numberOfLaughs: Int = 0
    func laugh() {
      numberOfLaughs += 1
    }

    // 定义计算属性
    var isHappy: Bool {
      return numberOfLaughs > 0
    }
  }

  let devid = Person(name: "David")
  david.laugh()
  let happy = david.isHappy
~~~


# 类的继承（Inheritance）

~~~
  class Student: Persion {
    var numberOfExams: Int = 0
    //重写（override） isHappy方法的逻辑
    override var isHappy: Bool {
      numberOfLaughs > 0 && numberofExams >2
    }
  }

  let ray = Student(name: "Ray")
  ray.numberOfExams = 4
  ray.laugh()
  let happy = ray.isHappy

  // 使用关键字（final）预置定义子类，可以防止被继承
  final class Child: Person { }
~~~


# 类的指定初始化和快捷初始化（Designated & Convenience Initializers）

~~~
  // 一个类，至少需要一个设计模式初始器或可选的省略模式初始器
  class ModeOfTransportation {
    let name: String

    //设计模式初始器，提供 name 参数
    init(name: String) {
      self.name = name
    }
    //省略模式初始器
    convenience init() {
      self.init(name: "未注册")
    }
  }

  class Vehicle: ModeOfTransportation {
    let wheels: Int
    // 设计模式初始器，提供 name ， wheels 参数
    init(name: String, wheels: Int) {
      self.wheels = wheels
      //调用主类的设计模式初始器
      super.init(name: name)
    }
    //省略模式初始器
    override convenience init(name: Srting) {
      self.init(name: name, wheels: 4)
    }
  }
~~~


# 类的扩展（Extensions）

~~~
  // 扩展可以在已有的类（结构、枚举、协议）基础上增加功能
  extension String {
    var boolValue: Bool {
      if self == "1" {
        return true
      }
      return false
    }
  }
  let isTure = "0".boolValue
~~~


# 错误捕获

~~~
  // 预定义错误
  enum BeverageMachineError: Error {
    case invalidSelection
    case insufficientFunds
    case outOfStock
  }
  func selectBeverage(_ selection: Int) throws ->
  String {
    //业务逻辑写这里
    return "waiting for beverage..."
  }

  // 通过 do try catch 语句捕获错误
  let message: String
  do {
    message = try selectBeverage(20)
  } catch BeverageMachineError.invalidSelection {
    print("Invalid selection")
  } catch BeverageMachineError.insufficientFunds {
    print("Insufficient funds")
  } catch BeverageMachineError.outOfStock {
    print("Out of stock")
  } catch {
    print("Generic error")
  }

  // try? 出错时返回空值 nil
  let nillableMessage = try? selectBeverage(10)
  // try! 出错时返回实时错误（runtime error）
  let throwableMessage = try! selectBeverage(10)
~~~


# Codable 协议

~~~
  import Foundation

  // Codable 其实是一个组合协议，由 Decodable 和 Encodable 两个协议组成
  struct UserInfo: Codable {
    let username: String
    let loginCount: Int
  }
  extension UserInfo: CustomStringConvertible {
    var description: String {
      return "\(username) 登录 \(loginCount) 次"
    }
  }
  let json = """
  {"username": "David", "loginCount": 2}
  """
  // 使用 JSONDecoder 来序列化JSON
  let decoder = JSONDecoder()

  // 字符串转化为数据对象
  let data = json.data(using: .utf8)!
  let userInfo = try! decoder.decode(UserInfo.self, from: data)
  print(userInfo)

  // 使用 Encodable 序列化结构对象
  let encode = JSONEncoder()
  let userInfoData = try! encoder.encode(userInfo)

  // 数据转字符串
  let jsonString = String(data: userInfoData, encoding: .utf8)
  print(jsonString)
~~~


# 组件的存取控制

~~~
  // 组件：可以是框架或应用，可以通过 import 导入在其他代码中使用的最小单元
  public class AccessLevelsShowcase {
    // 可以被调用方读取的公有变量或方法
    public var somePublicProperty = 0

    // 私有变量或方法
    var someInternalProperty = 0

    // 使用 fileprivate 关键字定义直接内部变量或方法，只能由定义组件的代码级别调用
    fileprivate func someFilePrivateMethod() {}

    // 私有变量或方法
    private func somePrivateMethod() {}
  }
~~~



翻译自：

 * [《Swift 5.1 Cheat Sheet and Quick Reference》](https://www.raywenderlich.com/6362977-swift-5-1-cheat-sheet-and-quick-reference) by raywenderlish.com
 * [英文版pdf](https://koenig-media.raywenderlich.com/uploads/2019/11/RW-Swift-5.1-Cheatsheet-1.0.1.pdf)
 * [Demo代码包](https://koenig-media.raywenderlich.com/uploads/2019/11/RW-Swift-5-1-Cheatsheet_1.0.1.playground.zip)
