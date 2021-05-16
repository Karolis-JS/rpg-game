export function connectPlayer(player, gamePlayers, playerId) {

    for (let i = 1; i < 3; i++) {

        if (gamePlayers[`${i}`].number !== playerId) {
            player[1].innerHTML = `
             <div class="d-flex justify-content-center align-items-center flex-column">
                     <h1>${gamePlayers[`${i}`].name}<br> (${gamePlayers[`${i}`].hero.type})</h1>
                     <img class="game-img"
                          src="${gamePlayers[`${i}`].hero.image}"
                          alt="">
                 </div>
                 <div class="info">
                     <h2>damage: ${gamePlayers[`${i}`].hero.maxDamage}</h2>
                     <div class="bar">
                         <div  id="health2"  class="health"></div>
                     </div>
                     <h2>Special ability:</h2>
                     <p>${gamePlayers[`${i}`].hero.special}</p>
                 </div>`
        }
    }

}