class Sprite {
    constructor({
        position,
        velocity,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false
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

    attack({attack, recipient}) {
        const tl = gsap.timeline()
        tl.to(this.position, {
            x: this.position.x - 30
        }).to(this.position, {
            x: this.position.x + 80,
            y: this.position.y - 30,
            duration: 0.1,
            onComplete() {
                gsap.to(recipient.position, {
                    x: recipient.position.x + 20,
                    yoyo: true,
                    repeat: 5,
                    duration: 0.05,
                })

                gsap.to(recipient, {
                    opacity: 0,
                    yoyo: true,
                    repeat: 5
                })
            }
        }).to(this.position, {
            x: this.position.x,
            y: this.position.y 
        })
    }

}

