---
layout: post
category : code
title: SWIFT游戏开发增加音乐、音效
description: 翻译自《iOS Swift Game Development Cookbook》第三版
keyword: 麒麟工作室,林长宇
tagline: 【日志】
tags : [CODE]
postid: 35
headimage : https://cdn.pixabay.com/photo/2020/04/12/08/11/string-5033241_960_720.jpg
---

虽然声音的设计和研发总是在项目接近尾声时开始，但是声音永远是游戏开发需要总体考虑的重要问题。尤其是在手机设备上，环境、噪声有时也让你精心设计的音乐和音效无法让用户很好地感知。

不管怎么说，声音是游戏非常非常非常重要的部分，这是用户能否沉浸和体验你创造的游戏世界的关键。

一起来学习一下iOS播放音乐和音效的强大能力，顺便探索一下语音合成功能。

听起来还不错吧，让我们现在就开始！

# 使用 AVAudioPlayer 播放声音

## 问题

能不能在几分钟内就让我的游戏App开始播放一个声音文件？

## 答案

在iOS中最简单的声音播放解决方案就是使用 AVAudioPlayer ，这个功能包需要引入 AVFoundation 框架包。首先我们来引入 AVFoundation 框架包：

~~~
    import AVFoundation
~~~

提供一个可播放声音文件就可以创建一个 AVAudioPlayer 对象来播放声音。当然你可能需要提前缓存这个声音文件，以免你要播放的时间造成延迟。记住，通过 Bundle 类的方法： url(forResource:, withExtension:) 来存取你添加到XCode项目中的声音文件。

下面这个例子中， audioPlayer 是我们定义的 AVAudioPlayer 实例对象：

~~~
    guard let soundFileURL = Bundle.man.url(forResource: "TestSound",
        withExtension:"wav") else {
        print("URL Wrong")
        return
    }
    do {
        audioPlayer = try AVAudioPlayer(contentsOf: soundFileURL)
    } catch let error {
        print("Failed to load the sound: \(error)")
    }
    audioPlayer?.prepareToPlay()
~~~

使用下面的语句，开始播放吧：

~~~
    audioPlayer?.play()
~~~

如果需要循环播放，你可以设置实例对象的 numberOfLoops 属性，播放一次就停止，请设置为 0

~~~
    audioPlayer?.numberOfLoops = 0
~~~

播放两次就停止，请设置为 1

~~~
    audioPlayer?.numberOfLoops = 1
~~~

一直播放，除非用户来停止，请设置为 -1

~~~
    audioPlayer?.numberOfLoops = -1
~~~

默认情况下，AVAudioPlayer 实例对象只会播放一次。播放结束后，再次播放就会从来开始再播一次。通过 numberOfLoops 属性来控制播一次、播两次、一直播。

使用 pause 和 stop 方法来暂停和停止声音，注意 stop 方法会完全结束播放，并从缓存中清除声音资源。

~~~
    // To pause:
    audioPlayer?.pause()
    // To stop:
    audioPlayer?.stop()
~~~

如果要从头开始播放声音，可以设置 currentTime 属性，以秒为单位标识声音资源已经播放的时长，设置为 0 ，表示声音播放进度回到最开始的地方。

~~~
    audioPlayer?.currentTime = 0
~~~

你可以试试设置为其他数字，看看会不会跳转到其他进度来继续播放。

## 更多信息

AVAudioPlayer 需要使用实例对象，避免系统回收内存时，自动删除AVAudioPlayer对象。

你可以同时播放多个声音，但是你也得管理多个播放对对象，想轻松一点，可以找一些现成的第三方声音控制引擎代码包来帮你管理。

在你准备播放声音之前，你需要知道要播放的文件的地址，或是准备一个存储声音数据的数据对象。

AVAudioPlayer 支持很多声音格式，根据设备各有不同，iPhoneX 支持的格式有：

 * AAC-LC
 * HE-AAC
 * HE-AAC v2
 * Protected AAC
 * MP3
 * Linear PCM (.wav)
 * Apple Lossless
 * FLAC
 * Dolby Digital (AC-3)
 * Dolby Digital Plus (E-AC-3)
 * Audible (formats 2, 3, 4, Audible Enhanced Audio, AAX, and AAX+)

.aac,.mp3,.wav是比较通用的声音文件格式。

下面的代码中，定义了项目文件中一个命名为 TestSound.wav 的声音文件，你可以修改成自己项目里的文件名。

过 Bundle 类的方法： url(forResource:, withExtension:) 来存取你添加到XCode项目中的声音文件。

下面这个例子中， audioPlayer 是我们定义的 AVAudioPlayer 实例对象：

~~~
    guard let soundFileURL = Bundle.man.url(forResource: "TestSound",
        withExtension:"wav") else {
        print("URL Wrong")
        return
    }
~~~

这个 soundFileURL 变量是一个 URL 对象，是我们给 AVAudioPlayer 对象找到要播放的声音文件的定位。

最后，AVAudioPlayer 对象需要手动缓存声音资源文件，否则播放时就会延迟，播放大尺寸声音资源文件时甚至会卡住。另外记住，缓存声音资源是很占内存的，如果你有很多大尺寸声音资源文件，需要额外考虑好内容的处理。

# 使用 AVAudioRecorder 录音

略

# 多个声音播放

## 问题

我有很多个声音播放对象，可不可以在可能的时间复用？

## 答案

创建一个管理器对象来管理多个 AVAudioPlayer 播放器对象。播放前，我们向管理器对象来请求一个 AVAudioPlayer 播放器对象，管理器对象自动返回一个没有在播放的播放器，如果没有，就创建一个并返回。

参考代码如下：

~~~
// An array of all players stored in the pool; not accessible
// outside this file
private var players : [AVAudioPlayer] = []

class AVAudioPlayerPool: NSObject {

    // Given the URL of a sound file, either create or reuse an audio player
    class func player(url : URL) -> AVAudioPlayer? {

        // Try and find a player that can be reused and is not playing
        let availablePlayers = players.filter { (player) -> Bool in
            return player.isPlaying == false && player.url == url
        }

        // If we found one, return it
        if let playerToUse = availablePlayers.first {
            print("Reusing player for \(url.lastPathComponent)")
            return playerToUse
        }

        // Didn't find one? Create a new one

        do {
            let newPlayer = try AVAudioPlayer(contentsOf: url)
            players.append(newPlayer)
            return newPlayer
        } catch let error {
            print("Couldn't load \(url.lastPathComponent): \(error)")
            return nil
        }


    }

}
~~~

使用的时候这样调用：

~~~
if let url = Bundle.main.url(forResource: "TestSound",
                           withExtension: "wav") {
    let player = AVAudioPlayerPool.player(url: url)
    player?.play()
}
~~~

## 更多信息

AVAudioPlayer 对象可以播放多次，但是不允许切换不同的声音资源。所以你要复用一个播放器对象，你只能播放同一个声音资源。你要播放另外的声音，就要一个新的播放器对象。

这也意味着 AVAudioPlayerPool 对象需要明确识别你要播放的声音资源。

我们创建的 AVAudioPlayerPool 对象需要实现：

1. 维护一个 AVAudioPlayer 对象的数组。
2. 请求播放器时，先检查有没有可用的对应URL的播放器对象，如果有就直接返回。
3. 如果没有合适的 AVAudioPlayer 对象，就需要新建一个播放器，并返回，播放结束，这个对象就可以被复用了。

# 多个声音文件的淡入淡出效果

略

# 语音合成

略

# 获取系统音乐APP的信息

略

# 监测系统音乐APP的曲目切换

略

# 控制音乐回放

略

# 用户选择曲目

略

# 与其他APP的声音功能协同

略

# 游戏音效最佳实践

略（保持你的游戏在无声状态下也能完美运行）

本文翻译自《iOS Swift Game Development Cookbook》第三版
 > https://www.oreilly.com/library/view/ios-swift-game/9781491999073/ch04.html

 ![ins](https://learning.oreilly.com/library/cover/9781491999073/250w/)
