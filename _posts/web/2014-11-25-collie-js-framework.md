---
layout: post
category : web
description: High Performance Mobile Web Game Development in HTML5
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇
tagline: "High Performance Mobile Web Game Development in HTML5"
tags : [js, canvas, DOM, HTML5, game]
---
{% include JB/setup %}

Sangmin is a Senior JavaScript developer working at NHN and the creator of the JavaScript animation library Collie.

I use collie framework to developed some HTML5 game.

[A intro from adobe.com](http://www.adobe.com/cn/devnet/html5/articles/introducing-collie.html).

## COLLIEJS Framework

[CollieJS](http://jindo.dev.naver.com/collie/index.html) is a javascript framework.

#Classes

*  Animation
*  AnimationCycle
*  AnimationDelay
*  AnimationQueue
*  AnimationRepeat
*  AnimationTimeline
*  AnimationTransition
*  Box2d
*  Circle
*  Component
*  ComponentEvent
*  DisplayObject
*  FPSConsole
*  ImageNumber
*  Layer
*  LayerEvent
*  Map
*  MovableObject
*  PathFinding
*  Polyline
*  Pool
*  Rectangle
*  Sensor
*  Text

#Namespaces

*  collie
*  Effect
*  ImageManager
*  Matrix
*  Profiling
*  Renderer
*  Timer
*  Transform
*  util

More information visit [Api Refence](http://jindo.dev.naver.com/collie/doc/index.html?l=en)

## Sample Code

    <div id="container"></div>

    <!-- Load a script -->
    <script type="text/javascript" src="http://jindo.dev.naver.com/collie/deploy/collie.min.js"></script>
    <script type="text/javascript">
    // Load the logo.png image
    collie.ImageManager.add({
        "logo" : "http://jindo.dev.naver.com/collie/img/small/logo.png"
    });

    // Create a layer
    var layer = new collie.Layer({
        width : 300,
        height : 300
    });

    // Create an object that will be displayed on the screen
    var item = new collie.DisplayObject({
        x : "center",
        y : "center",
        velocityRotate : 180,
        backgroundImage : "logo" // The background image is re-sized to the pre-loaded logo.png size
    }).addTo(layer); // Add to a layer

    // Add a layer to renderer
    collie.Renderer.addLayer(layer);

    // Retrieve renderer from the container ID element
    collie.Renderer.load(document.getElementById("container"));

    // Start rendering
    collie.Renderer.start();
    </script>


<div id="container"></div>

<!-- Load a script -->
<script type="text/javascript" src="http://jindo.dev.naver.com/collie/deploy/collie.min.js"></script>
<script type="text/javascript">
// Load the logo.png image
collie.ImageManager.add({
    "logo" : "images/collie.png"
});

// Create a layer
var layer = new collie.Layer({
    width : 300,
    height : 300
});

// Create an object that will be displayed on the screen
var item = new collie.DisplayObject({
    x : "center",
    y : "center",
    velocityRotate : 180,
    backgroundImage : "logo" // The background image is re-sized to the pre-loaded logo.png size
}).addTo(layer); // Add to a layer

// Add a layer to renderer
collie.Renderer.addLayer(layer);

// Retrieve renderer from the container ID element
collie.Renderer.load(document.getElementById("container"));

// Start rendering
collie.Renderer.start();
</script>

##Basic Usages

1.Make your layer for contain objects.

*collie.Layer*

    var layer = new collie.Layer();

2.Make Object for display on layer.

*collie.DisplayObject*

Use MovableObject if you want to use velocity or force attributes.

*collie.MovableObject*

Other objects extends collie.DisplayObject

*collie.Text*

*collie.Circle*

*collie.Polyline*

*collie.Rectangle*

Make sure that you should be append object to layer after make object.

    new collie.DisplayObject().addTo(layer);

3.You can load image for make stylish animation..

*collie.ImageManager*

    collie.ImageManager.add({
    	sample : "image.png",
    	sample2 : "image2.png"
    });

4.If you want to animate objects, you can use collie.Timer

*collie.Timer*

collie.Timer is just initializer. you can find more detail description here.

*  collie.Timer.repeat()
*  collie.Timer.delay()
*  collie.Timer.cycle()
*  collie.Timer.transition()
*  collie.Timer.queue()
*  collie.Timer.timeline()

    collie.Timer.cycle(oDisplayObject, 1000, {
    	to : 10,
    	loop : 3
    });

5.You can use event if you want to run callback when occurs user action.

*collie.DisplayObject*

*collie.Layer*

    new collie.DisplayObject().attach({
    	click : function (e) {
    		console.log(e.x, e.y);
    	}
    });

6.Renderer can help for start animation if you are ready to run.

*collie.Renderer*

    collie.Renderer.addLayer(layer);
    collie.Renderer.load(document.getElementById("container"));
    collie.Renderer.start();

## Demos

  *  [drag](http://jindo.dev.naver.com/collie/demo/drag/)
  *  [box2d](http://jindo.dev.naver.com/collie/demo/box2d/)
  *  [more on http://jindo.dev.naver.com/collie/](http://jindo.dev.naver.com/collie/index.html)

## Works

  *  [JingPaiHongNian](http://mgtv.sinaapp.com/jphn/)
