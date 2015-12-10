#!/bin/sh
CMD="tsc --declaration --target ES5 -outFile bin/calc.d.ts src/Calc.ts"
echo $CMD
$CMD
