import { getInputLines } from "../utils.ts";

const lines = getInputLines("06/input/input.txt");

const numbers: number[][] = new Array();
let operations: string = "";

for (const line of lines) {
    if (line.includes("+") || line.includes("*")) {
        operations = line.replaceAll(" ", "");
        continue;
    }

    const newNumbers: number[] = new Array();

    const rawSplit = line.split(" ");
    for (const raw of rawSplit) {
        if (raw.trim().length > 0) {
            newNumbers.push(parseInt(raw.trim()));
        }
    }

    numbers.push(newNumbers);
}

let total = 0;
for (let col = 0; col < numbers[0].length; col++) {
    const isMult = operations.charAt(col) === "*";
    let result = isMult ? 1 : 0;
    for (let row = 0; row < numbers.length; row++) {
        result = isMult ? result * numbers[row][col] : result + numbers[row][col];
    }
    total += result;
}

console.log(`---------------------------------------\nTotal: ${total}`);
