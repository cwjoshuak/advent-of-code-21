const fs = require("fs");

/**
 * Parses and returns file input as data
 * @param {string} inputFile - Local URL of input file
 * @returns {string[]} int array of input data
 */
function getData(inputFile) {
  return fs
    .readFileSync(inputFile, "utf-8")
    .split(",")
    .map((i) => parseInt(i));
}

/**
 *
 * @param {int[]} data
 */
function part1(data) {
  for (let i = 0; i < 80; i++) {
    let fishToAdd = 0;
    for (let fish = 0; fish < data.length; fish++) {
      if (data[fish] === 0) {
        data[fish] = 6;
        fishToAdd += 1;
      } else data[fish] -= 1;
    }
    data = data.concat(Array(fishToAdd).fill(8));
  }
  return data.length;
}

/**
 *
 * @param {int[]} data
 */
function part2(data) {
  let lanternfish = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0 };

  data.forEach((el) => (lanternfish[el] += 1));
  for (let i = 0; i < 256; i++) {
    let fishToAdd = 0;
    Object.entries(lanternfish).forEach(([k, v]) => {
      if (k == 0) {
        fishToAdd = v;
      } else lanternfish[k - 1] += v;
      lanternfish[k] = 0;
    });
    lanternfish[8] += fishToAdd;
    lanternfish[6] += fishToAdd;
  }
  return Object.values(lanternfish).reduce((a, b) => a + b);
}

const data = getData("./input/day6.txt");
console.log(`Part 1: ${part1(data)}`);
console.log(`Part 2: ${part2(data)}`);
