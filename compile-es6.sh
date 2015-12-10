#!/bin/sh
CMD="tsc --removeComments --declaration --target ES6 -out bin/calc.d.ts src/Calc.ts"
echo $CMD
$CMD
