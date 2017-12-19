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
    { path: "../sounds/kick.mp3" },
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

    function setupHelp() {

        $(".close-button").click(function() {
            showHelp(false)
        })

        $(".help").click(function() {
            showHelp(true)
        })

        $(".modal").click(function() {
            console.log("clicked modal")
            showHelp(false)
        })

        if (Cookies.get("visited")) {
            console.log("returning visitor")
            // showHelp(true) // NOTE: uncomment for testing, to force help message
        } else {
            console.log("first time visitor")
            Cookies.set("visited", true, { expires: 365, path: "/" })
            showHelp(true)
        }

        // NOTE: Hide help if Escape key is pressed
        $(document).keyup(function(e) {
            if (e.keyCode == 27) showHelp(false)
        })

    }

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

function showHelp(state) {

    // NOTE: this should be binded more effectively.. but not using Angular just for this...

    if (state) {
        $(".modal").show()
        $(".help-icon").mouseover(function(){}).mouseout(function(){})
        $(".help-icon").first().css("color", "grey")
    } else {
        $(".modal").hide()
        $(".help-icon").first().css("color", "black")
        $(".help-icon")
            .mouseover(function() { $(this).css("color", "grey") })
            .mouseout(function() { $(this).css("color", "black") })
    }

}

function changeBG(bg) {
    bgColor = bg
    background(255, bg, bg)
    $("body").css("background-color", "rgb(255,"+bg+","+bg+")")
}

function canvasHeight() {
    var extra = ( $(".head").height() + $("#bpmButtons").height() + $("footer").height() )
    var slack = 20 // NOTE: don't try to use 100% of space, since it tends to add scroll bars, which we should avoid
    var diff = windowHeight - extra - slack
    return (diff < 300) ? 300 : diff
}

function canvasWidth() {
    var extra = ( $(".labels").width() + $(".playback").width() )
    var slack = 5
    var diff = $(".main").width() - extra - slack
    return (diff < 300) ? 300 : diff
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
