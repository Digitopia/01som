// TODO:
// - Experiment with Babel.js so that can use ES6 features, while still guaranteeing backwards compatibility
// - Try and experiment with Vue.js to improve some variable binding?
// - Add loading screen
// - Experiment with jsdoc for classes, just because

var CONF = {
    nPoints: 8,
    points: {
        radius: 18,
        fillColor: COLORS.white,
        stroke: COLORS.grey,
        strokeWidth: 2,
        strokeWidthHover: 3
    },
    buttons: [
        { bpm: 44,  bg: 250 },
        { bpm: 52,  bg: 247 },
        { bpm: 60,  bg: 244 },
        { bpm: 80,  bg: 241 },
        { bpm: 100, bg: 238 },
        { bpm: 120, bg: 235 }
    ],
    paths: {
        kick: "../sounds/kick.wav",
        clap: "../sounds/clap.wav",
        snap: "../sounds/snap.wav"
    },
    options: [
        { color: COLORS.blue,  sample: "kick" },
        { color: COLORS.green, sample: "clap" },
        { color: COLORS.red,   sample: "snap" }
    ],
}

// "True" Global variables
var paper
var circle
var audios = {}

// "Helper" global variables
var playing = false
var touched = false
// NOTE: this is a small hack to detect if we should react on mousePressed or touchStarted events
// It's only true if a touchStart event is received.
// If there is touch support (touch* events), they all fire some ms faster than mouse* events,
// so use those for more responsive app

$(document).ready(function() {

    function initCanvas() {

        paper = Snap(Utils.vw(), Utils.vh())

        $("svg").appendTo("#canvas-placeholder")

        paper.attr({
            viewBox: '0 0 ' + Utils.vw() + " " + Utils.vh(),
            // preserveAspectRatio: "none"
        })

        $(window).resize(function() {
            paper.attr({
                width: Utils.vw(),
                height: Utils.vh()
            })
        })
    }

    function initAudios() {
        for (var key in CONF.paths) {
            audios[key] = new Tone.Player(CONF.paths[key]).toMaster()
        }

        Tone.Transport.loopEnd = '1m'
        Tone.Transport.loop = true

        StartAudioContext(Tone.context, "#playButton");
    }

    function initButtons() {

        // BPM buttons
        CONF.buttons.forEach(function(buttonConf) {
            var button = $("<button/>", {
                text: buttonConf.bpm,
                value: buttonConf.bpm,
                click: function() {
                    var bg = buttonConf.bg
                    $("body").css("background-color", "rgb(255,"+bg+","+bg+")")
                    Tone.Transport.bpm.value = buttonConf.bpm;
                    $("#bpmButtons button").removeClass("active")
                    $(this).addClass("active")
                }
            })
            $("#bpmButtons").append(button)
        })

        //
        $("#bpmButtons button").each(function() {
            $(this).fitText(0.3, {
                minFontSize: '20px',
                maxFontSize: '40px'
            })
        })

        Tone.Transport.bpm.value = 60
        $(":button[value='60']").addClass("active")

        // Play/Pause button
        $("#playButton").click(function() {
            if (playing) stop(); else play()
            playing = !playing
        })

    }

    function initCircle() {

        var scalingFactor = 0.6
        var radius = Math.min(Utils.vw(), Utils.vh()) * 0.5 * scalingFactor

        circle = new Circle({
            x: Utils.vw()/2,
            y: Utils.vh()/2,
            n: 8,
            r: radius,
            shake: true
        })

    }

    function initHelp() {
        HELP.init()
    }

    initCanvas()
    initAudios()
    initButtons()
    initCircle()
    initHelp()

})

function play() {

    // First schedule all events
    for (var i = 0; i < CONF.nPoints; i++) {
        (function() {
            var _i = i
            Tone.Transport.schedule(function(t) {
                var p = circle.points[_i]
                var previousI = (_i == 0) ? CONF.nPoints - 1 : _i - 1
                var previousP = circle.points[previousI]

                // NOTE: animate when active
                p.elem.animate({
                    r: CONF.points.radius * 1.25},
                    150,
                    function(){},
                    p.elem.animate({
                        r: CONF.points.radius
                    }, 1000)
                )

                p.showDot(true); previousP.showDot(false)
                if (p.state != -1) {
                    var sample = CONF.options[p.state].sample
                    audios[sample].start(t)
                }
            }, i + "*8n")
        })()
    }

    // And only then start, in order to guarantee syncronicity
    $("#playButton").text("Stop")
    Tone.Transport.start()

}

function stop() {
    $("#playButton").text("Play")
    points.forEach(function(point) { point.showDot(false) })
    Tone.Transport.stop()
}
