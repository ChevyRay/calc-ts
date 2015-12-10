declare class Matrix {
    m0: number;
    m1: number;
    m2: number;
    m3: number;
    m4: number;
    m5: number;
    clone(result?: Matrix): Matrix;
    setValues(m0: number, m1: number, m2: number, m3: number, m4: number, m5: number): Matrix;
    setIdentity(): Matrix;
    setTranslation(x: number, y: number): Matrix;
    translate(x: number, y: number): Matrix;
    setScale(x: number, y: number): Matrix;
    scale(x: number, y: number): Matrix;
    setRotation(angle: number): Matrix;
    rotate(angle: number): Matrix;
    invert(): Matrix;
    multiply(m: Matrix): Matrix;
    transformPoint(p: Vector, result: Vector): Vector;
    transformVector(p: Vector, result: Vector): Vector;
    toArray(a?: Float32Array): Float32Array;
    toString(): string;
}
declare class Matrix3D {
    m11: number;
    m12: number;
    m13: number;
    m14: number;
    m21: number;
    m22: number;
    m23: number;
    m24: number;
    m31: number;
    m32: number;
    m33: number;
    m34: number;
    m41: number;
    m42: number;
    m43: number;
    m44: number;
    clone(result?: Matrix3D): Matrix3D;
    setValues(m11: number, m12: number, m13: number, m14: number, m21: number, m22: number, m23: number, m24: number, m31: number, m32: number, m33: number, m34: number, m41: number, m42: number, m43: number, m44: number): Matrix3D;
    setIdentity(): Matrix3D;
    setOrthographic(left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): Matrix3D;
    setTranslation(x: number, y: number): Matrix3D;
    setScale(x: number, y: number): Matrix3D;
    setRotation(angle: number): Matrix3D;
    multiply(m: Matrix3D): Matrix3D;
    invert(): Matrix3D;
    transformPoint(p: Vector, result: Vector): Vector;
    transformVector(p: Vector, result: Vector): Vector;
    toArray(a?: Float32Array): Float32Array;
    toString(): string;
}
declare class Rectangle {
    x: number;
    y: number;
    w: number;
    h: number;
    constructor(x: number, y: number, w: number, h: number);
    contains(p: Vector): boolean;
    contains(x: number, y: number): boolean;
    intersects(other: Rectangle): boolean;
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    sizeX: number;
    sizeY: number;
}
declare class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number);
    length: number;
    angle: number;
    clone(result?: Vector): Vector;
    normalize(): Vector;
    setPolar(angle: number, length: number): Vector;
    turnLeft(): Vector;
    turnRight(): Vector;
    static dist(a: Vector, b: Vector): number;
    static sqrDist(a: Vector, b: Vector): number;
    static dot(a: Vector, b: Vector): number;
    static cross(a: Vector, b: Vector): number;
}
declare class Calc {
    static sign(x: number): number;
    static min(a: number, b: number): number;
    static max(a: number, b: number): number;
    static clamp(x: number, min: number, max: number): number;
    static map(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
    static mapClamp(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
    static approach(a: number, b: number, amount: number): number;
    static lerp(a: number, b: number, t: number): number;
    static bezier3(a: number, b: number, c: number, t: number): number;
    static bezier4(a: number, b: number, c: number, d: number, t: number): number;
    static catmullRom(a: number, b: number, c: number, d: number, t: number): number;
    static hermite(p0: number, m0: number, p1: number, m1: number, t: number): number;
    static dist(x0: number, y0: number, x1: number, y1: number): number;
    static sqrDist(x0: number, y0: number, x1: number, y1: number): number;
}
