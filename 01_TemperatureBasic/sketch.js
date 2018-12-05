//http://api.openweathermap.org

//Use a text/string object to assign the city we would like to know the weather of
let getLocationL = "Berlin";
let getLocationA = "Athens, GR";
let getLocationS = "Shanghai";
//The API key has to be given by the openweathermap.org website (for free / per account)
let apiKey = "6b4a465ac9894c63172283b3f271c20c";
//This variable will store the JSON weather data
let weather;

//The preload function is executed before initializing the code in setup
//Loads any related data or media files
function preload() {
  //The URL is formatted according to the documentation provided by the developers in:
  //http://api.openweathermap.org
  //The text/string object is formatted with the location we want to use, and our own API key
  let url = "http://api.openweathermap.org/data/2.5/weather?q="+getLocationL+"&units=metric&appid="+apiKey;
  let url2 = "http://api.openweathermap.org/data/2.5/weather?q="+getLocationA+"&units=metric&appid="+apiKey;
  let url3 = "http://api.openweathermap.org/data/2.5/weather?q="+getLocationS+"&units=metric&appid="+apiKey;
  //The URL is sent to the loadJSON that returns the data to the weather variable
  weather = loadJSON(url);
  weather2 = loadJSON(url2);
  weather3 = loadJSON(url3);
}

function setup() {
  console.log(weather); //Return all JSON data
  //console.log(weather2);
  noStroke();
  // console.log("Location: " + getLocation) //Show the location we are searching
  // console.log("Temperature: " + weather.main.temp + "°C"); //Show location's conditions (temperature)
  // console.log("Temperature (min): " + weather.main.temp_min + "°C"); //Minimum temperature
  // console.log("Temperature (max): " + weather.main.temp_max + "°C"); //Maximum temperature
  // console.log("Humidity: " + weather.main.humidity); //Humidity
  // console.log("Pressure: " + weather.main.pressure); //Pressure

  //Display temperature information on the screen
  createCanvas(700, 400);
  background(160);
  textAlign(CENTER);

  scale1 = map(weather.main.temp, 0, 20, 0, 150);
  scale2 = map(weather2.main.temp, 0, 20, 1, 150);
  scale3 = map(weather3.main.temp, 0, 20, 0, 150);


  fill(map(weather.main.temp, 0, 20, 1, 255), 0, 0);
  textSize(map(weather.main.temp, 0, 20, 1, 20));
  ellipse(50, 50, scale1, scale1);
  fill(255);
  text(getLocationL, 50, 50);
  text(weather.main.temp + "º", 50, 50+map(weather.main.temp, 0, 20, 1, 20)+2);

  fill(map(weather2.main.temp, 0, 20, 0, 255), 0, 0);
  textSize(map(weather2.main.temp, 0, 20, 1, 20));
  ellipse(300, 300, scale2, scale2);
  fill(255);
  text(getLocationA, 300, 300);
  text(weather2.main.temp + "º", 300, 300+map(weather2.main.temp, 0, 20, 1, 20)+2);

  fill(map(weather3.main.temp, 0, 20, 0, 255), 0, 0);
  textSize(map(weather3.main.temp, 0, 20, 0, 20));
  ellipse(550, height/2, scale3, scale3);
  fill(255);
  text(getLocationS, 550, height/2);
  text(weather3.main.temp + "º", 550, height/2+map(weather3.main.temp, 0, 20, 1, 20)+2);

  noLoop();
}

function draw(){
}
