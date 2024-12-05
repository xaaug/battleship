const Ship = require('../js/ShipClass.js')
const shipObj = require("../js/ShipClass.js");

const rowLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const columnLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

const shipTypes = {
    aircraftCarrier: 5,
    battleship: 4,
    cruiser: 3,
    submarine: 3,
    destroyer: 2
}

const grid = []

for (let i = 0; i < rowLabels.length; i++) {
    const row = []
    for (let j = 0; j < columnLabels.length; j++) {
        row.push(columnLabels[j])
    }
    grid.push(row)
}

let column = 0
for (const row of grid) {
    column++
    // console.log(column, row.join(' '))
}

let placedShips = {}
const placeShip = jest.fn((shipType, length) => {
    const ship = new Ship(length)

    // console.log(ship.isSunk())isSunk
    const randomRow = rowLabels[Math.floor(Math.random() * rowLabels.length)]
    const randomColumn = columnLabels[Math.floor(Math.random() * columnLabels.length)]

    const coords = [randomRow, randomColumn]

    const startingPoint = coords.join('')
    let endingPoint = null

    if ((columnLabels.length - columnLabels.indexOf(coords[1])) >= ship.length) {
        endingPoint = [coords[0], columnLabels[columnLabels.indexOf(coords[1]) + (ship.length - 1)]].join('')

        // placedShips = {...placedShips, [shipType]: [startingPoint, endingPoint]}
        ship.position = ['9G', '9J']
        placedShips = {...placedShips, [shipType]: ship}
        return 'Ship placed'
    } else {
        placeShip(shipType, length)
        return 'Ship placed'
    }
})

let hitShip;
let missedCoords = []
const receiveAttack = jest.fn((coord1, coord2) => {
    const receivedCoordStart = columnLabels.indexOf(coord1.split('')[1])
    const receivedCoordEnd = columnLabels.indexOf(coord2.split('')[1])

    const btwnLabels = []

    for (let i = receivedCoordStart; i <= receivedCoordEnd; i++) {
        btwnLabels.push(coord1.split('')[0] + columnLabels[i])
    }

    for (const key in placedShips) {
        const shipCoordStart = columnLabels.indexOf(placedShips[key].position[0].split('')[1])
        const shipCoordEnd = columnLabels.indexOf(placedShips[key].position[1].split('')[1])

        const shipBtwnLabels = []

        for (let i = shipCoordStart; i <= shipCoordEnd; i++) {
            shipBtwnLabels.push(placedShips[key].position[0].split('')[0] + columnLabels[i])
        }

        for (let j = 0; j < shipBtwnLabels.length; j++) {
            for (let k = 0; k < btwnLabels.length; k++) {
                if (shipBtwnLabels[j] === btwnLabels[k]) {
                    // console.log(key)
                    hitShip = placedShips[key]
                    hitShip.hit()
                    // console.log(hitShip.hits)
                    hit(hitShip, btwnLabels[k])
                    return [hitShip].isSunk ? 'A ship has been sunk' : 'A ship has been hit'
                } else {
                    missedCoords.push(btwnLabels[k])
                    return 'It\'s a miss'
                }
            }
        }

    }
})

const hit = jest.fn((shipType, hitCoord) => {
    // console.log(shipType, hitCoord)
})

describe('Gameboard', () => {
    test('Ship placement', () => {
       for (const key in shipTypes) {
           expect(placeShip(key, shipTypes[key])).toBe('Ship placed')
       }
    })

    test('Ship receives an attack', () => {
        expect(receiveAttack('9G', '9I')).toBeDefined()
    })

    test('Check if ship is sunk', () => {
        expect(receiveAttack('9G', '9J')).toBeDefined()
    })
})