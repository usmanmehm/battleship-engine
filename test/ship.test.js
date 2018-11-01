
const expect = require('chai').expect;

describe('checkForShip', () => {
    const checkForShip = require('../game-logic/ship.methods').checkForShip;
    let player;
    before ( () => {
        player = {
            ships: [
                {
                    locations: [ [0,0], [0,1] ]
                },
                {
                    locations: [ [1,0], [1,1] ]
                }
            ]
        }
    });
    
    it('Should correctly report no ship at given players coordinate', () => {
        expect(checkForShip(player, [9,9])).to.be.false;
    });


    it('Should correctly report a ship located at given players coordinate', () => {
        expect(checkForShip(player, [0,0])).to.be.true;
    });

    it('Should handle correct reporting when a ship has multiple locations', () => {
        expect(checkForShip(player, [0,0])).to.be.true;
        expect(checkForShip(player, [0,1])).to.be.true;
        expect(checkForShip(player, [9,9])).to.be.false;
    });

    it('Should handle correct reporting when multiple ships have multiple locations', () => {    
        expect(checkForShip(player, [0,0])).to.be.true;
        expect(checkForShip(player, [0,1])).to.be.true;
        expect(checkForShip(player, [1,0])).to.be.true;
        expect(checkForShip(player, [1,1])).to.be.true;
        expect(checkForShip(player, [9,9])).to.be.false;
    });
});

describe('damageShip', () => {
    const damageShip = require('../game-logic/ship.methods').damageShip;

    it('Should register damage on a given ship at a given location', () => {
        const ship = {
            locations: [ [0,0] ],
            damage: []
        }

        damageShip(ship, [0, 0]);
        damageShip(ship, [1, 1]);
        expect(ship.damage).to.not.be.empty;
        expect(ship.damage[0]).to.deep.equal([0,0]);
        expect(ship.damage[1]).to.deep.equal([1,1]);
    });
});

describe('isDamaged', () => {
    const isDamaged = require('../game-logic/ship.methods').isDamaged;

    it('Should check for damaged ship at specific coordinates', () => {
        const ship = {
            locations: [ [0,0], [1,1] ],
            damage: [ [0,0] ]  
        }
        expect(isDamaged(ship, [0,0])).to.be.true;
        expect(isDamaged(ship, [1,1])).to.be.false;
    });
});





describe('attackShip', () => {
    const attackShip = require('../game-logic/ship.methods').attackShip;
    const isDamaged = require('../game-logic/ship.methods').isDamaged;
    let player;

    beforeEach( () => {
        player = {
            ships: [
                { // Ship #1
                    locations: [ [0,0], [0,1] ],
                    damage: [ [0,0] ] 
                },
                { // Ship #2
                    locations: [ [1,0], [1,1] ],
                    damage: []  
                }
            ]
        };
    })

    after( () => {
        console.log('entire test suite completed');
    });

    afterEach( () => {
        console.log('one unit test completed');
    });

    it('Should check for players ship at that location, then check for damage, then damage the ship.', () => {
        attackShip(player, [1,0]); // essentially attacking ship #2

        // makes sure that the return values are correct i.e. ship was damaged or not
        expect(attackShip(player, [1,1])).to.to.deep.equal([1,1]);  

        expect(player.ships[0].damage.length).to.equal(1); // checking that the arrays have the right lengths
        expect(player.ships[1].damage.length).to.equal(2);

        expect(isDamaged( player.ships[1], [1,1] )).to.be.true; // We want to make sure that the ship was damaged

        expect(attackShip(player, [0,1])).to.deep.equal([0,1]); // trying to damage one more time
        expect(player.ships[0].damage.length).to.equal(2); // making sure length is right
        expect(isDamaged( player.ships[0], [0,1] )).to.be.true;
    });

    it('Should check for players ship at that location and NOT record any damage.', () => {
        expect(attackShip(player, [0,0])).to.be.false; 

    });
});