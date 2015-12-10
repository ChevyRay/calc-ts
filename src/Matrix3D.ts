module Calc
{
    export class Matrix3D
    {
        m11:number = 1;
        m12:number = 0;
        m13:number = 0;
        m14:number = 0;
        m21:number = 0;
        m22:number = 1;
        m23:number = 0;
        m24:number = 0;
        m31:number = 0;
        m32:number = 0;
        m33:number = 1;
        m34:number = 0;
        m41:number = 0;
        m42:number = 0;
        m43:number = 0;
        m44:number = 1;

        clone(result?:Matrix3D):Matrix3D
        {
            if (!result)
                result = new Matrix3D();
            return result.setValues(
                this.m11, this.m12, this.m13, this.m14,
                this.m21, this.m22, this.m23, this.m24,
                this.m31, this.m32, this.m33, this.m34,
                this.m41, this.m42, this.m43, this.m44
            );
        }

        setValues(m11:number, m12:number, m13:number, m14:number, m21:number, m22:number, m23:number, m24:number, m31:number, m32:number, m33:number, m34:number, m41:number, m42:number, m43:number, m44:number):Matrix3D
        {
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

        setIdentity():Matrix3D
        {
            return this.setValues(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
        }

        setOrthographic(left:number, right:number, bottom:number, top:number, zNear:number, zFar:number):Matrix3D
        {
            return this.setValues(
                2 / (right - left), 0, 0, 0,
                0, 2 / (top - bottom), 0, 0,
                0, 0, 1 / (zNear - zFar), 0,
                (left + right) / (left - right), (top + bottom) / (bottom - top), zNear / (zNear - zFar), 1
            );
        }

        setTranslation(x:number, y:number):Matrix3D
        {
            return this.setValues(
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                x, y, 0, 1
            );
        }

        setScale(x:number, y:number):Matrix3D
        {
            return this.setValues(
                x, 0, 0, 0,
                0, y, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
        }

        setRotation(angle:number):Matrix3D
        {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            return this.setValues(
                c, s, 0, 0,
                -s, c, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            );
        }

        multiply(m:Matrix3D):Matrix3D
        {
            return this.setValues(
                this.m11 * m.m11 + this.m12 * m.m21 + this.m13 * m.m31 + this.m14 * m.m41,
                this.m11 * m.m12 + this.m12 * m.m22 + this.m13 * m.m32 + this.m14 * m.m42,
                this.m11 * m.m13 + this.m12 * m.m23 + this.m13 * m.m33 + this.m14 * m.m43,
                this.m11 * m.m14 + this.m12 * m.m24 + this.m13 * m.m34 + this.m14 * m.m44,
                this.m21 * m.m11 + this.m22 * m.m21 + this.m23 * m.m31 + this.m24 * m.m41,
                this.m21 * m.m12 + this.m22 * m.m22 + this.m23 * m.m32 + this.m24 * m.m42,
                this.m21 * m.m13 + this.m22 * m.m23 + this.m23 * m.m33 + this.m24 * m.m43,
                this.m21 * m.m14 + this.m22 * m.m24 + this.m23 * m.m34 + this.m24 * m.m44,
                this.m31 * m.m11 + this.m32 * m.m21 + this.m33 * m.m31 + this.m34 * m.m41,
                this.m31 * m.m12 + this.m32 * m.m22 + this.m33 * m.m32 + this.m34 * m.m42,
                this.m31 * m.m13 + this.m32 * m.m23 + this.m33 * m.m33 + this.m34 * m.m43,
                this.m31 * m.m14 + this.m32 * m.m24 + this.m33 * m.m34 + this.m34 * m.m44,
                this.m41 * m.m11 + this.m42 * m.m21 + this.m43 * m.m31 + this.m44 * m.m41,
                this.m41 * m.m12 + this.m42 * m.m22 + this.m43 * m.m32 + this.m44 * m.m42,
                this.m41 * m.m13 + this.m42 * m.m23 + this.m43 * m.m33 + this.m44 * m.m43,
                this.m41 * m.m14 + this.m42 * m.m24 + this.m43 * m.m34 + this.m44 * m.m44
            );
        }

        invert():Matrix3D
        {
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

            return this.setValues(
                (this.m22 * det12 - this.m23 * det11 + this.m24 * det10) * det,
                (-this.m12 * det12 + this.m13 * det11 - this.m14 * det10) * det,
                (this.m42 * det6 - this.m43 * det5 + this.m44 * det4) * det,
                (-this.m32 * det6 + this.m33 * det5 - this.m34 * det4) * det,
                (-this.m21 * det12 + this.m23 * det9 - this.m24 * det8) * det,
                (this.m11 * det12 - this.m13 * det9 + this.m14 * det8) * det,
                (-this.m41 * det6 + this.m43 * det3 - this.m44 * det2) * det,
                (this.m31 * det6 - this.m33 * det3 + this.m34 * det2) * det,
                (this.m21 * det11 - this.m22 * det9 + this.m24 * det7) * det,
                (-this.m11 * det11 + this.m12 * det9 - this.m14 * det7) * det,
                (this.m41 * det5 - this.m42 * det3 + this.m44 * det1) * det,
                (-this.m31 * det5 + this.m32 * det3 - this.m34 * det1) * det,
                (-this.m21 * det10 + this.m22 * det8 - this.m23 * det7) * det,
                (this.m11 * det10 - this.m12 * det8 + this.m13 * det7) * det,
                (-this.m41 * det4 + this.m42 * det2 - this.m43 * det1) * det,
                (this.m31 * det4 - this.m32 * det2 + this.m33 * det1) * det
            );
        }

        transformPoint(p:Vector, result:Vector):Vector
        {
            result.x = p.x * this.m11 + p.y * this.m21 + this.m41;
            result.y = p.x * this.m12 + p.y * this.m22 + this.m42;
            return result;
        }

        transformVector(p:Vector, result:Vector):Vector
        {
            result.x = p.x * this.m11 + p.y * this.m21;
            result.y = p.x * this.m12 + p.y * this.m22;
            return result;
        }

        toArray(a?:Float32Array):Float32Array
        {
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

        toString():string
        {
            return this.m11 + ", " + this.m12 + ", " + this.m13 + this.m14 + "\n" +
                this.m21 + ", " + this.m22 + ", " + this.m23 + this.m24 + "\n" +
                this.m31 + ", " + this.m32 + ", " + this.m33 + this.m34 + "\n" +
                this.m41 + ", " + this.m42 + ", " + this.m43 + this.m44;
        }
    }
}
