const player1 = createPlayer(prompt('Player1 name:'), 'X')
const player2 = createPlayer(prompt('Player2 name:'), 'O')

function createGameboard() {

    const gameboard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]

    const place = (row, column, marker) => {
        if (gameboard[row - 1][column - 1] === ' ') {
            gameboard[row - 1][column - 1] = marker
        } else {
            return 'filled'
        }
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
    const oWin = ['O', 'O', 'O'];

    const diagonal1 = [gameboard.gameboard[0][0], gameboard.gameboard[1][1], gameboard.gameboard[2][2]];
    const diagonal2 = [gameboard.gameboard[0][2], gameboard.gameboard[1][1], gameboard.gameboard[2][0]];
    if (checkLine(diagonal1, xWin) || checkLine(diagonal1, oWin) ||
        checkLine(diagonal2, xWin) || checkLine(diagonal2, oWin)) {
        return gameboard.gameboard[1][1] + ' wins'
    }

    for (let i = 0; i < 3; i++) {
        const row = gameboard.gameboard[i];
        const col = [gameboard.gameboard[0][i], gameboard.gameboard[1][i], gameboard.gameboard[2][i]];
        if (checkLine(row, xWin) || checkLine(col, xWin)) {
            return 'X wins'
        } else if (checkLine(row, oWin) || checkLine(col, oWin)) {
            return 'O wins'
        }
    }

    if (gameboard.gameboard.flat().every(cell => cell === 'X' || cell === 'O')) {
        return 'Its a draw'
    }
    return 'No winner';
}

function checkLine(line, target) {
    return line.every(element => element === target[0]);
}

function playGame() {
    let gameboard = createGameboard()

    for (let i = 0;i < 5;i++) {

        let player1Current
        let player2Current

        do {
            player1Current = gameboard.place(prompt(`${player1.playerName}, what row?`), prompt(`${player1.playerName}, what column?`), player1.playerMark)
        } while (player1Current === 'filled')

        if (checkForWin(gameboard) === 'X wins' || checkForWin(gameboard) === 'O wins' || checkForWin(gameboard) === 'Its a draw') {
            console.log(gameboard)
            break;
        }

        do {
            player2Current = gameboard.place(prompt(`${player2.playerName}, what row?`), prompt(`${player2.playerName}, what column?`), player2.playerMark)
        } while (player2Current === 'filled')
        
        if (checkForWin(gameboard) === 'X wins' || checkForWin(gameboard) === 'O wins' || checkForWin(gameboard) === 'Its a draw') {
            console.log(gameboard)
            break;
        }
        
    }
}
playGame()