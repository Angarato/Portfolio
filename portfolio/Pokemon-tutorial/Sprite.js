class Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        isEnemy = false,
        rotation = 0,
        name 
    }) {
        this.position = position
        this.image = image
        this.frames = { ...frames, val: 0, elapsed: 0 }

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.animate = animate
        this.sprites = sprites
        this.opacity = 1
        this.health = 90
        this.isEnemy = isEnemy
        this.rotation = rotation
        this.name = name
    }

    draw() {
        //c.drawImage(this.image, this.position.x, this.position.y)
        c.save()
        c.translate(
            this.position.x + this.width/2,
            this.position.y + this.height/2
        )
        c.rotate(this.rotation)
        c.translate(
            -this.position.x - this.width/2, 
            -this.position.y - this.height/2
        )
        c.globalAlpha = this.opacity
        c.drawImage(

            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        c.restore()

        if (!this.animate) return

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }
        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++
            else this.frames.val = 0
        }

    }

    heal({ heal }) {

        document.querySelector("#combatText").style.display = 'block'
        document.querySelector("#combatText").innerHTML = this.name + " uses " + heal.name + " on " + this.name

        const tl = gsap.timeline()
        let movementDistance = 30

        this.health += heal.damage
        console.log(heal.damage)
        let healthBar = '#playerHealthBar'

        tl.to(this.position, {
            y: this.position.y - movementDistance,
            onComplete: () => {
                gsap.to(healthBar, {
                    width: this.health + '%',

                })
            }
           
        }).to(this.position, {
            y: this.position.y
        })

        if (this.health >= 90) this.health = 90
    }



    attack({ attack, recipient, renderedSprites }) {
        document.querySelector("#combatText").style.display = 'block'
        document.querySelector("#combatText").innerHTML = this.name + " uses " + attack.name + " on " + recipient.name

        let healthBar = '#enemyHealthBar'
        if (this.isEnemy) healthBar = '#playerHealthBar'

        let rotation = 1.5
        if (this.isEnemy) rotation = -2.5

        recipient.health -= attack.damage
        console.log(attack.damage)

        switch (attack.name) {
            case 'Tackle':
                const tl = gsap.timeline()

                
                let movementDistance = 30
                if (this.isEnemy) movementDistance = -30

                

                tl.to(this.position, {
                    x: this.position.x - movementDistance
                }).to(this.position, {
                    x: this.position.x + movementDistance * 2.66,
                    y: this.position.y - movementDistance,
                    duration: 0.1,
                    onComplete: () => {
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })

                        gsap.to(recipient.position, {
                            x: recipient.position.x + 20,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.05,
                        })

                        gsap.to(recipient, {
                            opacity: 0,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.05,
                            onComplete() {
                                gsap.to(recipient, {
                                    opacity: 1
                                })
                            }
                        })
                    }
                }).to(this.position, {
                    x: this.position.x,
                    y: this.position.y
                })
                break;

            case 'FireBall':
                const fireballImage = new Image()
                fireballImage.src = './img/fireball.png'
                const fireball = new Sprite({
                    position: {
                        x: this.position.x,
                        y: this.position.y
                    },
                    image: fireballImage,
                    frames: {
                        max: 4,
                        hold: 10
                    },
                    animate: true,
                    rotation
                })

                renderedSprites.splice(1, 0, fireball)

                gsap.to(fireball.position, {
                    x: recipient.position.x,
                    y: recipient.position.y,
                    duration: 0.85,

                    onComplete: () => {
                        gsap.to(healthBar, {
                            width: recipient.health + '%'
                        })

                        gsap.to(recipient.position, {
                            x: recipient.position.x + 20,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.05,
                        })

                        gsap.to(recipient, {
                            opacity: 0,
                            yoyo: true,
                            repeat: 5,
                            duration: 0.05,
                            onComplete() {
                                gsap.to(recipient, {
                                    opacity: 1
                                })
                            }
                        })
                       renderedSprites.splice(1, 1) 
                    }
                })
                break
        }
    }

}

