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

const weirdNumberGeneratorPlus = (num: number, amount: number): number => {
    const digits = Math.ceil(Math.log10(num + 1));
    let result = num;
    for (let i = 1; i < amount; i++) {
        result += num * Math.pow(10, digits * i);
    }
    return result;
};

for (const range of ranges) {
    const digitsStart = Math.ceil(Math.log10(range.start + 1));
    const digitsEnd = Math.ceil(Math.log10(range.end + 1));
    // am: amount of times the part exists in the id
    for (let am = 2; am <= digitsEnd; am++) {
        const startDigitAmountPart = digitsStart / am; // amount of digits the part we start to cycle through has (e.g. 2 if we try 17 for 1717)
        let checkNumber; // base number to check. so to get e.g. 11 checkNumber would be 1

        if (startDigitAmountPart % 1 != 0) {
            if (digitsEnd % am != 0 && Math.floor(digitsEnd / am) <= Math.floor(digitsStart / am)) {
                continue;
            }
            checkNumber = Math.pow(10, Math.floor(startDigitAmountPart));
        } else {
            checkNumber = Math.floor((range.start / Math.pow(10, digitsStart)) * Math.pow(10, startDigitAmountPart));
        }

        while (true) {
            const generatedNumber = weirdNumberGeneratorPlus(checkNumber, am);
            checkNumber++;
            if (generatedNumber > range.end) break;
            if (baseNumbersChecked.has(generatedNumber)) continue;
            if (generatedNumber < range.start) continue;
            console.log("invalid ID:", generatedNumber);
            baseNumbersChecked.add(generatedNumber);
            invalidSum += generatedNumber;
        }
    }
}

console.log(`---------------------------------------\nSum of invalid IDs: ${invalidSum}`);
