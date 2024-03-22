function createGameboard(row) {
    const row1 = [' ', ' ', ' ']
    const row2 = [' ', ' ', ' ']
    const row3 = [' ', ' ', ' ']

    const changeRow = (column) => {}
    return { row1, row2, row3 }
}
function createPlayer (name, mark) {

    const playerName = name
    const playerMark = mark

    let current = 0
    const getCurrent = () => current
    const move = () => current++ 

    return { playerName, playerMark, getCurrent, move }
}
function putMarker (row, column) {
    let gameboard = createGameboard()
    let line = row
    gameboard.line
}

function playGame() {

    const player1 = createPlayer(prompt('Player1 name:'), prompt('Player1 mark:'))
    const player2 = createPlayer(prompt('Player2 name:'), prompt('Player2 mark:'))

    for (let i = 0;i < 5;i++) {
        let putMarker = prompt(`${player1.playerName}, what row do you want to go?`)
    }
}
playGame()


