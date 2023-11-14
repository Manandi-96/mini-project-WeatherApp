async function fetchCities() {
  
    
        const response = await fetch('cities.json');
        const citiesData = await response.json();

        // Extract city names and populate the array
        cityNames = citiesData.map(city => city.name.toLowerCase());
        console.log(cityNames)
   
}

// Call the function to fetch and process cities
fetchCities();



