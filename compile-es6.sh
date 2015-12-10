#!/bin/sh
CMD="tsc --removeComments --target ES6 -out bin/calc-es6.js src/Calc.ts"
echo $CMD
$CMD
