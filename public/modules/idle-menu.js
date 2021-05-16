export function mainMenu(play, idleMenu,music, selectionMenu, menu) {
    play.addEventListener('click', () => {
        music.play()
        play.style.animationName = 'play-animation'
        setTimeout(()=> {
        idleMenu.style.display = 'none'
            selectionMenu.style.display = 'flex'
            menu.style.animationName = 'selection-animation'
        }, 500)
    })
}