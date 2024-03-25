function createGameboard(row) {
    const row1 = [' ', ' ', ' ']
    const row2 = [' ', ' ', ' ']
    const row3 = [' ', ' ', ' ']

    const place = (column, marker) => {
        if (row === 0) {
            this.row1[column - 1] = `${marker}`
        }
    }
    return { row1, row2, row3, place }
}
function createPlayer (name, mark) {

    const playerName = name
    const playerMark = mark

    let current = 0
    const getCurrent = () => current
    const move = () => current++ 

    return { playerName, playerMark, getCurrent, move }
}
function putMarker (row, column, marker) {
    let row1 = createGameboard(0)
    let row2 = createGameboard(1)
    let row3 = createGameboard(2)

    
    if (row === '0') {
        row1.place(column, marker)
    } else if (row === '1') {
        row2.place(column, marker)
    } else if (row === '2') {
        row3.place(column, marker)
    }
}

function playGame() {

    const player1 = createPlayer(prompt('Player1 name:'), prompt('Player1 mark:'))
    const player2 = createPlayer(prompt('Player2 name:'), prompt('Player2 mark:'))

    putMarker(prompt(`${player1.playerName}, what row?`), prompt(`${player1.playerName}, what column?`), player1.playerMark)
}
playGame()