import { getInputLines, getSeperatedList } from "../utils.ts";

const lines = getInputLines("02/input/input.txt");

const rangesRaw = getSeperatedList(lines[0], ",");

const ranges: { start: number; end: number }[] = [];

for (const rangeRaw of rangesRaw) {
    ranges.push({
        start: parseInt(rangeRaw.split("-")[0]),
        end: parseInt(rangeRaw.split("-")[1]),
    });
}

let invalidSumPart1 = 0;
let invalidSumPart2 = 0;
const invalidNumbers: Set<number> = new Set();

for (const range of ranges) {
    for (let i = range.start; i <= range.end; i++) {
        const asString = i.toString();
        if (asString.length % 2 === 0) {
            if (asString.substring(0, asString.length / 2) === asString.substring(asString.length / 2)) {
                invalidSumPart1 += i;
                console.log(`Invalid number: ${i}`);
                invalidNumbers.add(i);
            }
        }

        for (let l = 1; l <= Math.floor(asString.length / 2); l++) {
            if (l == asString.length / 2) continue; // already checked above

            if (asString.length % l === 0) {
                const part = asString.substring(0, l);
                let searched = true;
                for (let repeat = 1; repeat < asString.length / l; repeat++) {
                    if (asString.substring(repeat * l, (repeat + 1) * l) !== part) {
                        searched = false;
                        break;
                    }
                }
                if (searched && !invalidNumbers.has(i)) {
                    invalidNumbers.add(i);
                    console.log(`Invalid number only for part 2: ${i}`);
                }
            }
        }
    }
}

for (const num of invalidNumbers) {
    invalidSumPart2 += num;
}

console.log(`---------------------------------------\nSum of invalid numbers part 1: ${invalidSumPart1}`);
console.log(`---------------------------------------\nSum of invalid numbers part 2: ${invalidSumPart2}`);
