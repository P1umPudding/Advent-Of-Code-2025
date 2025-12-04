import { getInputLines } from "../utils.ts";

const lines = getInputLines("04/input/input.txt");

const adjacent: number[][] = lines.map((line) => Array(line.length).fill(0));

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // console.log("line:", i, line);
    for (let j = 0; j < line.length; j++) {
        // console.log("char:", j, line.charAt(j));
        if (line.charAt(j) === "@") {
            for (let a = -1; a <= 1; a++) {
                for (let b = -1; b <= 1; b++) {
                    if (i + a < lines.length && i + a >= 0 && j + b < line.length && j + b >= 0 && !(a == 0 && b == 0)) {
                        adjacent[i + a][j + b]++;
                    }
                }
            }
        } else {
            adjacent[i][j] = 10;
        }
    }
}

let sum = 0;
for (let i = 0; i < adjacent.length; i++) {
    for (let j = 0; j < adjacent[i].length; j++) {
        if (adjacent[i][j] < 4) {
            sum++;
        }
    }
}

console.log(`---------------------------------------\nTotal acessable rolls: ${sum}`);
