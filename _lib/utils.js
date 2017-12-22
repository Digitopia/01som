var Utils = {

    getCanvasWidth: function() {
        var extra = $(".labels").width() + $(".playback").width()
        var slack = 5 // NOTE: don't try to use 100% of space, since it tends to add scroll bars, which we should avoid
        var diff = $(".main").width() - extra - slack
        return Math.max(300, diff)
    },

    getCanvasHeight: function() {
        var extra = $(".head").height() + $("#bpmButtons").height() + $("footer").height()
        var slack = 20 // NOTE: don't try to use 100% of space, since it tends to add scroll bars, which we should avoid
        var diff = $(window).height() - extra - slack
        return Math.max(300, diff)
    },

    // NOTE: use shorter alias to save precious keystrokes
    vw: function() { return this.getCanvasWidth()  },
    vh: function() { return this.getCanvasHeight() },

    map: function(val, in_min, in_max, out_min, out_max) {
        return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    },

    setVisibility: function(elem, bool) {
        var visibility = bool ? "visible" : "hidden"
        elem.attr({visibility: visibility})
    },

    hide: function(elem) { return this.setVisibility(elem, false) },
    show: function(elem) { return this.setVisibility(elem, true) },

    zeros: function(rows, cols) {
        var matrix = new Array(rows)
        for (var i = 0; i < rows; i++) {
            matrix[i] = []
            for (var j = 0; j < cols; j++) {
                matrix[i][j] = 0
            }
        }
        return matrix
    }

}
