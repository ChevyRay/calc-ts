///<reference path="Calc.ts"/>

class Vector
{
    x:number;
    y:number;

    constructor(x:number, y:number)
    {
        this.x = x;
        this.y = y;
    }

    get length():number
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get angle():number
    {
        return Math.atan2(this.y, this.x);
    }

    clone(result?:Vector):Vector
    {
        if (result)
        {
            result.x = this.x;
            result.y = this.y;
        }
        else
            result = new Vector(this.x, this.y);
        return result;
    }

    normalize():Vector
    {
        var len:number = this.length;
        if (len > 0)
        {
            this.x /= len;
            this.y /= len;
        }
        return this;
    }

    setPolar(angle:number, length:number):Vector
    {
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
        return this;
    }

    turnLeft():Vector
    {
        var x:number = this.x;
        this.x = this.y;
        this.y = -x;
        return this;
    }

    turnRight():Vector
    {
        var x:number = this.x;
        this.x = -this.y;
        this.y = x;
        return this;
    }

    static dist(a:Vector, b:Vector):number
    {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }

    static sqrDist(a:Vector, b:Vector):number
    {
        return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
    }

    static dot(a:Vector, b:Vector):number
    {
        return a.x * b.x + a.y * b.y;
    }

    static cross(a:Vector, b:Vector):number
    {
        return a.x * b.y - a.y * b.x;
    }
}
