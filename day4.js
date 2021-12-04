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
 * @param {string[]} data
 */
function part1(data) {
  const bingoNumbers = data[0].split(",").map((i) => parseInt(i));

  let boards = [];
  let boolBoards = [];
  for (let i = 2; i < data.length; i += 6) {
    boards.push(
      data.slice(i, i + 5).map((i) =>
        i
          .split(" ")
          .filter((i) => i != "")
          .map((i) => parseInt(i))
      )
    );
    boolBoards.push(Array.from({ length: 5 }, (e) => Array(5).fill(false)));
  }
  for (const number of bingoNumbers) {
    for (let board = 0; board < boards.length; board++) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (boards[board][i][j] === number) {
            boolBoards[board][i][j] = true;
            if (checkBoard(boolBoards[board], j)) {
              return number * calcBoard(boards[board], boolBoards[board]);
            }
          }
        }
      }
    }
  }
}

/**
 *
 * @param {string[]} data
 */
function part2(data) {
  const bingoNumbers = data[0].split(",").map((i) => parseInt(i));

  let boards = [];
  let boolBoards = [];
  let wins = {};
  for (let i = 2; i < data.length; i += 6) {
    boards.push(
      data.slice(i, i + 5).map((i) =>
        i
          .split(" ")
          .filter((i) => i != "")
          .map((i) => parseInt(i))
      )
    );
    boolBoards.push(Array.from({ length: 5 }, (e) => Array(5).fill(false)));
  }

  for (const number of bingoNumbers) {
    for (let board = 0; board < boards.length; board++) {
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          if (boards[board][i][j] === number) {
            boolBoards[board][i][j] = true;
            if (checkBoard(boolBoards[board], j)) {
              if (!wins[board]) {
                wins[board] =
                  number * calcBoard(boards[board], boolBoards[board]);

                if (Object.keys(wins).length === boards.length)
                  return number * calcBoard(boards[board], boolBoards[board]);
                wins[board] =
                  number * calcBoard(boards[board], boolBoards[board]);
              }
            }
          }
        }
      }
    }
  }
}

/**
 *
 * @param {boolean[][]} boolBoard
 */
function checkBoard(boolBoard, y) {
  const rowsTrue = boolBoard.some((row) => row.every((val) => val == true));
  let colsTrue = true;
  for (let row = 0; row < 5; row++) {
    if (boolBoard[row][y] == false) {
      colsTrue = false;
    }
  }
  return rowsTrue || colsTrue;
}

/**
 * @param {number[][]} board
 * @param {boolean[][]} boolBoard
 */
function calcBoard(board, boolBoard) {
  let sum = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (boolBoard[i][j] == false) sum += board[i][j];
    }
  }
  return sum;
}

const data = getData("./input/day4.txt");
console.log(`Part 1: ${part1(data)}`);
console.log(`Part 2: ${part2(data)}`);
