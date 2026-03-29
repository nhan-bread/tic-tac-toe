const gameBoard = (() => {
    const myGameBoard = [];
    const columns = 3;
    const rows = 3;

    for (i = 1; i <= rows; i++) {
        const boardRow = [];
        myGameBoard.push(boardRow);
        for (j = 1; j <= columns; j++) {
            boardRow.push(null);
        }
    }
    
    const getGameBoard = () => myGameBoard;

    return { getGameBoard };
})();


function createPlayer(marker) {
    let score;
    const updateScore = () => {
        score++;
    }
    const getScore = () => score;
    return { marker, getScore, updateScore };
}

const playerOne = createPlayer("X");
const playerTwo = createPlayer("O");