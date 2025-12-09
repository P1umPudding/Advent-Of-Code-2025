import { getInputLines } from "../utils.ts";

const lines = getInputLines("09/input/input.txt");

type Point = {
    x: number;
    y: number;
};

type Edge = {
    p1: Point;
    p2: Point;
    isVertical: boolean;
    constant: number; // x for vertical, y for horizontal
    min: number; // min y for vertical, min x for horizontal
    max: number; // max y for vertical, max x for horizontal
};

// Parse tiles
const tiles: Point[] = lines.map((line) => {
    const [x, y] = line.split(",").map(Number);
    return { x, y };
});

// Build edges
const edges: Edge[] = [];
for (let i = 0; i < tiles.length; i++) {
    const p1 = tiles[i];
    const p2 = tiles[(i + 1) % tiles.length];

    const isVertical = p1.x === p2.x;
    const constant = isVertical ? p1.x : p1.y;
    const val1 = isVertical ? p1.y : p1.x;
    const val2 = isVertical ? p2.y : p2.x;

    edges.push({
        p1,
        p2,
        isVertical,
        constant,
        min: Math.min(val1, val2),
        max: Math.max(val1, val2),
    });
}

function isPointOnBoundary(p: Point): boolean {
    for (const edge of edges) {
        if (edge.isVertical) {
            // Use epsilon for float comparison if needed, but here we check exact overlap for degenerate cases
            // If p is center of degenerate rect, it might be integer or .5
            // If .5, it won't match integer constant.
            // But if rect is degenerate (line), center is on the line.
            // If line is on boundary, center is on boundary.
            if (p.x === edge.constant && p.y >= edge.min && p.y <= edge.max) return true;
        } else {
            if (p.y === edge.constant && p.x >= edge.min && p.x <= edge.max) return true;
        }
    }
    return false;
}

function isPointInside(p: Point): boolean {
    // Ray casting to the right
    let intersections = 0;
    for (const edge of edges) {
        if (edge.isVertical) {
            if (edge.constant > p.x) {
                if (p.y >= edge.min && p.y < edge.max) {
                    intersections++;
                }
            }
        }
    }
    return intersections % 2 === 1;
}

let maxArea = 0;

// Iterate all pairs
for (let i = 0; i < tiles.length; i++) {
    for (let j = i; j < tiles.length; j++) {
        const t1 = tiles[i];
        const t2 = tiles[j];

        const width = Math.abs(t1.x - t2.x) + 1;
        const height = Math.abs(t1.y - t2.y) + 1;
        const area = width * height;

        if (area <= maxArea) continue;

        const minX = Math.min(t1.x, t2.x);
        const maxX = Math.max(t1.x, t2.x);
        const minY = Math.min(t1.y, t2.y);
        const maxY = Math.max(t1.y, t2.y);

        // Check 1: Intersection with interior
        let intersectionFound = false;

        if (width > 1 && height > 1) {
            for (const edge of edges) {
                if (edge.isVertical) {
                    if (edge.constant > minX && edge.constant < maxX) {
                        if (Math.max(minY, edge.min) < Math.min(maxY, edge.max)) {
                            intersectionFound = true;
                            break;
                        }
                    }
                } else {
                    if (edge.constant > minY && edge.constant < maxY) {
                        if (Math.max(minX, edge.min) < Math.min(maxX, edge.max)) {
                            intersectionFound = true;
                            break;
                        }
                    }
                }
            }
        }

        if (intersectionFound) continue;

        // Check 2: Center containment
        const centerX = (t1.x + t2.x) / 2;
        const centerY = (t1.y + t2.y) / 2;
        const center = { x: centerX, y: centerY };

        if (isPointOnBoundary(center)) {
            maxArea = area;
        } else if (isPointInside(center)) {
            maxArea = area;
        }
    }
}

console.log(`---------------------------------------\nBiggest possible rectangle area (Part 2): ${maxArea}`);
