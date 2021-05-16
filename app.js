const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const color = require('randomcolor')

const socketio = require('socket.io')
const server = http.createServer(app)

const io = socketio(server)

const heroes = [
    {
        type: 'Mage',
        image: "https://www.pngkey.com/png/detail/347-3476576_black-mage-minecraft-pixel-art-black-mage.png",
        maxDamage: 7,
        special: "30% chance to heal 10hp on hit",
    },
    {
        type: 'Warrior',
        image: "https://media.istockphoto.com/vectors/pixel-art-hero-vector-id818681766?k=6&m=818681766&s=612x612&w=0&h=T2MVEguSWCBwr98WEWVv0HcwQzfKAOOSpeZKlgjhDOI=",
        maxDamage: 12,
        special: "30% chance to block enemy attack",
    },
    {
        type: 'Archer',
        image: "https://images.cdn4.stockunlimited.net/clipart/pixel-art-gaming-character_2022342.jpg",
        maxDamage: 8,
        special: "30% chance to do double damage",
    },
]

let players = []

server.listen(3100)

app.use(express.static(path.join(__dirname, 'public')))

let gamePlayers = {
    1: {
        hero: {
            type: 'Unknown',
            image: "https://i.imgur.com/WwHafJg.png",
            maxDamage: '???',
            special: "????",
        },
        id: 'none',
        name: 'Waiting...',
        number: 0,
        ready: false
    },
    2: {
        hero: {
            type: 'Unknown',
            image: "https://i.imgur.com/WwHafJg.png",
            maxDamage: '???',
            special: "????",
        },
        id: 'none',
        name: 'Waiting...',
        number: 0,
        ready: false
    }
}
let count = 0
let inGame = 0
let ready = 0
let prepared = false

function attacking(id, dmg) {
    const percent = Math.random() * 100
    let damage = Math.ceil(Math.random() * dmg)
    if(id === 1) {
        if (gamePlayers['2'].hero.type === 'Warrior' && percent < 30) {
            return
        }
        if (gamePlayers['1'].hero.type === 'Mage' && percent < 30) {
            gamePlayers['1'].hero.health += 10
        }
        if (gamePlayers['1'].hero.type === 'Archer' && percent < 30) {
            damage *= 2
        }
        return gamePlayers['2'].health -= damage
    }
    if(id === 2) {
        if (gamePlayers['1'].hero.type === 'Warrior' && percent < 30) {
            return
        }
        if (gamePlayers['2'].hero.type === 'Mage' && percent < 30) {
            gamePlayers['2'].health += 10
        }
        if (gamePlayers['2'].hero.type === 'Archer' && percent < 30) {
            damage *= 2
        }
        return gamePlayers['1'].health -= damage
    }
}
io.on('connection', socket => {
    count++
    if (count === 3) {
        socket.emit('full')
    }
    let player = {
        id: socket.id,
        hero: [],
        name: ''
    }
    socket.emit('getId', count)
    let selected = false
    setTimeout(()=> {
        socket.emit('loadHeroes', heroes)
    }, 101)
    socket.on('disconnect', () => {
        count--

        players.map((plr, index) => {
            if (plr.id === socket.id) {
                players.splice(index, 1);
                ready--
                inGame--
            }
        });
    })
    socket.on('selectHero', type => {
        heroes.map((hero, index) => {
            if(type === hero.type) {
                player.hero = hero
            }
        })
        selected = true
    })
    socket.on('start', (info) => {
        if (info.name.length < 1) {return socket.emit('game', {error: true, message: 'Enter your name!'})}
        if (!selected) {
            return socket.emit('game', {error: true, message: 'Select your hero!'})
        }

        if (selected) {
            player.health = 100
            player.name = info.name
            player.number = info.id
            player.ready = false
            players.push(player)
            gamePlayers[`${info.id}`] = player
            return socket.emit('game', {error: false, gamePlayers})
        }
    })
    socket.on('join', () => {
        inGame++
        socket.broadcast.emit('playerJoined', gamePlayers)
        if (inGame === 2) {
            prepared = true
        }
    })
    socket.on('readyCheck', (playerId) => {

        if (gamePlayers[`${playerId}`].ready === false) {
            gamePlayers[`${playerId}`].ready = true
            ready++
            console.log('first', ready)
        }

        if (ready === 2) {
            console.log('ready lygu 2',ready)
            return io.emit('fight', gamePlayers)

        }

    })
    socket.on('attack', (id) => {
        socket.emit('permission-false')
        socket.broadcast.emit('permission-true', );
        for (let i = 1; i < 3; i++) {
            if (gamePlayers[`${i}`].number === id) {

                if (gamePlayers[`${i}`].hero.type === 'Warrior') {
                    attacking(id, gamePlayers[`${i}`].hero.maxDamage)
                    return io.emit('hit', gamePlayers)
                }
                if (gamePlayers[`${i}`].hero.type === 'Mage') {
                    attacking(id, gamePlayers[`${i}`].hero.maxDamage)
                    return io.emit('hit', gamePlayers)
                }
                if (gamePlayers[`${i}`].hero.type === 'Archer') {
                    attacking(id, gamePlayers[`${i}`].hero.maxDamage)
                    return io.emit('hit', gamePlayers)
                }
            }
        }
    })
    socket.on('lose',(id) => {
        for (let i = 1; i < 3; i++) {
            if (gamePlayers[`${i}`].number !== id) {
                io.emit('winner', gamePlayers[`${id}`].name)
            } }
    })

})
