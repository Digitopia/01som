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

// Global variables
var paper
var circle1, circle2
var audios = {}

// Helper global variables
var playing = false
var touched = false

$(document).read(function() {



})

function setup() {

    function initAudios() {
        audiosConf.forEach(function(audioConf) {
            audios.push(new Tone.Player(audioConf.path).toMaster())
        })
    }

    initAudios()

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

    function initCircle() {

        var circle1Params = {
            x: Utils.vw()/2,
            y: Utils.vw()/2,
            n: 8,
            r: radius,
            shake: true,
            options: [
                { sample: "do1", text: "DÓ"  },
                { sample: "re", text: "RÉ"  },
                { sample: "mi", text: "MI"  },
                { sample: "sol", text: "SOL" },
                { sample: "la", text: "LÁ"  },
                { sample: "do2", text: "Dó"
            }
        }

        circle1 = new Circle(circle1Params)

        var circle2Params = {
            x: Utils.vw()/2 + 100,
            y: Utils.vw()/2 + 100,
            n: circle1Params.n,
            r: circle1Params.r,
            shake: true,
            options: [
                { sample: "do1", text: "DÓ"  },
                { sample: "re", text: "RÉ"  },
                { sample: "mi", text: "MI"  },
                { sample: "sol", text: "SOL" },
                { sample: "la", text: "LÁ"  },
                { sample: "do2", text: "Dó"
            }
        }
        circle2 = new Circle(circle2Params)
    }

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

// function drawCircles() {
//     stroke(127)
//     strokeWeight(4)
//     fill(220, 240, 255)
//     ellipse(centerPoints[0], centerPoints[1], radius, radius)
//     fill(220,255,240)
//     ellipse(centerPoints[2], centerPoints[3], radius, radius)
// }

function stop() {
    $("#playButton").text("Play")
    Tone.Transport.stop()
}
