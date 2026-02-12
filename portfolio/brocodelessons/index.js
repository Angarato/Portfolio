



function walkDog() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const dogWalked = true;

            if (dogWalked) {
                resolve("thou walketh teh dawg");
            }
            else {
                reject("thou did not walketh teh dawg")
            }
        }, 1500)
    });
}

function cleanKitchen() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const kitchenCleaned = false;

            if (kitchenCleaned) {
                resolve("thou cleaneth teh kitchen");
            }
            else {
                reject("thou did not cleaneth teh kitchen")
            }
        }, 2500)
    });

}

function takeTrash() {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            const trashTakenOut = true;

            if(trashTakenOut){
            resolve("thou tooketh out teh trash");
            }
            else{
                reject("thou did not tooketh out teh trash")
            }
        }, 500)
    })

}

walkDog().then(value => { console.log(value); return cleanKitchen() })
    .then(value => { console.log(value); return takeTrash() })
    .then(value => { console.log(value); console.log("thou finished thine tasks") })
    .catch(error => console.error(error));
    