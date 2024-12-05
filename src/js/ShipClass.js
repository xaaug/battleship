class Ship {
    constructor(length, hits = 2) {
        this.length = length
        this.hits = hits
        this.position = []
        this.sunk = false
        this.orientation = 'vertical'
    }

    hit() {
        this.hits ++
    }

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true
            return true
        }
    }

    changeOrientation() {
        if (this.orientation === 'horizontal') {
            this.orientation = 'vertical'
        } else {
            this.orientation = 'horizontal'
        }
    }
}



module.exports = Ship