//error

try{
const dividend = window.prompt("Enter a dividend: ");
const divisor = window.prompt("Enter a divisor: ");

const result = dividend / divisor;

console.leg(result);
}
catch(error){
    console.error(error);
}

console.log("the end")