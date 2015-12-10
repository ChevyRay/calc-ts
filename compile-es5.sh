#!/bin/sh
CMD="tsc --removeComments --target ES5 -out bin/calc-es5.js src/Calc.ts"
echo $CMD
$CMD
