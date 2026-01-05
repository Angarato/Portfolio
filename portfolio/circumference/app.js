const PI = 3.14159;
let radius; 
let circum; 


document.getElementById("mySubmit").onclick = function(){
    radius = document.getElementById("myText").value;
    radius = Number(radius);
    circum = 2* PI * radius;
    
    document.getElementById("myH3").textContent = `the circumference of the circle is ${circum} cm`; 
}