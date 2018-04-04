class Point {

    constructor(order, circle) {

        /**
         * nth order of the point in the circle. 0th based and clockwise.
         * First one is at x=0 and y=r.
         */
        this.order = order

        /** the circle the point belongs to */
        this.circle = circle

        /* ------------------------------------------------------------------------------ *
         *     Member variables not allowed for customization through params go below     *
         * ------------------------------------------------------------------------------ */

        /** Functions to calculate position of points on every resize */
        this.xFunc = () => Math.sin(this.angle) * this.circle.r
        this.yFunc = () => -Math.cos(this.angle) * this.circle.r

        /** index of circle.options. -1 means blank. */
        this.state = -1

        /** current text in point */
        this.text = null

        /** angle of point for positioning */
        this.angle = (this.order / (this.circle.n)) * 2 * Math.PI

        /** x position of point relative to the center of its circle */
        this.x = this.xFunc()

        /** y position of point relative to the center of its circle */
        this.y = this.yFunc()

        /** radius of the point */
        this.r = this.circle.pointRadius

        /** reference to the circle element */
        this.elem = this.circle.svg.circle(this.x, this.y, this.r, this.r)

        /**
         * Set a group of the circle and text so that can listen to the
         * hover event on that group rather than having two specify one for
         * each. Without this, and with only an hover event over the circle,
         * whenever there was text too (Ré for instance), it wouldn't work well.
         */
        this.group = null

        this.init()

    }

    init() {

        this.resetStyle()

        // If there is options in circle with text, make sure it's going be vertically aligned.
        if (this.circle.options[0].text !== undefined) {
            this.text = this.circle.svg.text(this.x, this.y, "")
            this.text.attr({ y: this.getTextY() })
            this.text.attr({ "text-anchor": "middle" })
            this.group = this.circle.svg.group(this.elem, this.text)
        } else {
            this.group = this.elem
        }

        this._visible = true

        this.initClickEvents(this.group)

    }

    get visible() { return this._visible }

    set visible(bool) {
        this._visible = bool
        if (bool) {
            Utils.show(this.group)
            Utils.show(this.elem)
        } else {
            Utils.hide(this.group)
            Utils.hide(this.elem)
        }
    }

    getTextY() {
        let actualText = this.text.node.textContent
        this.text.attr({ text: "A" })
        let textY = this.y + this.text.getBBox().height / 4
        this.text.attr({ text: actualText })
        return textY
    }

    initClickEvents(elem) {

        elem.hover(
            function hoverIn() {
                if (this.circle.app.touched) return
                this.elem.attr({ strokeWidth: this.circle.pointStrokeWidthHover })
            }.bind(this),
            function hoverOut() {
                this.elem.attr({ strokeWidth: this.circle.pointStrokeWidth })
            }.bind(this),
        )

        elem.click(evt => {
            if (this.circle.app.touched) return
            this.onClick(evt)
        })

        elem.touchstart(evt => {
            this.circle.app.touched = true
            this.onClick(evt)
        })

    }

    onClick(evt) {
        let step = evt.metaKey ? -1 : 1
        let tempState = this.state + step
        if (tempState < -1) this.state = this.circle.options.length - 1
        else if (tempState > this.circle.options.length - 1) this.state = -1
        else this.state = tempState
        this.color = this.state === -1 ? this.circle.pointFillColor : this.circle.options[this.state].color
        if (this.circle.options[0].text !== undefined) {
            let text = this.state !== -1 ? this.circle.options[this.state].text : ""
            this.text.attr({ text: text })
        }
        this.elem.attr({ fill: this.color })
        if (this.circle.binary) this.circle.updateBinary()
    }

    resetStyle() {
        this.elem.attr({
            fill: this.circle.pointFillColor,
            stroke: this.circle.pointStroke,
            strokeWidth: this.circle.pointStrokeWidth,
        })
    }

    reset() {
        this.state = -1
        if (this.text) this.text.attr({ text: "" })
        this.resetStyle()
    }

}
