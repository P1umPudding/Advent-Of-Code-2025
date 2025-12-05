import { getInputLines } from "../utils.ts";

const lines = getInputLines("05/input/input.txt");

type Range = {
    from: number;
    to: number;
};

const ranges: Range[] = new Array();
const ids: number[] = new Array();

let idSectionStarted = false;
for (const line of lines) {
    if (!idSectionStarted && line.length == 0) {
        idSectionStarted = true;
    }
    if (idSectionStarted) {
        ids.push(parseInt(line));
    } else {
        ranges.push({ from: parseInt(line.split("-")[0]), to: parseInt(line.split("-")[1]) });
    }
}

let amount = 0;
for (const id of ids) {
    for (const range of ranges) {
        if (range.from <= id && range.to >= id) {
            amount++;
            break;
        }
    }
}

console.log(`---------------------------------------\nTotal fresh ingridients: ${amount}`);
