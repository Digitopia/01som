var buttons =[];
var points = [];
var bgCol = 241;
var h1;
var kickImg, clapImg, snapImg;
var cx, cy, radius;
var cycle = 8;

var audios = [
    new Tone.Player("../sounds/kick.wav").toMaster(),
    new Tone.Player("../sounds/clap.wav").toMaster(),
    new Tone.Player("../sounds/snap.wav").toMaster()
]

var bpmList = [44, 52, 60, 80, 100, 120];

var controlCenterX, controlCenterY;

//var beat;

var play = false;

var audio1, audio2, audio3;

var soundString = [0, 0, 0, 0, 0, 0, 0, 0];

var released = true;

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
  buttons[0] = createButton(bpmList[0]);
  buttons[0].mousePressed(function() {
    changeBG(235);
    Tone.Transport.bpm.value = bpmList[0];
  });

  buttons[1] = createButton(bpmList[1]);
  buttons[1].mousePressed(function() {
    changeBG(238);
    Tone.Transport.bpm.value = bpmList[1];
  });
  buttons[2] = createButton(bpmList[2]);
  buttons[2].mousePressed(function() {
    changeBG(241);
    Tone.Transport.bpm.value = bpmList[2];
  });
  buttons[3] = createButton(bpmList[3]);
  buttons[3].mousePressed(function() {
    changeBG(244);
    Tone.Transport.bpm.value = bpmList[3];
  });
  buttons[4] = createButton(bpmList[4]);
  buttons[4].mousePressed(function() {
    changeBG(247);
    Tone.Transport.bpm.value = bpmList[4];
  });
  buttons[5] = createButton(bpmList[5]);
  buttons[5].mousePressed(function() {
    changeBG(250);
    Tone.Transport.bpm.value = bpmList[5];
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

  buttonBorders();

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

  buttonBorders();

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

  buttonBorders();
}

function mouseReleased(){
  released = true;
  return false;
}

function mousePressed() {

  if(!released){
    return;
  }
  released = false;

  handleControls();

  for(var i = 0; i < cycle; i++){
      points[i].onClick();
    }
}

function handleControls() {
  if (mouseX >= controlCenterX-40 && mouseX <= controlCenterX+40 && mouseY >= controlCenterY-40 && mouseY <= controlCenterY+40){
    play = !play;
    if (play) {

        for (var i = 0; i < 8; i++) {
            let _i = i;
            Tone.Transport.schedule(function(t) {
                console.log("Playing 8th note number", _i)
                idx = soundString[_i] - 1
                if (idx >= 0 && idx <= 2) audios[idx].start(t)
            }, i+"*8n")
        }

      Tone.Transport.start();

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

  function buttonBorders() {
    for (var i = 0; i < bpmList.length; i++) {
      if(bpmList[i] == Tone.Transport.bpm.value) {
          buttons[i].style("border", "2px solid gray");
      } else {
          buttons[i].style("border", "0px");
      }
    }

  }
