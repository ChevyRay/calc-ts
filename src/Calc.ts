///<reference path="Strict.ts"/>
///<reference path="Matrix.ts"/>
///<reference path="Matrix3D.ts"/>
///<reference path="Rectangle.ts"/>
///<reference path="Vector.ts"/>

class Calc
{
    static sign(x:number):number
    {
        return x > 0 ? 1 : (x < 0 ? -1 : 0);
    }

    static min(a:number, b:number):number
    {
        return a < b ? a : b;
    }

    static max(a:number, b:number):number
    {
        return a > b ? a : b;
    }

    static clamp(x:number, min:number, max:number):number
    {
        if (max > min)
            return x < min ? min : (x > max ? max : x);
        return x < max ? max : (x > min ? min : x);
    }

    static map(x:number, inMin:number, inMax:number, outMin:number, outMax:number):number
    {
        return outMin + ((x - inMin) / (inMax - inMin)) * (outMax - outMin);
    }

    static mapClamp(x:number, inMin:number, inMax:number, outMin:number, outMax:number):number
    {
        return Calc.clamp(Calc.map(x, inMin, inMax, outMin, outMax), outMin, outMax);
    }

    static approach(a:number, b:number, amount:number):number
    {
        if (a < b)
        {
            a += amount;
            return a > b ? a : b;
        }
        else
        {
            a -= amount;
            return a < b ? b : a;
        }
    }

    static lerp(a:number, b:number, t:number):number
    {
        return a + (b - a) * t;
    }

    static bezier3(a:number, b:number, c:number, t:number):number
    {
        return a * (1 - t) * (1 - t) + b * 2 * (1 - t) * t + c * t * t;
    }

    static bezier4(a:number, b:number, c:number, d:number, t:number):number
    {
        return t * t * t * (d + 3 * (b - c) - a) + 3 * t * t * (a - 2 * b + c) + 3 * t * (b - a) + a;
    }

    static catmullRom(a:number, b:number, c:number, d:number, t:number):number
    {
        return 0.5 * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (3 * b - a - 3 * c + d) * t * t * t);
    }

    static hermite(p0:number, m0:number, p1:number, m1:number, t:number):number
    {
        return (2 * p0 - 2 * p1 + m1 + m0) * t * t * t + (3 * p1 - 3 * p0 - 2 * m0 - m1) * t * t + m0 * t + p0;
    }

    static dist(x0:number, y0:number, x1:number, y1:number):number
    {
        return Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
    }

    static sqrDist(x0:number, y0:number, x1:number, y1:number):number
    {
        return (x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1);
    }
}
