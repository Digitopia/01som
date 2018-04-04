/* eslint-disable */

class App extends BaseApp {

    constructor(params={}) {

        super(params)

        /** array of paper.image for each time step */
        this.images = []

        /** array of 8 blank images to use for click detection */
        this.blankImages = []

        /** array of paper.text for each time step */
        this.labelText = []

        /** the same as labelText, but with integers */
        this.valueString = [0, 0, 0, 0, 0, 0, 0, 0]

        this.imgWidth = $("#svg").width() / 10
        this.cx = this.imgWidth / 0.8
        this.cy = $("#main").height() / 2

        this.init()

    }

    init() {
        super.init()
        this.initImages()
        this.initBpmSlider()
        this.loadSounds(this.paths) // Sounds were being loaded when adding circle, since no circles in this session load here
        this.paper.attr({
            viewBox: '0 0 ' + $("#svg").width() + ' ' + $("#svg").height()
        })
    }

    resize() {
        super.resize()
        this.paper.attr({ width: this.width, height: this.height })
    }

    initImages() {
        for (var i = 0; i < this.valueString.length; i++) {
            if (i % 2 == 0) {
                this.images[i] = this.paper.image("../_assets/svg/4R.svg", i * this.cx, this.cy, this.imgWidth, this.imgWidth * 2)
                this.labelText[i] = this.paper.text(i * this.cx + this.imgWidth / 4, this.cy + this.imgWidth * 2 + 75, this.valueString[i].toString())
                this.labelText[i].attr({ 'font-size': 50 })
            } else {
                this.images[i] = this.paper.image("../_assets/svg/blank.svg", i * this.cx, this.cy, this.imgWidth, this.imgWidth * 2)
                this.labelText[i] = this.paper.text(i * this.cx + this.imgWidth / 4, this.cy + this.imgWidth * 2 + 75, this.valueString[i].toString())
                this.labelText[i].attr({ 'font-size': 50 })
            }

            this.blankImages[i] = this.paper.image("../_assets/svg/blank.svg", i * this.cx, this.cy, this.imgWidth, this.imgWidth * 2)
        }

        this.blankImages.forEach((element, index) => {
            this.assignRoles(element, index)
        })

        this.labelText.forEach((element, index) => {
            this.assignRoles(element, index)
        })

    }

    initBpmSlider() {

        this.bpmSlider = new Nexus.Slider('#bpmSlider', {
            'size': [40, 320],
            'mode': 'absolute',
            'min': 40,
            'max': 160,
            'step': 1,
            'value': 60
        })

        this.bpmSlider.on('change', value => {
            $("#bpmVal").text(value)
            this.bpm = value
        })

    }

    /**
     * This is called from BaseApp when app.playing = true
     * and before calling Tone.Transport.start()
     */
    schedule() {
        for (let i = 0; i < this.valueString.length; i++) {
            Tone.Transport.schedule(t => {
                this.animate(i)
                let idx = this.valueString[i] - 1
                if (idx >= 0 && idx <= 2) this.audios["tick"].start(t)
            }, `${i}*8n`)
        }
    }

    /**
     * This is called from BaseApp when app.playing = false
     * and before calling Tone.Transport.stop()
     */
    stop() {
        if (!this.valueString) return
        for (var i = 0; i < this.valueString.length; i++) {
            this.labelText[i].attr("fill", "black")
        }
    }

    animate(index) {
        if (index === 0) Tone.Master.volume.value = 0
        else Tone.Master.volume.value = -7
        this.labelText[index].attr("fill", "red")
        for (var i = 1; i < this.valueString.length; i++) {
            this.labelText[(index + i) % 8].attr("fill", "black")
        }
    }

    assignRoles(element, index) {
        element.click(() => {
            if (this.valueString[index] == 0) {
                if (index % 2 == 0 && this.valueString[index + 1] == 0) { // 0 0 to 1 0
                    this.images[index].node.href.baseVal = "../_assets/svg/8th.svg"
                    this.images[index + 1].node.href.baseVal = "../_assets/svg/8thR.svg"
                    this.valueString[index] = 1
                } else if (index % 2 == 0 && this.valueString[index + 1] == 1) { // 0 1 to 1 0
                    this.images[index].node.setAttribute("width", this.imgWidth * 2)
                    this.images[index].node.href.baseVal = "../_assets/svg/2x8.svg"
                    this.images[index + 1].node.href.baseVal = "../_assets/svg/blank.svg"
                    this.valueString[index] = 1
                } else if (index % 2 == 1 && this.valueString[index - 1] == 0) { // 0 0 to 0 1
                    this.images[index].node.href.baseVal = "../_assets/svg/8th.svg"
                    this.images[index - 1].node.href.baseVal = "../_assets/svg/8thR.svg"
                    this.valueString[index] = 1
                } else if (index % 2 == 1 && this.valueString[index - 1] == 1) { // 1 0 to 1 1
                    this.images[index].node.href.baseVal = "../_assets/svg/blank.svg"
                    this.images[index - 1].node.setAttribute("width", this.imgWidth * 2)
                    this.images[index - 1].node.href.baseVal = "../_assets/svg/2x8.svg"
                    this.valueString[index] = 1
                }


            } else { /* if point is going to 0 */
                if (index % 2 == 0 && this.valueString[index + 1] == 0) { // 1 0 to 0 0
                    this.images[index].node.href.baseVal = "../_assets/svg/4R.svg"
                    this.images[index + 1].node.href.baseVal = "../_assets/svg/blank.svg"
                    this.valueString[index] = 0
                } else if (index % 2 == 0 && this.valueString[index + 1] == 1) { // 1 1 to 0 1
                    this.images[index].node.setAttribute("width", this.imgWidth)
                    this.images[index].node.href.baseVal = "../_assets/svg/8thR.svg"
                    this.images[index + 1].node.href.baseVal = "../_assets/svg/8th.svg"
                    this.valueString[index] = 0
                } else if (index % 2 == 1 && this.valueString[index - 1] == 0) { // 0 1 to 0 0
                    this.images[index].node.href.baseVal = "../_assets/svg/blank.svg"
                    this.images[index - 1].node.href.baseVal = "../_assets/svg/4R.svg"
                    this.valueString[index] = 0
                } else if (index % 2 == 1 && this.valueString[index - 1] == 1) { // 1 1 to 1 0
                    this.images[index].node.href.baseVal = "../_assets/svg/8thR.svg"
                    this.images[index - 1].node.setAttribute("width", this.imgWidth)
                    this.images[index - 1].node.href.baseVal = "../_assets/svg/8th.svg"
                    this.valueString[index] = 0
                }
            }

            this.labelText[index].attr({ text: this.valueString[index].toString() })
        })
    }

}

let app
window.addEventListener("load", function () {

    Utils.hideLoader()

    app = new App({
        paths: {
            "tick": "../_assets/sounds/tick.wav"
        },
        spatial: false,
        debug: false
    })

    $("svg").removeClass("content")

})
