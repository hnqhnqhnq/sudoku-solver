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
    
}



function sudokuPrep() {
    let sudoku = [];

    initSudoku(sudoku);
    solveSudoku(sudoku, 0);
    console.log(sudoku);
}
