/* eslint-disable */

var mySound, myControlPhrase, g1Phrase, g2Phrase, g3Phrase, bPhrase, pPhrase, cPhrase, d1Phrase, d2Phrase, d3Phrase, customPhrase;
var myDo1Phrase, myRePhrase, myMiPhrase, mySolPhrase, myLaPhrase, myDo2Phrase;
var canvas;
var cycle = 8;
var centerPoints = []; //centro das elipses
var pointsA = []; // point array for the first ellipse
var pointsB = []; // point array for the second ellipse
var pointsC = []; // point array
var pointsD = [];
var pointsE = [];
var pointsF = [];
var pointsG = [];
var pointsH = [];
var pointsI = [];
var pointsJ = [];

var labels = []; //label array for instrument names

var aSelector = 0;
var bSelector = 0;

var controlPattern = [1, 1, 1, 1, 1, 1, 1, 1];
var g1Pattern = [0, 0, 0, 0, 0, 0, 0, 0];
var g2Pattern = [0, 0, 0, 0, 0, 0, 0, 0];
var g3Pattern = [0, 0, 0, 0, 0, 0, 0, 0];

var bPattern = [0, 0, 0, 0, 0, 0, 0, 0];
var pPattern = [0, 0, 0, 0, 0, 0, 0, 0];
var cPattern = [0, 0, 0, 0, 0, 0, 0, 0];
var d1Pattern = [0, 0, 0, 0, 0, 0, 0, 0];
var d2Pattern = [0, 0, 0, 0, 0, 0, 0, 0];
var d3Pattern = [0, 0, 0, 0, 0, 0, 0, 0];

var customPattern = [0, 0, 0, 0, 0, 0, 0, 0];

var g1, g2, g3, b, p, c, d1, d2, d3;
var play = false;
var recording = false;
var recordingSample = false;
var tickCount = -1;
var BPM = 24;

var digi, bma, braga;

var controlCenterX, controlCenterY; //these are the controls for the play button

var recorder, customRecorder, soundFile, customFile;

var offset;

var mic;

var recX, recY;


function preload() {
    g1 = loadSound('../_assets/sounds/g1.wav');
    g2 = loadSound('../_assets/sounds/g2.wav');
    g3 = loadSound('../_assets/sounds/g3.wav');

    b = loadSound('../_assets/sounds/b.wav');
    p = loadSound('../_assets/sounds/p.wav');
    c = loadSound('../_assets/sounds/c.wav');

    d1 = loadSound('../_assets/sounds/d1.wav');
    d2 = loadSound('../_assets/sounds/d2.wav');
    d3 = loadSound('../_assets/sounds/d3.wav');
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight - $("header").height());
    canvas.parent("main")
    controlCenterX = windowWidth * 0.75;
    controlCenterY = windowHeight * 0.85;

    mic = new p5.AudioIn();
    mic.start();

    radius = windowWidth / 3 * 0.84; //0.84 is fine-tuned so that ellipses don't overlap

    labels = ['Guit1', 'Guit2', 'Guit3', 'Baixo', 'Piano', 'Cordas', 'Bat1', 'Bat2', 'Bat3', 'Custom'];

    for (var i = 0; i < cycle; i++) {
        pointsA[i] = new Point(i, 0, color(107, 163, 189));
        pointsB[i] = new Point(i, 1, color(137, 193, 219));
        pointsC[i] = new Point(i, 2, color(167, 223, 249));
        pointsD[i] = new Point(i, 3, color(227, 132, 148));
        pointsE[i] = new Point(i, 4, color(223, 218, 162));
        pointsF[i] = new Point(i, 5, color(106, 100, 139));
        pointsG[i] = new Point(i, 6, color(84, 129, 99));
        pointsH[i] = new Point(i, 7, color(114, 159, 129));
        pointsI[i] = new Point(i, 8, color(134, 189, 159));
        pointsJ[i] = new Point(i, 9, color(55));
    }

    //init Phrases for ellipse1
    g1Phrase = new p5.Phrase('kick', playG1, g1Pattern);
    myControlPhrase = new p5.Phrase('tick', tickCounter, controlPattern);
    g2Phrase = new p5.Phrase('clap', playG2, g2Pattern);
    g3Phrase = new p5.Phrase('snap', playG3, g3Pattern);

    //init Phrases for ellipse2
    bPhrase = new p5.Phrase('do1', playB, bPattern);
    pPhrase = new p5.Phrase('re', playP, pPattern);
    cPhrase = new p5.Phrase('mi', playC, cPattern);
    d1Phrase = new p5.Phrase('sol', playD1, d1Pattern);
    d2Phrase = new p5.Phrase('sol', playD2, d2Pattern);
    d3Phrase = new p5.Phrase('sol', playD3, d3Pattern);
    customPhrase = new p5.Phrase('custom', playCustom, customPattern);

    //create Part and add all the Phrases for ellipse 1
    myPart = new p5.Part(8, 1 / 2);
    myPart.addPhrase(g1Phrase);
    myPart.addPhrase(myControlPhrase);
    myPart.addPhrase(g2Phrase);
    myPart.addPhrase(g3Phrase);

    //create Part and add all the Phrases for ellipse 1
    myPart.addPhrase(bPhrase);
    myPart.addPhrase(pPhrase);
    myPart.addPhrase(cPhrase);
    myPart.addPhrase(d1Phrase);
    myPart.addPhrase(d2Phrase);
    myPart.addPhrase(d3Phrase);
    myPart.addPhrase(customPhrase);

    //set defaults
    myPart.setBPM(BPM);
    myPart.looping = true;

    recorder = new p5.SoundRecorder();
    customRecorder = new p5.SoundRecorder();

    customRecorder.setInput(mic);

    soundFile = new p5.SoundFile();
    customFile = new p5.SoundFile();

    if (windowWidth >= windowHeight) {
        recX = windowWidth / 4 - 200;
        recY = windowHeight / 6 + windowHeight / 15 * 9;
    } else {
        recX = windowWidth / 4 + windowWidth / 15 * 8;
        recY = windowHeight / 6 - 60;
    }

    Utils.hideLoader()

}

function draw() {

    // alert("loaded")

    //background(255,220,220);
    background(235, 255, 255);
    fill(0, 0, 50);
    textAlign(CENTER);
    textSize(22);
    // text("0 + 1 = Som - Sessão 4", windowWidth/2, 40);

    stroke(127);
    strokeWeight(4);
    fill(220, 240, 255);

    for (var i = 0; i < cycle; i++) {
        pointsA[i].display();
        pointsB[i].display();
        pointsC[i].display();
        pointsD[i].display();
        pointsE[i].display();
        pointsF[i].display();
        pointsG[i].display();
        pointsH[i].display();
        pointsI[i].display();
        pointsJ[i].display();


        pointsA[i].isActive(tickCount);
        pointsB[i].isActive(tickCount);
        pointsC[i].isActive(tickCount);
        pointsD[i].isActive(tickCount);
        pointsE[i].isActive(tickCount);
        pointsF[i].isActive(tickCount);
        pointsG[i].isActive(tickCount);
        pointsH[i].isActive(tickCount);
        pointsI[i].isActive(tickCount);
        pointsJ[i].isActive(tickCount);


    }


    displayControls();

    displayLabel();
    fill(0);
    rectMode(CENTER);

    textSize(15);
    if (windowWidth >= windowHeight) {
        tempX = windowWidth / 4 - 120;
        tempY = windowHeight / 6;
        for (var i = 0; i < labels.length; i++) {
            text(labels[i], tempX, tempY + windowHeight / 15 * i);
        }

        if (recordingSample) text("A GRAVAR SAMPLE!!", recX, recY + 20);
    } else {
        tempX = windowWidth / 4;
        tempY = windowHeight / 6 - 30;
        for (var i = 0; i < labels.length; i++) {
            text(labels[i], tempX + windowWidth / 15 * i, tempY);
        }

        if (recordingSample) text("A GRAVAR SAMPLE!!", recX, recY - 20);
    }
}

function windowResized() {

    if (windowWidth < 640) windowWidth = 640;
    if (windowHeight < 640) windowHeight = 640;

    radius = windowWidth / 3 * 0.84;

    controlCenterX = windowWidth * 0.75;
    controlCenterY = windowHeight * 0.85;

    for (var i = 0; i < cycle; i++) {
        pointsA[i].update();
        pointsB[i].update();
        pointsC[i].update();
        pointsD[i].update();
        pointsE[i].update();
        pointsF[i].update();
        pointsG[i].update();
        pointsH[i].update();
        pointsI[i].update();
        pointsJ[i].update();
    }

    if (windowWidth >= windowHeight) {
        recX = windowWidth / 4 - 200;
        recY = windowHeight / 6 + windowHeight / 15 * 9;
    } else {
        recX = windowWidth / 4 + windowWidth / 15 * 9;
        recY = windowHeight / 6 - 60;
    }

    resizeCanvas(windowWidth, windowHeight);

}

function mousePressed() {
    handleControls();
    handleNumbers();
    for (var i = 0; i < cycle; i++) {
        pointsA[i].onClick();
        pointsB[i].onClick();
        pointsC[i].onClick();
        pointsD[i].onClick();
        pointsE[i].onClick();
        pointsF[i].onClick();
        pointsG[i].onClick();
        pointsH[i].onClick();
        pointsI[i].onClick();
        pointsJ[i].onClick();
    }
}

function handleControls() {
    if (mouseX >= controlCenterX - 40 && mouseX <= controlCenterX + 40 && mouseY >= controlCenterY - 40 && mouseY <= controlCenterY + 40) {
        play = !play;
        if (play) {
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
        return;
    }

    if (mouseX >= controlCenterX - 40 + 100 && mouseX <= controlCenterX + 40 + 100 && mouseY >= controlCenterY - 40 && mouseY <= controlCenterY + 40) {
        recordAudio();
        return;
    }

    if (mouseX >= recX - 20 && mouseX <= recX + 20 && mouseY >= recY - 20 && mouseY <= recY + 20) {
        recordSample();
    }


}

function displayControls() {
    stroke(0);
    fill(0);
    ellipse(controlCenterX, controlCenterY, 50, 50);
    fill(255);
    if (!play) {
        triangle(controlCenterX - 10, controlCenterY - 15, controlCenterX - 10, controlCenterY + 15, controlCenterX + 15, controlCenterY);
    } else {
        rectMode(CORNER);
        rect(controlCenterX - 10, controlCenterY - 15, 7, 30);
        rect(controlCenterX + 3, controlCenterY - 15, 7, 30);
    }

    textSize(18);
    textAlign(CENTER, CENTER);
    stroke(0);
    strokeWeight(2);
    fill(255, 50, 50);
    ellipse(controlCenterX + 100, controlCenterY, 50, 50);
    ellipse(recX, recY, 20, 20);
    fill(255);
    if (!recording) {
        text("REC", controlCenterX + 100, controlCenterY);
    } else {
        text("STOP", controlCenterX + 100, controlCenterY);
    }



}

function displayLabel() {

    textSize(16);
    textAlign(CENTER);
    noStroke(0);
    fill(0);
    text("Clica números para decidir se o instrumento toca.", windowWidth * 0.75, windowHeight * 0.92);
    textSize(12);
    text("Música: Tiago Oliveira e Óscar Rodrigues - Casa da Música.", windowWidth * 0.75, windowHeight * 0.94);
    text("Desenvolvido por Óscar Rodrigues - Digitópia Casa da Música.", windowWidth * 0.75, windowHeight * 0.97);

}

function recordAudio() {
    if (!recording) {
        recorder.record(soundFile);
    } else {
        recorder.stop();
        save(soundFile, "musicaFixe.wav");
    }

    recording = !recording;

}

function recordSample() {
    if (!recordingSample) {
        customRecorder.record(customFile);
    } else {
        customRecorder.stop();
    }

    recordingSample = !recordingSample;

}


function handleNumbers() {

    if (mouseX >= centerPoints[0] - 3 * offset - offset / 2 && mouseX <= centerPoints[0] - 3 * offset + offset / 2 && mouseY >= centerPoints[1] - offset / 2 && mouseY <= centerPoints[1] + offset / 2) {
        aSelector = 0;
        for (var i = 0; i < cycle; i++) {
            pointsA[i].setColor();
        }
    }
    if (mouseX >= centerPoints[0] - offset - offset / 2 && mouseX <= centerPoints[0] - offset + offset / 2 && mouseY >= centerPoints[1] - offset / 2 && mouseY <= centerPoints[1] + offset / 2) {
        aSelector = 1;
        for (var i = 0; i < cycle; i++) {
            pointsA[i].setColor();
        }
    }
    if (mouseX >= centerPoints[0] + offset - offset / 2 && mouseX <= centerPoints[0] + offset + offset / 2 && mouseY >= centerPoints[1] - offset / 2 && mouseY <= centerPoints[1] + offset / 2) {
        aSelector = 2;
        for (var i = 0; i < cycle; i++) {
            pointsA[i].setColor();
        }
    }
    if (mouseX >= centerPoints[0] + 3 * offset - offset / 2 && mouseX <= centerPoints[0] + 3 * offset + offset / 2 && mouseY >= centerPoints[1] - offset / 2 && mouseY <= centerPoints[1] + offset / 2) {
        aSelector = 3;
        for (var i = 0; i < cycle; i++) {
            pointsA[i].setColor();
        }
    }


    if (mouseX >= centerPoints[2] - 3 * offset - offset / 2 && mouseX <= centerPoints[2] - 3 * offset + offset / 2 && mouseY >= centerPoints[3] - offset / 2 && mouseY <= centerPoints[3] + offset / 2) {
        bSelector = 0;
        for (var i = 0; i < cycle; i++) {
            pointsB[i].setColor();
        }
    }
    if (mouseX >= centerPoints[2] - offset - offset / 2 && mouseX <= centerPoints[2] - offset + offset / 2 && mouseY >= centerPoints[3] - offset / 2 && mouseY <= centerPoints[3] + offset / 2) {
        bSelector = 1;
        for (var i = 0; i < cycle; i++) {
            pointsB[i].setColor();
        }
    }
    if (mouseX >= centerPoints[2] + offset - offset / 2 && mouseX <= centerPoints[2] + offset + offset / 2 && mouseY >= centerPoints[3] - offset / 2 && mouseY <= centerPoints[3] + offset / 2) {
        bSelector = 2;
        for (var i = 0; i < cycle; i++) {
            pointsB[i].setColor();
        }
    }
    if (mouseX >= centerPoints[2] + 3 * offset - offset / 2 && mouseX <= centerPoints[2] + 3 * offset + offset / 2 && mouseY >= centerPoints[3] - offset / 2 && mouseY <= centerPoints[3] + offset / 2) {
        bSelector = 3;
        for (var i = 0; i < cycle; i++) {
            pointsB[i].setColor();
        }
    }

}
