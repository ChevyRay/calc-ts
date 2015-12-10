"use strict";
var Calc;
(function (Calc) {
    class Matrix {
        constructor() {
            this.m0 = 1;
            this.m1 = 0;
            this.m2 = 0;
            this.m3 = 0;
            this.m4 = 1;
            this.m5 = 0;
        }
        clone(result) {
            if (!result)
                result = new Matrix();
            return result.setValues(this.m0, this.m1, this.m2, this.m3, this.m4, this.m5);
        }
        setValues(m0, m1, m2, m3, m4, m5) {
            this.m0 = m0;
            this.m1 = m1;
            this.m2 = m2;
            this.m3 = m3;
            this.m4 = m4;
            this.m5 = m5;
            return this;
        }
        setIdentity() {
            this.m0 = 1;
            this.m1 = 0;
            this.m2 = 0;
            this.m3 = 0;
            this.m4 = 1;
            this.m5 = 0;
            return this;
        }
        setTranslation(x, y) {
            this.m0 = 1;
            this.m1 = 0;
            this.m2 = x;
            this.m3 = 0;
            this.m4 = 1;
            this.m5 = y;
            return this;
        }
        translate(x, y) {
            this.m2 += x;
            this.m5 += y;
            return this;
        }
        setScale(x, y) {
            this.m0 = x;
            this.m1 = 0;
            this.m2 = 0;
            this.m3 = 0;
            this.m4 = y;
            this.m5 = 0;
            return this;
        }
        scale(x, y) {
            this.m0 *= x;
            this.m1 *= y;
            this.m2 *= x;
            this.m3 *= x;
            this.m4 *= y;
            this.m5 *= y;
            return this;
        }
        setRotation(angle) {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            this.m0 = c;
            this.m1 = -s;
            this.m2 = 0;
            this.m3 = s;
            this.m4 = c;
            this.m5 = 0;
            return this;
        }
        rotate(angle) {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var m0 = this.m0;
            var m3 = this.m3;
            var m2 = this.m2;
            this.m0 = m0 * c - this.m1 * s;
            this.m1 = m0 * s + this.m1 * c;
            this.m3 = m3 * c - this.m4 * s;
            this.m4 = m3 * s + this.m4 * c;
            this.m2 = m2 * c - this.m5 * s;
            this.m5 = m2 * s + this.m5 * c;
            return this;
        }
        invert() {
            var d = 1 / (this.m0 * this.m4 - this.m3 * this.m1);
            return this.setValues(this.m4 * d, -this.m1 * d, (this.m1 * this.m5 - this.m2 * this.m4) * d, -this.m3 * d, this.m0 * d, -(this.m0 * this.m5 - this.m2 * this.m3) * d);
        }
        multiply(m) {
            return this.setValues(this.m0 * m.m0 + this.m3 * m.m1, this.m1 * m.m0 + this.m4 * m.m1, this.m2 * m.m0 + this.m5 * m.m1 + m.m2, this.m0 * m.m3 + this.m3 * m.m4, this.m1 * m.m3 + this.m4 * m.m4, this.m2 * m.m3 + this.m5 * m.m4 + m.m5);
        }
        transformPoint(p, result) {
            result.x = p.x * this.m0 + p.y * this.m1 + this.m2;
            result.y = p.x * this.m3 + p.y * this.m4 + this.m5;
            return result;
        }
        transformVector(p, result) {
            result.x = p.x * this.m0 + p.y * this.m1;
            result.y = p.x * this.m3 + p.y * this.m4;
            return result;
        }
        toArray(a) {
            if (!a)
                a = new Float32Array(9);
            else if (a.length != 9)
                throw ("Expected array length of 9.");
            a[0] = this.m0;
            a[1] = this.m1;
            a[2] = this.m2;
            a[3] = this.m3;
            a[4] = this.m4;
            a[5] = this.m5;
            a[6] = 0;
            a[7] = 0;
            a[8] = 1;
            return a;
        }
        toString() {
            return this.m0 + ", " + this.m1 + ", " + this.m2 + "\n" + this.m3 + ", " + this.m4 + ", " + this.m5;
        }
    }
    Calc.Matrix = Matrix;
})(Calc || (Calc = {}));
var Calc;
(function (Calc) {
    class Matrix3D {
        constructor() {
            this.m11 = 1;
            this.m12 = 0;
            this.m13 = 0;
            this.m14 = 0;
            this.m21 = 0;
            this.m22 = 1;
            this.m23 = 0;
            this.m24 = 0;
            this.m31 = 0;
            this.m32 = 0;
            this.m33 = 1;
            this.m34 = 0;
            this.m41 = 0;
            this.m42 = 0;
            this.m43 = 0;
            this.m44 = 1;
        }
        clone(result) {
            if (!result)
                result = new Matrix3D();
            return result.setValues(this.m11, this.m12, this.m13, this.m14, this.m21, this.m22, this.m23, this.m24, this.m31, this.m32, this.m33, this.m34, this.m41, this.m42, this.m43, this.m44);
        }
        setValues(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
            this.m11 = m11;
            this.m12 = m12;
            this.m13 = m13;
            this.m14 = m14;
            this.m21 = m21;
            this.m22 = m22;
            this.m23 = m23;
            this.m24 = m24;
            this.m31 = m31;
            this.m32 = m32;
            this.m33 = m33;
            this.m34 = m34;
            this.m41 = m41;
            this.m42 = m42;
            this.m43 = m43;
            this.m44 = m44;
            return this;
        }
        setIdentity() {
            return this.setValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        setOrthographic(left, right, bottom, top, zNear, zFar) {
            return this.setValues(2 / (right - left), 0, 0, 0, 0, 2 / (top - bottom), 0, 0, 0, 0, 1 / (zNear - zFar), 0, (left + right) / (left - right), (top + bottom) / (bottom - top), zNear / (zNear - zFar), 1);
        }
        setTranslation(x, y) {
            return this.setValues(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, 0, 1);
        }
        setScale(x, y) {
            return this.setValues(x, 0, 0, 0, 0, y, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        setRotation(angle) {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            return this.setValues(c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        }
        multiply(m) {
            return this.setValues(this.m11 * m.m11 + this.m12 * m.m21 + this.m13 * m.m31 + this.m14 * m.m41, this.m11 * m.m12 + this.m12 * m.m22 + this.m13 * m.m32 + this.m14 * m.m42, this.m11 * m.m13 + this.m12 * m.m23 + this.m13 * m.m33 + this.m14 * m.m43, this.m11 * m.m14 + this.m12 * m.m24 + this.m13 * m.m34 + this.m14 * m.m44, this.m21 * m.m11 + this.m22 * m.m21 + this.m23 * m.m31 + this.m24 * m.m41, this.m21 * m.m12 + this.m22 * m.m22 + this.m23 * m.m32 + this.m24 * m.m42, this.m21 * m.m13 + this.m22 * m.m23 + this.m23 * m.m33 + this.m24 * m.m43, this.m21 * m.m14 + this.m22 * m.m24 + this.m23 * m.m34 + this.m24 * m.m44, this.m31 * m.m11 + this.m32 * m.m21 + this.m33 * m.m31 + this.m34 * m.m41, this.m31 * m.m12 + this.m32 * m.m22 + this.m33 * m.m32 + this.m34 * m.m42, this.m31 * m.m13 + this.m32 * m.m23 + this.m33 * m.m33 + this.m34 * m.m43, this.m31 * m.m14 + this.m32 * m.m24 + this.m33 * m.m34 + this.m34 * m.m44, this.m41 * m.m11 + this.m42 * m.m21 + this.m43 * m.m31 + this.m44 * m.m41, this.m41 * m.m12 + this.m42 * m.m22 + this.m43 * m.m32 + this.m44 * m.m42, this.m41 * m.m13 + this.m42 * m.m23 + this.m43 * m.m33 + this.m44 * m.m43, this.m41 * m.m14 + this.m42 * m.m24 + this.m43 * m.m34 + this.m44 * m.m44);
        }
        invert() {
            var det1 = this.m11 * this.m22 - this.m12 * this.m21;
            var det2 = this.m11 * this.m23 - this.m13 * this.m21;
            var det3 = this.m11 * this.m24 - this.m14 * this.m21;
            var det4 = this.m12 * this.m23 - this.m13 * this.m22;
            var det5 = this.m12 * this.m24 - this.m14 * this.m22;
            var det6 = this.m13 * this.m24 - this.m14 * this.m23;
            var det7 = this.m31 * this.m42 - this.m32 * this.m41;
            var det8 = this.m31 * this.m43 - this.m33 * this.m41;
            var det9 = this.m31 * this.m44 - this.m34 * this.m41;
            var det10 = this.m32 * this.m43 - this.m33 * this.m42;
            var det11 = this.m32 * this.m44 - this.m34 * this.m42;
            var det12 = this.m33 * this.m44 - this.m34 * this.m43;
            var det = 1 / (det1 * det12 - det2 * det11 + det3 * det10 + det4 * det9 - det5 * det8 + det6 * det7);
            return this.setValues((this.m22 * det12 - this.m23 * det11 + this.m24 * det10) * det, (-this.m12 * det12 + this.m13 * det11 - this.m14 * det10) * det, (this.m42 * det6 - this.m43 * det5 + this.m44 * det4) * det, (-this.m32 * det6 + this.m33 * det5 - this.m34 * det4) * det, (-this.m21 * det12 + this.m23 * det9 - this.m24 * det8) * det, (this.m11 * det12 - this.m13 * det9 + this.m14 * det8) * det, (-this.m41 * det6 + this.m43 * det3 - this.m44 * det2) * det, (this.m31 * det6 - this.m33 * det3 + this.m34 * det2) * det, (this.m21 * det11 - this.m22 * det9 + this.m24 * det7) * det, (-this.m11 * det11 + this.m12 * det9 - this.m14 * det7) * det, (this.m41 * det5 - this.m42 * det3 + this.m44 * det1) * det, (-this.m31 * det5 + this.m32 * det3 - this.m34 * det1) * det, (-this.m21 * det10 + this.m22 * det8 - this.m23 * det7) * det, (this.m11 * det10 - this.m12 * det8 + this.m13 * det7) * det, (-this.m41 * det4 + this.m42 * det2 - this.m43 * det1) * det, (this.m31 * det4 - this.m32 * det2 + this.m33 * det1) * det);
        }
        transformPoint(p, result) {
            result.x = p.x * this.m11 + p.y * this.m21 + this.m41;
            result.y = p.x * this.m12 + p.y * this.m22 + this.m42;
            return result;
        }
        transformVector(p, result) {
            result.x = p.x * this.m11 + p.y * this.m21;
            result.y = p.x * this.m12 + p.y * this.m22;
            return result;
        }
        toArray(a) {
            if (!a)
                a = new Float32Array(16);
            else if (a.length != 16)
                throw ("Expected array length of 16.");
            a[0] = this.m11;
            a[1] = this.m12;
            a[2] = this.m13;
            a[3] = this.m14;
            a[4] = this.m21;
            a[5] = this.m22;
            a[6] = this.m23;
            a[7] = this.m24;
            a[8] = this.m31;
            a[9] = this.m32;
            a[10] = this.m33;
            a[11] = this.m34;
            a[12] = this.m41;
            a[13] = this.m42;
            a[14] = this.m43;
            a[15] = this.m44;
            return a;
        }
        toString() {
            return this.m11 + ", " + this.m12 + ", " + this.m13 + this.m14 + "\n" +
                this.m21 + ", " + this.m22 + ", " + this.m23 + this.m24 + "\n" +
                this.m31 + ", " + this.m32 + ", " + this.m33 + this.m34 + "\n" +
                this.m41 + ", " + this.m42 + ", " + this.m43 + this.m44;
        }
    }
    Calc.Matrix3D = Matrix3D;
})(Calc || (Calc = {}));
var Calc;
(function (Calc) {
    class Rectangle {
        constructor(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        contains(x, y) {
            if (typeof x === "number")
                return x > this.minX && y > this.minY && x < this.maxX && y < this.maxY;
            var p = x;
            return p.x > this.minX && p.y > this.minY && p.x < this.maxX && p.y < this.maxY;
        }
        intersects(other) {
            return this.minX < other.maxX && this.minY < other.maxY && this.maxX > other.minX && this.maxY > other.minY;
        }
        get minX() {
            return Math.min(this.x, this.x + this.w);
        }
        get minY() {
            return Math.min(this.y, this.y + this.h);
        }
        get maxX() {
            return Math.max(this.x, this.x + this.w);
        }
        get maxY() {
            return Math.max(this.y, this.y + this.h);
        }
        get sizeX() {
            return this.w > 0 ? this.w : -this.w;
        }
        get sizeY() {
            return this.h > 0 ? this.h : -this.h;
        }
    }
    Calc.Rectangle = Rectangle;
})(Calc || (Calc = {}));
var Calc;
(function (Calc) {
    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        get length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        get angle() {
            return Math.atan2(this.y, this.x);
        }
        clone(result) {
            if (result) {
                result.x = this.x;
                result.y = this.y;
            }
            else
                result = new Vector(this.x, this.y);
            return result;
        }
        normalize() {
            var len = this.length;
            if (len > 0) {
                this.x /= len;
                this.y /= len;
            }
            return this;
        }
        setPolar(angle, length) {
            this.x = Math.cos(angle) * length;
            this.y = Math.sin(angle) * length;
            return this;
        }
        turnLeft() {
            var x = this.x;
            this.x = this.y;
            this.y = -x;
            return this;
        }
        turnRight() {
            var x = this.x;
            this.x = -this.y;
            this.y = x;
            return this;
        }
        static dist(a, b) {
            return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
        }
        static sqrDist(a, b) {
            return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
        }
        static dot(a, b) {
            return a.x * b.x + a.y * b.y;
        }
        static cross(a, b) {
            return a.x * b.y - a.y * b.x;
        }
    }
    Calc.Vector = Vector;
})(Calc || (Calc = {}));
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
