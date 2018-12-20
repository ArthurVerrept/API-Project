var disaster = [];
var country = [];
var disasterIso = [];
var disasterLoc = [];

let apiKeyM = "pk.eyJ1IjoiYXJ0aHVydmVycmVwdCIsImEiOiJjanBqdWFuc2EwYTFxM3ZwZjNlcnBvN2ZtIn0.AP8VWsR0JqBf1JItg_VMvw";
var year = '2014';
var month = '12';
var urlD = 'https://api.reliefweb.int/v1/disasters?appname=arthur-verrept@hotmail.co.uk&filter[field]=date.created&filter[value][from]=' + year + '-' + month + '-01T00:00:00%2B00:00&filter[value][to]=' + year + '-' + month + '-30T23:59:59%2B00:00&fields[include][]=country.iso3'


function preload(){
loadJSON(urlD, loadD)
}

function loadD(disaster){
  for (var i = 0; i < disaster.data.length; i++){
    disasterIso[i] = 'http://countryapi.gear.host/v1/Country/getCountries?pAlpha3Code=' + disaster.data[i].fields.country[0].iso3
  }
  loadCoords();
}

function loadCoords(){
  for (var i = 0; i < disasterIso.length; i++) {
    disasterLoc[i] = loadJSON(disasterIso[i])
  }
}

function setup(){
 mapboxgl.accessToken = apiKeyM;

let map = new mapboxgl.Map({
container: 'app',
style: 'mapbox://styles/mapbox/basic-v9'
});

  map.addSource('pointSource',{
  type: 'geojson',
  data:   {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [0, 0]
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
}
