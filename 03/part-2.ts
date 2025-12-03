import { getInputLines } from "../utils.ts";

const lines = getInputLines("03/input/input.txt");

const digitAmount = 12;

let total = 0;

for (const line of lines) {
    const digits: number[] = new Array(digitAmount).fill(0); // 0 = first digit ...
    const digitPos: number[] = new Array(digitAmount).fill(0); // shifted by one as we don't need the last digitPos but need a start pos for the first digit (we act like the -1. digit is at position -1 so we start at 0)
    digitPos[0] = -1;

    let result = 0;

    for (let d = 0; d < digitAmount; d++) {
        for (let i = digitPos[d] + 1; i < line.length - (digitAmount - d - 1); i++) {
            const currentDigit = parseInt(line.charAt(i));

            if (currentDigit > digits[d]) {
                digitPos[d + 1] = i;
                digits[d] = currentDigit;
            }
            if (digits[d] == 9) break; // doesn't get any bigger
        }

        result += digits[d] * Math.pow(10, digitAmount - d - 1); // build up number again (e.g. 9 * 100 + 5 * 10 + 7 = 957)
    }

    total += result;

    console.log(`Line: ${line} with max power ${result}`);
}

console.log(`---------------------------------------\nTotal power: ${total}`);

176582889354075;
