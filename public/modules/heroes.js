import {selectHero} from "./selectHero.js";

export function loadHeroes(socket, selection, select, start, nameInput, playerId) {
    socket.on('loadHeroes', (heroes) => {
        selection.innerHTML = ''
        heroes.map(item => {
            selection.innerHTML += `
            <div class="frame d-flex align-items-center justify-content-center flex-column">
                <h1>${item.type}</h1>
                <img class="hero-img" src="${item.image}" alt="">
                <div class="hero-description">
                <h3>Max damage: <span class="span">${item.maxDamage}</span></h3>
                <h3>Special: <span class="span">${item.special}</span></h3>
                </div>
                <div id="${item.type}" class="select">Select !</div>
            </div>`
        })
        for (let i = 0; i < 3; i++) {
            select[i].addEventListener('click',(e) => selectHero(e, select, socket))
        }
        start.addEventListener('click', () => {
            socket.emit('start', {name: nameInput.value, id: playerId})
        })
    })
}
