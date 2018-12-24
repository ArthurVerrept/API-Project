
var url = 'https://forbes400.herokuapp.com/api/forbes400?limit=100';
var data = [];
var temp =[];
var upper;
var img = [];
var current, usaWage, hunger, gdp, total, totalLong;
var flags = [];


var words = {
  x: 0,
  y: 50,
  size: 0
};

var pic = {
  x: 0,
  y: 50,
  size: 90
};

function preload(){
  createCanvas(1280, 720)
  data = loadJSON(url)
}


function setup() {
  upper = createSlider(0, 20, 10);
  textAlign(CENTER);
  imageMode(CENTER);
  ellipseMode(CENTER);
  rectMode(CENTER);

  for (var i = 0; i < 20; i++) {
    img[i] = loadImage("images/" + data[i].name + ".jpg");
  }
  for (var i = 0; i < 20; i++) {
    flags[i] = loadImage("Flags/" + data[i].country + ".png");
  }
}


function draw() {
richList();
}



function richList(){
  background(240);
  var r = upper.value();
  var total = 0;
  var totalLong = 0;
  fill(240);
  for (var i = 0; i < r; i++) {
    setSize(i, r);
      if (checkMouse(pic.x, pic.y, pic.size) == true) {
        background(240);
        for (var x = 0; x < i; x++) {
          setSize(x, r);
          displayAll(x, r, 0.7);
        }
        for (var x = i+1; x < r; x++) {
          setSize(x, r);
          displayAll(x, r, 0.7);
        }
      selected();
      }
      else{
        displayAll(i, r, 1);
      }
  }



  function selected(){
    if (i > r/2) {
      setSide('right', i, r);
      displaySelected(i, r, 30);
      i = x;
    }
    else{
      setSide('left', i, r);
      displaySelected(i, r, -30)
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

function createTotals(t, tL, scale, multiple){
  fill(20);
  textAlign(CENTER)
  gdp = (tL/ 2622000000000)*100;
  usaWage = tL / 49192;
  hunger = tL / 3000000000;
    textSize(map(t, 1000, 2000, 100, 200));
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
    text(precise(gdp) + "% of the UK's GDP", width/2, height/1.5+170);
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
  return Number.parseFloat(x).toPrecision(4);
}

function financial(x) {
return Number.parseFloat(x).toFixed(2);
}
