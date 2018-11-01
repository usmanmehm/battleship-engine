# TOC
   - [Mocha](#mocha)
   - [PLAYER METHODS](#player-methods)
     - [validateLocation](#player-methods-validatelocation)
     - [validateLocations](#player-methods-validatelocations)
     - [placeShip](#player-methods-placeship)
   - [COMPUTER PLAYER](#computer-player)
     - [random functions](#computer-player-random-functions)
   - [checkForShip](#checkforship)
   - [damageShip](#damageship)
   - [isDamaged](#isdamaged)
   - [attackShip](#attackship)
<a name=""></a>

<a name="mocha"></a>
# Mocha
should run our tests using npm.

```js
expect(true).to.be.ok;
```

<a name="player-methods"></a>
# PLAYER METHODS
<a name="player-methods-validatelocation"></a>
## validateLocation
shoud confirm valid for unoccupied locations in range.

```js
const location = [0, 0];
const actual = validateLocation(player, location);
expect(actual).to.be.ok;
```

shoud confirm INvalid for occupied locations in range.

```js
const location = [9, 9];
const actual = validateLocation(player, location);
expect(actual).to.be.false;
```

shoud confirm INvalid for UNoccupied locations OUT of range.

```js
const locationHigh = [10, 10];
const locationLow = [-1, -1];
expect(validateLocation(player, locationHigh)).to.be.false;
expect(validateLocation(player, locationLow)).to.be.false;
```

<a name="player-methods-validatelocations"></a>
## validateLocations
should correctly report a list of unoccupied locations is valid.

```js
let locations = [[1, 1], [1, 2], [1, 3], [1, 4]];
expect(validateLocations(player, locations)).to.be.ok;
```

should correctly report a a problem if any location in the list is invalid.

```js
let locations = [[1, 1], [1, 2], [1, 3], [10, 10]];
expect(validateLocations(player, locations)).to.be.false;
locations = [[1, 1], [1, 2], [1, 3], [0, 0]];
expect(validateLocations(player, locations)).to.be.false;
```

<a name="player-methods-placeship"></a>
## placeShip
should update a ship with a valid starting location.

```js
const ship = player.ships[0];
const coordinates = [0, 1];
placeShip(player, ship, coordinates, 'horizontal');
const actual = ship.locations;
expect(actual).to.be.ok;
expect(actual).to.have.length(1);
expect(actual[0]).to.deep.equal([0, 1]);
```

should throw an error if no direction is specified.

```js
const ship = player.ships[0];
const coordinates = [0, 1];

const handler = () => {
  placeShip(player, ship, coordinates);
};
expect(handler).to.throw(Error);
expect(handler).to.throw('You left out the directions! I need that for math!');
```

<a name="computer-player"></a>
# COMPUTER PLAYER
<a name="computer-player-random-functions"></a>
## random functions
should generate a pair of random coordinates.

```js
const coordinates = randomCoordinates();
expect(randomCoordinates()).to.be.an('array');
expect(randomCoordinates().length).to.equal(2);
expect(randomCoordinates()).to.not.equal(coordinates);
```

should generate a random direction.

```js
expect(randomDirection()).to.be.a('string');
expect(randomDirection().length).to.be.greaterThan(7);
expect(randomDirection().length).to.be.lessThan(11);
```

<a name="checkforship"></a>
# checkForShip
Should correctly report no ship at given players coordinate.

```js
expect(checkForShip(player, [9,9])).to.be.false;
```

Should correctly report a ship located at given players coordinate.

```js
expect(checkForShip(player, [0,0])).to.be.true;
```

Should handle correct reporting when a ship has multiple locations.

```js
expect(checkForShip(player, [0,0])).to.be.true;
expect(checkForShip(player, [0,1])).to.be.true;
expect(checkForShip(player, [9,9])).to.be.false;
```

Should handle correct reporting when multiple ships have multiple locations.

```js
expect(checkForShip(player, [0,0])).to.be.true;
    expect(checkForShip(player, [0,1])).to.be.true;
    expect(checkForShip(player, [1,0])).to.be.true;
    expect(checkForShip(player, [1,1])).to.be.true;
    expect(checkForShip(player, [9,9])).to.be.false;
```

<a name="damageship"></a>
# damageShip
Should register damage on a given ship at a given location.

```js
const ship = {
    locations: [ [0,0] ],
    damage: []
}
damageShip(ship, [0, 0]);
damageShip(ship, [1, 1]);
expect(ship.damage).to.not.be.empty;
expect(ship.damage[0]).to.deep.equal([0,0]);
expect(ship.damage[1]).to.deep.equal([1,1]);
```

<a name="isdamaged"></a>
# isDamaged
Should check for damaged ship at specific coordinates.

```js
const ship = {
    locations: [ [0,0], [1,1] ],
    damage: [ [0,0] ]
}
expect(isDamaged(ship, [0,0])).to.be.true;
expect(isDamaged(ship, [1,1])).to.be.false;
```

<a name="attackship"></a>
# attackShip
Should check for players ship at that location, then check for damage, then damage the ship..

```js
attackShip(player, [1,0]); // essentially attacking ship #2
// makes sure that the return values are correct i.e. ship was damaged or not
expect(attackShip(player, [1,1])).to.to.deep.equal([1,1]);
expect(player.ships[0].damage.length).to.equal(1); // checking that the arrays have the right lengths
expect(player.ships[1].damage.length).to.equal(2);
expect(isDamaged( player.ships[1], [1,1] )).to.be.true; // We want to make sure that the ship was damaged
expect(attackShip(player, [0,1])).to.deep.equal([0,1]); // trying to damage one more time
expect(player.ships[0].damage.length).to.equal(2); // making sure length is right
expect(isDamaged( player.ships[0], [0,1] )).to.be.true;
```

Should check for players ship at that location and NOT record any damage..

```js
expect(attackShip(player, [0,0])).to.be.false;
```
