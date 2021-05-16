const socket = io()

// Music
let music = document.getElementById("music-idle");
let musicGame = document.getElementById('music-game')
music.volume = 0.05;
musicGame.volume = 0.05;
//
// Players
let player = document.getElementsByClassName('player')

//
//buttons
let ready = document.getElementById('ready-btn')
let attack = document.getElementById('attack-div')
let turn = document.getElementById('turn')
//

let play = document.getElementById('play')
let idleMenu =  document.getElementById('idle-menu')
let selection = document.getElementById('selection')
let selectBtn = document.getElementsByClassName('select')
let selectionMenu = document.getElementById('selection-menu')
let idle = document.getElementById('idle')
let start = document.getElementById('submit-name')
let menu = document.getElementById('menu')
let nameInput = document.getElementById('name')
let black = document.getElementById('black')
//
let game = document.getElementById('game')
//



import {mainMenu} from "./modules/idle-menu.js";
import {loadHeroes} from "./modules/heroes.js";
import {startGame} from "./modules/start.js";
import {connectPlayer} from "./modules/connectPlayer.js";
import {fight} from "./modules/fight.js";


let permission = true

let playerId = 0
socket.on('getId', (id) => {
    playerId = id
})
let enemyId = 0

let backgrounds = ['https://cdn.wallpapersafari.com/77/85/iYp3MK.jpg',
    'https://i.pinimg.com/originals/6f/c7/04/6fc704cbd5c51b5c1fd703f92bab8f35.jpg',
    'https://wallpapercave.com/wp/mmo1FKn.jpg']
black.innerText = 'Please wait...'

ready.addEventListener('click', () => {
    socket.emit('readyCheck', playerId)
    ready.innerText = 'Please wait...'
})

socket.on('full', () => {
    black.style.display = 'flex'
})

mainMenu(play, idleMenu, music, selectionMenu, menu)
setTimeout(()=> {
    loadHeroes(socket, selection, selectBtn, start, nameInput, playerId)
}, 100)
// functions
socket.on('game', (status) => {
    startGame(status, player, socket, playerId)
    if (!status.error) {
        music.pause()
        music.style.display = 'none'
        musicGame.play()
        musicGame.style.display = 'block'
        menu.style.animationName = 'game-start'
        setTimeout(()=> {
            black.style.display = 'flex'
            black.style.animationName = 'appear'
        }, 200)
        setTimeout(()=> {
            idle.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`
        }, 1200)
        setTimeout(() => {
            black.style.display = 'none'
            selectionMenu.style.display = 'none'
            game.style.display = 'grid'
        }, 1900)
    }
})
socket.on('playerJoined', gamePlayers => {
    connectPlayer(player ,gamePlayers, playerId)
})

socket.on('fight', (players) => {
    ready.style.display= 'none'
    attack.style.display = 'flex'
    attack.addEventListener('click', () => {
        fight(socket, players, playerId, turn, permission)
    })
    health(players)
})
socket.on('hit', players => {
    health(players)
})
socket.on('permission-false', () => {
    permission = false
})
socket.on('permission-true', () => {
    turn.innerText = 'Your turn'
    permission = true
})
socket.on('winner', name => {
    black.innerText = `${name}, won!`
    black.style.display = 'flex'
})

function health(players) {
    let health1 = document.getElementById('health1')
    let health2 = document.getElementById('health2')
    for (let i = 1; i < 3; i++) {
        if (players[`${i}`].health < 1) {
            return socket.emit('lose', i)
        }
        console.log(players)
        if (players[`${i}`].number === playerId) {
            health1.style.width = `${players[`${i}`].health}%`
        } else {
            health2.style.width = `${players[`${i}`].health}%`
        }
    }
}




// const socket = io()
// const main = document.getElementById('main')
// const clr = document.getElementsByClassName('clr')
// const clear = document.getElementById('clear')
//
// import {randomBlock} from "./modules/randomBlocks.js";
// import {color} from "./modules/color.js";
// import {name} from "./modules/name.js"
// import {clearHtml} from "./modules/idle-menu.js";
//
// console.log('test')
//
// /////////////////
//
// const count = 4
//
// /////////////////
//
// clear.addEventListener('click', clearHtml)
//
// randomBlock(count)
//
// function click(e) {
//     color(e)
//     name(e)
// }
//
//
// for (let i = 0; i < count; i++) {
//     clr[i].addEventListener('click',click)
//     }




