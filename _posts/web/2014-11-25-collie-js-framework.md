---
layout: post
category : web
tagline: "High Performance Mobile Web Game Development in HTML5”"
tags : [js, canvas, DOM, HTML5, game]
---
{% include JB/setup %}

Sangmin is a Senior JavaScript developer working at NHN and the creator of the JavaScript animation library Collie.

I use collie framework to developed some HTML5 game.

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

<pre><code>
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
    width : 320,
    height : 480
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
</code></pre>

## Demos

  *  [drag](http://jindo.dev.naver.com/collie/demo/drag/)
  *  [box2d](http://jindo.dev.naver.com/collie/demo/box2d/)
  *  [more on http://jindo.dev.naver.com/collie/](http://jindo.dev.naver.com/collie/index.html)

## Works

  *  [JingPaiHongNian](http://mgtv.sinaapp.com/jphn/)
