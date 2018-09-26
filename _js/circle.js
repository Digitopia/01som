let app

window.addEventListener("load", function () {

    Utils.hideLoader()

    const em = Utils.getBodyFontSize()
    const rectSize = 2.4 * em

    app = new CircleApp({
        paths: CircleApp.defaults.paths.all(),
        spatial: false,
        debug: false,
        pointRadius: 1.8 * em,
        paddingFactor: 1,
        serviceWorker: false
    })

    const url = window.location.pathname.toUpperCase()
    const s1 = url === "/S1/"
    const s3 = url === "/S3/"

    let params
    if (s1) {
        params = {
            xFunc: function () { return app.width / 2 },
            yFunc: function () { return app.height / 2 },
            rFunc: function () {
                return Math.min(250, Math.min(app.width, app.height) / 2 - app.padding - app.pointRadius)
            },
            options: Circle.defaults.options.percussive,
            sequencer: false
        }
    } else {
        params = {
            xFunc: Circle.defaults.xFunc1,
            yFunc: Circle.defaults.yFunc1,
            options: Circle.defaults.options.percussive,
            shake: true,
            sequencer: s3,
            sequencerRectSize: rectSize,
            // binary: "binary-placeholder",
        }
    }

    app.addCircle(params)

    if (!s1) {
        app.addCircle({
            xFunc: Circle.defaults.xFunc2,
            yFunc: Circle.defaults.yFunc2,
            options: Circle.defaults.options.notes,
            shake: true,
            sequencer: s3,
            sequencerRectSize: rectSize,
            // binary: "binary-placeholder-2",
            circleBackgroundColor: Colors.lightgreen,
        })
    }

})
