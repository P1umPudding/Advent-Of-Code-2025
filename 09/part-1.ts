import { getInputLines } from "../utils.ts";

const lines = getInputLines("09/input/input.txt");

type Tile = {
    x: number;
    y: number;
};

const tiles: Tile[] = lines.map(
    (line) =>
        ({
            x: parseInt(line.split(",")[0]),
            y: parseInt(line.split(",")[1]),
        } as Tile)
);

let maxArea = 0;
for (const t1 of tiles) {
    for (const t2 of tiles) {
        maxArea = Math.max(maxArea, (Math.abs(t1.x - t2.x) + 1) * (Math.abs(t1.y - t2.y) + 1));
    }
}

console.log(`---------------------------------------\nBiggest possible reactangle area: ${maxArea}`);
