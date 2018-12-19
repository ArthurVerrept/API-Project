var disaster = [];
var country = [];
var temp = [];

let apiKeyM = "pk.eyJ1IjoiYXJ0aHVydmVycmVwdCIsImEiOiJjanBqdWFuc2EwYTFxM3ZwZjNlcnBvN2ZtIn0.AP8VWsR0JqBf1JItg_VMvw";
var year = '2014';
var month = '12';
var urlD = 'https://api.reliefweb.int/v1/disasters?appname=arthur-verrept@hotmail.co.uk&filter[field]=date.created&filter[value][from]=' + year + '-' + month + '-01T00:00:00%2B00:00&filter[value][to]=' + year + '-' + month + '-30T23:59:59%2B00:00&fields[include][]=country.iso3'


function preload(){
let promise = fetch(urlD)
.then(response => response.json())
.then(json => console.log(json));

}



console.log(temp);
function draw(){
noLoop();
var int;


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
