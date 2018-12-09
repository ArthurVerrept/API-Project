let getLocationL = "Berlin";
let apiKey = "LipKCauFo7AcRa7pJ";
let weather;
let array = [];

function preload() {
  let url = "https://api.airvisual.com/v2/countries?&key=" + apiKey;
  weather = loadJSON(url);
}

function setup() {
  for (var i = 0; i < weather.data.length; i++) {
    console.log(weather.data[i].country); //Return all JSON data
  }
}
