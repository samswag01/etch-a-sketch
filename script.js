'use strict';

let darkMap = {},
    defGridNo = 16,
    erase = false,
    container = document.querySelector('.container');

const getRandomColor = (id) => {
    const random = () => Math.floor(Math.random() * 360);
    let color;
    if (darkMap.hasOwnProperty(id)) {
        color = darkMap[id]
        color[2] = color[2] === 0 ? color[2] : color[2] - 10;
    } else {
        color = [random(), '100%', 50]
    }
    darkMap[id] = [...color];  // to avoid overwriting due to reference on the next line.
    color[2] = `${color[2]}%`
    return `hsl(${color.join(', ')})`;
}

const animateGrid = (event) => {
    let id = event.target.id;
    if (erase) delete darkMap[id];
    event.target.style.backgroundColor = erase ? '' : getRandomColor(id);
}

const addListeners = () => {
    let grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.addEventListener('mouseover', animateGrid);
    });
}

const regenerateGrid = () => {
    let grids = constructGrid(defGridNo);
    container.innerHTML = grids;
    container.style.gridTemplateColumns = `repeat(${defGridNo}, 1fr)`;
    addListeners();
    erase = false;
}

const newGrid = () => {
    let numGrid = prompt('Enter number of grids');
    if (numGrid === null) return;
    numGrid = parseInt(numGrid);
    if (numGrid < 1 || numGrid > 100 || !numGrid) {
        alert("Grid number must be between 0 and 101");
        return;
    }
    defGridNo = numGrid;
    regenerateGrid();
}

const clearGrid = () => {
    regenerateGrid()
}

const eraseCell = () => erase = !erase;

addListeners();
