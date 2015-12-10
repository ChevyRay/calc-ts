"use strict";
var Calc;
(function (Calc) {
    function sign(x) {
        return x > 0 ? 1 : (x < 0 ? -1 : 0);
    }
    Calc.sign = sign;
    function min(a, b) {
        return a < b ? a : b;
    }
    Calc.min = min;
    function max(a, b) {
        return a > b ? a : b;
    }
    Calc.max = max;
    function clamp(x, min, max) {
        if (max > min)
            return x < min ? min : (x > max ? max : x);
        return x < max ? max : (x > min ? min : x);
    }
    Calc.clamp = clamp;
    function map(x, inMin, inMax, outMin, outMax) {
        return outMin + ((x - inMin) / (inMax - inMin)) * (outMax - outMin);
    }
    Calc.map = map;
    function mapClamp(x, inMin, inMax, outMin, outMax) {
        return Calc.clamp(Calc.map(x, inMin, inMax, outMin, outMax), outMin, outMax);
    }
    Calc.mapClamp = mapClamp;
    function approach(a, b, amount) {
        if (a < b) {
            a += amount;
            return a > b ? a : b;
        }
        else {
            a -= amount;
            return a < b ? b : a;
        }
    }
    Calc.approach = approach;
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }
    Calc.lerp = lerp;
    function bezier3(a, b, c, t) {
        return a * (1 - t) * (1 - t) + b * 2 * (1 - t) * t + c * t * t;
    }
    Calc.bezier3 = bezier3;
    function bezier4(a, b, c, d, t) {
        return t * t * t * (d + 3 * (b - c) - a) + 3 * t * t * (a - 2 * b + c) + 3 * t * (b - a) + a;
    }
    Calc.bezier4 = bezier4;
    function catmullRom(a, b, c, d, t) {
        return 0.5 * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (3 * b - a - 3 * c + d) * t * t * t);
    }
    Calc.catmullRom = catmullRom;
    function hermite(p0, m0, p1, m1, t) {
        return (2 * p0 - 2 * p1 + m1 + m0) * t * t * t + (3 * p1 - 3 * p0 - 2 * m0 - m1) * t * t + m0 * t + p0;
    }
    Calc.hermite = hermite;
    function dist(x0, y0, x1, y1) {
        return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
    }
    Calc.dist = dist;
    function sqrDist(x0, y0, x1, y1) {
        return (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1);
    }
    Calc.sqrDist = sqrDist;
})(Calc || (Calc = {}));
