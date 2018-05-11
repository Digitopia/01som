class CircleApp extends BaseApp {

    constructor(params={}) {

        super(params)

        this.pointRadius = params.pointRadius || 24

        /** @type {number} distance (in function of pointRadius) between outside points and margins */
        this.paddingFactor = params.paddingFactor || 2

        /** @type {object} refernece to all buttons */
        this.buttons = params.buttons || CircleApp.defaults.buttons

        /** @type {object} refernece to all buttons */
        this.padding = params.padding || this.paddingFactor * this.pointRadius

        /* ------------------------------------------------------------------------------ *
         *     Member variables not allowed for customization through params go below     *
         * ------------------------------------------------------------------------------ */

        /** @type {Circle[]} array of circles of current app */
        this.circles = []

        this.init()

        // Need to set after init
        this.bpm = this._bpm

    }

    set bpm(bpm) {
        super.bpm = bpm
        $("#bpms button").removeClass("active")
        $(`:button[value='${bpm}']`).addClass("active")
        if (this.buttons) {
            let { bg } = this.buttons.find(button => button.bpm === bpm)
            $("html").css("background-color", `rgb(255,${bg},${bg}`)
        }
    }

    init() {
        super.init()
        this.initBpmButtons()
    }

    initBpmButtons() {
        /* eslint no-unused-vars: "off" */
        const vue = new Vue({
            el: "#bpms",
            data: { buttons: this.buttons },
            methods: {
                click: bpm => { this.bpm = bpm },
            },
        })

    }

    /**
     * This is called from BaseApp when app.playing = true
     * and before calling Tone.Transport.start()
     */
    schedule() {
        this.circles.forEach(circle => circle.schedule())
    }

    /**
     * This is called from BaseApp when app.playing = false
     * and before calling Tone.Transport.stop()
     */
    stop() {
        if (!this.circles) return
        this.circles.forEach(circle => circle.stop())
    }

    /**
     * The callback for whenever the window gets resized.
     * This then propagates to the associated classes.
     */
    resize() {
        super.resize()
        // super.resize()
        if (this.circles) this.circles.forEach(circle => circle.resize())
    }

    addCircle(params) {
        this.resize()
        this.circles.push(new Circle(params, this))
        this.loadSounds(this.paths)
    }

}

const basePath = "../_assets/sounds"

/**
 * Hold some defaults to avoid too much boilerplate.
 */
CircleApp.defaults = {
    buttons: [
        { bpm: 44,  bg: 250 },
        { bpm: 52,  bg: 247 },
        { bpm: 60,  bg: 244 },
        { bpm: 80,  bg: 241 },
        { bpm: 100, bg: 238 },
        { bpm: 120, bg: 235 },
    ],
    paths: {
        percussive: {
            kick: `${basePath}/kick2.mp3`,
            clap: `${basePath}/clap2.mp3`,
            snap: `${basePath}/snap2.mp3`,
        },
        notes: {
            kick: `${basePath}/kick.mp3`,
            clap: `${basePath}/clap.mp3`,
            snap: `${basePath}/snap.mp3`,
            do1:  `${basePath}/do1.mp3`,
            re:   `${basePath}/re.mp3`,
            mi:   `${basePath}/mi.mp3`,
            sol:  `${basePath}/sol.mp3`,
            la:   `${basePath}/la.mp3`,
            do2:  `${basePath}/do2.mp3`,
        },
        all() {
            return _.merge(this.percussive, this.notes)
        },
    },
}
