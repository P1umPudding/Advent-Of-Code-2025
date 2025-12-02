import { getInputLines } from "../utils.ts";

const lines = getInputLines("01/input/input.txt");

let current = 50;
let timesAtZero = 0;
for (const line of lines) {
    let change = parseInt(line.substring(1));
    const operator = line[0];

    let zerosCrossed = 0;
    let newValue = 0;

    zerosCrossed += Math.floor(change / 100);
    change %= 100;

    if (operator === "R") {
        newValue = (current + change) % 100;
        zerosCrossed += current !== 0 && (newValue < current || newValue === 0) ? 1 : 0;
    } else {
        newValue = (current - change + 100) % 100;
        zerosCrossed += current !== 0 && (newValue > current || newValue === 0) ? 1 : 0;
    }

    console.log(`Line: ${line}, Before: ${current}, Result: ${newValue}, Zeros Crossed: ${zerosCrossed}`);

    timesAtZero += zerosCrossed;
    current = newValue;
}

console.log(`---------------------------------------\nTimes at Zero: ${timesAtZero}`);
