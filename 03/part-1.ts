import { getInputLines } from "../utils.ts";

const lines = getInputLines("03/input/input.txt");

let total = 0;

for (const line of lines) {
    let firstDigit = 0;
    let firstDigitPos = 0;
    let secondDigit = 0;

    for (let i = 0; i < line.length - 1; i++) {
        const digit = parseInt(line.charAt(i));
        if (firstDigit < digit) {
            firstDigit = digit;
            firstDigitPos = i;
        }
        if (firstDigit == 9) break;
    }

    for (let i = firstDigitPos + 1; i < line.length; i++) {
        secondDigit = Math.max(secondDigit, parseInt(line.charAt(i)));
        if (secondDigit == 9) break;
    }

    const result = firstDigit * 10 + secondDigit;
    total += result;

    console.log(`Line: ${line} with max power ${result}`);
}

console.log(`---------------------------------------\nTotal power: ${total}`);
