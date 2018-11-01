const checkForShip = require('./ship.methods.js').checkForShip;
const attackShip = require('./ship.methods.js').attackShip;

function validateLocation (player, coordinates) {
  const x = coordinates[0];
  const y = coordinates[1];

  const spaceAvailable = !checkForShip(player, coordinates);

  if ((x <= 9 && x >= 0) && (y <= 9 && y >= 0)) {
    return spaceAvailable; // decides whether this valid space is occupied
  } else {
    return false;
  }
}

function validateLocations (player, locations) {
  const validated = locations.map(function (location) {
    return validateLocation(player, location);
  });
  return validated.indexOf(false) === -1;
}

function placeShip (player, ship, startingCoordinates, direction) {
  if (!direction) throw Error('You left out the directions! I need that for math!');
  
  let proposedLocations = [];
  let previousLocation,
    rowNumber,
    columnNumber;

  for (var i = 0; i < ship.size; i++) {
    previousLocation = proposedLocations[i - 1] || [];
    rowNumber = previousLocation[0];
    columnNumber = previousLocation[1];
    
    proposedLocations[i] = (i === 0)
      ? startingCoordinates
      : (direction === 'horizontal')
        ? [rowNumber, ++columnNumber]
        : [++rowNumber, columnNumber];
  }
  
  if (validateLocations(player, proposedLocations)) {
    ship.locations = proposedLocations;
  } else {
    return false;
  }
}

function randomCoordinates() {
  const x = Math.floor(Math.random() * 9);
  const y = Math.floor(Math.random() * 9);
  return [x, y];
}

function randomDirection() {
  return Math.random() > 0.5 ? 'horizontal' : 'vertical';
}

function computerFire (player) {
  attackShip(player, randomCoordinates());
}

function computerPlaceShip (player, ship) {
  placeShip(player, ship, randomCoordinates(), randomDirection());
}

module.exports = {
  placeShip: placeShip,
  validateLocations: validateLocations,
  validateLocation: validateLocation,
  computerPlaceShip: computerPlaceShip,
  computerFire: computerFire,
  randomCoordinates: randomCoordinates,
  randomDirection: randomDirection
};