var app

$(function() {

    app = new App()

    app.addCircle({
        x: function() { return Utils.vw()/4 },
        y: function() { return Utils.vh()/2 },
        options: Circle.defaults.options.percussive,
        shake: true,
        binary: "binary-placeholder-1",
        sequencer: true
    })

    app.addCircle({
        x: function() { return Utils.vw()/4 * 3 },
        y: function() { return Utils.vh()/2 },
        options: Circle.defaults.options.notes,
        shake: true,
        binary: "binary-placeholder-2",
        sequencer: true,
        circleBackgroundColor: COLORS.lightgreen
    })

})
