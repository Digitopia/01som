var mySound, myControlPhrase, myClapPhrase, myPart;
var canvas;
var cycle = 8;
var cx, cy, radius;
var points = []; //array de pontos
var tempoSelec = []; //tempo selection array
var controlPattern = [1, 1, 1, 1, 1, 1, 1, 1];
var clapPattern = [0, 0, 0, 0, 0, 0, 0, 0];
var clap;
var play = false;
var tickCount = -1;
var BPM = 60;

var digi, bma, braga;

var controlCenterX, controlCenterY; //these are the controls for the play button

function preload() {
	clap = loadSound('../sounds/clap.mp3');

	digi = loadImage("../images/digitopia.png");
	bma = loadImage("../images/BMA-1M.png");
	braga = loadImage("../images/braga.png");

	img8 = loadImage("../images/8.png");
	img8r = loadImage("../images/8r.png");
	img4r = loadImage("../images/4r.png");
	img28 = loadImage("../images/28.png");



}

function setup() {
	canvas = createCanvas(windowWidth,windowHeight);
	controlCenterX = windowWidth*0.75;
	controlCenterY = windowHeight*0.85;
	cx = windowWidth/5;
	cy = windowHeight/2;
	radius = windowWidth/3;
	for(var i = 0; i < cycle; i++){
  		points[i] = new Point(i);
  	}
  	//init Phrases
  	myControlPhrase = new p5.Phrase('kick', tickCounter, controlPattern);
  	myClapPhrase = new p5.Phrase('snap', makeClapSound, clapPattern);

  	//create Part and add all the Phrases
  	myPart = new p5.Part(8, 1/8);
  	myPart.addPhrase(myControlPhrase);
  	myPart.addPhrase(myClapPhrase);

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

  	background(190,170,170);	
  	fill(0, 0, 50);
  	textAlign(CENTER);
  	textSize(22);
	text("0 + 1 = Som - Ritmo", windowWidth/2, 40);

	stroke(127);
	strokeWeight(2);
	fill(220, 240, 255);
	textSize(48);

	textAlign(LEFT);
	for(var i= 0; i<8; i++) {
		text(clapPattern[i], cx + (windowWidth*0.08)*i, cy);
	}

  stroke(100);
  strokeWeight(1);

  	fill(0);
	ellipse (controlCenterX, controlCenterY, 50, 50);
	fill(255);
	if(!play) {
		triangle(controlCenterX-10, controlCenterY-15, controlCenterX-10, controlCenterY+15, controlCenterX+15, controlCenterY);
	} else {
		rectMode(CORNER);
		rect(controlCenterX-10, controlCenterY-15, 7, 30);
		rect(controlCenterX+3, controlCenterY-15, 7, 30);
	}

	//display BPM values
	for(var i = 0; i < tempoSelec.length; i++){
  		tempoSelec[i].display();
  	}

  	for(var i = 0; i < cycle; i++){
  		points[i].isActive(tickCount);
  }

  	displayLabel();

  

  	drawNotation();


}

function windowResized() {

	if(windowWidth<640) windowWidth = 640;
	if(windowHeight<640) windowHeight = 640;
	cx = windowWidth/5;
  cy = windowHeight/2;
  radius = windowWidth/3;

  controlCenterX = windowWidth*0.75;
  controlCenterY = windowHeight*0.85;

  for(var i = 0; i < cycle; i++){
  	points[i].update();
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
  		points[i].onClick();
  	}

  	for(var i = 0; i < tempoSelec.length; i++){
  		tempoSelec[i].onClick();
  	}
}

//this is called by myControlPhrase
function tickCounter(time, playbackRate) {
	tickCount++;
}


function makeClapSound(time, playbackRate) {
  clap.rate(playbackRate);
  clap.play(time);
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
	this.x = windowWidth*(0.1 + 0.13*this.order);
	this.y = windowHeight*(0.75);

	this.display = function() {
		if(this.value == BPM) {
			stroke(0);
			strokeWeight(2);
			noFill();
			rectMode(CENTER);
			rect(this.x, this.y, 40, 40);
			fill(0);
		} else {
			stroke(0);
			strokeWeight(1);
			fill(255);
		}

		noStroke();
		textSize(20);
		textAlign(CENTER,CENTER);
		text(this.value, this.x, this.y);
	};

	this.update = function() {
		this.x = windowWidth*(0.1 + 0.13*this.order);
		this.y = windowHeight*(0.75);
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

	textSize(16);
	textAlign(CENTER);
	noStroke(0);
	fill(0);
	text("Cria o teu próprio ritmo clicando nos zeros ou uns.", windowWidth*0.75, windowHeight*0.92);
	text("Clica nos números para escolher a velocidade.", windowWidth*0.75, windowHeight*0.94);
	textSize(12);
	text("Desenvolvido por Óscar Rodrigues - Digitópia Casa da Música.", windowWidth*0.75, windowHeight*0.97);

}

function drawNotation() {

		var ht = windowHeight/4+50; // height
  	var iht = 100; //image height
  	rectMode(CENTER);

  	for(var i = 0; i < cycle/2; i++){
		if(clapPattern[i*2] == 1) {
	  		if(clapPattern[i*2 + 1] == 1) {
	  			image(img28, windowWidth/5+0.16*windowWidth*i, ht, windowWidth*0.12, iht);
	  		} else {
	  			image(img8, windowWidth/5+0.16*windowWidth*i, ht, windowWidth*0.04, iht);
	  			image(img8r, windowWidth/5+0.08*windowWidth+0.16*windowWidth*i, ht, windowWidth*0.04, iht);
	  		}
	  	} else  if (clapPattern[i*2 + 1] == 0) {
	  		image(img4r, windowWidth/5+0.16*windowWidth*i, ht, windowWidth*0.08, iht);
	  	} else {
	  		image(img8r, windowWidth/5+0.16*windowWidth*i, ht, windowWidth*0.04, iht);
	  		image(img8, windowWidth/5+0.08*windowWidth+0.16*windowWidth*i, ht, windowWidth*0.04, iht);
	  	}
	  }
}