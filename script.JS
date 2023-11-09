/* weather api= https://api.openweathermap.org/data/2.5/weather?q=anuradhapura&appid=b8bd635830262b09220172898de88d1a&units=metric*/

const apiKey= "b8bd635830262b09220172898de88d1a";
const apiUrl=" https://api.openweathermap.org/data/2.5/weather?&units=metric&q=anuradhapura";


async function checkWeather(){
    const response=await fetch(apiUrl+ `&appid=${apiKey}`);
    var data= await response.json();

    console.log(data);


    //update the city name
    document.querySelector(".city").innerHTML = data.name;
    //update the temp
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) +"°C";
    //discription
    document.querySelector(".description").innerHTML = data.weather[0].description;
    //humidity
    document.querySelector(".humidity-value").innerHTML=" " + Math.round(data.main.humidity)+"%";
    //wind speed
    document.getElementsByClassName(".windSpeed-value").innerHTML=" " + Math.round(data.wind.speed)+"km/h";


}
checkWeather();





