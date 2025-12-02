import { getInputLines } from "../utils.ts";

const lines = getInputLines("01/input/input.txt");

let current = 50;
let timesAtZero = 0;
for (const line of lines) {
    const change = parseInt(line.substring(1));
    const operator = line[0];
    console.log(`Line: ${line}, Change: ${change}, Result: ${(operator === "R" ? current + change : current - change + 100) % 100}`);
    current = (operator === "R" ? current + change : current - change + 100) % 100;
    if (current === 0) {
        timesAtZero++;
    }
}

console.log(`---------------------------------------\nTimes at Zero: ${timesAtZero}`);
