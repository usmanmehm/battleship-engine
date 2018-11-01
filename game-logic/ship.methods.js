
function isShipPresent (ship, coordinates) {
    let shipPresent;
    shipPresent = ship.locations.filter( actualCoordinate => {
        return (actualCoordinate[0] === coordinates[0]) && (actualCoordinate[1] === coordinates[1]);
    });
    return shipPresent[0];
}

function checkForShip ( player, coordinates) {
    return player.ships.some( ship => { // the some array method *returns true* if any element in the array evaluates to true
        return isShipPresent(ship, coordinates); // this is the check used by the some method
    });
    // if the some method runs until every element in the array is checked, it will return false
}


function damageShip(ship, coordinates) {
    ship.damage.push(coordinates);
}

function isDamaged(ship, coordinates) {
    return ship.damage.some( coordinate => {
        return (coordinate[0] === coordinates[0]) && (coordinate[1] === coordinates[1]); 
    });
}

function attackShip(player, coordinates) {
    if (checkForShip(player, coordinates)) {
        for (i = 0; i < player.ships.length; i++) {
            let ship = player.ships[i];
            if (isShipPresent(ship, coordinates) && !isDamaged(ship, coordinates)) {
                damageShip(ship, coordinates);
                console.log("A ship at " + coordinates + " was hit!");
                return coordinates;
            }
        }
    };
    return false;
}

module.exports.checkForShip = checkForShip;
module.exports.damageShip = damageShip;
module.exports.isDamaged = isDamaged;
module.exports.attackShip = attackShip;