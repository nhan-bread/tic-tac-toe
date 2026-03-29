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