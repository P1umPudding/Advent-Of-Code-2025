import { getInputLines } from "../utils.ts";

const lines = getInputLines("08/input/input.txt");

type Box = {
    id: number;
    x: number;
    y: number;
    z: number;
    connections: Set<number>;
    circuit: number;
};

type Circuit = Box[];

const circuits: Map<number, Circuit> = new Map(
    lines.map((line, i) => {
        const coords = line.split(",").map((c) => parseInt(c));
        const box = {
            id: i,
            x: coords[0],
            y: coords[1],
            z: coords[2],
            connections: new Set<number>(),
            circuit: i,
        };
        return [i, [box]];
    })
);

const dist = (b1: Box, b2: Box): number => {
    return Math.sqrt(Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2) + Math.pow(b1.z - b2.z, 2));
};

for (let i = 1; i <= 1000; i++) {
    let shortestDist = Infinity;
    let closestCirc1Index: number = -1;
    let closestCirc2Index: number = -1;
    let closestBox1: Box | undefined;
    let closestBox2: Box | undefined;

    for (const [circId, circ] of circuits) {
        for (const box of circ) {
            for (const [otherCirdId, otherCirc] of circuits) {
                for (const otherBox of otherCirc) {
                    if (box.id == otherBox.id || otherBox.connections.has(box.id)) {
                        continue;
                    }

                    const d = dist(box, otherBox);
                    if (d < shortestDist) {
                        shortestDist = d;
                        closestBox1 = box;
                        closestBox2 = otherBox;
                        closestCirc1Index = circId;
                        closestCirc2Index = otherCirdId;
                    }
                }
            }
        }
    }

    if (!closestBox1 || !closestBox2) {
        break;
    }

    console.log(`connection ${i}: connecting box [${closestBox1.x},  ${closestBox1.y},  ${closestBox1.z}] to box [${closestBox2.x},  ${closestBox2.y},  ${closestBox2.z}] `);

    const closestCirc2 = circuits.get(closestCirc2Index);
    const closestCirc1 = circuits.get(closestCirc1Index);
    if (!closestCirc1 || !closestCirc2) {
        break;
    }

    if (closestCirc2Index != closestCirc1Index) {
        closestCirc1.push(...closestCirc2);
        circuits.delete(closestCirc2Index);
    }

    closestBox1.connections.add(closestBox2.id);
    closestBox2.connections.add(closestBox1.id);
}

console.log("---------------------------------------");

let result = 1;
const longest = [1, 1, 1];
for (const c of circuits) {
    console.log(c[1].map((v) => `[${v.x}, ${v.y}, ${v.z}]`).join(", "));
    const shortestIndex = longest.indexOf(Math.min(...longest));
    if (longest[shortestIndex] < c[1].length) {
        longest[shortestIndex] = c[1].length;
    }
}

result = longest[0] * longest[1] * longest[2];

console.log(`---------------------------------------\nCircuit-sizes multiplied: ${result}`);
