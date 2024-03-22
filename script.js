function createGameboard() {
    const line1 = [' ', ' ', ' ']
    const line2 = [' ', ' ', ' ']
    const line3 = [' ', ' ', ' ']
    return { line1, line2, line3 }
}
function move() {
    let current = 0
    const getCurrent = () => current
    const move = () => current++ 

    return { getCurrent, move }
}
function player1 (name) {
    const playerName = name
    const mark = 'X'
    return { playerName, mark }
}
function player2 (name) {
    const playerName = name
    const mark = 'O'
    return { playerName, mark }
}
createGameboard()
player1(prompt('Player1 name:'))
player2(prompt('Player2 name:'))

