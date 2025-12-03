import { getInputLines } from "../utils.ts";

const lines = getInputLines("03/input/input.txt");

const digitAmount = 12;

let total = 0;

for (const line of lines) {
    const digits: number[] = new Array(digitAmount).fill(0);
    const digitPos: number[] = new Array(digitAmount).fill(0);
    digitPos[0] = -1;

    let result = 0;

    for (let d = 0; d < digitAmount; d++) {
        for (let i = digitPos[d] + 1; i < line.length - (digitAmount - d - 1); i++) {
            const currentDigit = parseInt(line.charAt(i));
            if (currentDigit > digits[d]) {
                digits[d] = currentDigit;
                digitPos[d + 1] = i;
            }
            if (digits[d] == 9) break;
        }
        result += digits[d] * Math.pow(10, digitAmount - d - 1);
    }

    total += result;

    console.log(`Line: ${line} with max power ${result}`);
}

console.log(`---------------------------------------\nTotal power: ${total}`);

176582889354075;
