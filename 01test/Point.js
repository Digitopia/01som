function Point(order) {

    this.order = order

    this.angle = (this.order / (CONF.nPoints)) * 2 * Math.PI
    this.x = Math.sin(this.angle) * radius + cx
    this.y = -Math.cos(this.angle) * radius + cy

    this.state = -1 // NOTE: this changes between -1 (for blank) and index of CONF.options (0, 1, 2)

    this.elem = null // NOTE: this is the reference to the SVG element

    this.dot = null // NOTE: this is the reference to dot SVG element

    this.init = function() {

        var r = CONF.points.radius
        this.elem = paper.circle(this.x, this.y, r, r)

        this.resetStyle()
        this.elem.attr({ viewBox: '100 100 100 100' })
        this.elem.attr({ preserveAspectRatio: 'none' })
        this.elem.addClass("point")

        this.elem.hover(function() {
            if (touched) return
            this.attr({ strokeWidth: CONF.points.strokeWidthHover })
        }, function() {
            this.attr({ strokeWidth: CONF.points.strokeWidth })
        })

        var self = this

        function onclick(e, self) {
            var step = e.metaKey ? -1 : 1
            var tempState = self.state + step
            if (tempState < -1) self.state = CONF.options.length - 1
            else if (tempState > CONF.options.length - 1) self.state = -1
            else self.state = tempState
            // self.state = self.state < -1 ? CONF.options.length-1 : self.state
            console.log(self.state)
            self.color = self.state == -1 ? COLORS.white : CONF.options[self.state].color
            self.elem.attr({fill: self.color})
        }

        this.elem.click(function(e) {
            if (touched) return; else onclick(e, self)
        })

        this.elem.touchstart(function(e) {
            console.log(order, "touched")
            touched = true; onclick(e, self)
        })

        var dotX = Math.sin(this.angle) * radius * 1.25 + cx
        var dotY = -Math.cos(this.angle) * radius * 1.25 + cy
        var dotRadius = 2
        this.dot = paper.circle(dotX, dotY, dotRadius).attr({
            visibility: "hidden"
        })

    }

    this.resetStyle = function() {
        this.elem.attr({
            fill: CONF.points.fillColor,
            stroke: CONF.points.stroke,
            strokeWidth: CONF.points.strokeWidth,
        })
    }

    this.reset = function() {
        this.state = -1
        this.resetStyle()
    }

    this.showDot = function(show) {
        var visibility = show ? "visible" : "hidden"
        this.dot.attr({ visibility: visibility })
    }

}
