---
layout: post
title: HTML5实现视频的分离显示
category : web
description: 【技巧】HTML5实现视频的分离显示
keyword: 疯狂填字,芒果轻应用,麒麟工作室,林长宇,苹果开发者,推送,raywenderlich
tagline: 【技巧】
tags: [html5, canvas, js, video]
postid: 6
---

HTML5中的canvas可以实现很多图像、多媒体方面的功能，比如把视频的内容二次处理后在canvas上显示。

##强大的drawImage

    var video = document.querySelector('video');
    var canvas1 = document.querySelector('#canvas1');
    var ctx1 = canvas1.getContext('2d');
    ctx1.drawImage(video, 0,0, 320, 180, 0,0, 320, 180);

完整代码

    <html >
    <head>
    <meta charset="utf-8" />
    <title></title>

    </head>
    <body>
    <div style="position:absolute;">
        <input type="button" id="play" value="play">
        <span id="position">00:00</span> / <span id="duration"></span>
    </div>
      <div style="position:absolute;top:350px;display:none;">
       <video width="848" height="480" loop>
        <source src="test.mp4" type="video/mp4"/>
      </video>

    </div>
    <div style="position:absolute;left:10px;top:50px;">
      <canvas id="canvas1" width="320" height="180"></canvas>
    </div>
    <div style="position:absolute;left:350px;top:50px;">
      <canvas id="canvas2" width="320" height="180"></canvas>
    </div>
    <div style="position:absolute;left:10px;top:250px;">
      <canvas id="canvas3" width="320" height="180"></canvas>
    </div>
    <div style="position:absolute;left:350px;top:250px;">
      <canvas id="canvas4" width="320" height="180"></canvas>
    </div>
    <div style="position:absolute;left:10px;top:450px;">
      <canvas id="canvas5" width="320" height="180"></canvas>
    </div>
    <div style="position:absolute;left:350px;top:450px;">
      <canvas id="canvas6" width="320" height="180"></canvas>
    </div>
    <script >

        var addEvent = (function () {
            if (document.addEventListener) {
                return function (el, type, fn) {
                    if (el && el.nodeName || el === window) {
                        el.addEventListener(type, fn, false);
                    } else if (el && el.length) {
                        for (var i = 0; i < el.length; i++) {
                            addEvent(el[i], type, fn);
                        }
                    }
                };
            } else {
                return function (el, type, fn) {
                    if (el && el.nodeName || el === window) {
                        el.attachEvent('on' + type, function () { return fn.call(el, window.event); });
                    } else if (el && el.length) {
                        for (var i = 0; i < el.length; i++) {
                            addEvent(el[i], type, fn);
                        }
                    }
                };
            }
        })();

    </script>
    <script>
        var video = document.querySelector('video');
        var togglePlay = document.querySelector('#play');
        var position = document.querySelector('#position');
        var canvas1 = document.querySelector('#canvas1');
        var ctx1 = canvas1.getContext('2d');
        var canvas2 = document.querySelector('#canvas2');
        var ctx2 = canvas2.getContext('2d');
        var canvas3 = document.querySelector('#canvas3');
        var ctx3 = canvas3.getContext('2d');
        var canvas4 = document.querySelector('#canvas4');
        var ctx4 = canvas4.getContext('2d');
        var canvas5 = document.querySelector('#canvas5');
        var ctx5 = canvas5.getContext('2d');
        var canvas6 = document.querySelector('#canvas6');
        var ctx6 = canvas6.getContext('2d');
    var vleft=10;
    var vtop=80;
    var vmargin=4;
    var vwidth=392;
    var vheight=156;
    var canvaswidth=320;
    var canvasheight=180;
        addEvent(togglePlay, 'click', function () {
            //video.playbackRate = 1;
            if (video.paused) {
                if (video.ended) video.currentTime = 0;
                video.play();
                this.value = "pause";
            } else {
                video.pause();
                this.value = "play";
            }
        });

        setInterval(function () {
            position.innerHTML = asTime(video.currentTime);
            ctx1.drawImage(video, vleft,vtop, vwidth, vheight, 0,0, canvaswidth, canvasheight);
            ctx2.drawImage(video, vleft+vwidth+vmargin,vtop, vwidth, vheight, 0,0, canvaswidth, canvasheight);
            ctx3.drawImage(video, vleft+vwidth*2+vmargin,vtop, vwidth, vheight, 0,0, canvaswidth, canvasheight);
            ctx4.drawImage(video, vleft, vtop+vheight+vmargin, vwidth, vheight, 0,0, canvaswidth, canvasheight);
            ctx5.drawImage(video, vleft+vwidth+vmargin,vtop+vheight+vmargin, vwidth, vheight, 0,0, canvaswidth, canvasheight);
            ctx6.drawImage(video, vleft+vwidth*2+vmargin,vtop+vheight+vmargin, vwidth, vheight, 0,0, canvaswidth, canvasheight);
        }, 1000 / 25);

        addEvent(video, 'ended', function () {
            togglePlay.value = "play";
        });

        addEvent(video, 'canplay', function () {
            video.muted = true;
            document.querySelector('#duration').innerHTML = asTime(this.duration);
            startCanvas();
        });


        function startCanvas() {
            //canvas.setAttribute('height', Math.floor(video.height));
            //canvas.setAttribute('width', Math.floor(video.width));

            //ctx.translate(0, canvas.height );
            //ctx.scale(1, -1);
            //ctx.globalAlpha = 0.3;
            ctx1.drawImage(video, vleft,vtop, vwidth, vheight, 0,0, canvaswidth, canvasheight);
            ctx2.drawImage(video, vleft+vwidth+vmargin,vtop, vwidth, vheight, 0,0, canvaswidth, canvasheight);
            ctx3.drawImage(video, vleft+vwidth*2+vmargin,vtop, vwidth, vheight, 0,0, canvaswidth, canvasheight);
            ctx4.drawImage(video, vleft, vtop+vheight+vmargin, vwidth, vheight, 0,0, canvaswidth, canvasheight);
            ctx5.drawImage(video, vleft+vwidth+vmargin,vtop+vheight+vmargin, vwidth, vheight, 0,0, canvaswidth, canvasheight);
            ctx6.drawImage(video, vleft+vwidth*2+vmargin,vtop+vheight+vmargin, vwidth, vheight, 0,0, canvaswidth, canvasheight);


        }

        function asTime(t) {
            t = Math.round(t);
            var s = t % 60;
            var m = Math.round(t / 60);

            return two(m) + ':' + two(s);
        }

        function two(s) {
            s += "";
            if (s.length < 2) s = "0" + s;
            return s;
        }
    </script>
    </body>

    </html>
