let points = [];
let xCoords = [];
let yCoords = [];
let activePoints = [];
let activeSounds = [];
let basePoint;
let pSize = 22
let pSounds = [];
let reverb;
let playCoords;
let isPlaying = false;
let ellipseFills = [];
let widthFactor = [];

let myPhrase, myPart;

function preload() {
  soundFormats('mp3');
  pSounds[0] = loadSound('../_assets/sounds/tree/2C2.mp3');
  pSounds[1] = loadSound('../_assets/sounds/tree/2D2.mp3');
  pSounds[2] = loadSound('../_assets/sounds/tree/2E2.mp3');
  pSounds[3] = loadSound('../_assets/sounds/tree/2G2.mp3');
  pSounds[4] = loadSound('../_assets/sounds/tree/2A2.mp3');
  pSounds[5] = loadSound('../_assets/sounds/tree/2C3.mp3');
  pSounds[6] = loadSound('../_assets/sounds/tree/2D3.mp3');
  pSounds[7] = loadSound('../_assets/sounds/tree/2E3.mp3');
  pSounds[8] = loadSound('../_assets/sounds/tree/2G3.mp3');
  pSounds[9] = loadSound('../_assets/sounds/tree/2A3.mp3');
  pSounds[10] = loadSound('../_assets/sounds/tree/2C4.mp3');
  pSounds[11] = loadSound('../_assets/sounds/tree/2D4.mp3');
  pSounds[12] = loadSound('../_assets/sounds/tree/2E4.mp3');
  pSounds[13] = loadSound('../_assets/sounds/tree/2G4.mp3');
  pSounds[14] = loadSound('../_assets/sounds/tree/2A4.mp3');
  pSounds[15] = loadSound('../_assets/sounds/tree/2C5.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  reverb = new p5.Reverb();
  initPoints();
  calcPoints();
  myPhrase = new p5.Phrase('bbox', onEachStep, activeSounds);
  myPart = new p5.Part();
  myPart.addPhrase(myPhrase);
  myPart.loop();
  myPart.setBPM(60);
  for (var i = 0; i< points.length; i++) {
   reverb.process(pSounds[i], 3, 2);
   ellipseFills[i] = 125;
 } 
 playCoords = createVector(width*2/3, height-100);
}

function draw() {
  background(245, 255, 252);
  let widthOffset = 50;
  stroke('black');
 for (var i = 0; i< points.length; i++) {
   point(points[i]);
 } 
  //TEMPO 1
  strokeWeight(10);
  line(basePoint.x, basePoint.y, points[0].x, points[0].y);
  strokeWeight(3);
 for (var i = 0; i< 4; i++) {
   line(points[0].x, points[0].y, points[i].x, points[i].y);
 }
  //TEMPO 2
  strokeWeight(8);
  line(points[4].x, points[4].y, points[0].x, points[0].y);
  strokeWeight(2);
 for (var i = 4; i< 8; i++) {
   line(points[4].x, points[4].y, points[i].x, points[i].y);
 }
  //TEMPO 3
  strokeWeight(6);
  line(points[8].x, points[8].y, points[4].x, points[4].y);
  strokeWeight(2);
 for (var i = 8; i< 12; i++) {
   line(points[8].x, points[8].y, points[i].x, points[i].y);
 }
  //TEMPO 4
  strokeWeight(4);
  line(points[12].x, points[12].y, points[8].x, points[8].y);
  strokeWeight(1);
 for (var i = 12; i< 16; i++) {
   line(points[12].x, points[12].y, points[i].x, points[i].y);
 }
  ellipseMode(CENTER);
  textSize(18);
  textAlign(CENTER, CENTER);
  for (var i = 0; i < points.length; i++) {
  	fill(75, ellipseFills[i], 80);
  	if(ellipseFills[i] > 125) ellipseFills[i] -= 1;
    ellipse(points[i].x, points[i].y, 2*pSize, 2*pSize);
    fill(0);
    text(str(activePoints[i]), points[i].x, points[i].y);
  }
  strokeWeight(4);
  fill(255);
  ellipse(playCoords.x, playCoords.y, 50, 50);
  if(isPlaying) {
  	line (playCoords.x - 7, playCoords.y - 10, playCoords.x - 7, playCoords.y + 10);
  	line (playCoords.x + 7, playCoords.y - 10, playCoords.x + 7, playCoords.y + 10);
  } else {
  	triangle(playCoords.x-7, playCoords.y-10, playCoords.x+11, playCoords.y, playCoords.x-7, playCoords.y+10);
  }
}

function mouseClicked() {
  for(var i = 0; i < points.length; i++) {
    if(dist(mouseX, mouseY, xCoords[i], yCoords[i]) < pSize) {
      if(activePoints[i] == 1) {
        activePoints[i] = 0;
        activeSounds[i] = 0;
      } else {
      	activePoints[i] = 1;
      	activeSounds[i] = i + 1;
      }
    }
  }
  if (dist(mouseX, mouseY, playCoords.x, playCoords.y) < 50) playMyPart();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calcPoints();
  playCoords.x = width*2/3; 
  playCoords.y = height-100;
}

function initPoints() {
	widthFactor[0] = createVector(1/2, random(-30, 30));
	widthFactor[1] = createVector(1/6, random(-50, 50));
	widthFactor[2] = createVector(7/12, random(-50, 50));
	widthFactor[3] = createVector(5/6, random(-10, 40));
	widthFactor[4] = createVector(1/2, random(-40, -5));
	widthFactor[5] = createVector(4/5, random(-50, 40));
	widthFactor[6] = createVector(1/5, random(-50, 50));
	widthFactor[7] = createVector(2/5, random(-50, 50));
	widthFactor[8] = createVector(1/2, random(-50, 50));
	widthFactor[9] = createVector(4/5, random(-50, 0));
	widthFactor[10] = createVector(3/5, random(-50, 50));
	widthFactor[11] = createVector(3/10, random(-50, 50));
	widthFactor[12] = createVector(1/2, random(-40, 10));
	widthFactor[13] = createVector(3/5, random(-50, 50));
	widthFactor[14] = createVector(2/5, random(-50, 50));
	widthFactor[15] = createVector(1/2, random(-50, 50));
}
function calcPoints() {

	var offset = height/21;
  	var minHeight = height*3/4;

  	for (var i = 0; i < 16; i++) {
    	xCoords[i] = width*widthFactor[i].x + widthFactor[i].y;
  }
  	
  	if(width/height > 1.7) {
  		for (var i = 0; i < 16; i++) {
    	xCoords[i] = xCoords[i]* 0.6 + 0.2*width;
  		}
  	}
  
  for (var i = 0; i < 16; i++) {
    activePoints[i] = 0;
    activeSounds[i] = 0;
    yCoords[i] = minHeight - i*offset;
  }
  
  basePoint = createVector(width/2, height - offset);
  for (var i = 0; i < 16; i++) {
    points[i] = createVector(xCoords[i], yCoords[i]);
  }
}

function onEachStep(value, value2) {
	print(value2);
	ellipseFills[value2 - 1] = 255;
	pSounds[value2 - 1].play();
}

function playMyPart() {
  console.log("BAM!");
  userStartAudio();
  if(isPlaying == true) {
  	myPart.stop();
  	myPart.metro.metroTicks = 0;
  } else {
  	myPart.start();
  }
  isPlaying = !isPlaying;
}