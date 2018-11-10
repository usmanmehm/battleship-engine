const attackShip = require('./ship.methods').attackShip;

function checkGameStatus(players) {
    return false;
}


function takeTurn (opposingPlayer, guessFunction) {
    const coordinates = guessFunction();
    attackShip(opposingPlayer, coordinates);
    const gameOver = checkGameStatus();

    return gameOver;
}

module.exports.checkGameStatus = checkGameStatus;
module.exports.takeTurn = takeTurn;