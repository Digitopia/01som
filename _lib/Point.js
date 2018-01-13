
var Point = function(order, circle) {

    this.order = order
    this.circle = circle

    this.state = -1 // NOTE: this changes between -1 (for blank) and index of circle.options (0, 1, 2)
    this.elem = null
    this.text = null

    // NOTE: set a group of the circle and text so that can listen to the hover event on that group rather than having two specify one for each.
    // Without this, and with only an hover event over the circle, whenever there was text too (Ré for instance), it wouldn't work well.
    this.group = null

    this.xFunc = function() { return Math.sin(this.angle) * this.circle.r }
    this.yFunc = function() { return -Math.cos(this.angle) * this.circle.r }

    this.angle = (this.order / (this.circle.n)) * 2 * Math.PI
    this.x = this.xFunc()
    this.y = this.yFunc()
    this.r = this.circle.pointRadius

    this.elem = this.circle.svg.circle(this.x, this.y, this.r, this.r)

    this.resetStyle()

    this.group = this.elem

    if (this.circle.options[0].text !== undefined) {
        this.text = this.circle.svg.text(this.x, this.y, "")
        this.text.attr({y: this.getTextY()})
        this.text.attr({ "text-anchor": "middle" })
        this.group = this.circle.svg.group(this.elem, this.text)
    }
    this.setClickEvents(this.group)

    this.circle = circle

}

Point.prototype.getTextY = function() {
    var actualText = this.text.node.textContent
    this.text.attr({text: "A"})
    var textY = this.y + this.text.getBBox().height / 4
    this.text.attr({text: actualText})
    return textY
}

Point.prototype.setClickEvents = function(elem) {

    var self = this

    function onclick(e, self) {
        var step = e.metaKey ? -1 : 1
        var tempState = self.state + step
        if (tempState < -1) self.state = self.circle.options.length - 1
        else if (tempState > self.circle.options.length - 1) self.state = -1
        else self.state = tempState
        self.color = self.state == -1 ? self.circle.pointFillColor : self.circle.options[self.state].color
        if (self.circle.options[0].text !== undefined) {
            var text = self.state != -1 ? self.circle.options[self.state].text : ""
            self.text.attr({text: text})
        }
        self.elem.attr({fill: self.color})
        if (self.circle.binary) self.circle.updateBinary()
    }

    elem.hover(function() {
        if (touched) return
        self.elem.attr({ strokeWidth: self.circle.pointStrokeWidthHover })
    }, function() {
        self.elem.attr({ strokeWidth: self.circle.pointStrokeWidth })
    })

    elem.click(function(e) {
        if (touched) return; else onclick(e, self)
    })

    elem.touchstart(function(e) {
        touched = true; onclick(e, self)
    })

}

Point.prototype.resetStyle = function() {
    this.elem.attr({
        fill: this.circle.pointFillColor,
        stroke: this.circle.pointStroke,
        strokeWidth: this.circle.pointStrokeWidth,
    })
}

Point.prototype.reset = function() {
    this.state = -1
    if (this.text) this.text.attr({text: ""})
    this.resetStyle()
}

Point.prototype.hide = function() {
    Utils.hide(this.group)
    Utils.hide(this.elem)
}

Point.prototype.show = function(bool) {
    Utils.setVisibility(this.group, bool)
    Utils.setVisibility(this.elem, bool)
}
