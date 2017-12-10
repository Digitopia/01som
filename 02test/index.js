var pointsA = []
var pointsB = []
var bgColor = 244
var centerPoints = [];
var radius
var nPoints = 8

var buttonsConf = [
    { bpm: 44,  bg: 250 },
    { bpm: 52,  bg: 247 },
    { bpm: 60,  bg: 244 },
    { bpm: 80,  bg: 241 },
    { bpm: 100, bg: 238 },
    { bpm: 120, bg: 235 }
]

var audiosConf = [
    { path: "../sounds/kick.mp3" },
    { path: "../sounds/clap.wav" },
    { path: "../sounds/snap.wav" },
    { path: "../sounds/do1.mp3" },
    { path: "../sounds/re.mp3" },
    { path: "../sounds/mi.mp3" },
    { path: "../sounds/sol.mp3" },
    { path: "../sounds/la.mp3" },
    { path: "../sounds/do2.mp3" }
]

var audios = []

// TODO: @Oscar this needs a better name!
var soundStringA = [0, 0, 0, 0, 0, 0, 0, 0]
var soundStringB = [0, 0, 0, 0, 0, 0, 0, 0]

var playing = false

function setup() {

    function initAudios() {
        audiosConf.forEach(function(audioConf) {
            audios.push(new Tone.Player(audioConf.path).toMaster())
        })
    }

    initAudios()

    function initButtons() {

        // BPM buttons
        buttonsConf.forEach(function(buttonConf) {
            var button = $("<button/>", {
                text: buttonConf.bpm,
                value: buttonConf.bpm,
                click: function() {
                    changeBG(buttonConf.bg);
                    Tone.Transport.bpm.value = buttonConf.bpm;
                    $("#bpmButtons button").removeClass("active")
                    $(this).addClass("active")
                }
            })
            $("#bpmButtons").append(button)
        })

        // Play/Pause button
        $("#playButton").click(function() {
            if (playing) stop(); else play()
            playing = !playing
        })
    }

    initButtons()

    canvas = createCanvas(canvasWidth(), canvasHeight());
    canvas.parent("canvas-placeholder")

    // NOTE: init circle before initing points
    formatCircles()

    for (var i = 0; i < nPoints; i++) {
        pointsA[i] = new Point(i, 0)
        pointsB[i] = new Point(i, 1)
    }

    Tone.Transport.bpm.value = 60
    $(":button[value='60']").addClass("active")
    Tone.Transport.loopEnd = '1m'
    Tone.Transport.loop = true

    setupHelp()

    // NOTE: on mobile devices click is never triggered
    $(".modal, .help").on("touchstart", function() { $(this).trigger("click") })

    // NOTE: Wait for DOM to be ready, because otherwise setting listeners for Android will fail
    $(document).ready(function() {
        $("div").each(function() { this.onclick = function() {} })
        console.log("DOM ready!")
        setupHelp()
    })

    StartAudioContext(Tone.context, "#playButton");

}

function changeBG(bg) {
    bgColor = bg
    background(255, bg, bg)
    $("body").css("background-color", "rgb(255,"+bg+","+bg+")")
}


function draw() {
    background(255, bgColor, bgColor)
    drawCircles()
    drawPoints()
}

function drawPoints() {
    pointsA.forEach(function(p) {
        p.display()
        if (playing) {
            var tickCount = Math.floor(Tone.Transport.ticks / 100)
            p.isActive(tickCount)
        }
    })

    pointsB.forEach(function(p) {
        p.display()
        if (playing) {
            var tickCount = Math.floor(Tone.Transport.ticks / 100)
            p.isActive(tickCount)
        }
    })
}

function formatCircles() {

    if(canvasWidth() >= canvasHeight()) {
        centerPoints[0] = canvasWidth()/4-10;
        centerPoints[1] = canvasHeight()/2;
        centerPoints[2] = canvasWidth()/4 * 3 + 10;
        centerPoints[3] = canvasHeight()/2;
    } else {
        centerPoints[0] = canvasWidth()/2;
        centerPoints[1] = canvasHeight()/4;
        centerPoints[2] = canvasWidth()/2;
        centerPoints[3] = canvasHeight()/4 * 3;
    }
    var scalingFactor = 0.85
    radius = min(canvasWidth(), canvasHeight()) * 0.5 * scalingFactor
}

function drawCircles() {
    stroke(127)
    strokeWeight(4)
    fill(220, 240, 255)
    ellipse(centerPoints[0], centerPoints[1], radius, radius)
    fill(220,255,240)
    ellipse(centerPoints[2], centerPoints[3], radius, radius)
}

function windowResized() {
    resizeCanvas(canvasWidth(), canvasHeight())
    console.log(canvasWidth(), canvasHeight())
    formatCircles()
    pointsA.forEach(function(p) { p.update() })
    pointsB.forEach(function(p) { p.update() })
}

function play() {

    // First schedule all events
    for (var i = 0; i < nPoints; i++) {
        (function() {
            var _i = i
            Tone.Transport.schedule(function(t) {
                console.log("Playing 8th note number", _i)
                idx = soundStringA[_i] - 1
                if (idx >= 0 && idx <= 2) audios[idx].start(t)
            }, i + "*8n")

            //TODO: @Nuno, please check if there's a better way to do this
            Tone.Transport.schedule(function(t) {
                console.log("Playing 8th note number", _i)
                idy = soundStringB[_i] - 1
                if (idy >= 3 && idy <= 8) audios[idy].start(t)
            }, i + "*8n")
        })()
    }

    // And only then start, in order to guarantee syncronicity
    $("#playButton").text("Stop")
    Tone.Transport.start()

}

function stop() {
    $("#playButton").text("Play")
    Tone.Transport.stop()
}

function mousePressed() {
    pointsA.forEach(function(p) { p.onClick() })
    pointsB.forEach(function(p) { p.onClick() })
    if (mouseX > 0 && mouseX < canvasWidth() && mouseY > 0 && mouseY < canvasHeight()) return false
}
