var points = []
var bgColor = 244
var cx, cy, radius
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
    { path: "../sounds/kick.wav" },
    { path: "../sounds/clap.wav" },
    { path: "../sounds/snap.wav" }
]

var audios = []

// TODO: @Oscar this needs a better name!
var soundString = [0, 0, 0, 0, 0, 0, 0, 0]

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
    formatCircle()

    for (var i = 0; i < nPoints; i++) {
        points[i] = new Point(i)
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
    drawCircle()
    drawPoints()
}

function drawPoints() {
    points.forEach(function(p) {
        p.display()
        if (playing) {
            var tickCount = Math.floor(Tone.Transport.ticks / 100)
            p.isActive(tickCount)
        }
    })
}

function formatCircle() {
    cx = canvasWidth()/2
    cy = canvasHeight()/2
    var scalingFactor = 1.25
    radius = min(canvasWidth(), canvasHeight()) * 0.5 * scalingFactor
}

function drawCircle() {
    stroke(127)
    strokeWeight(4)
    fill(220, 240, 255)
    ellipse(cx, cy, radius, radius)
}

function windowResized() {
    resizeCanvas(canvasWidth(), canvasHeight())
    console.log(canvasWidth(), canvasHeight())
    formatCircle()
    points.forEach(function(p) { p.update() })
}

function play() {

    // First schedule all events
    for (var i = 0; i < nPoints; i++) {
        (function() {
            var _i = i
            Tone.Transport.schedule(function(t) {
                console.log("Playing 8th note number", _i)
                idx = soundString[_i] - 1
                if (idx >= 0 && idx <= 2) audios[idx].start(t)
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
    points.forEach(function(p) { p.onClick() })
    if (mouseX > 0 && mouseX < canvasWidth() && mouseY > 0 && mouseY < canvasHeight()) return false
}
