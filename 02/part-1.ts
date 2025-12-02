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

const baseNumbersChecked: Set<number> = new Set();
let invalidSum = 0;

const weirdNumberGenerator = (num: number): number => {
    // digits: Math.ceil(Math.log10(num + 1))
    // e.g. 347 -> 3 digits -> 347 + 347 * 10^3 = 347 + 347000 = 347347
    return num + num * Math.pow(10, Math.ceil(Math.log10(num + 1)));
};

for (const range of ranges) {
    const startDigitAmountHalf = Math.ceil(Math.log10(range.start + 1)) / 2;
    let checkNumber; // base number to check. so to get e.g. 11 checkNumber would be 1

    if (startDigitAmountHalf % 1 != 0) {
        checkNumber = Math.pow(10, Math.floor(startDigitAmountHalf));
    } else {
        checkNumber = Math.floor(range.start / Math.pow(10, startDigitAmountHalf));
    }

    while (true) {
        if (baseNumbersChecked.has(checkNumber)) {
            checkNumber++;
            continue;
        }
        const generatedNumber = weirdNumberGenerator(checkNumber);
        checkNumber++;
        if (generatedNumber > range.end) break;
        if (generatedNumber < range.start) continue;
        console.log("invalid ID:", generatedNumber);
        baseNumbersChecked.add(checkNumber - 1);
        invalidSum += generatedNumber;
    }
}

console.log(`---------------------------------------\nSum of invalid IDs: ${invalidSum}`);
