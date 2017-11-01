var buttons =[];
var playButton;

var bpmList = [44, 52, 60, 80, 100, 120];

var mySound, myControlPhrase, myKickPhrase, myClapPhrase, mySnapPhrase, myPart;
var myDo1Phrase, myRePhrase, myMiPhrase, mySolPhrase, myLaPhrase, myDo2Phrase
var canvas;
var cycle = 8;
var centerPoints = []; //centro das elipses
var pointsA = []; // point array for the first ellipse
var pointsB = []; // point array for the second ellipse
var tempoSelec = []; //tempo selection array
var controlPattern = [1, 1, 1, 1, 1, 1, 1, 1];
var kickPattern = [0, 0, 0, 0, 0, 0, 0, 0];
var clapPattern = [0, 0, 0, 0, 0, 0, 0, 0];
var snapPattern = [0, 0, 0, 0, 0, 0, 0, 0];

var do1Pattern = [0, 0, 0, 0, 0, 0, 0, 0];
var rePattern = [0, 0, 0, 0, 0, 0, 0, 0];
var miPattern = [0, 0, 0, 0, 0, 0, 0, 0];
var solPattern = [0, 0, 0, 0, 0, 0, 0, 0];
var laPattern = [0, 0, 0, 0, 0, 0, 0, 0];
var do2Pattern = [0, 0, 0, 0, 0, 0, 0, 0];

var kick, clap, snap;
var do1, re, mi, fa, sol, la, do2;
var play = false;
var tickCount = -1;
var BPM = 60;

var bgCol = 241;

var digi, kickImg, clapImg, snapImg, bma, braga;

var controlCenterX, controlCenterY; //these are the controls for the play button

function setup() {

	console.log("setup started");

	canvas = createCanvas(windowWidth,windowHeight);
	canvas.position(0, 0);
  	canvas.style('z-index', '-1');

  	kick = loadSound('../sounds/kick.mp3');
	clap = loadSound('../sounds/clap.mp3');
	snap = loadSound('../sounds/snap.mp3');

	do1 = loadSound('../sounds/do1.mp3');
	re = loadSound('../sounds/re.mp3');
	mi = loadSound('../sounds/mi.mp3');
	sol = loadSound('../sounds/sol.mp3');
	la = loadSound('../sounds/la.mp3');
	do2 = loadSound('../sounds/do2.mp3');

  	kickImg = loadImage("../images/kick2.png");
 	clapImg = loadImage("../images/clap2.png");
 	snapImg = loadImage("../images/snap2.png");

 	console.log("images loaded");

 	createButtons();

  	positionControls();

  	formatButtons();

	if(windowWidth >= windowHeight) {
		centerPoints[0] = windowWidth/3-10;
		centerPoints[1] = windowHeight/2;
		centerPoints[2] = windowWidth/3 * 2 + 10;
		centerPoints[3] = windowHeight/2;
	} else {
		centerPoints[0] = windowWidth/2;
		centerPoints[1] = windowHeight/4;
		centerPoints[2] = windowWidth/2;
		centerPoints[3] = windowHeight/4 * 3;
	}
	
	radius = windowWidth/3*0.84; //0.84 is fine-tuned so that ellipses don't overlap
	
	for(var i = 0; i < cycle; i++){
  		pointsA[i] = new Point(i, 0);
  	}

  	for(var i = 0; i < cycle; i++){
  		pointsB[i] = new Point(i, 1);
  	}

  	buttonBorders();

  	StartAudioContext(Tone.context, "#button1");

  	console.log("setup ended");
}

function changeBG(value) {
	bgCol = value;
  background(255, value, value);
}

function draw() {

  	background(255, bgCol, bgCol);	
  	fill(0, 0, 50);
  	textAlign(CENTER);
  	textSize(22);
	text("0 + 1 = Som - Sessão 2", windowWidth/2, 40);
  	textAlign(LEFT);
  	textSize(14);
  	fill(255);
	for(var i= 0; i<8; i++) {
		text(kickPattern[i], 10 + 10*i, 40);
		text(clapPattern[i], 10 + 10*i, 70);
		text(snapPattern[i], 10 + 10*i, 100);

		text(do1Pattern[i], windowWidth -90 + 10*i, 40);
		text(rePattern[i], windowWidth -90 + 10*i, 70);
		text(miPattern[i], windowWidth -90 + 10*i, 100);
		text(solPattern[i], windowWidth -90 + 10*i, 130);
		text(laPattern[i], windowWidth -90 + 10*i, 160);
		text(do2Pattern[i], windowWidth -90 + 10*i, 190);
	}

	stroke(127);
	strokeWeight(4);
	fill(220,240,255);
  ellipse(centerPoints[0], centerPoints[1], radius, radius);
  fill(220,255,240);
  ellipse(centerPoints[2], centerPoints[3], radius, radius);
  stroke(100);
  strokeWeight(1);
  for(var i = 0; i < cycle; i++){
  	pointsA[i].display();
  	pointsB[i].display();
  	pointsA[i].isActive(tickCount);
  	pointsB[i].isActive(tickCount);
  }


  	drawControls();
 	displayLabel();

 	buttonBorders();

}

function windowResized() {

	if(windowWidth<640) windowWidth = 640;
	if(windowHeight<640) windowHeight = 640;

	if(windowWidth >= windowHeight) {
		centerPoints[0] = windowWidth/3-10;
		centerPoints[1] = windowHeight/2;
		centerPoints[2] = windowWidth/3 * 2 + 10;
		centerPoints[3] = windowHeight/2;
	} else {
		centerPoints[0] = windowWidth/2;
		centerPoints[1] = windowHeight/4;
		centerPoints[2] = windowWidth/2;
		centerPoints[3] = windowHeight/4 * 3;
	}

  radius = windowWidth/3*0.84;

  controlCenterX = windowWidth*0.75;
  controlCenterY = windowHeight*0.85;

  for(var i = 0; i < cycle; i++){
  	pointsA[i].update();
  	pointsB[i].update();
  }

  for(var i = 0; i < tempoSelec.length; i++){
  		tempoSelec[i].update();
  	}

  resizeCanvas(windowWidth, windowHeight);

}

function mousePressed() {
	console.log("toque!");
	handleControls();
	for(var i = 0; i < cycle; i++){
  		pointsA[i].onClick();
  		pointsB[i].onClick();
  	}

  	for(var i = 0; i < tempoSelec.length; i++){
  		tempoSelec[i].onClick();
  	}
}

//this is called by myControlPhrase
function tickCounter(time, playbackRate) {
	tickCount++;
}

function makeKickSound(time, playbackRate) {
  kick.rate(playbackRate);
  kick.play(time);
}

function makeClapSound(time, playbackRate) {
  clap.rate(playbackRate);
  clap.play(time);
}

function makeSnapSound(time, playbackRate) {
	snap.rate(playbackRate);
	snap.play(time);
}

function makeDo1Sound(time, playbackRate) {
	do1.rate(playbackRate);
	do1.play(time);
}

function makeReSound(time, playbackRate) {
	re.rate(playbackRate);
	re.play(time);
}

function makeMiSound(time, playbackRate) {
	mi.rate(playbackRate);
	mi.play(time);
}

function makeSolSound(time, playbackRate) {
	sol.rate(playbackRate);
	sol.play(time);
}

function makeLaSound(time, playbackRate) {
	la.rate(playbackRate);
	la.play(time);
}

function makeDo2Sound(time, playbackRate) {
	do2.rate(playbackRate);
	do2.play(time);
}
function handleControls() {
	if(mouseX >= controlCenterX-40 && mouseX <= controlCenterX+40 && mouseY >= controlCenterY-40 && mouseY <= controlCenterY+40){
		play = !play;
		if(play) {
			myPart.start();
		} else {
			myPart.stop();
			// the following is a bit of foolproofing as, for some reason, looping wasn't working properly.
			myPart.metro.metroTicks = 0;
			myPart.metro.prevTick = 0;
			myPart.metro.tickTime = 0;
			myPart.metro.tatumTime = 0;

			tickCount = -1;
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

function positionControls() {
    controlCenterX = windowWidth*0.85;
    controlCenterY = windowHeight*0.65;
}

function drawControls() {

  playButton.position(controlCenterX-35, controlCenterY-55);
}