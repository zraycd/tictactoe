function createGameboard() {

    const cell = document.querySelectorAll('.cell')

    const gameboard = [
        [cell[0], cell[1], cell[2]],
        [cell[3], cell[4], cell[5]],
        [cell[6], cell[7], cell[8]]
    ]

    return { gameboard}
}

function checkForWin(gameboard) {

    const xWin = ['X', 'X', 'X'];
    const oWin = ['O', 'O', 'O'];

    const diagonal1 = [gameboard.gameboard[0][0].innerText, gameboard.gameboard[1][1].innerText, gameboard.gameboard[2][2].innerText];
    const diagonal2 = [gameboard.gameboard[0][2].innerText, gameboard.gameboard[1][1].innerText, gameboard.gameboard[2][0].innerText];
    if (checkColumn(diagonal1, xWin) || checkColumn(diagonal1, oWin) ||
        checkColumn(diagonal2, xWin) || checkColumn(diagonal2, oWin)) {
        return gameboard.gameboard[1][1].innerText + ' wins'
    }

    for (let i = 0; i < 3; i++) {
        const row = gameboard.gameboard[i];
        const col = [gameboard.gameboard[0][i].innerText, gameboard.gameboard[1][i].innerText, gameboard.gameboard[2][i].innerText];
        if (checkLine(row, xWin) || checkColumn(col, xWin)) {
            return 'X wins'
        } else if (checkLine(row, oWin) || checkColumn(col, oWin)) {
            return 'O wins'
        }
    }

    if (gameboard.gameboard.flat().every(cell => cell.innerText === 'X' || cell.innerText === 'O')) {
        return 'Its a draw'
    }
    return 'No winner';
}

function checkLine(line, target) {
    return line.every(element => element.innerText === target[0]);
}
function checkColumn(line, target) {
    return line.every(element => element === target[0]);
}

function playGame() {
    let gameboard = createGameboard();
    let currentClicks = 0;

    const boardContainer = document.querySelector('#container');
    boardContainer.addEventListener('click', handleClick);

    function handleClick(event) {
        const clickedCell = event.target;
        if (!clickedCell.classList.contains('cell')) {
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
            if (result === 'X wins' || result === 'O wins' || result === 'Draw') {
                console.log(result);
                endGame();
            }
        }
    }

    function endGame() {
        boardContainer.removeEventListener('click', handleClick);
    }
}
playGame()