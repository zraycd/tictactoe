function createGameboard() {
    let row1 = [' ', ' ', ' ']
    let row2 = [' ', ' ', ' ']
    let row3 = [' ', ' ', ' ']

    const gameboard = [row1, row2, row3]

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

function playGame() {
    let gameboard = createGameboard()

    const player1 = createPlayer(prompt('Player1 name:'), prompt('Player1 mark:'))
    const player2 = createPlayer(prompt('Player2 name:'), prompt('Player2 mark:'))

    gameboard.place(prompt(`${player1.playerName}, what row?`), prompt(`${player1.playerName}, what column?`), player1.playerMark)
    console.log(gameboard)
}
playGame()