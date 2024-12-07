const columnLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const rowLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


const createGrid = () => {
    const grid = []

    for (let i = 0; i < rowLabels.length; i++) {
        const row = []
        for (let j = 0; j < columnLabels.length; j++) {
            row.push(columnLabels[j])
        }
        grid.push(row)
    }

    return grid
}


module.exports = {createGrid, columnLabels, rowLabels}