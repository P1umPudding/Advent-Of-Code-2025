import { getInputLines } from "../utils.ts";

const lines = getInputLines("10/input/big-test.txt");

type Machine = {
    reqLights: boolean[];
    buttons: number[][];
};

const machines: Machine[] = new Array();

for (const line of lines) {
    const lFull = line.split("]")[0].replace("[", "");
    const l: boolean[] = new Array();
    for (const c of lFull) {
        l.push(c === "#");
    }

    let bFull = line.replaceAll(" ", "").substring(line.indexOf("]") + 1);
    bFull = bFull.substring(0, bFull.indexOf("{") - 1).replaceAll("(", "");
    const b: number[][] = new Array();
    for (const bGroup of bFull.split(")")) {
        b.push(bGroup.split(",").map((n) => parseInt(n)));
    }

    machines.push({ reqLights: l, buttons: b });
}

for (const m of machines) {
    console.log(m.reqLights.map((v) => (v ? "#" : ".")).join(""));
    console.log(`(${m.buttons.map((i) => i.join(",")).join(")(")})`);
}

const pressButton = (currentLights: boolean[], lightGoal: boolean[], buttons: Set<number[]>, presses: number): number => {
    let min = Infinity;
    // console.log(buttons.size);
    if (buttons.size == 0 || (currentLights.length === lightGoal.length && currentLights.every((v, i) => v === lightGoal[i]))) {
        // console.log("found option with x pressed: ", presses);
        return presses;
    } else {
        for (const b of buttons) {
            const reducedButtons = new Set(buttons);
            reducedButtons.delete(b);
            const newCurrentLights = [...currentLights];
            for (const n of b) {
                newCurrentLights[n] = !newCurrentLights[n];
            }
            min = Math.min(min, pressButton(newCurrentLights, lightGoal, reducedButtons, presses + 1));
        }
        return min;
    }
};

let sum = 0;
for (const m of machines) {
    console.log("searching for button size:", m.buttons.length);
    const minPresses = pressButton(new Array(m.reqLights.length).fill(false), [...m.reqLights], new Set(m.buttons), 0);
    console.log(minPresses);
    sum += minPresses;
}

console.log(`---------------------------------------\nTotal amount of presses: ${sum}`);
