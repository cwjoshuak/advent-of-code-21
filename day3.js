const fs = require("fs");

/**
 * Parses and returns file input as data
 * @param {string} inputFile - Local URL of input file
 * @returns {string[]} int array of input data
 */
function getData(inputFile) {
  return fs.readFileSync(inputFile, "utf-8").split("\r\n");
}

/**
 *
 * @param {string[]} inputData
 * @returns {number}
 */
function part1(inputData) {
  let arr = [...inputData[0]].map(() => ({ 0: 0, 1: 0 }));

  inputData.forEach((i) => {
    i = [...i];
    i.forEach((bit, idx) => (arr[idx][bit] += 1));
  });
  const gamma = Object.entries(arr).map((x) => (x[1][0] > x[1][1] ? 0 : 1));
  const epsilon = Object.entries(arr).map((x) => (x[1][0] > x[1][1] ? 1 : 0));
  return parseInt(gamma.join(""), 2) * parseInt(epsilon.join(""), 2);
}

/**
 *
 * @param {string[]} inputData
 * @returns {number}
 */
function part2(inputData) {
  let currIdx = 0;
  let mostCommonData = [...inputData];
  let leastCommonData = [...inputData];

  while (mostCommonData.length > 1) {
    let arr = [...inputData[0]].map(() => ({ 0: 0, 1: 0 }));

    mostCommonData.forEach((i) => {
      i = [...i];
      const bit = i[currIdx];
      arr[currIdx][bit] += 1;
    });
    const mostCommonBit = arr[currIdx][0] > arr[currIdx][1] ? 0 : 1;

    mostCommonData = mostCommonData.filter(
      (i) => [...i][currIdx] == mostCommonBit
    );
    currIdx += 1;
  }
  currIdx = 0;
  while (leastCommonData.length > 1) {
    let arr = [...inputData[0]].map(() => ({ 0: 0, 1: 0 }));

    leastCommonData.forEach((i) => {
      i = [...i];
      const bit = i[currIdx];
      arr[currIdx][bit] += 1;
    });
    const leastCommonBit =
      arr[currIdx][0] < arr[currIdx][1]
        ? 0
        : arr[currIdx][0] == arr[currIdx][1]
        ? 0
        : 1;
    leastCommonData = leastCommonData.filter(
      (i) => [...i][currIdx] == leastCommonBit
    );
    currIdx += 1;
  }
  const oxy = parseInt(mostCommonData.join(""), 2);
  const co2 = parseInt(leastCommonData.join(""), 2);

  return oxy * co2;
}
const data = getData("./input/day3.txt");
console.log(`Part 1: ${part1(data)}`);
console.log(`Part 2: ${part2(data)}`);
