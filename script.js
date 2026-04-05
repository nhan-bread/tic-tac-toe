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

    const checkWinner = (player) => {
        let sameFirstRow = myGameBoard[0][0] == myGameBoard[0][1] && myGameBoard[0][1] == myGameBoard[0][2] && myGameBoard[0][2] !== null;
        let sameSecondRow = myGameBoard[1][0] == myGameBoard[1][1] && myGameBoard[1][1] == myGameBoard[1][2] && myGameBoard[1][2] !== null;
        let sameThirdRow = myGameBoard[2][0] == myGameBoard[2][1] && myGameBoard[2][1] == myGameBoard[2][2] && myGameBoard[2][2] !== null;
        let sameFirstColumn = myGameBoard[0][0] == myGameBoard[1][0] && myGameBoard[1][0] == myGameBoard[2][0] && myGameBoard[2][0] !== null;
        let sameSecondColumn = myGameBoard[0][1] == myGameBoard[1][1] && myGameBoard[2][1] == myGameBoard[1][1] && myGameBoard[1][1] !== null;
        let sameThirdColumn = myGameBoard[0][2] == myGameBoard[1][2] && myGameBoard[1][2] == myGameBoard[2][2] && myGameBoard[2][2] !== null;
        let leftToRightDiagonal = myGameBoard[0][0] == myGameBoard[1][1] && myGameBoard[1][1] == myGameBoard[2][2] && myGameBoard[2][2] !== null;
        let rightToLeftDiagonal = myGameBoard[0][2] == myGameBoard[1][1] && myGameBoard[1][1] == myGameBoard[2][0] && myGameBoard[2][0] !== null;
           
        if (sameFirstRow || sameSecondRow || sameThirdRow ||
            sameFirstColumn || sameSecondColumn || sameThirdColumn ||
            leftToRightDiagonal || rightToLeftDiagonal) {
            player.updateScore();
            return `${player.marker} wins!`;
        } else return `no winner yet`;
    }

    const getGameBoard = () => myGameBoard;

    return { placePlayerChoice, getGameBoard, resetGameBoard, checkWinner};
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

console.log(`Player One's choice: ${gameBoard.placePlayerChoice(playerOne, 0, 0)}`);
console.log(`Player Two's choice: ${gameBoard.placePlayerChoice(playerTwo, 0, 2)}`);
console.log(`Player One's choice: ${gameBoard.placePlayerChoice(playerOne, 0, 1)}`);
console.log(`Player Two's choice: ${gameBoard.placePlayerChoice(playerTwo, 2, 0)}`);
console.log(`Player One's score: ${playerOne.getScore()}`);
console.log(`Player Two's score: ${playerTwo.getScore()}`);
console.log(`Player One's score +1: ${playerOne.updateScore()}`);
console.log(`Player One's score +1 again: ${playerOne.updateScore()}`);
console.log(`Player Two's score +1: ${playerTwo.updateScore()}`);
console.log(`Player One's final score (should be 2): ${playerOne.getScore()}`);
console.log(`Player Two's final score (should be 1): ${playerTwo.getScore()}`);
//console.log(`Player One's choice: ${gameBoard.placePlayerChoice(playerOne, 1, 1)}`);
//console.log(`Player Two's choice: ${gameBoard.placePlayerChoice(playerTwo, 1, 1)}`);
console.log(`Player One's choice: ${gameBoard.placePlayerChoice(playerOne, 2, 1)}`);
//console.log(`Player Two's choice: ${gameBoard.placePlayerChoice(playerTwo, 0, 2)}`);
console.log(`Checking for winner: ${gameBoard.checkWinner(playerTwo)}`);
console.log(`Player One's score: ${playerOne.getScore()}`);
console.log(`Player Two's score: ${playerTwo.getScore()}`);
console.log(`Getting last item: ${gameBoard.getGameBoard()[2][2]}`);
console.log(`Resetting game board: ${gameBoard.resetGameBoard()}`);