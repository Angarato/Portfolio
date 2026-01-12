


const minNum = 1;
const maxNum = 69;
const answer = Math.floor(Math.random() * (maxNum - minNum +1)) + minNum ;

let attempts = 0;
let guess;
let running = true;

while(running){

    guess = window.prompt(`guess a number between ${minNum} - ${maxNum}`);
    guess = Number(guess);
    
    if(isNaN(guess)){
        window.alert("please enter a valid number")
    }
    else if(guess < minNum || guess > maxNum){
         window.alert("please enter a valid number")
    }
    else{
        attempts++;
        if(guess < answer){
              window.alert("too low");
        }
        else if (guess > answer){
              window.alert("too high");
        }
        else{
              window.alert(`you guessed it! good job!  the answer was ${answer}! it took you ${attempts} attempts`);
              running = false;
        }
    }
    
}