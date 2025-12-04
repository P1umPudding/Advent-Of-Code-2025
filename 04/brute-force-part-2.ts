import { getInputLines } from "../utils.ts";

const lines = getInputLines("04/input/input.txt");

const printLines = (lines: string[]) => {
    for (const line of lines) {
        console.log(line);
    }
};

let sum = 0;
let removedInCycle;
do {
    removedInCycle = 0;

    const adjacent: number[][] = lines.map((line) => Array(line.length).fill(0));

    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replaceAll("X", ".");
        const line = lines[i];
        for (let j = 0; j < line.length; j++) {
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

    for (let i = 0; i < adjacent.length; i++) {
        for (let j = 0; j < adjacent[i].length; j++) {
            if (adjacent[i][j] < 4) {
                sum++;
                removedInCycle++;
                lines[i] = lines[i].slice(0, j) + "X" + lines[i].slice(j + 1);
            }
        }
    }
    console.log("roles removed in cycles: ", removedInCycle);
    printLines(lines);
    console.log("____________________________");
} while (removedInCycle > 0);
printLines(lines);

console.log(`---------------------------------------\nTotal acessable rolls: ${sum}`);
