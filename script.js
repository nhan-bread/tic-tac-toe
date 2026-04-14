const gameBoard = (() => {
    const myGameBoard = [];
    const columns = 3;
    const rows = 3;

    for (i = 0; i < rows; i++) {
        const boardRow = [];
        myGameBoard.push(boardRow);
        for (j = 0; j < columns; j++) {
            boardRow.push("");
        }
    }

    const placePlayerChoice = (row, column) => {
        if (myGameBoard[row][column] !== "") {
            return 'taken';
        } else if (myGameBoard[row][column] == "") {
            myGameBoard[row].splice(column, 1, player.marker);
            return myGameBoard;
        }
    }

    const resetGameBoard = () => {
        for (k = 0; k < rows; k++) {
            for (m = 0; m < columns; m++) {
                myGameBoard[k].splice([m], 1, "");
            }
        }
        return myGameBoard;
    }

    const checkWinner = (player) => {
        let sameFirstRow = myGameBoard[0][0] == myGameBoard[0][1] && myGameBoard[0][1] == myGameBoard[0][2] && myGameBoard[0][2] !== "";
        let sameSecondRow = myGameBoard[1][0] == myGameBoard[1][1] && myGameBoard[1][1] == myGameBoard[1][2] && myGameBoard[1][2] !== "";
        let sameThirdRow = myGameBoard[2][0] == myGameBoard[2][1] && myGameBoard[2][1] == myGameBoard[2][2] && myGameBoard[2][2] !== "";
        let sameFirstColumn = myGameBoard[0][0] == myGameBoard[1][0] && myGameBoard[1][0] == myGameBoard[2][0] && myGameBoard[2][0] !== "";
        let sameSecondColumn = myGameBoard[0][1] == myGameBoard[1][1] && myGameBoard[2][1] == myGameBoard[1][1] && myGameBoard[1][1] !== "";
        let sameThirdColumn = myGameBoard[0][2] == myGameBoard[1][2] && myGameBoard[1][2] == myGameBoard[2][2] && myGameBoard[2][2] !== "";
        let leftToRightDiagonal = myGameBoard[0][0] == myGameBoard[1][1] && myGameBoard[1][1] == myGameBoard[2][2] && myGameBoard[2][2] !== "";
        let rightToLeftDiagonal = myGameBoard[0][2] == myGameBoard[1][1] && myGameBoard[1][1] == myGameBoard[2][0] && myGameBoard[2][0] !== "";
        let emptySpotPresent = getGameBoard()[0].includes("") || getGameBoard()[1].includes("") || getGameBoard()[2].includes("");
        let winner; 
        
        if (sameFirstRow || sameSecondRow || sameThirdRow ||
            sameFirstColumn || sameSecondColumn || sameThirdColumn ||
            leftToRightDiagonal || rightToLeftDiagonal) {
            player.updateScore();
            winner = 'true';
        } else if (emptySpotPresent) {
            winner = 'false';
        } else winner = 'tie';
        return winner;
    }

    const getGameBoard = () => myGameBoard;

    return { placePlayerChoice, getGameBoard, resetGameBoard, checkWinner };
})();


const gameController = (() => {
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
        if ((gameBoard.placePlayerChoice(row, column) !== 'taken') &&
            (gameBoard.checkWinner(player) == 'false')) {
            changeCurrentPlayer();
        }  
        return gameBoard.getGameBoard();
    }

    return { playerOne, playerTwo, playRound, getCurrentPlayer };
})();

const screenController = (() => {
    const rows = 3;
    const columns = 3;
    const board = document.querySelector(".board");
    const turn = document.querySelector(".turn");
    
    const updateScreen = () => {
        board.textContent = "";

        // gameBoard.getGameBoard();
        // gameController.getCurrentPlayer();

        if (gameBoard.checkWinner(gameController.getCurrentPlayer()) == 'true') {
            turn.textContent = `${gameController.getCurrentPlayer().marker} wins!`;
        } else if (gameBoard.checkWinner(gameController.getCurrentPlayer()) == 'tie') {
            turn.textContent = `It's a tie!`;
        } else {
            turn.textContent = `${gameController.getCurrentPlayer().marker}'s turn!`;
        };

        for (n = 0; n < rows; n++) {
            for (p = 0; p < columns; p++) {
                const btn = document.createElement("button");
                board.appendChild(btn);
                btn.dataset.row = n;
                btn.dataset.column = p;
                btn.textContent = `${gameBoard.getGameBoard()[btn.dataset.row][btn.dataset.column]}`;
            }
        }
    };

    const clickEvent = () => {
        board.addEventListener("click", (e) => {
            console.log(`clicked: ${e.target.dataset.row}, ${e.target.dataset.column}`);
            // console.log(`P1 turn: ${gameController.playRound(0, 0)}`);
            gameController.playRound(e.target.dataset.row, e.target.dataset.column);
            updateScreen();
        })
    };

    return { updateScreen, clickEvent };
})();

// console.log(`P1 turn: ${gameController.playRound(0, 0)}`);
// console.log(`P2 turn: ${gameController.playRound(0, 2)}`);
// console.log(`P1 turn: ${gameController.playRound(1, 1)}`);
// console.log(`P2 turn: ${gameController.playRound(1, 2)}`);
// console.log(`Marker at 0, 0: ${gameBoard.getGameBoard()[0][0]}`);
// console.log(typeof gameBoard.getGameBoard()[0][0]);
// console.log(`Current player: ${gameController.getCurrentPlayer()}`);
// console.log(`P1 turn: ${gameController.playRound(2, 2)}`); //should call winner here
// console.log(gameController.playerOne.getScore());
// console.log(gameController.playerTwo.getScore());

screenController.updateScreen();
screenController.clickEvent();