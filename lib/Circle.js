function Circle(params) {

    this.x = params.x || window.innerWidth/2
    this.y = params.y || window.innerHeight/2
    this.n = params.n || 8
    this.r = params.r || 200
    this.shake = params.shake || false
    this.pointRadius = params.pointRadius || 18

    this.points = []
    this.elem = null

    // Init circle
    this.elem = paper.circle(this.x, this.y, this.r, this.r)
    this.elem.attr({
        fill: COLORS.lightblue,
        stroke: COLORS.grey,
        strokeWidth: 4
    })

    // Init points
    for (var i = 0; i < this.n; i++) {
        this.points[i] = new Point(i, this)
    }

    // init shake
    if (this.shake) {
        var shake = new Shake({
            threshold: 15, timeout: 1000
        }).start()
        window.addEventListener('shake', this.shaked, false)
    }

    this.shaked = function() {

        // alert("shake it")

        if (playing) {
            $("#playButton").trigger("click")
        }

        this.points.forEach(function(point) {
            point.reset()
        })
    }

}
