const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = 1024;
canvas.height = 576;

//canvas stuff
const collisionMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionMap.push(collisions.slice(i, 70 + i))
}

const battleZoneMap = []
for (let i = 0; i < battleZonesData.length; i += 70){
    battleZoneMap.push(battleZonesData.slice(i, 70 + i))
}

const boundaries = []
const offset = {
    x: -735,
    y: -600
}

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) boundaries.push(new Boundary({
            position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }
        }))
    })
})

const battleZones = []
battleZoneMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) battleZones.push(new Boundary({
            position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }
        }))
    })
})


const image = new Image();
image.src = 'img/Pellet town.png'

const fgImage = new Image();
fgImage.src = 'img/foregroundObjects.png'

const playerImage = new Image();
playerImage.src = 'img/playerDown.png'

const playerUpImage = new Image();
playerUpImage.src = 'img/playerUp.png'

const playerLeftImage = new Image();
playerLeftImage.src = 'img/playerLeft.png'

const playerRightImage = new Image();
playerRightImage.src = 'img/playerRight.png'




const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    },
    sprites: {
      up: playerUpImage,
      left: playerLeftImage,
      right: playerRightImage,
      down: playerImage
    }
    
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: fgImage
})


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
}

const moveables = [background, ...boundaries, foreground, ...battleZones]

function rectangularCollision({ retangle1, retangle2 }) {
    return (
        retangle1.position.x + retangle1.width >= retangle2.position.x &&
        retangle1.position.x <= retangle2.position.x + retangle2.width &&
        retangle1.position.y + retangle1.height / 2 <= retangle2.position.y + retangle2.height &&
        retangle1.position.y + retangle1.height >= retangle2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate);
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    battleZones.forEach(battleZone => {
        battleZone.draw()
    })
    player.draw()
    foreground.draw()

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battleZones.length; i++) {
            const battleZone = battleZones[i]
            const overlappingArea =  Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width)  - 
                                     Math.max(player.position.x, battleZone.position.x)
            if (
                rectangularCollision({ 
                    retangle1: player,
                    retangle2: battleZone
                }) && overlappingArea > (player.width * player.height) / 2
            ) {
                console.log("battleZone collision")
                break
            }
        }
    }

    let moving = true
    player.moving = false
    if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.image = player.sprites.up

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({ 
                    retangle1: player,
                    retangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 4
                        }
                    }
                })
            ) {
                console.log("colliding")
                moving = false
                break
            }
        }

        if (moving)
            moveables.forEach((moveable) => { moveable.position.y += 4 })
    } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        player.image = player.sprites.left

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    retangle1: player,
                    retangle2: {
                        ...boundary, position: {
                            x: boundary.position.x + 4,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                console.log("colliding")
                moving = false
                break
            }
        }

        if (moving)
            moveables.forEach((moveable) => { moveable.position.x += 4 })
    } else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        player.image = player.sprites.down

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    retangle1: player,
                    retangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 4
                        }
                    }
                })
            ) {
                console.log("colliding")
                moving = false
                break
            }
        }

        if (moving)
            moveables.forEach((moveable) => { moveable.position.y -= 4 })
    } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    retangle1: player,
                    retangle2: {
                        ...boundary, position: {
                            x: boundary.position.x - 4,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                console.log("colliding")
                moving = false
                break
            }
        }
        if (moving)
            moveables.forEach((moveable) => { moveable.position.x -= 4 })
    }

}

animate()

let lastKey = '';
window.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'w':
            keys.w.pressed = true;
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true;
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {

    switch (e.key) {
        case 'w':
            keys.w.pressed = false;
            break
        case 'a':
            keys.a.pressed = false;
            break
        case 's':
            keys.s.pressed = false;
            break
        case 'd':
            keys.d.pressed = false;
            break
    }
})