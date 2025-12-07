import { getInputLines } from "../utils.ts";

const lines = getInputLines("07/input/input.txt");

type pos = "." | "^" | number;

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
            fields[row].push(1);
        }
    }
}

for (let r = 0; r < fields.length - 1; r++) {
    for (let c = 0; c < fields[r].length; c++) {
        if (typeof fields[r][c] !== "number") {
            continue;
        }
        if (fields[r + 1][c] === "^") {
            if (typeof fields[r + 1][c - 1] === "number") {
                fields[r + 1][c - 1] = (fields[r + 1][c - 1] as number) + (fields[r][c] as number);
            } else {
                fields[r + 1][c - 1] = fields[r][c] as number;
            }
            if (typeof fields[r + 1][c + 1] === "number") {
                fields[r + 1][c + 1] = (fields[r + 1][c + 1] as number) + (fields[r][c] as number);
            } else {
                fields[r + 1][c + 1] = fields[r][c] as number;
            }
        } else {
            if (typeof fields[r + 1][c] === "number") {
                fields[r + 1][c] = (fields[r + 1][c] as number) + (fields[r][c] as number);
            } else {
                fields[r + 1][c] = fields[r][c] as number;
            }
        }
    }
}

let timelines = 0;
for (let c = 0; c < fields[fields.length - 1].length; c++) {
    if (typeof fields[fields.length - 1][c] === "number") {
        timelines += fields[fields.length - 1][c] as number;
    }
}

console.log(`---------------------------------------\nAmount of splits: ${timelines}`);
