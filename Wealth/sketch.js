//creating variable for API url
var url = 'https://forbes400.herokuapp.com/api/forbes400?limit=100';
//creating arrays for JSON data
var data = [];
//creating variable for flags and billionairs pictures
var img = [];
var flags = [];
//creating variables to use to make calculations
var usaWage, hunger, gdp, total, totalLong;

//creates a "words" object with x, y and size
var words = {
  x: 0,
  y: 50,
  size: 0
};

//creates a "pic" object with x, y and size
var pic = {
  x: 0,
  y: 50,
  size: 90
};

//creates a "country" object with the GDP of certain countries
var country = {
  Mexico: 1150000000000,
  Somalia: 7396000000,
  UnitedKingdom: 2622000000000,
  USA: 19390000000000,
  Greece: 200000000000
}


//Creates a "params" object to be used in GUI
var params = {
amount: 10,
};


function preload(){
  createCanvas(1280, 720);
  //this loads the data from API into the data array
  data = loadJSON(url)
}


function setup() {
  //setting the aligning to center
  textAlign(CENTER);
  imageMode(CENTER);
  ellipseMode(CENTER);
  rectMode(CENTER);

  //loads images of billionaires from the images folder (with the same name as stored in data)
  //and stored locally into array in same location as corresponding billionaire
  for (var i = 0; i < 20; i++) {
    img[i] = loadImage("images/" + data[i].name + ".jpg");
  }
  //loads images of country flags from the flags folder (with the same country as in data)
  //and stored locally into array in same location as corresponding billionaire
  for (var i = 0; i < 20; i++) {
    flags[i] = loadImage("Flags/" + data[i].country + ".png");
  }



	//Creates new function in params object called choice
 	params.Country = function() {
		//Calls Choice function to change value of countries gdp
	  choice();
	};


	//Creates variable gui and assignes a new gui
	var gui = new dat.GUI();

	//Adds all the lists and sliders to gui
	gui.add(params, 'amount', 0, 20).name('Amount');
  gui.add(params, 'Country', [ 'Mexico', 'Somalia', 'United Kingdom', 'USA', 'Greece' ] ).name('Country GDP');
  //this assigns a country from list on startup to avoid NaN number
  params.Country = 'USA';
}


function draw() {
  //calls richlist function
  richList();
}



function richList(){
  //this resets the screen every fram
  background(240);
  //this sets the variable r to be the value on the slider of GUI
  var r = Math.round(params.amount);
  //assigning total and totalLong to 0
  total = 0;
  totalLong = 0;
  fill(240);
  //looping from 0 to the value on the GUI slider
  for (var i = 0; i < r; i++) {
    //calls setsize with current point in loop and amount on slider
    setSize(i, r);
    //if statement calls checkmouse with x,y and image size to check if mouse is over current image being drawn
      if (checkMouse(pic.x, pic.y, pic.size) == true) {
        //calls background to reset size of all pictures
        background(240);
        //this for loop displays everything before the selected billionaire
        for (var x = 0; x < i; x++) {
          //calls the setsize function with the new point in loop
          setSize(x, r);
          //calls displayAll with new point in loop, value on slider, and the scale at which to decrease the non-selected images
          displayAll(x, r, 0.7);
        }
        //this for loop displays everything after the selected billionaire
        for (var x = i+1; x < r; x++) {
          //calls the setsize function with the new point in loop
          setSize(x, r);
          //this for loop displays everything after the selected billionaire
          displayAll(x, r, 0.7);
        }
      //this calls the selected function to highlights selected IF one is selected
      selected();
      }
      //if the mouse is not over current image then draw all normal size
      else{
        //calls display all function with a 1:1 scale to keep images same size
        displayAll(i, r, 1);
      }
  }


  //this function displays the selected image and data
  function selected(){
    //this if statement checks if the selected billionaire is on the left or right side
    if (i > r/2) {
      //this calls a function to set the side of the text in relation to text
      setSide('right', i, r);
      //this calls a function to display image and text in correct location
      displaySelected(i, r, 30);
      //this sets the the overall counter to the value of the selected image so
      //that the images will draw from the point after the selected one
      i = x;
    }
    else{
      //this calls a function to set the side of the text in relation to text
      setSide('left', i, r);
      //this calls a function to display image and text in correct location
      displaySelected(i, r, -30)
      //this sets the the overall counter to the value of the selected image so
      //that the images will draw from the point after the selected one
      i = x;
    }
  }

  for (var i = 0; i < r; i++) {
    if (data[i].realTimeWorth != null) {
      var num = Math.round(data[i].realTimeWorth/1000);
      total += num;
      totalLong += num*1000000000;
    }
    else{
      i++;
    }
  }
  if (total > 1000) {
  createTotals(total, totalLong, 'TRILLION', 1000);
  }
  else{
  createTotals(total, totalLong, 'BILLION', 1);
  }
}

function choice(){
  if (params.Country == 'Mexico')return country.Mexico;
  else if (params.Country == 'Somalia')return country.Somalia;
  else if (params.Country == 'United Kingdom')return country.UnitedKingdom;
  else if (params.Country == 'USA')return country.USA;
  else if (params.Country == 'Greece')return country.Greece;
}

function createTotals(t, tL, scale, multiple){
  console.log(params.Country);
  fill(20);
  textAlign(CENTER)
  gdp = (tL/ choice())*100;
  usaWage = tL / 49192;
  hunger = tL / 3000000000;
  textSize(map(t, 100, 1500, 25, 125));
  text('TOTAL: $' + precise(t/multiple) + scale, width/2, height/1.5)
  fill(map(mouseY, 0, height, 200, 20));
  textSize(map(mouseY, 0, height, 30, 60));
  text('$' + precise(hunger) + ' For all 3 billion in poverty', width/2, height/1.5+60);
    if (mouseY > height/2) {
      fill(map(mouseY, height/2, height, 20, 200));
      textSize(map(mouseY, height/2, height, 60, 35));
    }
    else{
      fill(map(mouseY, 0, height/2, 200, 20));
      textSize(map(mouseY, 0, height/2, 30, 60));
    }
    text(Math.round(usaWage) + ' Average American yearly salaries', width/2, height/1.5+110)
    fill(map(mouseY, height/2, height, 20, 200));
    textSize(map(mouseY, 0, height, 60, 30));
    text(precise(gdp) + "% of " + params.Country + "'s GDP", width/2, height/1.5+170);
  }


function setSide(imgRL, selected, totalAmount){
  if (imgRL == 'right') {
    textAlign(RIGHT);
    pic.x = (width-360) * (selected / totalAmount)+200;
    pic.size = map(totalAmount, 0, 20, 90, 60)*4
    words.x = pic.x - pic.size/2 - 20;
  }
  else if (imgRL == 'left'){
    textAlign(LEFT);
    pic.x = (width-360) * (selected / totalAmount)+200;
    pic.size = map(totalAmount, 0, 20, 90, 60)*4
    words.x = pic.x + pic.size/2 + 20;
  }

}

function displaySelected(selected, totalAmount, move){
  fill(20)
  tint(240, 255);
  image(img[selected], pic.x, pic.y+200, pic.size, pic.size);
  image(flags[selected], words.x - move, pic.y + 120)
  textSize(17);
  text(data[selected].country, words.x-move*2.2, pic.y+125)
  textSize(25);
  text(data[selected].name + ', ' + data[selected].age, words.x, words.y+170)
  fill(0, 153, 0);
  text('Net Worth: $' + financial(data[selected].realTimeWorth * 1000000/1000000000) + ' BILLION', words.x, words.y+200);
  fill(20);
  textSize(20);
  text('Title: ' + data[selected].title, words.x, words.y+225);
  text('Source of wealth: ' + data[selected].source, words.x, words.y+250);
}

function displayAll(current, totalAmount, multiple){
  image(img[current], pic.x, pic.y, pic.size*multiple, pic.size*multiple);
  textSize(map(totalAmount, 0, 20, 50, 30)*multiple);
  text('#' + data[current].rank, words.x, words.y+10)
}

function setSize(current, totalAmount){
  words.x = (width-80) * (current / totalAmount)+80;
  pic.x = (width-80) * (current / totalAmount)+80;
  pic.size = map(totalAmount, 0, 20, 90, 60)
}

function checkMouse(ynn){
  if(mouseX < pic.x + (pic.size / 2) && mouseX > pic.x - (pic.size / 2) && mouseY < pic.y + (pic.size / 2) && mouseY > pic.y - (pic.size / 2)){
    return true;
  }
  else{
    return false;
  }
}

function precise(x) {
  return Number.parseFloat(x).toPrecision(5);
}

function financial(x) {
return Number.parseFloat(x).toFixed(2);
}
