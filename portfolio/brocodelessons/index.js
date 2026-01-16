

// function hello(callback){
//     console.log("hello!")
//     callback();
// }

// function leave(){
//     console.log("Leave!")
// }

// function wait(){
//     console.log("Wait!")
// }

// function goodBye(){
//     console.log("good bye!")
// }


function sum(callback, x, y) {
    let result = x + y;
    callback(result);
}

function displayConsole(result) {
    console.log(result);
}

function displayPage(result){
    document.getElementById("myH1").textContent = result;
}

sum(displayPage, 1, 7)
