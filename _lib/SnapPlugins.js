/* eslint func-names: "off" */
/* eslint no-unused-vars: "off" */
/* eslint no-param-reassign: "off" */

Snap.plugin(function(Snap, Element, Paper, global) {

    Paper.prototype.hline = function(y, x1, x2) {
        return this.line(x1, y, x2, y)
    }

    Paper.prototype.vline = function(x, y1, y2) {
        return this.line(x, y1, x, y2)
    }

    Paper.prototype.rectc = function(cx, cy, w, h) {
        return this.rect(cx-w/2, cy-h/2, w, h)
    }

    Paper.prototype.square = function(x0, y0, s) {
        return this.rect(x0, y0, s, s)
    }

    Paper.prototype.squarec = function(cx, cy, s) {
        return this.square(cx-s/2, cy-s/2, s)
    }

})
