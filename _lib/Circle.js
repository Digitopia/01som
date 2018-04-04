class Circle {

    constructor(params={}, app) {

        /** reference to app the circle belongs too */
        this.app = app

        /** save params variable, since it will be needed later */
        this.params = params

        /** number of points */
        this.n = params.n || 8

        /** options of the circle. See Circle.defaults.options for example. */
        this.options = params.options || []

        /** @type {boolean} */
        this.shake = params.shake || false

        /** @type {boolean} */
        this.sequencer = params.sequencer || false

        /** @type {boolean} */
        this.binary = params.binary !== undefined

        /** matrix of active points */
        this.binaryMatrix = []
        if (this.binary) {
            this.binaryContainer = document.getElementById(params.binary)
            if (this.binaryContainer === null) throw new ReferenceError("Invalid div for binary")
        }

        /** Functions to calculate position of circle on every resize */
        this.xFunc = params.xFunc || function () { return window.innerWidth / 2 }
        this.yFunc = params.yFunc || function () { return window.innerHeight / 2 }
        this.rFunc = params.rFunc || Circle.defaults.rFunc

        /** point radius of the {@link Point} (in pixels) */
        this.pointRadius = params.pointRadius || app.pointRadius || 24

        /** radius of the current point playing (in pixels) */
        this.dotRadius = params.dotRadius || 2

        /** size in pixels of the labels rectangles */
        this.sequencerRectSize = params.sequencerRectSize || 40

        // colors
        this.pointFillColor = params.pointFillColor || Colors.white
        this.pointStroke = params.pointStroke || Colors.grey
        this.pointStrokeWidth = params.pointStrokeWidth || 1
        this.pointStrokeWidthHover = params.pointStrokeWidthHover || 2
        this.circleBackgroundColor = params.circleBackgroundColor || Colors.lightblue

        /* ------------------------------------------------------------------------------ *
         *     Member variables not allowed for customization through params go below     *
         * ------------------------------------------------------------------------------ */

        /** Array of dots for circle. One set even if is sequencer. */
        this.dots = []

        /**
         * Array of points. If it has sequencer, then this holds the reference
         * to the points of the active sequencer.
         */
        this.points = []

        /** Reference to svg DOM element. */
        this.elem = null

        /**
         * Group different svg elements into groups so that it's easier to
         * manipulate in bulk. Keys are: points, sequencer, dots.
         */
        this.groups = []

        /**
         * Radius of the circle.
         * It is always the same and is never changed. Is it's used together
         * with the return of rFunc() to calcualte the necessary transformation
         * to apply see .resize() for its use.
         */
        this.r = this.rFunc()

        /** x position of circle, relative to its own svg, not the global one. */
        this.x = this.xFunc()

        /** y position of circle, relative to its own svg, not the global one. */
        this.y = this.yFunc()

        /** The svg for this circle. Every circle is uses its own svg. */
        this.svg = this.app.paper.svg({ x: this.x, y: this.y })

        // Because otherwise will just show the only positive quadrant
        this.svg.attr({ overflow: "visible" })

        this.init()
    }

    init() {
        this.initCircle()
        this.initDots()
        if (this.sequencer) this.initSequencer(); else this.initPoints()
        if (this.binary) this.initBinary()
        if (this.shake) this.initShake()
        if (this.app.debug) this.initDebug()
    }

    initSequencer() {

        this.sequencer = {}
        this.sequencer.active = this.params.sequencer.active || 0
        this.sequencer.labelsArray = this.params.sequencer.labels || ["1", "2", "3"]
        this.sequencer.n = this.sequencer.labelsArray.length

        this.initSequencerPoints()
        this.initSequencerText()

    }

    initSequencerPoints() {
        this.sequencer.points = []
        this.groups.points = this.svg.group()
        this.groups.points.addClass("point")
        for (let i = 0; i < this.sequencer.n; i++) {
            this.sequencer.points[i] = []
            for (let j = 0; j < this.n; j++) {
                let p = new Point(j, this)
                p.visible = (i === this.sequencer.active)
                this.sequencer.points[i].push(p)
                this.groups.points.add(p.group)
            }
        }
        this.points = this.sequencer.points[this.sequencer.active]
    }

    initSequencerText() {

        this.sequencer.labels = []
        this.groups.sequencer = this.svg.group()
        this.groups.sequencer.addClass("sequencer")

        for (let j = 0; j < this.sequencer.n; j++) {

            // Label text
            const text = this.svg.text()
            text.attr({
                text: this.sequencer.labelsArray[j],
                fill: Colors.grey,
                id: `text-sequence-${j}`,
                "text-anchor": "middle",
                "alignment-baseline": "central",
            })

            // Label rectangle
            let rect = this.svg.rect()
            let stroke = j === this.sequencer.active ? Colors.grey : this.circleBackgroundColor
            rect.attr({
                fill: this.circleBackgroundColor,
                stroke: stroke,
                strokeWidth: 1,
                id: `rect-sequence-${j}`,
            })

            // Label group
            let group = this.svg.group(rect, text)
            group.addClass("label")

            // Click events
            /* eslint no-loop-func: "off" */
            /* eslint no-restricted-globals: "off" */
            group.click(e => {
                let prevLabelIdx = this.sequencer.active
                let currLabelIdx = Number(e.target.id.split("-")[2]) // TODO: this is an hack, refactor later!
                if (isNaN(currLabelIdx)) return
                if (prevLabelIdx === currLabelIdx) return
                this.sequencer.active = currLabelIdx
                this.sequencer.labels[prevLabelIdx].rect.attr({
                    stroke: this.circleBackgroundColor
                })
                this.sequencer.labels[currLabelIdx].rect.attr({ stroke: Colors.grey })
                this.points = this.sequencer.points[currLabelIdx]
                for (let i = 0; i < this.sequencer.points.length; i++) {
                    this.sequencer.points[i].forEach(p => Utils.setVisible(p.elem, i === currLabelIdx))
                }
                if (this.binary) {
                    this.binary = this.sequencer.binary[this.sequencer.active]
                    this.updateBinary()
                }
            })

            this.sequencer.labels.push({
                text: text,
                rect: rect,
                group: group,
            })

            this.alignSequencer()

            this.groups.sequencer.add(group)
        }

    }

    initPoints() {
        this.groups.points = this.svg.group()
        this.groups.points.addClass("point")
        for (let i = 0; i < this.n; i++) {
            this.points[i] = new Point(i, this)
            this.groups.points.add(this.points[i].group)
        }
    }

    initBinary() {

        this.binaryContainer = document.getElementById(this.params.binary)
        if (this.binaryContainer === null) throw new ReferenceError("Invalid div for binary")

        if (this.sequencer) {
            this.sequencer.binary = new Array(this.sequencer.n)
            for (let n = 0; n < this.sequencer.n; n++) {
                this.sequencer.binary[n] = Utils.zeros(this.options.length, this.points.length)
            }
            this.binary = this.sequencer.binary[this.sequencer.active]
        } else {
            this.binary = Utils.zeros(this.options.length, this.points.length)
        }

        this.updateBinary()

    }

    initShake() {
        new Shake({ threshold: 15, timeout: 1000 }).start()
        window.addEventListener('shake', this.shaked, false)
    }

    shaked() {
        if (this.app.playing) this.app.playing = false
        if (!this.sequencer) this.points.forEach(point => point.reset())
        else {
            this.sequencer.points.forEach(points => points.forEach(point => point.reset()))
        }
    }

    initCircle() {
        this.elem = this.svg.circle(0, 0, this.r)
        this.elem.attr({
            fill: this.circleBackgroundColor,
            stroke: Colors.grey,
            strokeWidth: 3,
        })
    }

    initDots() {
        this.groups.dots = this.svg.group()
        this.groups.dots.addClass("dots")
        for (let i = 0; i < this.n; i++) {
            let angle = (i / (this.n)) * 2 * Math.PI
            let x = Math.sin(angle) * (this.r + this.pointRadius) * 1.1
            let y = -Math.cos(angle) * (this.r + this.pointRadius) * 1.1
            let dot = this.svg.circle(x, y, this.dotRadius).attr({ visibility: "hidden" })
            this.dots.push(dot)
            this.groups.dots.add(dot)
        }
    }

    initDebug() {
        this.grid = {}
        const lines = ["vline", "hline"]
        lines.forEach(line => {
            this.grid[line] = this.svg.line().attr({ stroke: "rgba(0,0,0,0.3)" })
        })
        this.resize()
    }

    resize() {

        this.x = this.xFunc()
        this.y = this.yFunc()

        let ratio = this.rFunc() / this.r
        let transform = new Snap.Matrix().scale(ratio)

        // Update nested svgs positions
        if (this.elem) {
            this.svg.attr({ x: this.x, y: this.y })
            this.elem.transform(transform)
        }

        // Scale points so that they are easily clickable in mobile
        if (!this.sequencer && this.points) {
            this.points.forEach(point => {
                // this make sures the points are in place if radius change
                point.group.transform(transform)
                point.elem.attr({ r: point.r * 1 / ratio })
            })
        }

        // Do the same for sequenecer points
        if (this.sequencer) {
            this.sequencer.points.forEach(sequencerPoints => {
                sequencerPoints.forEach(point => {
                    point.group.transform(transform)
                    point.elem.attr({ r: point.r * 1 / ratio })
                })
            })
        }

        // Align dots too
        if (this.dots) { this.dots.forEach(function (dot) { dot.transform(transform) }) }

        // And the sequencer
        if (this.sequencer) this.alignSequencer()

        if (this.app.debug && this.grid) {

            this.grid.vline.attr({
                x1: 0,
                x2: 0,
                y1: -this.svg.getBBox().h / 2,
                y2: this.svg.getBBox().h / 2,
            })

            this.grid.hline.attr({
                x1: -this.svg.getBBox().w / 2,
                x2: this.svg.getBBox().w / 2,
                y1: 0,
                y2: 0,
            })
        }

    }

    /**
     * This schedules the note play events (ahead of time) whenever a user hits the play button.
     */
    schedule() {
        for (let i = 0; i < this.n; i++) {
            Tone.Transport.schedule(t => {

                let p = this.points[i]
                let previousI = (i === 0) ? this.n - 1 : i - 1

                // NOTE: animate when active
                p.elem.animate(
                    { r: this.pointRadius * 1.25 },
                    150,
                    function () { },
                    p.elem.animate({ r: this.pointRadius }, 1000),
                )

                if (this.panner) this.app.panner.setPosition(-p.x, 0, p.y)

                Utils.hide(this.dots[previousI])
                Utils.show(this.dots[i])

                if (p.state !== -1) {
                    let { sample } = this.options[p.state]
                    this.app.audios[sample].start(t)
                }

            }, `${i}*8n`)
        }
    }

    stop() {
        this.dots.forEach(dot => Utils.hide(dot))
    }

    /**
     * Called whenever there is a click event to update the binary matrix
     */
    updateBinary() {

        // First clear matrix
        for (let i = 0; i < this.binary.length; i++) {
            for (let j = 0; j < this.binary[i].length; j++) {
                this.binary[i][j] = 0
            }
        }

        // And then repopulate
        this.points.forEach((point, idx) => {
            if (point.state === -1) return
            let j = idx
            let i = point.state
            this.binary[i][j] = 1
        })

        // Draw matrix
        if (this.binary) {
            this.binaryContainer.innerHTML = ""
            for (let i = 0; i < this.binary.length; i++) {
                for (let j = 0; j < this.binary[i].length; j++) {
                    this.binaryContainer.innerHTML += this.binary[i][j]
                }
                this.binaryContainer.innerHTML += "<br>"
            }
        }

    }


    /**
      * This serves to redistribute the labels according to the new size of the
      * radius of the circle, while maintaining the same size for the labels and text
      */
    alignSequencer() {
        this.sequencer.labels.forEach((label, index) => {
            let step = (2 * this.rFunc()) / (this.sequencer.n + 1)
            let x0 = -this.rFunc() + step
            let x = x0 + step * index
            window.label = label
            label.text.attr({ x: x })
            const size = this.sequencerRectSize
            label.rect.attr({
                x: x - size / 2,
                y: -size / 2,
                width: size,
                height: size,
            })
        })
    }

}

Circle.defaults = {}

/**
 * Do "perfect alignment". * Instead of leaving double space in the middle of
 * circles leave the same as in the margins.
 */
Circle.defaults.rFunc = function() {
    let r = (this.app.vmax / 2 - this.app.padding - this.app.padding / 2 - this.app.pointRadius * 2) / 2
    let l = r * 2 + 2 * this.app.pointRadius + 2 * this.app.padding
    if (l > this.app.vmin) r = (this.app.vmin - 2 * this.app.padding - 2 * this.app.pointRadius) / 2
    return r
}

Circle.defaults.xYFuncAux = function(app, offset=0) {
    const pa = app.padding
    const pr = app.pointRadius
    let util = (app.vmax / 2 - pa - pa / 2 - pr * 2)
    let ret = offset + pa + pr + util / 2
    return ret
}

Circle.defaults.xFunc1 = function() {
    if (Utils.isLandscape()) return Circle.defaults.xYFuncAux(this.app)
    return this.app.width/2
}

Circle.defaults.yFunc1 = function() {
    if (Utils.isPortrait()) return Circle.defaults.xYFuncAux(this.app)
    return this.app.height/2
}

Circle.defaults.xFunc2 = function() {
    if (Utils.isLandscape()) {
        return Circle.defaults.xYFuncAux(this.app, this.app.width/2 - this.app.padding/2)
    }
    return this.app.width/2
}

Circle.defaults.yFunc2 = function() {
    if (Utils.isPortrait()) {
        return Circle.defaults.xYFuncAux(this.app, this.app.height/2 - this.app.padding/2)
    }
    return this.app.height/2
}

Circle.defaults.options = {
    percussive: [{
        color: Colors.blue,
        sample: "kick",
    }, {
        color: Colors.green,
        sample: "clap",
    }, {
        color: Colors.red,
        sample: "snap",
    }],
    notes: [{
        color: Colors.do1,
        sample: "do1",
        text: "DÓ",
    }, {
        color: Colors.re,
        sample: "re",
        text: "RÉ",
    }, {
        color: Colors.mi,
        sample: "mi",
        text: "MI",
    }, {
        color: Colors.sol,
        sample: "sol",
        text: "SOL",
    }, {
        color: Colors.la,
        sample: "la",
        text: "LÁ",
    }, {
        color: Colors.do2,
        sample: "do2",
        text: "dó",
    }],
}
