function displayTemperature(response) {
  console.log(response.data);
}

let apiKey = "51c757e95cb1fdd4bc45100437afbefb";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
