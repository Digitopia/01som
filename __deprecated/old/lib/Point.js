function Point(order, circle) {

    this.order = order
    this.circle = circle

    this.state = -1 // NOTE: this changes between -1 (for blank) and index of CONF.options (0, 1, 2)
    this.elem = null
    this.dot = null // NOTE: thease are references to the correspondig svg elements

    this.init = function() {

        var angle = (this.order / (this.circle.n)) * 2 * Math.PI
        var x =  Math.sin(angle) * this.circle.r + this.circle.x
        var y = -Math.cos(angle) * this.circle.r + this.circle.y
        var r = this.circle.pointRadius

        this.elem = paper.circle(x, y, r, r)

        this.resetStyle()
        this.elem.attr({ viewBox: '1 1 1 1' })
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

        var dotX =  Math.sin(angle) * this.circle.r * 1.25 + this.circle.x
        var dotY = -Math.cos(angle) * this.circle.r * 1.25 + this.circle.y
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

    this.init() // NOTE: make init implicit so don't have to call it explicitly from the outside

}
