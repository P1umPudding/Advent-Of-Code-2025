import { getInputLines } from "../utils.ts";

const lines = getInputLines("07/input/input.txt");

type pos = "." | "^" | "|";

const fields: pos[][] = new Array();

for (const line of lines) {
    fields.push(new Array());
    const row = fields.length - 1;
    for (let i = 0; i < line.length; i++) {
        const c = line.charAt(i);
        if (c === "." || c === "^" || c === "|") {
            fields[row].push(c as pos);
        }
        if (c === "S") {
            fields[row].push("|");
        }
    }
}

let splits = 0;
for (let r = 0; r < fields.length - 1; r++) {
    console.log(fields[r].join(""));
    for (let c = 0; c < fields[r].length; c++) {
        if (fields[r][c] !== "|") {
            continue;
        }
        if (fields[r + 1][c] === "^") {
            fields[r + 1][c - 1] = "|";
            fields[r + 1][c + 1] = "|";
            splits++;
        } else {
            fields[r + 1][c] = "|";
        }
    }
}

console.log(`---------------------------------------\nAmount of splits: ${splits}`);
