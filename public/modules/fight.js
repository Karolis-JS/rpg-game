export function fight(socket, players, playerId, turn, permission) {
    if (permission) {
    turn.innerText = `Opponent's turn`
    socket.emit('attack', playerId)
    }
}