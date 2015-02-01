(function (JTopo) {
    function MessageBus(a) {
        var b = this;
        this.name = a, this.messageMap = {}, this.messageCount = 0, this.subscribe = function (a, c) {
            var d = b.messageMap[a];
            null == d && (b.messageMap[a] = []), b.messageMap[a].push(c), b.messageCount++
        }, this.unsubscribe = function (a) {
            var c = b.messageMap[a];
            null != c && (b.messageMap[a] = null, delete b.messageMap[a], b.messageCount--)
        }, this.publish = function (a, c, d) {
            var e = b.messageMap[a];
            if (null != e)
                for (var f = 0; f < e.length; f++) d ? ! function (a, b) {
                    setTimeout(function () {
                        a(b)
                    }, 10)
                }(e[f], c) : e[f](c)
        }
    }

    function getDistance(a, b, c, d) {
        var e, f;
        return null == c && null == d ? (e = b.x - a.x, f = b.y - a.y) : (e = c - a, f = d - b), Math.sqrt(e * e + f * f)
    }

    function getElementsBound(a) {
        for (var b = {
            left: Number.MAX_VALUE,
            right: Number.MIN_VALUE,
            top: Number.MAX_VALUE,
            bottom: Number.MIN_VALUE
        }, c = 0; c < a.length; c++) {
            var d = a[c];
            d instanceof JTopo.Link || (b.left > d.x && (b.left = d.x, b.leftNode = d), b.right < d.x + d.width && (b.right = d.x + d.width, b.rightNode = d), b.top > d.y && (b.top = d.y, b.topNode = d), b.bottom < d.y + d.height && (b.bottom = d.y + d.height, b.bottomNode = d))
        }
        return b.width = b.right - b.left, b.height = b.bottom - b.top, b
    }

    function mouseCoords(a) {
        return a = cloneEvent(a), a.pageX || (a.pageX = a.clientX + document.body.scrollLeft - document.body.clientLeft, a.pageY = a.clientY + document.body.scrollTop - document.body.clientTop), a
    }

    function getEventPosition(a) {
        return a = mouseCoords(a)
    }

    function rotatePoint(a, b, c, d, e) {
        var f = c - a,
            g = d - b,
            h = Math.sqrt(f * f + g * g),
            i = Math.atan2(g, f) + e;
        return {
            x: a + Math.cos(i) * h,
            y: b + Math.sin(i) * h
        }
    }

    function rotatePoints(a, b, c) {
        for (var d = [], e = 0; e < b.length; e++) {
            var f = rotatePoint(a.x, a.y, b[e].x, b[e].y, c);
            d.push(f)
        }
        return d
    }

    function $foreach(a, b, c) {
        function d(e) {
            e != a.length && (b(a[e]), setTimeout(function () {
                d(++e)
            }, c))
        }
        if (0 != a.length) {
            var e = 0;
            d(e)
        }
    }

    function $for(a, b, c, d) {
        function e(a) {
            a != b && (c(b), setTimeout(function () {
                e(++a)
            }, d))
        }
        if (!(a > b)) {
            var f = 0;
            e(f)
        }
    }

    function cloneEvent(a) {
        var b = {};
        for (var c in a) "returnValue" != c && "keyLocation" != c && (b[c] = a[c]);
        return b
    }

    function clone(a) {
        var b = {};
        for (var c in a) b[c] = a[c];
        return b
    }

    function isPointInRect(a, b) {
        var c = b.x,
            d = b.y,
            e = b.width,
            f = b.height;
        return a.x > c && a.x < c + e && a.y > d && a.y < d + f
    }

    function isPointInLine(a, b, c) {
        var d = JTopo.util.getDistance(b, c),
            e = JTopo.util.getDistance(b, a),
            f = JTopo.util.getDistance(c, a),
            g = Math.abs(e + f - d) <= .5;
        return g
    }

    function removeFromArray(a, b) {
        for (var c = 0; c < a.length; c++) {
            var d = a[c];
            if (d === b) {
                a = a.del(c);
                break
            }
        }
        return a
    }

    function randomColor() {
        return Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random()) + "," + Math.floor(255 * Math.random())
    }

    function isIntsect() {}

    function getProperties(a, b) {
        for (var c = "", d = 0; d < b.length; d++) {
            d > 0 && (c += ",");
            var e = a[b[d]];
            "string" == typeof e ? e = '"' + e + '"' : void 0 == e && (e = null), c += b[d] + ":" + e
        }
        return c
    }

    function loadStageFromJson(json, canvas) {
        var obj = eval(json),
            stage = new JTopo.Stage(canvas);
        for (var k in stageObj)
            if ("scenes" != k) stage[k] = obj[k];
            else
                for (var scenes = obj.scenes, i = 0; i < scenes.length; i++) {
                    var sceneObj = scenes[i],
                        scene = new JTopo.Scene(stage);
                    for (var p in sceneObj)
                        if ("elements" != p) scene[p] = sceneObj[p];
                        else
                            for (var nodeMap = {}, elements = sceneObj.elements, m = 0; m < elements.length; m++) {
                                var elementObj = elements[m],
                                    type = elementObj.elementType,
                                    element;
                                "Node" == type && (element = new JTopo.Node);
                                for (var mk in elementObj) element[mk] = elementObj[mk];
                                nodeMap[element.text] = element, scene.add(element)
                            }
                }
        return console.log(stage), stage
    }

    function toJson(a) {
        var b = "backgroundColor,visible,mode,rotate,alpha,scaleX,scaleY,shadow,translateX,translateY,areaSelect,paintAll".split(","),
            c = "text,elementType,x,y,width,height,visible,alpha,rotate,scaleX,scaleY,fillColor,shadow,transformAble,zIndex,dragable,selected,showSelected,font,fontColor,textPosition,textOffsetX,textOffsetY".split(","),
            d = "{";
        d += "frames:" + a.frames, d += ", scenes:[";
        for (var e = 0; e < a.childs.length; e++) {
            var f = a.childs[e];
            d += "{", d += getProperties(f, b), d += ", elements:[";
            for (var g = 0; g < f.childs.length; g++) {
                var h = f.childs[g];
                g > 0 && (d += ","), d += "{", d += getProperties(h, c), d += "}"
            }
            d += "]}"
        }
        return d += "]", d += "}"
    }

    function changeColor(a, b, c, d, e) {
        var f = canvas.width = b.width,
            g = canvas.height = b.height;
        a.clearRect(0, 0, canvas.width, canvas.height), a.drawImage(b, 0, 0);
        for (var h = a.getImageData(0, 0, b.width, b.height), i = h.data, j = 0; f > j; j++)
            for (var k = 0; g > k; k++) {
                var l = 4 * (j + k * f);
                0 != i[l + 3] && (null != c && (i[l + 0] += c), null != d && (i[l + 1] += d), null != e && (i[l + 2] += e))
            }
        a.putImageData(h, 0, 0, 0, 0, b.width, b.height);
        var m = canvas.toDataURL();
        return alarmImageCache[b.src] = m, m
    }

    function genImageAlarm(a, b) {
        null == b && (b = 255);
        try {
            if (alarmImageCache[a.src]) return alarmImageCache[a.src];
            var c = new Image;
            return c.src = changeColor(graphics, a, b), alarmImageCache[a.src] = c, c
        } catch (d) {}
        return null
    }

    function getOffsetPosition(a) {
        if (!a) return {
            left: 0,
            top: 0
        };
        var b = 0,
            c = 0;
        if ("getBoundingClientRect" in document.documentElement) var d = a.getBoundingClientRect(),
            e = a.ownerDocument,
            f = e.body,
            g = e.documentElement,
            h = g.clientTop || f.clientTop || 0,
            i = g.clientLeft || f.clientLeft || 0,
            b = d.top + (self.pageYOffset || g && g.scrollTop || f.scrollTop) - h,
            c = d.left + (self.pageXOffset || g && g.scrollLeft || f.scrollLeft) - i;
        else
            do b += a.offsetTop || 0, c += a.offsetLeft || 0, a = a.offsetParent; while (a);
        return {
            left: c,
            top: b
        }
    }

    function lineF(a, b, c, d) {
        function e(a) {
            return a * f + g
        }
        var f = (d - b) / (c - a),
            g = b - a * f;
        return e.k = f, e.b = g, e.x1 = a, e.x2 = c, e.y1 = b, e.y2 = d, e
    }

    function inRange(a, b, c) {
        var d = Math.abs(b - c),
            e = Math.abs(b - a),
            f = Math.abs(c - a),
            g = Math.abs(d - (e + f));
        return 1e-6 > g ? !0 : !1
    }

    function isPointInLineSeg(a, b, c) {
        return inRange(a, c.x1, c.x2) && inRange(b, c.y1, c.y2)
    }

    function intersection(a, b) {
        var c, d;
        return a.k == b.k ? null : (1 / 0 == a.k || a.k == -1 / 0 ? (c = a.x1, d = b(a.x1)) : 1 / 0 == b.k || b.k == -1 / 0 ? (c = b.x1, d = a(b.x1)) : (c = (b.b - a.b) / (a.k - b.k), d = a(c)), 0 == isPointInLineSeg(c, d, a) ? null : 0 == isPointInLineSeg(c, d, b) ? null : {
            x: c,
            y: d
        })
    }

    function intersectionLineBound(a, b) {
        var c = JTopo.util.lineF(b.left, b.top, b.left, b.bottom),
            d = JTopo.util.intersection(a, c);
        return null == d && (c = JTopo.util.lineF(b.left, b.top, b.right, b.top), d = JTopo.util.intersection(a, c), null == d && (c = JTopo.util.lineF(b.right, b.top, b.right, b.bottom), d = JTopo.util.intersection(a, c), null == d && (c = JTopo.util.lineF(b.left, b.bottom, b.right, b.bottom), d = JTopo.util.intersection(a, c)))), d
    }
    requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function (a) {
        setTimeout(a, 1e3 / 24)
    }, Array.prototype.del = function (a) {
        if ("number" != typeof a) {
            for (var b = 0; b < this.length; b++)
                if (this[b] === a) return this.slice(0, b)
                    .concat(this.slice(b + 1, this.length));
            return this
        }
        return 0 > a ? this : this.slice(0, a)
            .concat(this.slice(a + 1, this.length))
    }, [].indexOf || (Array.prototype.indexOf = function (a) {
        for (var b = 0; b < this.length; b++)
            if (this[b] === a) return b;
        return -1
    }), window.console || (window.console = {
        log: function () {},
        info: function () {},
        debug: function () {},
        warn: function () {},
        error: function () {}
    });
    var canvas = document.createElement("canvas"),
        graphics = canvas.getContext("2d"),
        alarmImageCache = {};
    JTopo.util = {
        rotatePoint: rotatePoint,
        rotatePoints: rotatePoints,
        getDistance: getDistance,
        getEventPosition: getEventPosition,
        mouseCoords: mouseCoords,
        MessageBus: MessageBus,
        isFirefox: navigator.userAgent.indexOf("Firefox") > 0,
        isIE: !(!window.attachEvent || -1 !== navigator.userAgent.indexOf("Opera")),
        isChrome: null != navigator.userAgent.toLowerCase()
            .match(/chrome/),
        clone: clone,
        isPointInRect: isPointInRect,
        isPointInLine: isPointInLine,
        removeFromArray: removeFromArray,
        cloneEvent: cloneEvent,
        randomColor: randomColor,
        isIntsect: isIntsect,
        toJson: toJson,
        loadStageFromJson: loadStageFromJson,
        getElementsBound: getElementsBound,
        genImageAlarm: genImageAlarm,
        getOffsetPosition: getOffsetPosition,
        lineF: lineF,
        intersection: intersection,
        intersectionLineBound: intersectionLineBound
    }, window.$for = $for, window.$foreach = $foreach
})(JTopo)