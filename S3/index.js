var app

$(function() {

    app = new App({
        paths: App.defaults.paths.all(),
        spatial: false,
        debug: false
    })

    var pointRadius = 38 // phone
    var pointRadius = 24 // mac
    // var pointRadius = 0.03*app.width
    var padding = 2*pointRadius

    function rFunc() {
        var side = Utils.isPortrait() ? app.height : app.width
        var otherSide = !Utils.isPortrait() ? app.height : app.width
        var r = (side/2 - padding - padding/2 - pointRadius*2)/2
        var l = r*2 + 2*pointRadius + 2*padding
        if (l > otherSide) {
            r = (otherSide - 2*padding - 2*pointRadius)/2
        }
        return r
    }

    function coord(offset) {
        offset = offset | 0
        var side = Utils.isLandscape() ? app.width : app.height
        var util = (side/2 - padding - padding/2 - pointRadius*2)
        var ret = offset + padding + pointRadius + util/2
        return ret
    }

    app.addCircle({
        xFunc: function() { ret = Utils.isLandscape() ? coord() : app.width/2; return ret },
        yFunc: function() { ret = Utils.isPortrait()  ? coord() : app.height/2; return ret },
        rFunc: rFunc,
        pointRadius: pointRadius,
        options: Circle.defaults.options.percussive,
        shake: true,
        binary: "binary-placeholder",
        sequencer: true
    })

    app.addCircle({
        xFunc: function() { ret = Utils.isLandscape() ? coord(app.width/2-padding/2) : app.width/2; return ret },
        yFunc: function() { ret = Utils.isPortrait()  ? coord(app.height/2-padding/2) : app.height/2; return ret },
        rFunc: rFunc,
        pointRadius: pointRadius,
        options: Circle.defaults.options.notes,
        shake: true,
        binary: "binary-placeholder-2",
        sequencer: true,
        circleBackgroundColor: COLORS.lightgreen
    })

    setTimeout(function() {
        paper.circle(app.width/2, app.height/2, 30).attr({fill:"pink"})
        paper.circle(app.width/2, app.height/2, 20).attr({fill:"red"})
        paper.circle(app.width/2, app.height/2, 10).attr({fill:"green"})
    }, 200)

})
