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

var digi, kickImg, clapImg, snapImg, bma, braga;

var controlCenterX, controlCenterY; //these are the controls for the play button


function preload() {
	kick = loadSound('../sounds/kick.mp3');
	clap = loadSound('../sounds/clap.mp3');
	snap = loadSound('../sounds/snap.mp3');

	do1 = loadSound('../sounds/do1.mp3');
	re = loadSound('../sounds/re.mp3');
	mi = loadSound('../sounds/mi.mp3');
	sol = loadSound('../sounds/sol.mp3');
	la = loadSound('../sounds/la.mp3');
	do2 = loadSound('../sounds/do2.mp3');

	digi = loadImage("../images/digitopia.png");
	kickImg = loadImage("../images/kick.png");
	clapImg = loadImage("../images/clap.png");
	snapImg = loadImage("../images/snap.png");
	bma = loadImage("../images/BMA-1M.png");
	braga = loadImage("../images/braga.png");
}

function setup() {
	
	console.log("setup started");

	canvas = createCanvas(windowWidth,windowHeight);
	controlCenterX = windowWidth*0.75;
	controlCenterY = windowHeight*0.85;
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
  	//init Phrases for ellipse1
  	myKickPhrase = new p5.Phrase('kick', makeKickSound, kickPattern);
  	myControlPhrase = new p5.Phrase('tick', tickCounter, controlPattern);
  	myClapPhrase = new p5.Phrase('clap', makeClapSound, clapPattern);
  	mySnapPhrase = new p5.Phrase('snap', makeSnapSound, snapPattern);

  	//init Phrases for ellipse2
  	myDo1Phrase = new p5.Phrase('do1', makeDo1Sound, do1Pattern);
  	myRePhrase = new p5.Phrase('re', makeReSound, rePattern);
  	myMiPhrase = new p5.Phrase('mi', makeMiSound, miPattern);
  	mySolPhrase = new p5.Phrase('sol', makeSolSound, solPattern);
  	myLaPhrase = new p5.Phrase('la', makeLaSound, laPattern);
  	myDo2Phrase = new p5.Phrase('do2', makeDo2Sound, do2Pattern);

  	//create Part and add all the Phrases for ellipse 1
  	myPart = new p5.Part(8, 1/8);
  	myPart.addPhrase(myKickPhrase);
  	myPart.addPhrase(myControlPhrase);
  	myPart.addPhrase(myClapPhrase);
  	myPart.addPhrase(mySnapPhrase);

  	//create Part and add all the Phrases for ellipse 1
  	myPart.addPhrase(myDo1Phrase);
  	myPart.addPhrase(myRePhrase);
  	myPart.addPhrase(myMiPhrase);
  	myPart.addPhrase(mySolPhrase);
  	myPart.addPhrase(myLaPhrase);
  	myPart.addPhrase(myDo2Phrase);

  	//set defaults
  	myPart.setBPM(BPM);
  	myPart.looping = true;

  	//init tempo selectors
  	tempoSelec[0] = new TempoSelec(44, 0);
  	tempoSelec[1] = new TempoSelec(52, 1);
  	tempoSelec[2] = new TempoSelec(60, 2);
  	tempoSelec[3] = new TempoSelec(76, 3);
  	tempoSelec[4] = new TempoSelec(96, 4);
  	tempoSelec[5] = new TempoSelec(108, 5);
  	tempoSelec[6] = new TempoSelec(120, 6);
}

function draw() {

  	background(255,220,220);	
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

  	fill(0);
	ellipse (controlCenterX, controlCenterY, 50, 50);
	fill(255);
	if(!play) {
		triangle(controlCenterX-10, controlCenterY-15, controlCenterX-10, controlCenterY+15, controlCenterX+15, controlCenterY);
	} else {
		rect(controlCenterX-10, controlCenterY-15, 7, 30);
		rect(controlCenterX+3, controlCenterY-15, 7, 30);
	}

	//display BPM values
	for(var i = 0; i < tempoSelec.length; i++){
  		tempoSelec[i].display();
  	}

  	displayLabel();

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

function TempoSelec(value, order) {
	this.value = value;
	this.order = order;
	this.x = windowWidth*(0.9);
	this.y = windowHeight*(0.40+0.05*this.order);

	this.display = function() {
		if(this.value == BPM) {
			stroke(0);
			strokeWeight(2);
			noFill();
			rectMode(CENTER);
			rect(this.x, this.y, 40, 40);
			fill(0);
		} else {
			fill(255);
		}

		noStroke();
		textSize(20);
		textAlign(CENTER,CENTER);
		text(this.value, this.x, this.y);
	};

	this.update = function() {
		this.x = windowWidth*(0.9);
		this.y = windowHeight*(0.40+0.05*this.order);
	};

	this.onClick = function() {
		if(mouseX >= this.x-20 && mouseX <= this.x+20 && mouseY >= this.y-20 && mouseY <= this.y+20){
			BPM = this.value;
			myPart.setBPM(this.value);
		}
	};
}

function displayLabel() {

	//resize image according to page width and keeping the ratio
	var newImageHeight = ((windowWidth/7)/3.744);
	image(digi, 10, windowHeight- newImageHeight-5, newImageHeight*3.744, newImageHeight);
	image(bma, 60 + newImageHeight*3.744, windowHeight - newImageHeight-5, newImageHeight*2.31, newImageHeight);
	image(braga, 110 + newImageHeight*6.054, windowHeight - newImageHeight-5, newImageHeight*1.782+5, newImageHeight+5);

	fill(30, 30, 255);
	noStroke();
	ellipse(20, windowHeight*0.4, 30, 30);
	fill(30, 255, 30);
	ellipse(20, windowHeight*0.5, 30, 30);
	fill(255, 30, 30);
	ellipse(20, windowHeight*0.6, 30, 30);

	rectMode(CENTER);
	image(kickImg, 50, windowHeight*0.4-15, 60, 30);
	image(clapImg, 50, windowHeight*0.5-40, 60, 60);
	image(snapImg, 50, windowHeight*0.6-30, 55, 55);
	rectMode(CORNER);

	textSize(16);
	textAlign(CENTER);
	noStroke(0);
	fill(0);
	text("Clica nos círculos pequenos para escolher o som.", windowWidth*0.75, windowHeight*0.92);
	text("Clica nos números para escolher a velocidade.", windowWidth*0.75, windowHeight*0.94);
	textSize(12);
	text("Desenvolvido por Óscar Rodrigues - Digitópia Casa da Música.", windowWidth*0.75, windowHeight*0.97);

}