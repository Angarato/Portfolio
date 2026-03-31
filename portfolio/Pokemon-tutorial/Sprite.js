class Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        isEnemy = false
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

    }

    draw() {
        //c.drawImage(this.image, this.position.x, this.position.y)
        c.save()
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
        c.restore

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
            /*}).to(this.position, {
                y: this.position.y + movementDistance * 2,
                duration: 0.1,
                
                }*/
        }).to(this.position, {
            y: this.position.y
        })

        if (this.health >= 90) this.health = 90
    }



    attack({ attack, recipient }) {
        switch (attack.name) {
            case 'Tackle':
                const tl = gsap.timeline()

                recipient.health -= attack.damage
                console.log(attack.damage)
                let movementDistance = 30
                if (this.isEnemy) movementDistance = -30

                let healthBar = '#enemyHealthBar'
                if (this.isEnemy) healthBar = '#playerHealthBar'

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
                    fireballImage.src = 'img/fireball.png'
                    const fireball = new Sprite({
                        position: {
                            x: this.position.x,
                            y: this.position.y
                        },
                        image: fireballImage
                    })
                break
        }
    }

}

