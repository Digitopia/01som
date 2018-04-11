class BaseApp {

    constructor(params={}) {

        /** @type {array} paths of sounds to load */
        this.paths = params.paths || App.defaults.paths.all()

        /** @type {boolean} use spatial audio or not */
        this.spatial = params.spatial || false

        /** @type {boolean} turn debug mode on or off. If on will draw some margins/guidelines. */
        this.debug = params.debug || false

        /** @type {string} container id for the svg where everything happens */
        this.container = params.svg || '#svg'

        /* ------------------------------------------------------------------------------ *
         *     Member variables not allowed for customization through params go below     *
         * ------------------------------------------------------------------------------ */

        /** @type {object} reference to Tone.js Panner object that does the 3D audio */
        this.panner = null

        /** @type {number} same as css property of the viewport, but for the svg */
        this.vmax = 0

        /** @type {number} same as css property of the viewport, but for the svg */
        this.vmin = 0

        /** @type {object} dictionary with the key and paths of the samples available for loading */
        this.audios = {}

        /**
         * This is a small hack to detect if we should react on mousePressed or
         * touchStarted events. It's only true if a touchStart event is
         * received. If there is touch support (touch* events), they all fire
         * some ms faster than mouse* events, so use those for more responsive app.
         * @type {boolean}
         */
        this.touched = false

        // state variables (with es6 setters)
        this.bpm = params.bpm || 60
        this.playing = false
        this.recording = false

    }

    get recording() { return this._recording }
    get playing() { return this._playing }
    get bpm() { return this._bpm }

    set playing(bool) {
        this._playing = bool
        if (bool) {
            $("#btnPlay").removeClass("fa-play-circle")
            $("#btnPlay").addClass("fa-stop-circle")
            $("#spanPlay").text("STOP")
            this.schedule()
            Tone.Transport.start()
        } else {
            $("#btnPlay").removeClass("fa-stop-circle")
            $("#btnPlay").addClass("fa-play-circle")
            $("#spanPlay").text("PLAY")
            this.stop()
            Tone.Transport.stop()
        }
    }

    set bpm(bpm) {
        this._bpm = bpm
        Tone.Transport.bpm.value = bpm
    }

    set recording(bool) {
        if (bool) {
            this.recorder.record()
            $("#btnRecord").css("color", "red")
            if (!this.playing) this.playing = true
        } else {
            if (this.recording) {
                $("#btnRecord").css("color", "black")
                this.recorder.stop()
                this.recorder.exportWAV(blob => {
                    saveAs(blob, "Gravacao 0+1=SOM.wav")
                })
                this.playing = false
            }
        }
        this._recording = bool
    }

    init() {

        this.initCanvas()
        this.initAudio()
        this.initButtons()
        this.initHelp()

        if (this.debug) this.initDebug()

        $(".fullscreen").click(() => { screenfull.request() })

        this.resize()

    }

    initDebug() {

        // grid
        this.grid = {}
        const lines = ["vline", "hline"]

        lines.forEach(line => {
            this.grid[line] = this.paper.line().attr({ stroke: "rgba(0,0,0,0.3)" })
        })

        // margins
        this.margins = {}
        const margins = ["top", "bottom", "left", "right", "vmiddle", "hmiddle"]
        margins.forEach(margin => {
            this.margins[margin] = this.paper.rect().attr({ fill: "rgba(0,0,0,0.3)" })
        })

    }

    initCanvas() {
        this.paper = Snap()
        // $("svg").appendTo(this.container).addClass("content centered")
        $("svg").appendTo(this.container)
        window.addEventListener("resize", () => this.resize())
    }

    initAudio() {
        Tone.Transport.loopEnd = '1m'
        Tone.Transport.loop = true
        StartAudioContext(Tone.context, "#btnPlay")
        if (this.spatial) {
            this.panner = new Tone.Panner3D().connect(Tone.Master)
            Tone.Listener.setPosition(this.width/2, 0, this.height/2)
        }
        this.recorder = new Recorder(Tone.Master.input)
    }

    initButtons() {
        $("#btnPlay").click(() => { this.playing = !this.playing })
        $("#btnRecord").click(() => { this.recording = !this.recording })
    }

    initHelp() {
        /* eslint no-unreachable: "off" */
        // For now don't use cookie to check if is first time
        return
        if (!Cookies.get("visited")) {
            // console.log("first time visitor")
            let path = window.location.pathname.replace("/", "")
            Cookies.set("visited", true, { expires: 365, path: path })
            $("#help i").click()
        } else {
            // console.debug("returning visitor")
            // this.show(true) // NOTE: uncomment for testing, to force help message
        }
    }

    /**
     * The callback for whenever the window gets resized.
     * This then propagates to the associated classes.
     */
    resize() {
        this.width = $(this.container).width()
        this.height = $(this.container).height()
        this.vmax = Math.max(this.width, this.height)
        this.vmin = Math.min(this.width, this.height)
        if (this.debug) this.debugFn()
        // this.resize()
    }

    /**
     * @param {Object[]} paths paths of the sounds to load (if not already loaded)
     */
    loadSounds(paths) {
        for (const key in paths) {
            if (!(key in this.audios)) {
                const player = new Tone.Player(this.paths[key])
                this.audios[key] = player
                if (this.spatial) player.connect(this.panner)
                else player.connect(Tone.Master)
            }
        }
    }

    /**
     * Update draw directives so that they are in proper place.
     */
    debugFn() {

        if (!this.grid) return

        this.grid.vline.attr({
            x1: this.width / 2,
            x2: this.width / 2,
            y1: 0,
            y2: this.height,
        })

        this.grid.hline.attr({
            x1: 0,
            x2: this.width,
            y1: this.height / 2,
            y2: this.height / 2,
        })

        // margins
        if (!this.padding) return

        // top
        this.margins.top.attr({
            x: 0,
            y: 0,
            width: this.width,
            height: this.padding,
        })

        // bottom
        this.margins.bottom.attr({
            x: 0,
            y: this.height - this.padding,
            width: this.width,
            height: this.padding,
        })

        // hmiddle
        this.margins.hmiddle.attr({
            x: 0,
            y: this.height / 2 - this.padding / 2,
            width: this.width,
            height: this.padding,
        })

        // vmiddle
        this.margins.vmiddle.attr({
            x: this.width / 2 - this.padding / 2,
            y: 0,
            width: this.padding,
            height: this.height,
        })

        // left
        this.margins.left.attr({
            x: 0,
            y: 0,
            width: this.padding,
            height: this.height,
        })

        // right
        this.margins.right.attr({
            x: this.width - this.padding,
            y: 0,
            width: this.padding,
            height: this.height,
        })
    }

    /** To be overloaded when extending the class */
    play() {}
    stop() {}

}
