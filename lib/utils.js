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
    vh: function() { return this.getCanvasHeight() }

}
