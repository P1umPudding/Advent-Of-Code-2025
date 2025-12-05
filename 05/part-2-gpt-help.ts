import { getInputLines } from "../utils.ts";

const lines = getInputLines("05/input/input.txt");

type Range = {
    from: number;
    to: number;
};

const ranges: Set<Range> = new Set();

for (const line of lines) {
    if (line.length == 0) {
        break;
    }

    let newRange = { from: parseInt(line.split("-")[0]), to: parseInt(line.split("-")[1]) };
    console.log("new range:", newRange);

    if (ranges.size == 0) {
        ranges.add(newRange);
        continue;
    }

    let managedMerge;
    do {
        managedMerge = false;
        for (let range of ranges) {
            const mergedRange = mergeRanges(range, newRange);
            if (mergedRange.length == 1) {
                console.log("new merge range!", mergedRange[0]);
                newRange = mergedRange[0];
                ranges.delete(range);
                managedMerge = true;
            }
        }
    } while (managedMerge);
    ranges.add(newRange);
}

console.log(`---------------------------------------\nMerged all ranges`);

let amount = 0;
for (const range of ranges) {
    console.log("range:", range.from, range.to);
    amount += range.to - range.from + 1;
}

console.log(`---------------------------------------\nTotal possible fresh ids: ${amount}`);

function mergeRanges(a: Range, b: Range): Range[] {
    // Prüfen, ob sich die Intervalle überschneiden oder aneinanderstoßen
    if (a.to + 1 >= b.from && b.to + 1 >= a.from) {
        // Vereinte Intervalle zurückgeben
        const merged: Range = {
            from: Math.min(a.from, b.from),
            to: Math.max(a.to, b.to),
        };
        return [merged];
    } else {
        // Intervalle bleiben getrennt
        return [a, b];
    }
}
