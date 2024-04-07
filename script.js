let boxes = document.querySelectorAll(".small-grid-box");
let button = document.querySelector(".solve");

addEventListeners();

function addEventListeners() {
    boxes.forEach((box) => {
        box.setAttribute('tabindex', '0');

        box.addEventListener("click", (event) => {
            box.focus();
        });

        box.addEventListener('keydown', function(event) {
            const key = event.key;

            if (key >= '1' && key <= '9') {
                box.textContent = key;
            }
        });
    });

    button.addEventListener("click", sudokuPrep);
}

function verifySquare(sudoku, i, j, value) {
    for (let K = 0; K < 3; K++) {
        for (let L = 0; L < 3; L++) {
            if (sudoku[i][j][K][L] == value)
                return false;
        }
    }

    return true;
}

function verifyColumn(sudoku, j, l, value) {
    for (let I = 0; I < 3; I++) {
        for (let K = 0; K < 3; K++) {
            if (sudoku[I][j][K][l] == value)
                return false;
        }
    }

    return true;
}

function verifyRow(sudoku, i, k, value) {
    for (let J = 0; J < 3; J++) {
        for (let L = 0; L < 3; L++) {
            if (sudoku[i][J][k][L] == value)
                return false;
        }
    }

    return true;
}

function initSudoku(sudoku) {
    let index = 0;

    for (let i = 0; i < 3; i++) {
        sudoku[i] = [];

        for (let j = 0; j < 3; j++) {
            sudoku[i][j] = [];

            for (let k = 0; k < 3; k++) {
                sudoku[i][j][k] = [];

                for (let l = 0; l < 3; l++) {
                    if (Number(boxes[index].textContent) > 0 && Number(boxes[index].textContent) < 10)
                        sudoku[i][j][k][l] = Number(boxes[index].textContent);
                    else
                        sudoku[i][j][k][l] = 0;

                    index++;
                }
            }
        }
    }
}

function solveSudoku(sudoku, index) {
    if (index == 81)
        return true;

    const i = Math.floor(index / 27);
    const j = Math.floor((index % 9) / 3);
    const k = Math.floor(index / 9) % 3;
    const l = index % 3;

    if (sudoku[i][j][k][l] !== 0)
        return solveSudoku(sudoku, index + 1);

    for (let value = 1; value <= 9; value++) {
        if (verifySquare(sudoku, i , j, value) && verifyRow(sudoku, i, k, value) && verifyColumn(sudoku, j, l, value)) {
            sudoku[i][j][k][l] = value;

            if(solveSudoku(sudoku, index + 1))
                return true;

            sudoku[i][j][k][l] = 0;
        }
    }

    return false;
}

function putValuesOnGrid(sudoku) {
    let index = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    boxes[index].textContent = sudoku[i][j][k][l];
                    index++;
                }
            }
        }
    }
}

function sudokuPrep() {
    let sudoku = [];

    initSudoku(sudoku);
    solveSudoku(sudoku, 0);
    putValuesOnGrid(sudoku);
}
