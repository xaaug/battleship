const Player = require('../js/PlayerClass.js')

describe("PlayerClass", () => {
    const computer = new Player('computer');
    test('Contains Player Gameboard', () => {
        expect(computer).toEqual({type: "computer", gameboard: []})
    })
})