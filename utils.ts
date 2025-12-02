import { readFileSync } from "fs";

export const getInputLines = (filePath: string): string[] => {
    const raw = readFileSync(filePath, "utf8");
    return raw.split("\n").map((line) => line.trim());
};

export const getSeperatedList = (input: string, seperator: string): string[] => {
    return input.split(seperator).map((item) => item.trim());
};
