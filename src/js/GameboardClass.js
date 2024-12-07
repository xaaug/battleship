const {createGrid, columnLabels, rowLabels} = require('./grid.js')

class Gameboard {
    constructor() {
        this.boardGrid = createGrid();
        this.placedShips = {};
        this.missedAttacks = [];
        this.hits = []
    }


    placeShip(shipToPlace) {
        const randomCoords = [generateRandom(rowLabels), generateRandom(columnLabels)]

        const startingPoint = randomCoords.join('')
        let endingPoint = null
        console.log(randomCoords[1])

        if ((columnLabels.length - (columnLabels.indexOf(randomCoords[1]) + 1)) >= (shipToPlace.length)) {
            endingPoint = [randomCoords[0], columnLabels[columnLabels.indexOf(randomCoords[1]) + (shipToPlace.length - 1)]].join('')
            shipToPlace.position = [startingPoint, endingPoint]
            this.placedShips = {...this.placedShips, [shipToPlace.type]: shipToPlace}
            return this.placedShips[shipToPlace.type]
        }

        return this.placeShip(shipToPlace)

    }

    receiveAttack(coords) {
        const attackCoord = coords.split('')[1]

        for (const key in this.placedShips) {
            const startingPoint = this.placedShips[key].position[0].split('')[1]
            const endingPoint = this.placedShips[key].position[1].split('')[1]

            const labelsOfPlacedShip = getLabelsBetween(startingPoint, endingPoint)

            const checkedHit = checkHit(labelsOfPlacedShip, attackCoord)

            if (checkedHit === 'hit') {
                this.placedShips[key].hit()
                this.placedShips[key].isSunk()
                this.hits.push(coords)

                return this.hits
            } else if (checkedHit === 'miss') {
                this.missedAttacks.push(coords)

                return this.missedAttacks
            }

        }

    }

    checkAllSunk() {
        let sunkShips = 0
        for (const key in this.placedShips) {
            if (this.placedShips[key].sunk === true) {
                sunkShips++
            }
        }

        if (sunkShips === Object.keys(this.placedShips).length) {
            return true
        } else {
            sunkShips = 0
            return false
        }
    }

}

const generateRandom = arr => arr[Math.floor(Math.random() * arr.length)]

const getLabelsBetween = (startingPoint, endingPoint) => {
    const betweenLabels = []
    for (let i = columnLabels.indexOf(startingPoint); i <= columnLabels.indexOf(endingPoint); i++) {
        betweenLabels.push(columnLabels[i])
    }

    return betweenLabels
}

const checkHit = (betweenLabelsArr, attackLabel) => {
    let report = null

    for (let i = 0; i < betweenLabelsArr.length; i++) {
        if (betweenLabelsArr[i] === attackLabel) {
            report = 'hit'
            break
        } else {
            report = 'miss'
        }
    }

    return report
}


module.exports = Gameboard;