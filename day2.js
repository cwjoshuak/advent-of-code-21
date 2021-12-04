const fs = require("fs");

// https://adventofcode.com/2021/day/2

/**
 *
 * @param {string[]} inputData
 */
function part1(inputData) {
  let depth = 0;
  let position = 0;

  inputData.forEach((line) => {
    let [inst, num] = line.split(" ");
    num = parseInt(num);

    if (inst.startsWith("forward")) position += num;
    else if (inst.startsWith("up")) depth -= num;
    else if (inst.startsWith("down")) depth += num;
  });
  return depth * position;
}

/**
 *
 * @param {string[]} inputData
 */
function part2(inputData) {
  let depth = 0;
  let position = 0;
  let aim = 0;
  inputData.forEach((line) => {
    let [inst, num] = line.split(" ");
    num = parseInt(num);

    if (inst.startsWith("forward")) {
      position += num;
      depth += aim * num;
    } else if (inst.startsWith("up")) aim -= num;
    else if (inst.startsWith("down")) aim += num;
  });
  return depth * position;
}
/**
 * Parses and returns file input as data
 * @param {string} inputFile - Local URL of input file
 * @returns {string[]} int array of input data
 */
function getData(inputFile) {
  return fs.readFileSync(inputFile, "utf-8").split("\n");
}
const data = getData("./input/day2.txt");
console.log(`Part 1: ${part1(data)}`);
console.log(`Part 2: ${part2(data)}`);
