const expect = require('chai').expect;

describe('Game Instance Functions', () => {
    describe('checkGameStatus', () => {
        const checkGameStatus = require('../game-logic/game.instance.js').checkGameStatus;
        it('should tell me when the game is over', function () {
        const players = [
            {
                ships: [
                    {
                        locations: [[0, 0]],
                        damage: [[0, 0]]
                    }
                ]
            }
        ];
        const actual = checkGameStatus(players);
        expect(actual).to.be.false;
        });
    });
    describe('takeTurn', () => {
        const takeTurn = require('../game-logic/game.instance').takeTurn;
        let guess, player;

        beforeEach( () => {
            guess = () => {
                return [0,0];
            };
            player = {
                ships: [
                    {
                        locations: [ [0,0] ],
                        damage: []
                    }
                ]
            }
        });

        it('should return false if the game ends', () => {
            const actual = takeTurn(player, guess);

            expect(actual).to.be.false;
        });
    });
});