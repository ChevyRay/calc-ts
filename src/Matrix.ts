///<reference path="Vector.ts"/>

module Calc
{
    export class Matrix
    {
        m0:number = 1;
        m1:number = 0;
        m2:number = 0;
        m3:number = 0;
        m4:number = 1;
        m5:number = 0;

        clone(result?:Matrix):Matrix
        {
            if (!result)
                result = new Matrix();
            return result.setValues(this.m0, this.m1, this.m2, this.m3, this.m4, this.m5);
        }

        setValues(m0:number, m1:number, m2:number, m3:number, m4:number, m5:number):Matrix
        {
            this.m0 = m0;
            this.m1 = m1;
            this.m2 = m2;
            this.m3 = m3;
            this.m4 = m4;
            this.m5 = m5;
            return this;
        }

        setIdentity():Matrix
        {
            this.m0 = 1;
            this.m1 = 0;
            this.m2 = 0;
            this.m3 = 0;
            this.m4 = 1;
            this.m5 = 0;
            return this;
        }

        setTranslation(x:number, y:number):Matrix
        {
            this.m0 = 1;
            this.m1 = 0;
            this.m2 = x;
            this.m3 = 0;
            this.m4 = 1;
            this.m5 = y;
            return this;
        }

        translate(x:number, y:number):Matrix
        {
            this.m2 += x;
            this.m5 += y;
            return this;
        }

        setScale(x:number, y:number):Matrix
        {
            this.m0 = x;
            this.m1 = 0;
            this.m2 = 0;
            this.m3 = 0;
            this.m4 = y;
            this.m5 = 0;
            return this;
        }

        scale(x:number, y:number):Matrix
        {
            this.m0 *= x;
            this.m1 *= y;
            this.m2 *= x;
            this.m3 *= x;
            this.m4 *= y;
            this.m5 *= y;
            return this;
        }

        setRotation(angle:number):Matrix
        {
            var c:number = Math.cos(angle);
            var s:number = Math.sin(angle);
            this.m0 = c; this.m1 = -s; this.m2 = 0;
            this.m3 = s; this.m4 = c; this.m5 = 0;
            return this;
        }

        rotate(angle:number):Matrix
        {
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

        invert():Matrix
        {
            var d = 1 / (this.m0 * this.m4 - this.m3 * this.m1);
            return this.setValues(
                this.m4 * d,
                -this.m1 * d,
                (this.m1 * this.m5 - this.m2 * this.m4) * d,
                -this.m3 * d,
                this.m0 * d,
                -(this.m0 * this.m5 - this.m2 * this.m3) * d
            );
        }

        multiply(m:Matrix):Matrix
        {
            return this.setValues(
                this.m0 * m.m0 + this.m3 * m.m1,
                this.m1 * m.m0 + this.m4 * m.m1,
                this.m2 * m.m0 + this.m5 * m.m1 + m.m2,
                this.m0 * m.m3 + this.m3 * m.m4,
                this.m1 * m.m3 + this.m4 * m.m4,
                this.m2 * m.m3 + this.m5 * m.m4 + m.m5
            );
        }

        transformPoint(p:Vector, result:Vector):Vector
        {
            result.x = p.x * this.m0 + p.y * this.m1 + this.m2;
            result.y = p.x * this.m3 + p.y * this.m4 + this.m5;
            return result;
        }

        transformVector(p:Vector, result:Vector):Vector
        {
            result.x = p.x * this.m0 + p.y * this.m1;
            result.y = p.x * this.m3 + p.y * this.m4;
            return result;
        }

        toArray(a?:Float32Array):Float32Array
        {
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

        toString():string
        {
            return this.m0 + ", " + this.m1 + ", " + this.m2 + "\n" + this.m3 + ", " + this.m4 + ", " + this.m5;
        }
    }
}
