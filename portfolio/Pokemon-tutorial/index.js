const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

//canvas stuff
const collisionMap = []
for (let i = 0; i < collisions.length; i+= 70){
   collisionMap.push(collisions.slice(i, 70 + i))
}

class Boundary {
    static width = 48
    static height = 48

    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -735,
    y: -600
}

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
      if(symbol === 1025)  boundaries.push(new Boundary({position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
        }}))
    })
})

const image = new Image();
const playerImage = new Image();

image.src = 'img/Pellet town.png'
playerImage.src = 'img/playerDown.png'

class Sprite {
    constructor({
        position,
        velocity,
        image
    }) {
        this.position = position
        this.image = image
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}



const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys = {
    w: {
        pressed:false
    },
    a: {
        pressed:false
    },
    s: {
        pressed:false
    },
    d: {
        pressed:false
    },
}

const moveables = [background, boundaries]
function animate(){
    window.requestAnimationFrame(animate);
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - playerImage.width / 4 / 2,
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height
    )

    if (keys.w.pressed && lastKey === 'w') {
        moveables.forEach((moveable) => {moveable.position.y += 4})
    } else if (keys.a.pressed && lastKey === 'a') {
        moveables.forEach((moveable) => {moveable.position.x += 4})
    } else if (keys.s.pressed && lastKey === 's') {
        moveables.forEach((moveable) => {moveable.position.y -= 4})
    } else if (keys.d.pressed && lastKey === 'd') {
        moveables.forEach((moveable) => {moveable.position.x -= 4})
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