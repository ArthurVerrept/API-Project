let getLocationL = "Berlin";
let apiKey = "LipKCauFo7AcRa7pJ";
let weather;

function preload() {
  let url = "https://api.airvisual.com/v2/countries?&key=" + apiKey;
  weather = loadJSON(url);
}

function setup() {
  console.log(weather); //Return all JSON data
  //console.log(weather2);
}
