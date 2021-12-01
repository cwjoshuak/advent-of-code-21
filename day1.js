const fs = require("fs");

// https://adventofcode.com/2021/day/1

/**
 * PART 1
 * Count the number of times a depth measurement increases from the previous measurement.
 * @param {number[]} inputData - int data array
 *
 **/
function countNumIncrease(inputData) {
  let numLargerThan = 0;
  inputData.slice(0, -1).forEach((num, idx) => {
    if (inputData[idx + 1] > num) numLargerThan += 1;
  });
  return numLargerThan;
}

/**
 * PART 2
 * Count the number of times the sum of measurements in this sliding window of size 3 increases from the previous sum.
 * @param {number[]} inputData - int data array
 */
function countNumIncreaseSliding(inputData) {
  const sum = (prev, curr) => prev + curr;
  let numLargerThan = 0;
  let prevValue = inputData.slice(0, 3).reduce(sum);
  for (let i = 1; i < inputData.length - 2; i++) {
    const currValue = inputData.slice(i, i + 3).reduce(sum);
    if (currValue > prevValue) numLargerThan += 1;
    prevValue = currValue;
  }
  return numLargerThan;
}

/**
 * Parses and returns file input as data
 * @param {string} inputFile - Local URL of input file
 * @returns {number[]} int array of input data
 */
function getData(inputFile) {
  return fs
    .readFileSync(inputFile, "utf-8")
    .split("\n")
    .map((e) => parseInt(e));
}

const data = getData("./input/day1.txt");
console.log(`Part 1: ${countNumIncrease(data)}`);
console.log(`Part 2: ${countNumIncreaseSliding(data)}`);
