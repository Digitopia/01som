var buttons =[];
var points = [];
var bgCol = 235;
var h1;
var kickImg, clapImg, snapImg;
var cx, cy, radius;
var cycle = 8;

var controlCenterX, controlCenterY;

//var beat;

var play = false;

var audio1, audio2, audio3;

var soundString = [0, 0, 0, 0, 0, 0, 0, 0];

function setup() {

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  audio1 = document.getElementById("audio1");
  audio2 = document.getElementById("audio2");
  audio3 = document.getElementById("audio3");

  kickImg = loadImage("../images/kick2.png");
  clapImg = loadImage("../images/clap2.png");
  snapImg = loadImage("../images/snap2.png");
  console.log("images loaded");

  background(255, bgCol, bgCol);
  buttons[0] = createButton('44');
  buttons[0].mousePressed(function() {
    changeBG(235);
    Tone.Transport.bpm.value = 44;
  });
  buttons[1] = createButton('52');
  buttons[1].mousePressed(function() {
    changeBG(239);
    Tone.Transport.bpm.value = 52;
  });
  buttons[2] = createButton('60');
  buttons[2].mousePressed(function() {
    changeBG(243);
    Tone.Transport.bpm.value = 60;
  });
  buttons[3] = createButton('80');
  buttons[3].mousePressed(function() {
    changeBG(247);
    Tone.Transport.bpm.value = 80;
  });
  buttons[4] = createButton('100');
  buttons[4].mousePressed(function() {
    changeBG(251);
    Tone.Transport.bpm.value = 100;
  });
  buttons[5] = createButton('120');
  buttons[5].mousePressed(function() {
    changeBG(255);
    Tone.Transport.bpm.value = 120;
  });

  positionControls();

  formatButtons();

  formatEllipse();

  for(var i = 0; i < cycle; i++){
      points[i] = new Point(i);
  }

  Tone.Transport.bpm.value = 60;
  Tone.Transport.loopEnd = '1m';
  Tone.Transport.loop = true;

}

function changeBG(value) {
	bgCol = value;
  background(255, value, value);
}

function draw() {
	background(255, bgCol, bgCol);

  drawEllipse();

  for(var i = 0; i < cycle; i++){
    points[i].display();
    if(play) {
      var tickCount = Math.floor(Tone.Transport.ticks/100);
      points[i].isActive(tickCount);
    }
  }

  drawControls();
  displayLabel();

}

function formatButtons() {
    for(i = 0; i<buttons.length; i++) {
      var ratio = i/(buttons.length-1);
      var offset = 80;
      var size = width * 0.08;
    buttons[i].position(width*ratio + offset - (size+2*offset)*ratio, height/4*3);
    buttons[i].size(size, size);
  }
}

function formatEllipse() {

  cx = windowWidth/2;
  cy = windowHeight*17/40;
  if(windowWidth >= windowHeight) {
    radius = windowHeight/2;
  } else {
    radius = windowWidth/2;
  }

}

function drawEllipse() {
  stroke(127);
  strokeWeight(4);
  fill(220,240,255);
  ellipse(cx, cy, radius, radius);
}

function drawControls() {
  noStroke();
  fill(0);
  ellipse (controlCenterX, controlCenterY, 50, 50);
  fill(255);
  if(!play) {
    triangle(controlCenterX-10, controlCenterY-15, controlCenterX-10, controlCenterY+15, controlCenterX+15, controlCenterY);
  } else {
    rect(controlCenterX-10, controlCenterY-15, 7, 30);
    rect(controlCenterX+3, controlCenterY-15, 7, 30);
  }
}

function positionControls() {
    controlCenterX = windowWidth*0.85;
    controlCenterY = windowHeight*0.65;
}

function windowResized() {
	if(windowWidth < 600) windowWidth = 600;
	if(windowHeight < 600) windowHeight = 600;
	resizeCanvas(windowWidth, windowHeight);

  positionControls();

  formatButtons();

  formatEllipse();

  for(var i = 0; i < cycle; i++){
    points[i].update();
  }

  displayLabel();
}


function mousePressed() {
  handleControls();

  for(var i = 0; i < cycle; i++){
      points[i].onClick();
    }
}

function handleControls() {
  if(mouseX >= controlCenterX-40 && mouseX <= controlCenterX+40 && mouseY >= controlCenterY-40 && mouseY <= controlCenterY+40){
    play = !play;
    if(play) {
      Tone.Transport.start();
      Tone.Transport.schedule(playAudio(0), '0');
      Tone.Transport.schedule(playAudio(1), '0:0:2');
      Tone.Transport.schedule(playAudio(2), '0:1');
      Tone.Transport.schedule(playAudio(3), '0:1:2');
      Tone.Transport.schedule(playAudio(4), '0:2');
      Tone.Transport.schedule(playAudio(5), '0:2:2');
      Tone.Transport.schedule(playAudio(6), '0:3');
      Tone.Transport.schedule(playAudio(7), '0:3:2');
    } else {
      Tone.Transport.stop();
    }
  }
}

function displayLabel() {

  rectMode(CENTER);
  image(kickImg, 50, windowHeight*0.3-15, 60, 30);
  image(clapImg, 50, windowHeight*0.4-40, 60, 60);
  image(snapImg, 50, windowHeight*0.5-30, 55, 55);
  rectMode(CORNER);

  }
