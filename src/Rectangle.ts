///<reference path="Calc.ts"/>

module Calc
{
    export class Rectangle
    {
        x:number;
        y:number;
        w:number;
        h:number;

        constructor(x:number, y:number, w:number, h:number)
        {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }

        contains(p:Vector):boolean;
        contains(x:number, y:number):boolean;
        contains(x:number|Vector, y?:number):boolean
        {
            if (typeof x === "number")
                return x > this.minX && y > this.minY && x < this.maxX && y < this.maxY;
            var p:Vector = <Vector>x;
            return p.x > this.minX && p.y > this.minY && p.x < this.maxX && p.y < this.maxY;
        }

        intersects(other:Rectangle):boolean
        {
            return this.minX < other.maxX && this.minY < other.maxY && this.maxX > other.minX && this.maxY > other.minY;
        }

        get minX():number
        {
            return Math.min(this.x, this.x + this.w);
        }

        get minY():number
        {
            return Math.min(this.y, this.y + this.h);
        }

        get maxX():number
        {
            return Math.max(this.x, this.x + this.w);
        }

        get maxY():number
        {
            return Math.max(this.y, this.y + this.h);
        }

        get sizeX():number
        {
            return this.w > 0 ? this.w : -this.w;
        }

        get sizeY():number
        {
            return this.h > 0 ? this.h : -this.h;
        }
    }
}
