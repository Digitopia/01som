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

        /**  */
        this.imgWidth = $("#main").width() / 10

        this.cx = this.imgWidth / 0.8
        this.cy = $("#main").height() / 2 - this.imgWidth

        this.init()

    }

    init() {
        this.initImages()
        this.initBpmSlider()
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
        $('#bpmSlider').on('input', () => {
            let bpm = $("#bpmSlider").val()
            $("#bpmVal").text(bpm)
            this.bpm = bpm
        })
    }

    stop() {
        for (var i = 0; i < this.valueString.length; i++) {
            this.labelText[i].attr("fill", "black")
        }
    }

    schedule() {
        console.log("I am scheduling in App")
        // First schedule all events
        // for (var i = 0; i < this.valueString.length; i++) {
        //     (function () {
        //         var _i = i
        //         Tone.Transport.schedule(function (t) {
        //             console.log("Playing 8th note number", _i)
        //             idx = this.valueString[_i] - 1
        //             animate(_i)
        //             if (idx >= 0 && idx <= 2) audios[idx].start(t)
        //         }, i + "*8n")
        //     })()
        // }
    }

    animate(index) {
        if (index == 0) {
            Tone.Master.volume.value = 0
        } else {
            Tone.Master.volume.value = -7
        }

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

    app = new App({
        paths: {
            "tick": "../_assets/sounds/tick.wav"
        },
        spatial: false,
        debug: false
    })

    // Hide what doesn't matter (for now) for this session
    $("#btnRecord").parent().hide()
    Utils.hideLoader()

})
