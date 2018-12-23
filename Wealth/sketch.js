
var url = 'https://forbes400.herokuapp.com/api/forbes400?limit=100';
var data = [];
var temp =[];
var upper;

function preload(){
  createCanvas(1280, 720)
  data = loadJSON(url)
}


function setup() {
  upper = createSlider(0, 100, 10);
  textAlign(CENTER)
}


function draw() {
  background(240);
  var textHeight = 20;
  var r = upper.value();
  fill(255, 0, 0);
  let total = 0;
  loadImage(data[0].squareImage);
  for (var i = 0; i < r; i++) {
    if (r <= 20) {
      if (data[i].name.length < 11) {
        textSize(map(r, 0, 20, 20, 7.5));
        text(data[i].name, (width - 20) * (i / r)+40, textHeight)
        text('$' + financial(data[i].realTimeWorth * 1000000/1000000000) + ' B', (width - 20) * (i / r)+40, textHeight*2 - map(r, 0, 25, 0,12));
      }
      else{
        textSize(map(r, 0, 20, 20, 7.5));
        text(data[i].lastName, (width - 20) * (i / r)+40, textHeight)
        text('$' + financial(data[i].realTimeWorth * 1000000/1000000000) + ' B', (width - 20) * (i / r)+40, textHeight*2 - map(r, 0, 25, 0,12));
      }
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

function precise(x) {
  return Number.parseFloat(x).toPrecision(4);
}

function financial(x) {
return Number.parseFloat(x).toFixed(2);
}

function loadImage(imageUrl){
  console.log('https:' + imageUrl)
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

  var img = new Image();
  img.onload = function() {
     context.drawImage(img, 0, 0);
  };

  img.src = 'https:' + imageUrl;
}
