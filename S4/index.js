class App extends BaseApp {

    constructor(params) {

        super(params)

        /** @type {number} number of measures of the app */
        this.measures = params.measures || 8

        /** @type {object} array of tracks to be played */
        this.tracks = params.tracks
        if (this.tracks === undefined) throw new Error("Missing tracks key for params configuration.")

        /** @type {boolean} include another "custom" track that uses the microphone */
        this.custom = params.custom !== undefined ? params.custom : true
        if (this.custom) this.tracks.push({ name: "Custom", color: "black" })

        this.labels = this.tracks.map(track => track.name)

        /* ------------------------------------------------------------------------------ *
        *     Member variables not allowed for customization through params go below     *
        * ------------------------------------------------------------------------------ */

        this.matrix = Utils.fill(this.tracks.length, this.measures, false)

        this.init()

    }

    init() {
        super.init()
        this.initGrid()
        this.initTracks()
    }

    initGrid() {

        /* eslint no-unused-vars: "off" */
        const vue = new Vue({
            el: "#main",
            data: {
                labels: this.labels,
                tracks: this.tracks,
                measures: this.measures
            }
        })

        // Granted we could use vue for way more than just creating the DOM
        // elements, but for now let's just leave it like this.
        /* eslint no-param-reassign: "off" */
        this.buttons = document.querySelectorAll("#sequencers button")
        this.buttons.forEach(button => {
            let row = button.id.split("-")[1]
            let col = button.id.split("-")[2]
            this.formatButton(button, row, col, false)
            button.addEventListener('click', () => {
                let val = this.matrix[row][col]
                this.matrix[row][col] = !val
                this.formatButton(button, row, col, !val)
            })
        })

    }

    formatButton(button, row, col, state) {

        /* eslint brace-style: "off" */

        let { color } = this.tracks[row]

        // activated (false->true, 0->1)
        if (state) {
            button.innerHTML = 1
            button.style.color = "white"
            button.style.background = color
        }

        // deactivated (true->false, 1->0)
        else {
            button.innerHTML = 0
            button.style.color = color
            button.style.background = "transparent"
        }
    }

    initTracks() {

        this.players = new Tone.Players().toMaster()
        this.tracks.forEach(track => {
            this.players.add(track.name, track.sample)
        })

        // NOTE: this is the bpm of the samples
        this.bpm = 96

        this.loop = new Tone.Sequence((time, measure) => {

            // Clear all borders first
            /* eslint no-return-assign: "off" */
            this.buttons.forEach(button => button.style.border = "")

            // And set for current measure
            let buttons = document.querySelectorAll(`button[id$='${measure}`)
            buttons.forEach(button => {
                button.style.border = "1px solid grey"
            })

            for (let i = 0; i < this.tracks.length; i++) {
                if (this.matrix[i][measure]) {
                    this.players.get(this.labels[i]).start(time);
                }
            }
        }, [0, 1, 2, 3, 4, 5, 6, 7], "2m")

        // Make the loop start with Tone.Transport at time 0
        this.loop.start(0)

    }

    /**
     * This is called from BaseApp when app.playing = true
     * and before calling Tone.Transport.start()
     */
    schedule() { }

    /**
     * This is called from BaseApp when app.playing = false
     * and before calling Tone.Transport.stop()
     */
    stop() {
        // if (!this.circles) return
        // this.circles.forEach(circle => circle.stop())
        if (this.loop) this.loop.stop("+0.1")
        if (this.buttons) this.buttons.forEach(button => button.style.border = "")
    }

    /**
     * The callback for whenever the window gets resized.
     * This then propagates to the associated classes.
     */
    resize() {
        super.resize()
    }

}

let app

window.addEventListener("load", function () {

    const basePath = '/_assets/sounds'
    let params = {
        paths: {}, // TODO
        measures: 8,
        custom: false,
        tracks: [
            {
                name: "Guit 1",
                color: "rgb(107, 163, 189)",
                sample: `${basePath}/guit1.wav`
            },
            {
                name: "Guit 2",
                color: "rgb(137, 193, 219)",
                sample: `${basePath}/guit2.wav`
            },
            {
                name: "Guit 3",
                color: "rgb(167, 223, 249)",
                sample: `${basePath}/guit3.wav`
            },
            {
                name: "Baixo",
                color: "rgb(227, 132, 148)",
                sample: `${basePath}/baixo.wav`
            },
            {
                name: "Piano",
                color: "rgb(223, 218, 162)",
                sample: `${basePath}/piano.wav`
            },
            {
                name: "Cordas",
                color: "rgb(106, 100, 139)",
                sample: `${basePath}/cordas.wav`
            },
            {
                name: "Bat 1",
                color: "rgb(84, 129, 99)",
                sample: `${basePath}/bat1.wav`
            },
            {
                name: "Bat 2",
                color: "rgb(114, 159, 129)",
                sample: `${basePath}/bat2.wav`
            },
            {
                name: "Bat 3",
                color: "rgb(134, 189, 159)",
                sample: `${basePath}/bat3.wav`
            },
        ]
    }

    app = new App(params)

    Utils.hideLoader()

    app.resize()

})
