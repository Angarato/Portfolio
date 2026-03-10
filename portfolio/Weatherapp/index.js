//weatherapp

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card")
const apiKey = "4ea18e3431b3682f51893c7c663c38eb";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
            
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a City")
    }

})

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok){
        throw new Error("could not fetch weather data")
    }

    return await response.json();
}

function displayWeatherInfo(data){

    const {name: city, 
           main: {temp,feels_like, humidity}, 
           weather: [{description, id}]} = data;
    
    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    //const tempFDisplay = document.createElement("p");
    const feelsDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(0)}°C`;
    //tempFDisplay.textContent = `(${((temp - 273.15) * (9/5) + 32).toFixed(0)}°F)`;
    feelsDisplay.textContent = `Feels like: ${(feels_like - 273.15).toFixed(0)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = `${description}`;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    //tempFDisplay.classList.add("tempFDisplay")
    feelsDisplay.classList.add("feelsDisplay")
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    //card.appendChild(tempFDisplay);
    card.appendChild(feelsDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherID){

    switch(true){
        case (weatherID >= 200 && weatherID < 300):
            return "⛈️"; 
        case (weatherID >= 300 && weatherID < 400):
            return "🌧️";    
        case (weatherID >= 500 && weatherID < 600):
            return "🌧️"; 
        case (weatherID >= 600 && weatherID < 700):
            return "🌨️"; 
        case (weatherID >= 700 && weatherID < 800):
            return "🌁"; 
        case (weatherID === 800):
            return "☀️"; 
        case (weatherID >= 800 && weatherID < 810):
            return "🌥️"; 
        default: 
            return "?";
    }

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}















// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//     .then(response => {

//         if(!response.ok){
//             throw new Error("couldnt fetch resource")
//         }
//         return response.json();
//     })
    
    
//     .then(data => console.log(data.name ))
    
//     .catch(error => console.error(error));
    