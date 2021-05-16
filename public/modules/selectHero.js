

export function selectHero(e, select, socket) {

    for (let i = 0; i < 3; i++) {
        select[i].style.border = '4px ridge saddlebrown'
        select[i].innerText = 'Select !'
    }
    e.target.style.border = '4px solid darkgreen'
    e.target.innerText = 'Selected !'
    socket.emit('selectHero', e.target.id)
}