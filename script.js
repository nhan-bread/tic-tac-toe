const gameBoard = (() => {
    const myGameBoard = [];
    const columns = 3;
    const rows = 3;

    for (i = 0; i < rows; i++) {
        const boardRow = [];
        myGameBoard.push(boardRow);
        for (j = 0; j < columns; j++) {
            boardRow.push(null);
        }
    }

    const placePlayerChoice = (player, row, column) => {
        myGameBoard[row].splice(column, 1, player.marker);
        return myGameBoard;
    }

    const resetGameBoard = () => {
        for (k = 0; k < rows; k++) {
            for (m = 0; m < columns; m++) {
                myGameBoard[k].splice([m], 1, null);
            }
        }
        return myGameBoard;
    }

    const getGameBoard = () => myGameBoard;

    return { placePlayerChoice, getGameBoard, resetGameBoard };
})();


function createPlayer(marker) {
    let score = 0;
    const updateScore = () => {
        score++;
    }
    const getScore = () => score;

    return { marker, getScore, updateScore };
}

const playerOne = createPlayer("X");
const playerTwo = createPlayer("O");

console.log(`Player One's choice: ${gameBoard.placePlayerChoice(playerOne, 1, 1)}`);
console.log(`Player Two's choice: ${gameBoard.placePlayerChoice(playerTwo, 1, 0)}`);
console.log(`Player One's choice: ${gameBoard.placePlayerChoice(playerOne, 2, 0)}`);
console.log(`Player Two's choice: ${gameBoard.placePlayerChoice(playerTwo, 1, 2)}`);
console.log(`Player One's score: ${playerOne.getScore()}`);
console.log(`Player Two's score: ${playerTwo.getScore()}`);
console.log(`Player One's score +1: ${playerOne.updateScore()}`);
console.log(`Player One's score +1 again: ${playerOne.updateScore()}`);
console.log(`Player Two's score +1: ${playerTwo.updateScore()}`);
console.log(`Player One's final score (should be 2): ${playerOne.getScore()}`);
console.log(`Player Two's final score (should be 1): ${playerTwo.getScore()}`);
console.log(`Resetting game board: ${gameBoard.resetGameBoard()}`);