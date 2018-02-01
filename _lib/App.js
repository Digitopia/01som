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

    this.container = params.svg || "#svg"

    this.debug = params.debug || false

    this.init()

    if (this.debug) {

        var self = this

        // grid
        this.grid = {}
        var lines = ["vline", "hline"]
        lines.forEach(function(line) {
            self.grid[line] = paper.line().attr({stroke: "rgba(0,0,0,0.3)"})
        })

        // margins
        this.margins = {}
        var margins = ["top", "bottom", "left", "right", "vmiddle", "hmiddle"]
        margins.forEach(function(margin) {
            self.margins[margin] = paper.rect().attr({fill:"rgba(0,0,0,0.3)"})
        })

        this.resize()

    }

    $(".fullscreen").click(function() {
        screenfull.request()
    })

}

App.defaults = {
    paths: {
        percussive: {
            kick: "../_assets/sounds/kick.mp3",
            clap: "../_assets/sounds/clap.mp3",
            snap: "../_assets/sounds/snap.mp3"
        },
        notes: {
            kick: "../_assets/sounds/kick.mp3",
            clap: "../_assets/sounds/clap.mp3",
            snap: "../_assets/sounds/snap.mp3",
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
    this.resize()
}

App.prototype.initCanvas = function() {
    // paper = Snap(this.width, this.height)
    // paper = Snap(this.container)
    paper = Snap()
    paper.attr({
        width:  $(this.container).width(),
        height: $(this.container).height(),
    })
    $("svg").appendTo(this.container)
    var self = this
    $(window).resize(function() { self.resize() })
}

App.prototype.resize = function() {

    // this.width = Utils.vw()
    // this.height = Utils.vh()
    this.width = $(this.container).width(),
    this.height = $(this.container).height(),

    paper.attr({ width: this.width, height: this.height })

    if (this.circles) this.circles.forEach(function(circle) { circle.resize() })

    if (this.debug && this.grid) {

        var self = this

        this.grid.vline.attr({
            x1: self.width/2,
            x2: self.width/2,
            y1: 0,
            y2: self.height
        })

        this.grid.hline.attr({
            x1: 0,
            // x2: self.width,
            y1: self.height/2,
            y2: self.height/2,
        })

        // margins
        if (!this.padding) return
        var padding = this.padding

        this.margins.top.attr({ x: 0, y: 0, width: this.width, height: padding })
        this.margins.bottom.attr({ x: 0, y: this.height-padding, width: this.width, height: padding })
        this.margins.hmiddle.attr({ x: 0, y: this.height/2-padding/2, width: this.width, height: padding })
        this.margins.vmiddle.attr({ x: this.width/2-padding/2, y: 0, width: padding, height: this.height })
        this.margins.left.attr({ x: 0, y: 0, width: padding, height: this.height })
        this.margins.right.attr({ x: this.width-padding, y: 0, width: padding, height: this.height })

    }
}

App.prototype.initAudio = function() {
    Tone.Transport.loopEnd = '1m'
    Tone.Transport.loop = true
    StartAudioContext(Tone.context, "#btnPlay");
    if (this.spatial) {
        this.panner = new Tone.Panner3D().connect(Tone.Master)
        Tone.Listener.setPosition(this.width/2, 0, this.height/2)
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
                $("#bpms button").removeClass("active")
                $(this).addClass("active")
            }
        })
        $("#bpms").append(button)
    })

    //
    $("#bpms button").each(function() {
        // $(this).fitText(0.3, {
        //     minFontSize: '20px',
        //     maxFontSize: '40px'
        // })
    })

    Tone.Transport.bpm.value = 60
    $(":button[value='60']").addClass("active")

    // Play/Pause button
    $("#btnPlay").click(function() {
        if (self.playing) self.stop(); else self.play()
        self.playing = !self.playing
    })

}

App.prototype.initHelp = function() {
    HELP.init()
}

App.prototype.play = function() {

    // recorder.record(soundFile)

    this.circles.forEach(function(circle) {
        circle.schedule()
    })

    Tone.Transport.start()

}

App.prototype.stop = function() {

    this.circles.forEach(function(circle) {
        circle.stop()
    })

    Tone.Transport.stop()
}

App.prototype.addCircle = function(params) {
    this.circles.push(new Circle(params, this))
    this.loadSounds(this.paths)
    // TODO: this is an hack, fix later
    if (this.circles.length === 2) {
        $("#"+this.circles[1].binaryContainer.id).css("margin-left", "-10px")
    }
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
