

function isValidEmail(email){
//     if(email.includes("@")){
//         return true;
//     }
// else{
//     return false;
//     }
    return email.includes('@') ? true:false;
}

console.log(isValidEmail("mvl86@msn.com"));
console.log(isValidEmail("mvl86msn.com"));
console.log(isValidEmail("mvl86@hotmail.com"));