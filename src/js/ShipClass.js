class Ship {
    constructor(type, length, hits = 0) {
        this.type = type;
        this.length = length
        this.hits = hits
        this.position = []
        this.sunk = true
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