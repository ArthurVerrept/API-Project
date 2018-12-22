var url = 'https://forbes400.herokuapp.com/api/forbes400?limit=100';
var data = [];

function preload(){
  createCanvas(1280, 720)
  data = loadJSON(url)
}

function setup() {
  console.log(data)
  noLoop();
  textAlign(CENTER)
}

function draw() {
  var x = 0;
  var y = 0;
  fill(255, 0, 0);
  textSize(10);
  for (var i = 0; i < 10; i++) {
    text(data[i].name, (width - 30) * (i / 10) + 15 + 30, 20)
    text('$' + financial(data[i].realTimeWorth * 1000000/1000000000) + ' B', (width - 30) * (i / 10) + 15 + 30, 40)
  }
}

function financial(x) {
return Number.parseFloat(x).toFixed(2);
}
