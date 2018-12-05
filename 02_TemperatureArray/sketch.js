let locationArray = ["Plymouth", "London", "Paris", "Berlin", "Athens", "Denpasar"];
let randomLocation;
let apiKey = "6b4a465ac9894c63172283b3f271c20c";
let weather = [];

function preload() {
  for (var i = 0; i < locationArray.length; i++) {
    let url = "http://api.openweathermap.org/data/2.5/weather?q="+locationArray[i]+"&units=metric&appid="+apiKey;
    weather[i] = loadJSON(url);
    console.log(weather[i]);
  }
}
//
function setup() {
  createCanvas(600, 600);
  //textAlign(CENTER);
  textSize(18);
  noLoop();
}

function draw() {
  for (var i = 0; i < weather.length; i++) {
    let mapColor = [];
    if (weather[i].main.temp<-5) mapColor[i] = color(36, 194, 203);
    if (weather[i].main.temp>-5 && weather[i].main.temp<5) mapColor[i] = color(196, 208, 234);
    if (weather[i].main.temp>5 && weather[i].main.temp<10) mapColor[i] = color(234, 231, 222);
    if (weather[i].main.temp>10 && weather[i].main.temp<20) mapColor[i] = color(234, 208, 155);
    if (weather[i].main.temp>20) mapColor[i] = color(234, 140, 0);

    var pos = i * 200;

    if (pos < 600) {
      fill(mapColor[i]);
      rect(pos, 0 , width/2, height/2);
      fill(0);
      text(locationArray[i], pos+10, height/6-30);
      text("Temperature: " + weather[i].main.temp + "°C", pos+10, height/6);
      console.log(height/6);
      text("Humidity: " + weather[i].main.humidity + "%", pos+10, height/6+30);
    }
    else {
      fill(mapColor[i]);
      rect(pos-600, 300, width/2, height/2);
      fill(0);
      text(locationArray[i], pos-590, height-180);
      text("Temperature: " + weather[i].main.temp + "°C", pos-590, height-150);
      console.log(height/2);
      text("Humidity: " + weather[i].main.humidity + "%", pos-590, height-120);
    }
  }
}
