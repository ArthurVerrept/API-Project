
var csv;
let apiKeyM = "pk.eyJ1IjoiYXJ0aHVydmVycmVwdCIsImEiOiJjanBqdWFuc2EwYTFxM3ZwZjNlcnBvN2ZtIn0.AP8VWsR0JqBf1JItg_VMvw";


var year = '2004-';
var month = '12-';

function setup(){
  csv = loadJSON('https://api.reliefweb.int/v1/reports?appname=arthur-verrept@hotmail.co.uk&filter[field]=date.created&filter[value][from]=2004-06-01T00:00:00%2B00:00&filter[value][to]=2004-06-30T23:59:59%2B00:00&fields[include][]=country.name&fields[include][]=date');
  console.log(csv);

}

mapboxgl.accessToken = apiKeyM;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/basic-v9'
});


   map.on('mousemove', function (e) {
        // e.point is the x, y coordinates of the mousemove event relative
        // to the top-left corner of the map
        //JSON.stringify(e.point)
        // e.lngLat is the longitude, latitude geographical position of the event
        console.log(JSON.stringify(e.lngLat));

      });
