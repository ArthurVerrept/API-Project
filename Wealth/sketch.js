var disaster = [];
var country = [];
var disasterIso = [];
var disasterLoc = [];

let apiKeyN = '8d541169a3ec4132b0551f4909b72806';
let apiKeyM = "pk.eyJ1IjoiYXJ0aHVydmVycmVwdCIsImEiOiJjanBqdWFuc2EwYTFxM3ZwZjNlcnBvN2ZtIn0.AP8VWsR0JqBf1JItg_VMvw";
var year = '2014';
var month = '12';
var month2 = '01';
var urlD = 'https://api.reliefweb.int/v1/disasters?appname=arthur-verrept@hotmail.co.uk&filter[field]=date.created&filter[value][from]=' + year + '-' + month2 + '-01T00:00:00%2B00:00&filter[value][to]=' + year + '-' + month + '-30T23:59:59%2B00:00&fields[include][]=country.iso3'
var urlN = 'https://newsapi.org/v2/everything?q=sudan Kala-azar&apiKey=' + apiKeyN


function preload(){

  //fetching the urlD information as a promise and returning the value as JSON to be readable
  //using anonymous functions to reduce code
  fetch(urlD).then(function(response) {
    return response.json();
  })
  //once top promise is "resolved" the ".then" starts this next loop which loads all URL + the iso3's from the disaster locaions
  //into a new array to be handled in next step
  .then(function(disaster){
    console.log(disaster)
    for (var i = 0; i < disaster.data.length; i++){
      disasterIso[i] = 'http://countryapi.gear.host/v1/Country/getCountries?pAlpha3Code=' + disaster.data[i].fields.country[0].iso3
    }
    console.log(disasterIso);
  })
  //once that is done this function
  .then(function(){
    for (var i = 0; i < disasterIso.length; i++) {
      disasterLoc[i] = loadJSON(disasterIso[i])
      console.log(disasterLoc[i])
    }
  })
  .then(loadMap);
}




function setup(){

}

function loadMap(){
  var news = loadJSON(urlN)
  console.log(news, 'news')
  mapboxgl.accessToken = apiKeyM;
  let map = new mapboxgl.Map({
    container: 'app',
    style: 'mapbox://styles/mapbox/basic-v9'
  });

  map.on('load', function() {
     for (var i = 0; i < disasterLoc.length; i++) {
       console.log(disasterLoc[i].Response[0].Longitude, disasterLoc[i].Response[0].Latitude)
         map.addSource('pointSource' + i,{
         type: 'geojson',
         data:   {
           "type": "Feature",
           "geometry": {
             "type": "Point",
             "coordinates": [disasterLoc[i].Response[0].Longitude, disasterLoc[i].Response[0].Latitude]
           },
           "properties": {
             "name": "Dinagat Islands"
           },
         }
         });
         map.addLayer({
           id: 'points' + i,
           source:'pointSource' + i,
           type: 'circle'
       });
     }
  })
}
