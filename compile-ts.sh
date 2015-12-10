#!/bin/sh
CMD="tsc --module amd --declaration --target ES5 -outFile bin/Calc.d.ts src/Calc.ts"
echo $CMD
$CMD
