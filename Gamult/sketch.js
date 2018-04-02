var s1, s2, s3;

var particleArray = [];

var textPos = [ [], [], [] ];

var counter = 0;

var consoleHeight = 150;

var gravBtnX, freezeBtnX, faderX;

var faderPos = 0.5;

var defPadding = 70;

var gravOn = true;

var freezeOff = true;

var faderDrag = false;

function preload() {
	s1 = loadSound('../_assets/sounds/A_KSL2.wav');
	s2 = loadSound('../_assets/sounds/A_KSL3.wav');
	s3 = loadSound('../_assets/sounds/A_KSL5.wav');
}

function setup() {
	canvas = createCanvas(windowWidth,windowHeight);

	textPos[0][0] = windowWidth/5;
	textPos[0][1] = 50;
	textPos[1][0] = windowWidth/5*4;
	textPos[1][1] = 50;
	textPos[2][0] = windowWidth/5;
	textPos[2][1] = 120;

	gravBtnX = textPos[0][0] - defPadding;
	freezeBtnX = textPos[1][0] - defPadding;
	faderX = textPos[2][0] + 3*defPadding;
}

function draw() {

	background(250);
	strokeWeight(1);

	stroke(200);
	line(windowWidth/3, 0, windowWidth/3, windowHeight);
	line(windowWidth/3 * 2, 0, windowWidth/3 * 2, windowHeight);

	for(var i = 0; i<particleArray.length; i++) {
		if(particleArray[i] !== null) {
			particleArray[i].gravity();
			particleArray[i].draw();
		}

	}

	for(var i = 0; i<particleArray.length; i++) {
		if(particleArray[i].getHealth() <= 0) particleArray.splice(i, 1);
	}

	particleArray = particleArray.filter(function(n){ return n != undefined }); //removes all undefined elements from array

	fill(161, 222, 223);
	rect(0, 0, windowWidth, consoleHeight);

	fill(255);

	textSize(32);
	text("Gravity", textPos[0][0], textPos [0][1]);
	text("Freeze", textPos[1][0], textPos [1][1]);
	text("Speed", textPos[2][0], textPos [2][1]);

	stroke(255);
	strokeWeight(3);
	if(gravOn){
		fill(255);
	} else {
		noFill();
	}
	rect(gravBtnX, 20, 40, 40);

	if(freezeOff){
		fill(255);
	} else {
		noFill();
	}
	rect(freezeBtnX, 20, 40, 40);

	fill(255);
	line(faderX, 110, textPos[1][0], 110);
	rect(faderX + faderPos*(textPos[1][0] - faderX), 95, 30, 30);

}

function windowResized() {

	if(windowWidth<640) windowWidth = 640;
	if(windowHeight<640) windowHeight = 640;

	textPos[0][0] = windowWidth/5;
	textPos[1][0] = windowWidth/5*4;
	textPos[2][0] = windowWidth/5;

	gravBtnX = textPos[0][0] - defPadding;
	freezeBtnX = textPos[1][0] - defPadding;
	faderX = textPos[2][0] + 3*defPadding;

	resizeCanvas(windowWidth, windowHeight);

}

function mousePressed() {

	/*for(var i = 0; i<counter; i++) {
		if(particleArray[i] == null) {
			particleArray[i] = new Particle(0, counter, mouseX, mouseY, 20);
			return;
		}
	}*/
	if(mouseY >= consoleHeight){
		particleArray[particleArray.length] = new Particle(0, counter, mouseX, mouseY, 40);
	}

	if(mouseX >= gravBtnX && mouseX <= gravBtnX + 40 && mouseY >= 20 && mouseY <= 60) gravOn = !gravOn;

	if(mouseX >= freezeBtnX && mouseX <= freezeBtnX + 40 && mouseY >= 20 && mouseY <= 60) freezeOff = !freezeOff;

	if(mouseX >= faderX + faderPos*(textPos[1][0] - faderX) && mouseX <= faderX + faderPos*(textPos[1][0] - faderX) + 30 && mouseY>= 95 && mouseY <= 125) faderDrag = true;

}

function mouseDragged() {
	if(!faderDrag) return;

	if(mouseX <= faderX) mouseX = faderX;
	if(mouseX >= textPos[1][0]) mouseX = textPos[1][0];

	faderPos = (mouseX - faderX)/(textPos[1][0]-faderX);
}

function mouseReleased() {
	faderDrag = false;
}
