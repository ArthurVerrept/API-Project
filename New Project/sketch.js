let getLocationL = "Berlin";
let apiKey = "LipKCauFo7AcRa7pJ";
let weather;
let array = '';
var params;

function preload() {
  let url = "https://api.airvisual.com/v2/countries?&key=" + apiKey;
  weather = loadJSON(url);

  text = {
	country: ''
	}

}

function setup() {

  var gui = new dat.GUI();
  gui.add(text, 'country', [ weather.data[0].country ]);



}
