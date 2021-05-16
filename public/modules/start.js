export function startGame(status, player, socket, playerId) {

 if (status.error) {
     return window.alert(status.message);
 }
 if (!status.error) {
    socket.emit('join')
     let enemyId = 0
     for (let i = 1; i < 3; i++) {
         if (status.gamePlayers[`${i}`].number === playerId) {
             player[0].innerHTML = `
             <div class="d-flex justify-content-center align-items-center flex-column">
                     <h1>${status.gamePlayers[`${i}`].name}<br> (${status.gamePlayers[`${i}`].hero.type})</h1>
                     <img class="game-img"
                          src="${status.gamePlayers[`${i}`].hero.image}"
                          alt="">
                 </div>
                 <div class="info">
                     <h2>damage: ${status.gamePlayers[`${i}`].hero.maxDamage}</h2>
                     <div class="bar">
                         <div id="health1" class="health"></div>
                     </div>
                     <h2>Special ability:</h2>
                     <p>${status.gamePlayers[`${i}`].hero.special}</p>
                 </div>`
         } else {
             enemyId = i
         }
     }
    if (status.gamePlayers[`${enemyId}`].id === 'none') {
         player[1].innerHTML = `
             <div class="d-flex justify-content-center align-items-center flex-column">
                     <h1>${status.gamePlayers[`${enemyId}`].name}<br> (${status.gamePlayers[`${enemyId}`].hero.type})</h1>
                     <img class="game-img"
                          src="${status.gamePlayers[`${enemyId}`].hero.image}"
                          alt="">
                 </div>
                 <div class="info">
                     <h2>damage: ${status.gamePlayers[`${enemyId}`].hero.maxDamage}</h2>
                     <div class="bar">
                         <div class="health"></div>
                     </div>
                     <h2>Special ability:</h2>
                     <p>${status.gamePlayers[`${enemyId}`].hero.special}</p>
                 </div>`
     }
    if (status.gamePlayers[`${enemyId}`].id.length > 6) {
        player[1].innerHTML = `
             <div class="d-flex justify-content-center align-items-center flex-column">
                     <h1>${status.gamePlayers[`${enemyId}`].name}<br> (${status.gamePlayers[`${enemyId}`].hero.type})</h1>
                     <img class="game-img"
                          src="${status.gamePlayers[`${enemyId}`].hero.image}"
                          alt="">
                 </div>
                 <div class="info">
                     <h2>damage: ${status.gamePlayers[`${enemyId}`].hero.maxDamage}</h2>
                     <div class="bar">
                         <div id="health2" class="health"></div>
                     </div>
                     <h2>Special ability:</h2>
                     <p>${status.gamePlayers[`${enemyId}`].hero.special}</p>
                 </div>`
    }
 }
}