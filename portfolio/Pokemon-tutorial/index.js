const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

//canvas stuff
c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height)

//define images
const image = new Image();
const playerImage = new Image();

image.src = 'img/Pellet town.png'
playerImage.src = 'img/playerDown.png'

function animate(){
    window.requestAnimationFrame(animate);
    c.drawImage(image, -735, -600)
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
}

animate()

window.addEventListener('keydown', (e) => {
    
    switch (e.key) {
        case 'w':
            break
        case 'a':
            break
        case 's':
            break
        case 'd':
            break
    }
})