const Gameboard = require('../js/GameboardClass.js');
const Ship = require('../js/ShipClass.js');

describe('GameboardClass', () => {
    const player = new Gameboard();
    const cruiser = new Ship('cruiser', 3)
    const submarine = new Ship('submarine', 3)
    const destroyer = new Ship('destroyer', 2)
    const aircraftCarrier = new Ship('aircraftCarrier', 5)
    const battleship = new Ship('battleship', 4)


    test('Board Grid is created', () => {
        expect(player.boardGrid).toBeInstanceOf(Array)
    })

    test('Ships are placed', () => {
        expect(player.placeShip(cruiser)).toEqual(cruiser);
        expect(player.placeShip(aircraftCarrier)).toEqual(aircraftCarrier);
        expect(player.placeShip(battleship)).toEqual(battleship);
    })

    test('Attacks are being received', () => {
        expect(player.receiveAttack('9J')).toBeDefined()
    })

    test('Checking if all ships are sunk', () => {
        expect(player.checkAllSunk()).toBeDefined()
    })
})