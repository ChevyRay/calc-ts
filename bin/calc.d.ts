declare module Calc {
    function sign(x: number): number;
    function min(a: number, b: number): number;
    function max(a: number, b: number): number;
    function clamp(x: number, min: number, max: number): number;
    function map(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
    function mapClamp(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
    function approach(a: number, b: number, amount: number): number;
    function lerp(a: number, b: number, t: number): number;
    function bezier3(a: number, b: number, c: number, t: number): number;
    function bezier4(a: number, b: number, c: number, d: number, t: number): number;
    function catmullRom(a: number, b: number, c: number, d: number, t: number): number;
    function hermite(p0: number, m0: number, p1: number, m1: number, t: number): number;
    function dist(x0: number, y0: number, x1: number, y1: number): number;
    function sqrDist(x0: number, y0: number, x1: number, y1: number): number;
}
