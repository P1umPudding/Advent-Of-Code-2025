import { getInputLines } from "../utils.ts";

const lines = getInputLines("05/input/input.txt");

type Range = {
    from: number;
    to: number;
};

const ranges: Range[] = new Array();

for (const line of lines) {
    if (line.length == 0) {
        break;
    }
    let from = parseInt(line.split("-")[0]);
    let to = parseInt(line.split("-")[1]);
    let buildRanges: Range[] = new Array();
    buildRanges.push({ from, to });

    for (const range of ranges) {
        const newBuildRanges: Range[] = new Array();
        for (const buildRange of buildRanges) {
            if (range.from <= buildRange.from && range.to >= buildRange.to) {
                continue;
            }

            if (range.from <= buildRange.from && range.to > buildRange.from && range.to < buildRange.to) {
                newBuildRanges.push({ from: range.to + 1, to: buildRange.to });
            } else if (range.from > buildRange.from && range.from < buildRange.to && range.to >= buildRange.to) {
                newBuildRanges.push({ from: buildRange.from, to: range.from - 1 });
            } else if (range.from > buildRange.from && range.to < buildRange.to) {
                newBuildRanges.push({ from: buildRange.from, to: range.from - 1 });
                newBuildRanges.push({ from: range.to + 1, to: buildRange.to });
            } else {
                newBuildRanges.push({ from: buildRange.from, to: buildRange.to });
            }
        }

        buildRanges = new Array();
        for (const newBuildRange of newBuildRanges) {
            if (newBuildRange.from <= newBuildRange.to) {
                buildRanges.push(newBuildRange);
            }
        }
    }

    console.log("buildranges:", ...buildRanges);

    ranges.push(...buildRanges);
}

let amount = 0;
for (const range of ranges) {
    console.log("range:", range.from, range.to);
    amount += range.to - range.from + 1;
}

console.log(`---------------------------------------\nTotal possible fresh ids: ${amount}`);
