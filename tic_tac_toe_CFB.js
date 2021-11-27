// TIC TAC TOE
// by Christine Frances Betten
// Game for 2 players
// Run in node.js


// npm install colors
// npm install prompt-sync
const prompt = require("prompt-sync")({ sigint: true });
const colors = require("colors/safe");

let board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];


// // Prints the current game board
function printBoard(board) {
  console.clear();
  for (row of board) {
    console.log(row.join(" "));
  }
  console.log(" ");
}


// // Checks if any row contains three matching symbols
function winningRow(board) {
  for (let i = 0; i < board.length; i++) {
    if (board[i].every((item) => item === board[i][0])) {
      return true;
    }
  }
  return false;
}


// // Checks if any column contains three matching symbols
function winningColumn(board) {
  let columnBoard = [];
  let column = [];
  let counter = 0;
  
// // Flips the board by turning the columns into rows
  while (counter < board[0].length) {
    for (let i = 0; i < board.length; i++) {
      column.push(board[i][counter]);
    }
    columnBoard.push(column);
    column = [];
    counter++;
  }
// // Checks if any of the columns (now rows) contain three matching symbols
  return winningRow(columnBoard);
}


// // Checks if either of the diagonals contain three matching symbols
function winningDiagonal(board) {
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return true;
  } else if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return true;
  }
  return false;
}


// // Checks if any winning conditions are met
function gameWon(a, b, c) {
  let input = Array.from(arguments);
  return input.some((argument) => argument === true);
}


// // // Checks if the board is full
function boardIsFull(board) {
  let filledPositions = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 'X' || board[i][j] === 'O') {
        filledPositions++;
      }
    }
  }

  if (filledPositions >= 9) {
    return true;
  }
  return false;
}


// // Collects player's choice and updates the board
function playerTurn(playerNum) {
    let playerSymbol = playerNum === 1 ? 'O' : 'X';
    
    let rowContainsInput = false;

    while (!rowContainsInput) {
        let playerInput = prompt(colors.yellow(`PLAYER ${playerNum} (${playerSymbol}): Choose where you want to put your ${playerSymbol} (1-9) `));
        playerInput = Number(playerInput);
    
        for (let i = 0; i < board.length; i++) {
          if (board[i].includes(playerInput)) {
            let column = board[i].indexOf(playerInput);
            board[i][column] = playerSymbol;
            rowContainsInput = true;
            break;
          }
        }
        if (!rowContainsInput) {
          console.log(colors.red(`${playerInput} not available, pick a new number`));
        }
    }

    printBoard(board);
}


// Checks if the player's move won or tied the game
function gameIsDone(playerNum) {
    if (gameWon(winningRow(board), winningColumn(board), winningDiagonal(board))) {
        console.log(colors.rainbow(`Player ${playerNum} won the game!`));
        return true;
    }

    if (boardIsFull(board)) {
        console.log(colors.red("The board is full - it's a tie!"));
        return true;
    }
    return false;
}


// Main game function
function game() {
  printBoard(board);

  playerTurn(1);
  if (gameIsDone(1)) {
      return;
  };

  playerTurn(2);
  if (gameIsDone(2)) {
    return;
  };
}


// Welcome message for players
console.log(colors.yellow("Let's play a classic game of Tic Tac Toe!"));
console.log(colors.yellow("This game is for 2 players - player 1 and player 2."));
prompt(colors.rainbow("Let's go! (press enter to start) "));


let playAgain = 'y';

do {
    // Runs the game as long as the board is not full and no player has three symbols in a row
    while (!gameWon(winningRow(board), winningColumn(board), winningDiagonal(board)) && !boardIsFull(board)) {
        game(board);
    }

    // Resets board after finished game
    board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    console.log();
    playAgain = prompt(colors.green('Do you want to play again? (Y/N) '));
    console.log();
}
while (playAgain.toLowerCase() === 'y');

// Goodbye message for players
console.clear();
console.log(colors.rainbow('Thank you for playing Tic Tac Toe!'));
console.log();
