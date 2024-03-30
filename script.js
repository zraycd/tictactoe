function createGameboard() {

    const cell = document.querySelectorAll('.cell')

    const gameboard = [
        [cell[0], cell[1], cell[2]],
        [cell[3], cell[4], cell[5]],
        [cell[6], cell[7], cell[8]]
    ]

    return { gameboard }
}

function checkForWin(gameboard) {

    const xWin = ['X', 'X', 'X'];
    const oWin = ['O', 'O', 'O'];

    const diagonal1 = [gameboard.gameboard[0][0].querySelector('.display').innerText, gameboard.gameboard[1][1].querySelector('.display').innerText, gameboard.gameboard[2][2].querySelector('.display').innerText];
    const diagonal2 = [gameboard.gameboard[0][2].querySelector('.display').innerText, gameboard.gameboard[1][1].querySelector('.display').innerText, gameboard.gameboard[2][0].querySelector('.display').innerText];
    if (checkColumn(diagonal1, xWin) || checkColumn(diagonal1, oWin)) {
        displayWin(document.querySelector('#diagonal1'))
        return
    } else if (checkColumn(diagonal2, xWin) || checkColumn(diagonal2, oWin)) {
        displayWin(document.querySelector('#diagonal2'))
        return
    }

    for (let i = 0; i < 3; i++) {
        const row = gameboard.gameboard[i];
        const col = [gameboard.gameboard[0][i].querySelector('.display').innerText, gameboard.gameboard[1][i].querySelector('.display').innerText, gameboard.gameboard[2][i].querySelector('.display').innerText];
        if (checkLine(row, xWin) || checkLine(row, oWin)) {
            if (i === 0) {
                displayWin(document.querySelector('#top'))
                return
            } else if (i === 1) {
                displayWin(document.querySelector('#midHorizontal'))
                return
            } else {
                displayWin(document.querySelector('#bottom'))
                return
            }
        } else if (checkColumn(col, xWin) || checkColumn(col, oWin)) {
            if (i === 0) {
                displayWin(document.querySelector('#left'))
                return
            } else if (i === 1) {
                displayWin(document.querySelector('#midVertical'))
                return
            } else {
                displayWin(document.querySelector('#right'))
                return
            }
        }
    }

    if (gameboard.gameboard.flat().every(cell => cell.querySelector('.display').innerText === 'X' || cell.querySelector('.display').innerText === 'O')) {
        return 'Its a draw'
    }
    return 'No winner';
}

function checkLine(line, target) {
    return line.every(element => element.querySelector('.display').innerText === target[0]);
}
function checkColumn(line, target) {
    return line.every(element => element === target[0]);
}
function displayWin (line) {
    let win = document.querySelectorAll('.line')
    
    win.forEach(checkLine => {
        if (checkLine === line) {
            checkLine.style.display = 'block'
        } else if (line === 'reset') {
            checkLine.style.display = 'none'
        }
    })
}

function playGame() {
    const gameboard = createGameboard()
    let currentClicks = 0;

    const boardContainer = document.querySelector('#container');
    boardContainer.addEventListener('click', handleClick);

    function handleClick(event) {
        const clickedCell = event.target;
        if (!clickedCell.classList.contains('display')) {
            return;
        }

        if (clickedCell.innerText === '') {
            if (currentClicks % 2 === 0) {
                clickedCell.innerText = 'X';
            } else {
                clickedCell.innerText = 'O';
            }
            currentClicks++;

            let result = checkForWin(gameboard);
            if (result !== 'No winner') {
                boardContainer.removeEventListener('click', handleClick)
                document.querySelector('#reset').addEventListener('click', () => {
                    resetGame()
                    currentClicks = 0
                })
            }
        }
    }
}
function resetGame() {
    let cells = document.querySelectorAll('.display')

    cells.forEach(cell => {
        cell.innerText = ''
    })
    displayWin('reset')
    playGame()
}
playGame()