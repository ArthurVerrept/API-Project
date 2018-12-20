var disaster = [];
var country = [];
var disasterIso = [];
var disasterLoc = [];

let apiKeyM = "pk.eyJ1IjoiYXJ0aHVydmVycmVwdCIsImEiOiJjanBqdWFuc2EwYTFxM3ZwZjNlcnBvN2ZtIn0.AP8VWsR0JqBf1JItg_VMvw";
var year = '2014';
var month = '12';
var urlD = 'https://api.reliefweb.int/v1/disasters?appname=arthur-verrept@hotmail.co.uk&filter[field]=date.created&filter[value][from]=' + year + '-' + month + '-01T00:00:00%2B00:00&filter[value][to]=' + year + '-' + month + '-30T23:59:59%2B00:00&fields[include][]=country.iso3'


function preload(){
  //loading disaster data with callback to anonymous function to load data into an array
  //use of arrow syntax to remove function word. previously: function(disaster){...}
  fetch(urlD).then(function(response) {
    return response.json();
  })
  .then(function(disaster){
    for (var i = 0; i < disaster.data.length; i++){
      disasterIso[i] = 'http://countryapi.gear.host/v1/Country/getCountries?pAlpha3Code=' + disaster.data[i].fields.country[0].iso3  
    }
    console.log(disasterIso);
});



  // loadJSON(urlD, (disaster) => {
  //   for (var i = 0; i < disaster.data.length; i++){
  //     disasterIso[i] = 'http://countryapi.gear.host/v1/Country/getCountries?pAlpha3Code=' + disaster.data[i].fields.country[0].iso3
  //   }
  //   loadCoords();
  // });
}


function loadCoords(){
  for (var i = 0; i < disasterIso.length; i++) {
    disasterLoc[i] = loadJSON(disasterIso[i])
  }
  console.log(disasterLoc);
}

function setup(){
}

function loadMap(){
  mapboxgl.accessToken = apiKeyM;
 let map = new mapboxgl.Map({
 container: 'app',
 style: 'mapbox://styles/mapbox/basic-v9'
 });
 map.on('load', function() {
  map.addSource('pointSource',{
  type: 'geojson',
  data:   {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [disasterLoc[0].response[0].latitude, disasterLoc[0].response[0].longitude]
    },
    "properties": {
      "name": "Dinagat Islands"
    },
  }
  });
  map.addLayer({
    id: 'points'+int,
    source:'pointSource',
    type: 'circle'
});
})
}
