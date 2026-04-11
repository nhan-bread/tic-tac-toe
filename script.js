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

    const placePlayerChoice = (row, column) => {
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
        let winner; 
        
        if (sameFirstRow || sameSecondRow || sameThirdRow ||
            sameFirstColumn || sameSecondColumn || sameThirdColumn ||
            leftToRightDiagonal || rightToLeftDiagonal) {
            player.updateScore();
            winner = true;
        } else winner = false;
        return winner;
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

const gameController = (() => {
    let currentPlayer = playerOne;
    const getCurrentPlayer = () => currentPlayer;

    const changeCurrentPlayer = () => {
        if (currentPlayer == playerOne) {
            currentPlayer = playerTwo;
        } else if (currentPlayer == playerTwo) {
            currentPlayer = playerOne;
        }
    }
    
    const playRound = (row, column) => {
        player = getCurrentPlayer();
        gameBoard.placePlayerChoice(row, column);
        if (!(gameBoard.checkWinner(player))) {
            changeCurrentPlayer();
        } else {
            gameBoard.resetGameBoard();
        }
        return gameBoard.getGameBoard();
    }

    return { playerOne, playerTwo, playRound, getCurrentPlayer };
})();

console.log(`P1 turn: ${gameController.playRound(0, 0)}`);
console.log(`P2 turn: ${gameController.playRound(0, 2)}`);
console.log(`P1 turn: ${gameController.playRound(1, 1)}`);
console.log(`P2 turn: ${gameController.playRound(1, 2)}`);
console.log(`P1 turn: ${gameController.playRound(2, 2)}`); //should call winner here
console.log(gameController.playerOne.getScore());
console.log(gameController.playerTwo.getScore());