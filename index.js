const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const BOARD_SIZE = 3;
const container = document.getElementById('fieldWrapper');

let counter = 0;
let board = createBoard(BOARD_SIZE);
let hasWinner = false;

startGame();
addResetListener();

function startGame() {
    board = createBoard(BOARD_SIZE);
    hasWinner = false;
    counter = 0;
    renderGrid(BOARD_SIZE)
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function createBoard(size) {
    let result = [];
    for (let i = 0; i < size; i++) {
        let currentRow = [];
        for (let j = 0; j < size; j++) {
            currentRow.push(EMPTY);
        }
        result.push(currentRow);
    }
    return result;
}


function cellClickHandler(row, col) {
    if (board[row][col] !== EMPTY) return;
    if (hasWinner) return;
    handleMove(row, col);
}

function handleMove(row, col) {
    counter++;
    if (counter % 2 === 0) {
        setBoardElement(ZERO, row, col);
    } else {
        setBoardElement(CROSS, row, col);
    }
    let winnerCells = checkWinner();
    if (winnerCells && winnerCells.length !== 0) {
        console.log(winnerCells);
        let coords = winnerCells[0];
        let x = coords[0];
        let y = coords[1];
        let winner = board[x][y];
        paintWinnerCells(winnerCells);
        alert(`победа за ${winner}`)
        hasWinner = true;
    }
    else if (!hasEmptyCells()) {
        alert("победила дружба!");
    }
}

function paintWinnerCells(winnerCellsCoords) {
    for (let i = 0; i < winnerCellsCoords.length; i++) {
        let row = winnerCellsCoords[i][0];
        let col = winnerCellsCoords[i][1];
        let symbol = board[row][col];
        renderSymbolInCell(symbol, row, col, 'red');
    }
}

function checkWinner() {
    for (let row = 0; row < BOARD_SIZE; row++) {
        if (board[row][0] !== EMPTY &&
            board[row].every(cell => cell === board[row][0])) {
            let winningCells = [];
            for (let col = 0; col < BOARD_SIZE; col++) {
                winningCells.push([row, col]);
            }
            return winningCells;
        }
    }
    for (let col = 0; col < BOARD_SIZE; col++) {
        const column = board.map(row => row[col]);
        if (column[0] !== EMPTY &&
            column.every(cell => cell === column[0])) {
            let winningCells = [];
            for (let row = 0; row < BOARD_SIZE; row++) {
                winningCells.push([row, col]);
            }
            return winningCells;
        }
    }
    if (board[0][0] !== EMPTY &&
        board.every((row, i) => row[i] === board[0][0])) {
        let winningCells = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            winningCells.push([i, i]);
        }
        return winningCells;
    }
    if (board[0][BOARD_SIZE - 1] !== EMPTY &&
        board.every((row, i) => row[BOARD_SIZE - 1 - i] === board[0][BOARD_SIZE - 1])) {
        const winningCells = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            winningCells.push([i, BOARD_SIZE - 1 - i]);
        }
        return winningCells;
    }
    return null;
}

function setBoardElement(element, row, col) {
    renderSymbolInCell(element, row, col);
    board[row][col] = element;
}

function hasEmptyCells() {
    for (let row of board) {
        for (let el of row) {
            if (el === EMPTY) return true;
        }
    }
    return false;
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    startGame();
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
