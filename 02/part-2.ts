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
    const digits = Math.ceil(Math.log10(num + 1)); // + 1 as for example log10(10) would be 1
    let result = num;
    // build up the number by adding the original num multiplied with the according power of 10 (e.g. for 23 with amount=3: digits=2 -> 23 + 23 * 10^(2*1) + 23 * 10^(2*2) = 23 + 2300 + 230000 = 232323 )
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

        // startNumber can't be built up with with am parts as digitsStart / am is not an integer
        if (startDigitAmountPart % 1 != 0) {
            // if endNumber can't be build up with am parts as well and there is no amount of digits between start and end which can be divided by am (Math.floor(digitsEnd / am) <= Math.floor(digitsStart / am)) we can skip this am
            if (digitsEnd % am != 0 && Math.floor(digitsEnd / am) <= Math.floor(digitsStart / am)) {
                continue;
            }
            checkNumber = Math.pow(10, Math.floor(startDigitAmountPart)); // use the lowest number with one more digit instead (e.g. 10 for startDigit=333 and am 2 to start checking with 1010)
        } else {
            checkNumber = Math.floor((range.start / Math.pow(10, digitsStart)) * Math.pow(10, startDigitAmountPart)); // the leading startDigitAmountPart-amount of digits of the range.start as a number (e.g. 79 if we am=3 and range.start is 791514)
        }

        while (true) {
            const generatedNumber = weirdNumberGeneratorPlus(checkNumber, am); // for am and the current number to check we create the invalid ID (e.g. 797979 for checkNumber=79 and am=3)
            checkNumber++;
            if (generatedNumber > range.end) break; // if we exceeded the range.end we can break and continue with the next am
            if (baseNumbersChecked.has(generatedNumber)) continue; // We need to add this extra hash map as for example 3 time 22 and 2 times 222 both create 222222. To evaluate this beforehand we would have to analise that 22 is 2 times 2 and 222 is 3 times 2 which takes up more performance then this simple hash set. Also this way we can deal with overlapping ranges.
            if (generatedNumber < range.start) continue; // we start a little bit lower rather then to high to make sure we include all edge cases, so we have to exclude numbers below the range
            // if we got here, the number is an invalid ID -> add it to sum and store it in the hash set so we don't add it twice
            console.log("invalid ID:", generatedNumber);
            baseNumbersChecked.add(generatedNumber);
            invalidSum += generatedNumber;
        }
    }
}

console.log(`---------------------------------------\nSum of invalid IDs: ${invalidSum}`);
