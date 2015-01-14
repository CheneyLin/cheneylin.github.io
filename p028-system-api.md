---
layout: page
title: 【028】系统设计：接口
tagline: Project No.028
project: 028
---
{% include JB/setup %}

##规范

###输入输出数据格式

多字段统一使用body输入json格式数据

    {
        "body":
        {
            "username": "admin"
        }
    }

接口统一返回json格式数据，文档中只提供成功返回数据的输出信息，默认信息统一使用以下json数据

    //通用正常返回信息
    {
        "status":0,
        "info":"server is running."
    }

    //通用错误返回信息
    {
        "status":-1,
        "info":"server is not running."
    }

###接口类型

* ajax post：使用ajax post方式递交数据，返回json数据
* form post：使用form post方式递交数据，跳转指定URL

###接口路径

* 测试接口：http://123.57.52.186:8081/api/test/???.php
* 线上接口：http://123.57.52.186:8081/api/1/???.php

##接口列表

###用户登录

地址：http://123.57.52.186:8081/api/test/login.php

方法：ajax post

输入

    {
        "username":"13900000000",
        "password":"098f6bcd4621d373cade4e832627b4f6",
        "device":"e57b9648d9f0ca9620eff0fa42162273"
    }

输出

    {
        "status": 0,
        "info": "success",
        "data": {
            "userid": "24",
            "unique_code": "16c7066322b351840508830ffdb037c9",
            "username": "18273191335"
        }
    }

###用户注册

地址：http://123.57.52.186:8081/api/test/register.php

方法：ajax post

输入

    {
        "username":"13900000000",
        "password":"098f6bcd4621d373cade4e832627b4f6",
        "device":"e57b9648d9f0ca9620eff0fa42162273"
    }

输出

    {
        "status": 0,
        "info": "success",
        "data": {
            "userid": "24",
            "unique_code": "16c7066322b351840508830ffdb037c9",
            "username": "18273191335"
        }
    }

###第三方用户登录

地址：http://123.57.52.186:8081/api/test/third_login.php

方法：ajax post

输入

    {
        "platform":"wb|qq|wx",
        "uid":"098f6bcd4621d373cade4e832627b4f6",
        "nickname":"abc",
        "img":"http://xxx/xxx.jpg"
    }

输出

    {
        "status":0,
        "info": "success",
        "data":
        {
            "userid": "24",
            "unique_code": "16c7066322b351840508830ffdb037c9",
            "username": "qq_24"
        }
    }

###第三方用户再次登录

地址：http://123.57.52.186:8081/api/test/third_login2.php

方法：ajax post

输入

    {
        "uid":"098f6bcd4621d373cade4e832627b4f6"
    }

输出

    {
        "status":0,
        "info": "success",
        "data":
        {
            "userid": "24",
            "unique_code": "16c7066322b351840508830ffdb037c9",
            "username": "qq_24"
        }
    }

###用户信息

地址：http://123.57.52.186:8081/api/test/user_info.php

方法：ajax post

输入

    {
        "username":"13900000000",
        "unique_code":"098f6bcd4621d373cade4e832627b4f6"
    }

输出

    {
        "status":0,
        "info":"ok",
        "userid":1,
        "username":"13900000000",
        "usericon":"http://xx.xxx.xxx.xxx/images/xx.png"
    }


###用户修改头像

地址：http://123.57.52.186:8081/api/test/user_update_icon.php

方法：ajax post

输入

    {
        "username":"13900000000",
        "unique_code":"098f6bcd4621d373cade4e832627b4f6"
        "image":"文件流"
    }

输出

    {
        "status":0,
        "info":"ok",
        "usericon":"http://xx.xxx.xxx.xxx/images/xx.png"
    }

###用户修改密码

地址：http://123.57.52.186:8081/api/test/user_update_password.php

方法：ajax post

输入

    {
        "username":"13900000000",
        "unique_code":"098f6bcd4621d373cade4e832627b4f6",
        "password":"098f6bcd4621d373cade4e832627b4f6",
        "newpassword":"098f6bcd4621d373cade4e832627b4f6"
    }

###根据坐标返回车位信息列表

地址：http://123.57.52.186:8081/api/test/recommend.php

方法：ajax post

输入：

    {
        "latitude": 39.965628924686,
        "longitude": 116.36758000117,
        "range": 100,
        "page_size": 100,
        "page_num": 1
    }

    latitude	当前纬度
    longitude	当前经度
    range		范围半径（单位：米）

输出：

    {
        "status": 0,
        "info": "success",
        "data":
        [
        {
            "head_pic": "123.57.52.186:8081/d/file/parking/d9f17fa931fc61e93f1e3cd0499e08d6.png",
            "id": "1",
            "title": "北京交通大学",
            "addr": "北京交通大学",
            "is_change": "0",
            "distance": "100",
            "price_type": null,
            "price": "100"
        },
        {
            "head_pic": "123.57.52.186:8081/d/file/parking/d9f17fa931fc61e93f1e3cd0499e08d6.png",
            "id": "2",
            "title": "北京交通大学",
            "addr": "北京交通大学",
            "is_change": "0",
            "distance": "100",
            "price_type": null,
            "price": "100"
        }
        ]
    }

    head_pic	封面图片
    id			车位ID
    title		标题
    addr		地址
    is_change	是否置换
    distance	距离
    price		出租价格

>注：首页定位后返回，如果没有取到对应区域中的有效数据，就返回最新的数据

###图片上传接口

地址：http://123.57.52.186:8081/api/test/addpics.php

方法：form post

输入

    {
        "images":"文件流"
    }

处理

    var my_upload_images = $_COOKIE["my_upload_images"];
    var my_upload_last = "http://xxx/xxx.jpg";
    setcookie("my_upload_images", my_upload_images.','.my_upload_last, time()+3600);
    header('Location: '.$_SERVER['HTTP_HOST'].'/h5/ud/fabucheweitupian.html');
    exit;


###当前坐标上传接口

地址：http://123.57.52.186:8081/api/test/mylocation.php

方法：ajax post

输入

    //存储
    {
        "phone_code":"15074815411",
        "data":
        {
            "latitude": 39.965628924686,
            "longitude": 116.36758000117
        }
    }

    //不用cookie，使用memcache存储
    //setcookie("my_latitude", "39.965628924686", time()+3600);
    //setcookie("my_longitude", "116.36758000117", time()+3600);

    //取出
    {
        "phone_code":"15074815411"
    }


输出（只输入phone_code时返回存储的值）

    {
        "status":0,
        "info":"ok",
        "latitude": 39.965628924686,
        "longitude": 116.36758000117
    }

###发布车位

地址：http://123.57.52.186:8081/api/test/parking.php

方法：ajax post

输入

    {
        "userid": 1,
        "unique_code": "abc",
        "address": "北京交通大学",
        "phonecode": "abc",
        "facilities": "1,2,3",
        "use_instruction": "test",
        "other_instruction": "other",
        "instruction": "instruction",
        "parking_num": 1,
        "day_num": 30,
        "trade_instruction": "trade_instruction",
        "wallet_type": "wallet_type",
        "is_change": 1,
        "wallet_num": "123abc",
        "phone_num": "110",
        "price_type": "123",
        "end_t": "2014-01-01",
        "start_t": "2015-12-30",
        "pics": "1，2，3，4",
        "is_refund": 1,
        "parking_type": "123",
        "parking_longitude": 116.354826,
        "price": 100,
        "have_invoice": -1,
        "parking_latitude": 39.958419
    }

    address             车位地址
    phonecode           手机唯一标识符
    facilities          配套设施
    use_instruction     使用说明
    other_instruction   其他说明
    instruction         详细介绍
    parking_num         车位数量
    day_num             天数
    trade_instruction   交易规则
    wallet_type         收款账号类型
    is_change           是否可置换
    wallet_num          收款账号
    phone_num           手机号码
    price_type          价格类型
    end_t               离开时间
    start_t             入驻时间
    pics                车位照片id集合
    is_refund           是否可退款
    parking_type        车位类型id
    parking_latitude    车位GPS经度
    parking_longitude   车位GPS纬度
    price               价格
    have_invoice        是否提供发票
    userid              用户id
    unique_code         用户登录后服务器返回的唯一标识符

###搜索车位

地址：http://123.57.52.186:8081/api/test/search.php

方法：ajax post

输入

    {
        "latitude": 39.965628924686,
        "longitude": 116.36758000117,
        "radius": 1000,
        "page_index": 0,
        "page_size": 5,
        "q": "北京",
        "start_t": "2015-01-01",
        "end_t": "2015-09-09",
        "high_price": 1000,
        "low_price": "1",
        "parking_type": "",
        "is_change": 1
    }

    latitude        用户当前经度
    longitude       用户当前纬度
    radius          搜索范围，默认1000米
    page_index      当前页的页标（翻页使用）
    page_size       当前页面最大结果数
    q               搜索关键词
    start_t         开始时间
    end_t           离开时间
    high_price      最高单价
    low_price       最低单价
    parking_type    车位类型
    is_change       搜索置换车位（1：是，其他值或者空：非置换搜索）

输出

    {
        "status": 0,
        "info": "success",
        "data": [
            {
                "head_pic": "123.57.52.186:8081/d/file/parking/d9f17fa931fc61e93f1e3cd0499e08d6.png",
                "id": "1",
                "title": "北京交通大学",
                "addr": "北京交通大学",
                "is_change": "0",
                "distance": "100",
                "price_type": null,
                "price": "100"
            },
            {
                "head_pic": "123.57.52.186:8081/d/file/parking/d9f17fa931fc61e93f1e3cd0499e08d6.png",
                "id": "2",
                "title": "北京交通大学",
                "addr": "北京交通大学",
                "is_change": "0",
                "distance": "100",
                "price_type": null,
                "price": "100"
            }
        ]
    }

###车位详情

地址：http://123.57.52.186:8081/api/test/parkinginfo.php

方法：ajax post

输入
    
    {
        "id": 81
    }

输出

    {
        "status": 0,
        "info": "success",
        "data": [
        {
            "head_pic": "http://123.57.52.186:8081/d/file/parking/d9f17fa931fc61e93f1e3cd0499e08d6.png",
            "facilities": "",
            "parking_type": "露天",
            "wallet_type": "支付宝",
            "price_type": "元/日",
            "id": "81",
            "title": "长沙现代商贸城",
            "addr": "长沙现代商贸城",
            "is_change": "-1",
            "parking_num": "1",
            "parking_latitude": "39.958419",
            "parking_longitude": "116.354826",
            "instruction": "instruction",
            "other_instruction": "other",
            "pics": "abc",
            "have_invoice": "-1",
            "phone_num": "15989124145",
            "trade_instruction": "trade_instruction",
            "is_refund": "1",
            "start_t": "1451404800",
            "end_t": "1388505600",
            "day_num": "30",
            "use_instruction": "test",
            "price": "100"
        }
        ]
    }
