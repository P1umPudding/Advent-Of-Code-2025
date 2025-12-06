import { getInputLinesWithoutTrimming } from "../utils.ts";

const lines = getInputLinesWithoutTrimming("06/input/input.txt");

const numbers: number[][] = new Array();
const cols: string[] = new Array();
let operations: string = "";

for (const line of lines) {
    if (line.includes("+") || line.includes("*")) {
        operations = line.replaceAll(" ", "");
        continue;
    }

    for (let col = 0; col < line.length; col++) {
        if (cols.length - 1 < col) {
            cols.push("");
        }

        cols[col] += line.charAt(col);
    }
}

numbers.push(new Array());
for (const col of cols) {
    const trimmed = col.trim();
    if (trimmed.length == 0) {
        numbers.push(new Array());
        continue;
    }
    numbers[numbers.length - 1].push(parseInt(trimmed));
}

let total = 0;
for (let bigCol = 0; bigCol < numbers.length; bigCol++) {
    const isMult = operations.charAt(bigCol) === "*";
    console.log(`${isMult ? "Multipliying" : "Adding"} numbers: ${numbers[bigCol]}`);
    let result = isMult ? 1 : 0;
    for (let num = 0; num < numbers[bigCol].length; num++) {
        result = isMult ? result * numbers[bigCol][num] : result + numbers[bigCol][num];
    }
    total += result;
}

console.log(`---------------------------------------\nTotal: ${total}`);
