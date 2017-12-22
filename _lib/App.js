var paper

// NOTE: this is a small hack to detect if we should react on mousePressed or touchStarted events
// It's only true if a touchStart event is received.
// If there is touch support (touch* events), they all fire some ms faster than mouse* events,
// so use those for more responsive app
var touched = false

var App = function(params) {

    if (params === undefined) params = {}

    this.buttons = params.buttons || [
        { bpm: 44,  bg: 250 },
        { bpm: 52,  bg: 247 },
        { bpm: 60,  bg: 244 },
        { bpm: 80,  bg: 241 },
        { bpm: 100, bg: 238 },
        { bpm: 120, bg: 235 }
    ]

    this.audios = params.audio || {}
    this.circles = params.circles || []
    this.paths = params.paths || App.defaults.paths.all()
    this.playing = false
    this.spatial = params.spatial || false
    this.panner = null

    this.init()

}

App.defaults = {
    paths: {
        percussive: {
            kick: "../_assets/sounds/kick.wav",
            clap: "../_assets/sounds/clap.wav",
            snap: "../_assets/sounds/snap.wav"
        },
        notes: {
            kick: "../_assets/sounds/kick.mp3",
            clap: "../_assets/sounds/clap.wav",
            snap: "../_assets/sounds/snap.wav",
            do1: "../_assets/sounds/do1.mp3",
            re: "../_assets/sounds/re.mp3",
            mi: "../_assets/sounds/mi.mp3",
            sol: "../_assets/sounds/sol.mp3",
            la: "../_assets/sounds/la.mp3",
            do2: "../_assets/sounds/do2.mp3"
        },
        all: function() {
            return _.merge(this.percussive, this.notes)
        }
    }
}

App.prototype.init = function() {
    this.initCanvas()
    this.initAudio()
    this.initButtons()
    this.initHelp()
}

App.prototype.initCanvas = function() {

    paper = Snap(Utils.vw(), Utils.vh())

    $("svg").appendTo("#canvas-placeholder")

    paper.attr({
        viewBox: '0 0 ' + Utils.vw() + " " + Utils.vh(),
        // preserveAspectRatio: "none"
    })

    $(window).resize(function() {
        paper.attr({ width: Utils.vw(), height: Utils.vh() })
        if (this.circles) this.circles.forEach(function(circle) { circle.resize() })
    })
}

App.prototype.initAudio = function() {
    Tone.Transport.loopEnd = '1m'
    Tone.Transport.loop = true
    StartAudioContext(Tone.context, "#playButton");
    if (this.spatial) {
        this.panner = new Tone.Panner3D().connect(Tone.Master)
        Tone.Listener.setPosition(Utils.vw()/2, 0, Utils.vh()/2)
    }
}

App.prototype.initButtons = function() {

    var self = this

    // BPM buttons
    this.buttons.forEach(function(buttonConf) {
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
        if (self.playing) self.stop(); else self.play()
        self.playing = !self.playing
    })

}

App.prototype.initHelp = function() {
    HELP.init()
}

App.prototype.play = function() {

    // recorder.record(soundFile)

    $("#playButton").text("Stop")

    this.circles.forEach(function(circle) {
        circle.schedule()
    })

    Tone.Transport.start()

}

App.prototype.stop = function() {

    // recorder.stop()
    // save(soundFile, "foo.wav")

    $("#playButton").text("Play")

    this.circles.forEach(function(circle) {
        circle.stop()
    })

    Tone.Transport.stop()
}

App.prototype.addCircle = function(params) {
    this.circles.push(new Circle(params, this))
    this.loadSounds(this.paths)
}

App.prototype.loadSounds = function(paths) {
    for (var key in paths) {
        if (!(key in this.audios)) {
            var player = new Tone.Player(this.paths[key])
            this.audios[key] = player
            if (this.spatial) player.connect(this.panner)
            else player.connect(Tone.Master)
        }
    }
}
