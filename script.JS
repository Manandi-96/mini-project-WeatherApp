/* weather api= https://api.openweathermap.org/data/2.5/weather?q=anuradhapura&appid=b8bd635830262b09220172898de88d1a&units=metric*/

const apiKey = "b8bd635830262b09220172898de88d1a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";


// Add the city name to the function using event listener
const locationInput = document.querySelector('#locationInput');
const button = document.querySelector('.btn');
const weatherIcon= document.querySelector(".weather-icon");
// autocomplete list
const autocompleteList = document.createElement("div");
autocompleteList.setAttribute("class", "autocompleteForm-items");
document.querySelector('.autocompleteForm').appendChild(autocompleteList);
        

//==================fnction for autocomplete========================
async function fetchCities() {

 // getting the citi names from json to array
    const response = await fetch('cities.json');
    const citiesData = await response.json();
    cityNames = citiesData.map(city => city.name.toLowerCase());
    console.log(cityNames)
    

//compare input with the awailable cities in the array

function autocomplete(inp, arr) {

    // do not display other details until the citie is properly given to the apikey
    document.querySelector('.details').style.display = "none";
    
    inp.addEventListener("input", function() {
        const inputValue = this.value.toLowerCase();
        autocompleteList.innerHTML = '';

        const filteredLocations = arr.filter(location => location.toLowerCase().startsWith(inputValue));

        filteredLocations.forEach(location => {
            const suggestion = document.createElement('div');
            suggestion.innerHTML = 
            `<strong>${location.substr(0, inputValue.length)}</strong>
            ${location.substr(inputValue.length)}`;
            suggestion.innerHTML += `<input type='hidden' value='${location}'>`;

            suggestion.addEventListener('click', function() {
                inp.value = this.getElementsByTagName('input')[0].value;
                console.log("Selected city:", inp.value);
                autocompleteList.innerHTML = '';
            });

            autocompleteList.appendChild(suggestion);
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target !== inp) {
            autocompleteList.innerHTML = '';
        }
    });
    
}
        // Call autocomplete function with your input and the array of locations
        autocomplete(locationInput, cityNames);

        }

        // Call the function to fetch and process cities
        fetchCities();


   // check weather to the entered city

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    

    if(response.status==400){
        document.querySelector('.details').style.display = "none";
    }
    else{
        document.querySelector('.details').style.display = "block";
        const data = await response.json();

                console.log(data);

            // Update the city name
            document.querySelector(".city").innerHTML = data.name;
            // Update the temp
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp)+"°C";
            // Description
            document.querySelector(".description").innerHTML = data.weather[0].description;
            // Humidity
            document.querySelector(".humidity-value").innerHTML = " " + Math.round(data.main.humidity) + "%";
            // Wind speed
            document.querySelector(".windSpeed-value").innerHTML = " " + Math.round(data.wind.speed) + "km/h";

            //add imgs
            //img according to weather conditions
            if(data.weather[0].main=="Clouds"){
                weatherIcon.src="img/cloud.png";
            }
            else if (data.weather[0].main=="Clear"){
                weatherIcon.src="img/clear-sky.png";
            } 
            else if (data.weather[0].main=="Rain"){
                weatherIcon.src="img/rain.png";
            } 
            else if (data.weather[0].main=="Drizzle"){
                weatherIcon.src="img/weather.png";
            } 
            else if (data.weather[0].main=="Mist"){
                weatherIcon.src="img/smoke.png";
            } 
            else if (data.weather[0].main=="Snow"){
                weatherIcon.src="img/snow.png";
            } 

            }
        }


        // Initial weather check
        checkWeather();

      /* button.addEventListener("click", () => {
            checkWeather(locationInput.value);
        }); */ 
        button.addEventListener("click", (event) => {
            event.preventDefault(); // prevent form submission
            checkWeather(locationInput.value);
        });

    
                