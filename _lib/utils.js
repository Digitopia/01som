var Utils = {

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
    },

    isPortrait: function() {  return $("#svg").height() >= $("#svg").width() },
    isLandscape: function() { return !this.isPortrait() },

    hideLoader: function() {
        $("#loader").hide();
        $("#wrapper").css("display", "flex")
    },

    getBodyFontSize: function() {
        return parseInt($("body").css("font-size"))
    }

}
