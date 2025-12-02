import { getInputLines } from "../utils.ts";

const lines = getInputLines("01/input/input.txt");

let current = 50;
let timesAtZero = 0;
let timesZeroPassed = 0;

for (const line of lines) {
    const change = parseInt(line.substring(1));
    const operator = line[0];

    for (let i = 0; i < change; i++) {
        if (operator === "R") {
            current = (current + 1) % 100;
        } else {
            current = (current - 1 + 100) % 100;
        }
        timesZeroPassed += current === 0 ? 1 : 0;
    }
    timesAtZero += current === 0 ? 1 : 0;
}

console.log(`Solution Part 1: ${timesAtZero}, Solution Part 2: ${timesZeroPassed}`);
