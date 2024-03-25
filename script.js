function createGameboard() {

    const gameboard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    const place = (row, column, marker) => {
        gameboard[row - 1][column - 1] = marker
    }
    return { gameboard, place }
}

function createPlayer (name, mark) {

    const playerName = name
    const playerMark = mark

    let current = 0
    const getCurrent = () => current
    const move = () => current++ 

    return { playerName, playerMark, getCurrent, move }
}

function checkForWin(gameboard) {
    const xWin = ['X', 'X', 'X'];

    const diagonal1 = [gameboard[0][0], gameboard[1][1], gameboard[2][2]];
    const diagonal2 = [gameboard[0][2], gameboard[1][1], gameboard[2][0]];

    if (checkLine(diagonal1, xWin) || checkLine(diagonal2, xWin)) {
        return 'X';
    }

    for (let i = 0; i < 3; i++) {
        const row = [gameboard[i][0], gameboard[i][1], gameboard[i][2]];
        const col = [gameboard[0][i], gameboard[1][i], gameboard[2][i]];

        if (checkLine(row, xWin) || checkLine(col, xWin)) {
            return 'X';
        }
    }
    return 'continue'
}

function checkLine(line, target) {
    return line.every(element => element === target[0]);
}

function playGame() {
    let gameboard = createGameboard()

    const player1 = createPlayer(prompt('Player1 name:'), prompt('Player1 mark:'))
    const player2 = createPlayer(prompt('Player2 name:'), prompt('Player2 mark:'))

    for (let i = 0;i < 5;i++) {
        gameboard.place(prompt(`${player1.playerName}, what row?`), prompt(`${player1.playerName}, what column?`), player1.playerMark)
        gameboard.place(prompt(`${player2.playerName}, what row?`), prompt(`${player2.playerName}, what column?`), player2.playerMark)
        
        if (checkForWin(gameboard) === 'X') {
            console.log('X wins')
            break;
        }
    }
}
playGame()