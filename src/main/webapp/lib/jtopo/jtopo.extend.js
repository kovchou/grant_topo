(function (a) {
    function b(a, b) {
        var c = [];
        if (0 == a.length) return c;
        var d = b.match(/^\s*(\w+)\s*$/);
        if (null != d) {
            var e = a.filter(function (a) {
                return a.elementType == d[1]
            });
            null != e && e.length > 0 && (c = c.concat(e))
        } else {
            var f = !1;
            if (d = b.match(/\s*(\w+)\s*\[\s*(\w+)\s*([>=<])\s*['"](\S+)['"]\s*\]\s*/), (null == d || d.length < 5) && (d = b.match(/\s*(\w+)\s*\[\s*(\w+)\s*([>=<])\s*(\d+(\.\d+)?)\s*\]\s*/), f = !0), null != d && d.length >= 5) {
                var g = d[1],
                    h = d[2],
                    i = d[3],
                    j = d[4];
                e = a.filter(function (a) {
                    if (a.elementType != g) return !1;
                    var b = a[h];
                    return 1 == f && (b = parseInt(b)), "=" == i ? b == j : ">" == i ? b > j : "<" == i ? j > b : "<=" == i ? j >= b : ">=" == i ? b >= j : "!=" == i ? b != j : !1
                }), null != e && e.length > 0 && (c = c.concat(e))
            }
        }
        return c
    }

    function c(a) {
        if (a.find = function (a) {
                return d.call(this, a)
            }, e.forEach(function (b) {
                a[b] = function (a) {
                    for (var c = 0; c < this.length; c++) this[c][b](a);
                    return this
                }
            }), a.length > 0) {
            var b = a[0];
            for (var c in b) {
                var f = b[c];
                "function" == typeof f && !function (b) {
                    a[c] = function () {
                        for (var c = [], d = 0; d < a.length; d++) c.push(b.apply(a[d], arguments));
                        return c
                    }
                }(f)
            }
        }
        return a.attr = function (a, b) {
            if (null != a && null != b)
                for (var c = 0; c < this.length; c++) this[c][a] = b;
            else {
                if (null != a && "string" == typeof a) {
                    for (var d = [], c = 0; c < this.length; c++) d.push(this[c][a]);
                    return d
                }
                if (null != a)
                    for (var c = 0; c < this.length; c++)
                        for (var e in a) this[c][e] = a[e]
            }
            return this
        }, a
    }

    function d(d) {
        var e = [],
            f = [];
        this instanceof a.Stage ? (e = this.childs, f = f.concat(e)) : this instanceof a.Scene ? e = [this] : f = this, e.forEach(function (a) {
            f = f.concat(a.childs)
        });
        var g = null;
        return g = "function" == typeof d ? f.filter(d) : b(f, d), g = c(g)
    }

    var e = "click,mousedown,mouseup,mouseover,mouseout,mousedrag,keydown,keyup".split(",");
    a.Stage.prototype.find = d, a.Scene.prototype.find = d
})(JTopo);

(function (a) {
    function b(a, b) {
        this.x = a, this.y = b
    }

    function c(a) {
        this.p = new b(0, 0), this.w = new b(1, 0), this.paint = a
    }

    function d(a, b, c) {
        return function (d) {
            for (var e = 0; b > e; e++) a(), c && d.turn(c), d.move(3)
        }
    }

    function e(a, b) {
        var c = 2 * Math.PI;
        return function (d) {
            for (var e = 0; b > e; e++) a(), d.turn(c / b)
        }
    }

    function f(a, b, c) {
        return function (d) {
            for (var e = 0; b > e; e++) a(), d.resize(c)
        }
    }

    function g(a) {
        var b = 2 * Math.PI;
        return function (c) {
            for (var d = 0; a > d; d++) c.forward(1), c.turn(b / a)
        }
    }

    function h(a) {
        var b = 4 * Math.PI;
        return function (c) {
            for (var d = 0; a > d; d++) c.forward(1), c.turn(b / a)
        }
    }

    function i(a, b, c, d) {
        return function (e) {
            for (var f = 0; b > f; f++) a(), e.forward(1), e.turn(c), e.resize(d)
        }
    }

    var j = {};
    c.prototype.forward = function (a) {
        var b = this.p,
            c = this.w;
        return b.x = b.x + a * c.x, b.y = b.y + a * c.y, this.paint && this.paint(b.x, b.y), this
    }, c.prototype.move = function (a) {
        var b = this.p,
            c = this.w;
        return b.x = b.x + a * c.x, b.y = b.y + a * c.y, this
    }, c.prototype.moveTo = function (a, b) {
        return this.p.x = a, this.p.y = b, this
    }, c.prototype.turn = function (a) {
        var b = (this.p, this.w),
            c = Math.cos(a) * b.x - Math.sin(a) * b.y,
            d = Math.sin(a) * b.x + Math.cos(a) * b.y;
        return b.x = c, b.y = d, this
    }, c.prototype.resize = function (a) {
        var b = this.w;
        return b.x = b.x * a, b.y = b.y * a, this
    }, c.prototype.save = function () {
        return null == this._stack && (this._stack = []), this._stack.push([this.p, this.w]), this
    }, c.prototype.restore = function () {
        if (null != this._stack && this._stack.length > 0) {
            var a = this._stack.pop();
            this.p = a[0], this.w = a[1]
        }
        return this
    }, j.Tortoise = c, j.shift = d, j.spin = e, j.polygon = g, j.spiral = i, j.star = h, j.scale = f, a.Logo = j
})(window)