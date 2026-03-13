const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

//canvas stuff
const collisionMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionMap.push(collisions.slice(i, 70 + i))
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

const image = new Image();
const playerImage = new Image();

image.src = 'img/Pellet town.png'
playerImage.src = 'img/playerDown.png'

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerImage,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
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

const moveables = [background, ...boundaries]

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

    player.draw()

    let moving = true
    if (keys.w.pressed && lastKey === 'w') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    retangle1: player,
                    retangle2: {
                        ...boundary, position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {
                console.log("colliding")
                moving = false
                break
            }
        }

        if(moving)
        moveables.forEach((moveable) => { moveable.position.y += 4 })
    } else if (keys.a.pressed && lastKey === 'a') {
        moveables.forEach((moveable) => { moveable.position.x += 4 })
    } else if (keys.s.pressed && lastKey === 's') {
        moveables.forEach((moveable) => { moveable.position.y -= 4 })
    } else if (keys.d.pressed && lastKey === 'd') {
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