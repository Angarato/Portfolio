const battleBackgroundImage = new Image()
battleBackgroundImage.src = 'img/battleBackground.png'
const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage
})


const draggle = new Sprite(monsters.Draggle)


const battlePlayer = new Sprite(monsters.Emby)
   

const renderedSprites = [draggle, battlePlayer]
const button = document.createElement('button')
button.innerHTML = 'Tackle'
document.querySelector('.attacks').append(button)
function animateBattle() {
    window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}

//animate()
animateBattle()

const queue = []

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener('click', (e) => {
        const selectedSkill = skills[e.currentTarget.innerHTML]

        if (selectedSkill.name === "Tackle" || selectedSkill.name === "FireBall") {
            battlePlayer.attack({
                attack: selectedSkill,
                recipient: draggle,
                renderedSprites
            })
        }
        else {
            battlePlayer.heal({heal: selectedSkill})
        }

        queue.push(() => {
            draggle.attack({
                attack: skills.Tackle,
                recipient: battlePlayer,
                renderedSprites
            })
        })

        queue.push(() => {
            draggle.attack({
                attack: skills.Tackle,
                recipient: battlePlayer,
                renderedSprites
            })
        })

    })
})

document.querySelector('#combatText').addEventListener('click', (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    } else e.currentTarget.style.display = "none"

})