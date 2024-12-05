const Ship = require("../js/ShipClass.js")

describe('Ship', () => {
    let shipObj = new Ship(2, 1)

    test('Number of hits are incremented', () => {
        const prevHit = shipObj.hits
        shipObj.hit()
        const newHit = shipObj.hits
        expect(newHit).toBeGreaterThan(prevHit)
    })

    test('Ship sinks when hits equal length', () => {
        shipObj.isSunk()
        expect(shipObj.sunk).toBe(true)
    })

    test('Orientation change', () => {
        shipObj.changeOrientation()
        if (shipObj.orientation === 'horizontal') {
            expect(shipObj.orientation).toEqual('horizontal')
        } else {
            expect(shipObj.orientation).toEqual('vertical')
        }
    })
})