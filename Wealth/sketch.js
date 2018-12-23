
var url = 'https://forbes400.herokuapp.com/api/forbes400?limit=100';
var data = [];
var temp =[];
var upper;
var img = [];
var current;

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
  noStroke();

  for (var i = 0; i < 30; i++) {
    img[i] = loadImage("images/" + data[i].name + ".jpg");
  }
  console.log(data)
}


function draw() {
richList();
}

function precise(x) {
  return Number.parseFloat(x).toPrecision(4);
}

function financial(x) {
return Number.parseFloat(x).toFixed(2);
}

function richList(){
  background(240);
  var r = upper.value();
  var total = 0;
  var int = 0;
  fill(240);
  for (var i = 0; i < r; i++) {
      words.x = (width-80) * (i / r)+80;
      pic.x = (width-80) * (i / r)+80;
      pic.size = map(r, 0, 20, 90, 60)
        if (checkMouse(pic.x, pic.y, pic.size) == true) {
          background(240)
          fill(240,240,240, 100)
          tint(240, 126);
          for (var x = 0; x < i; x++) {
            words.x = (width-80) * (x / r)+80;
            pic.x = (width-80) * (x / r)+80;
            pic.size = map(r, 0, 20, 90, 60)
            image(img[x], pic.x, pic.y, pic.size*0.7, pic.size*0.7);
            textSize(map(r, 0, 20, 18, 6.75)*0.7);
            text(data[x].name, words.x, words.y)
            text('$' + financial(data[x].realTimeWorth * 1000000/1000000000) + ' B', words.x, words.y+18 - map(r, 0, 25, 0,12));
          }
          for (var x = i+1; x < r; x++) {
            words.x = (width-80) * (x / r)+80;
            pic.x = (width-80) * (x / r)+80;
            pic.size = map(r, 0, 20, 90, 60)
            image(img[x], pic.x, pic.y, pic.size*0.7, pic.size*0.7);
            textSize(map(r, 0, 20, 18, 6.75)*0.7);
            text(data[x].name, words.x, words.y)
            text('$' + financial(data[x].realTimeWorth * 1000000/1000000000) + ' B', words.x, words.y+18 - map(r, 0, 25, 0,12));
          }
          fill(240)
          tint(240, 255);
          words.x = (width-80) * (i / r)+80;
          pic.x = (width-80) * (i / r)+80;
          pic.size = map(r, 0, 20, 90, 60)
          image(img[i], pic.x, pic.y+200, pic.size*4, pic.size*4);
          textSize(map(r, 0, 20, 18, 6.75)*2);
          text(data[i].name, words.x, words.y+200)
          text('$' + financial(data[i].realTimeWorth * 1000000/1000000000) + ' B', words.x, words.y+240 - map(r, 0, 25, 0,12));
          i= x;
        }
        else{
          image(img[i], pic.x, pic.y, pic.size, pic.size);
          textSize(map(r, 0, 20, 18, 6.75));
          text(data[i].name, words.x, words.y)
          text('$' + financial(data[i].realTimeWorth * 1000000/1000000000) + ' B', words.x, words.y+18 - map(r, 0, 25, 0,12));
        }
    }




  for (var i = 0; i < r; i++) {
    if (data[i].realTimeWorth != null) {
      var num = Math.round(data[i].realTimeWorth/1000);
      total += num;
    }
    else{
      i++;
    }
  }
  fill(20);
  textAlign(CENTER)
  if (total > 1000) {
    textSize(map(total, 1000, 2000, 15, 25))
    text('$' + precise(total/1000) + ' TRILLION', width/2, height/2)
  }
  else{
    textSize(map(total, 0, 1000, 7.5, 15))
    text('$' + precise(total) + ' BILLION', width/2, height/2)
  }
}

function checkMouse(ynn){
  if(mouseX < pic.x + (pic.size / 2) && mouseX > pic.x - (pic.size / 2) && mouseY < pic.y + (pic.size / 2) && mouseY > pic.y - (pic.size / 2)){
    return true;
  }
  else{
    return false;
  }
}
