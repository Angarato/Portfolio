




function rollDice(){

    const numOfDice = document.getElementById("numOfDice").value;
    const d6 = document.getElementById("d6");
    const d20 = document.getElementById("d20");
    const diceResult = document.getElementById("diceResult");
    const diceImages = document.getElementById("diceImages");
    const values = [];
    const images = [];

    if(d6.checked){
    for(let i = 0; i < numOfDice; i++ ){
        const value = Math.floor(Math.random() * 6) +1;
        values.push(value); 
        images.push(`<img src="dice/${value}.png" alt="Dice ${value}">`);

    }

    diceResult.textContent = `dice: ${values.join(`, `)}`;
    diceImages.innerHTML = images.join('');
    }
    else if(d20.checked){
        for(let i = 0; i < numOfDice; i++ ){
        const value = Math.floor(Math.random() * 20) +1;
        values.push(value); 
        images.push(`<img src="dice/d20_${value}.png" alt="Dice ${value}">`);

    }

    diceResult.textContent = `dice: ${values.join(`, `)}`;
    diceImages.innerHTML = images.join('');
    }
}