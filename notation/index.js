var COLORS = {
    white: "rgb(255, 255, 255)",
    grey: "rgb(127,127,127)",
    black: "rgb(0,0,0)",
    red: "rgb(225, 30, 30)",
    green: "rgb(30, 225, 30)",
    blue: "rgb(30, 30, 225)",
    lightblue: "rgb(220, 240, 255)"
}

var audiosConf = [
    { path: "../_assets/sounds/tick.wav" }
]

// Global variables

var cx, cy, radius
var points = []
var audios = []
var paper
var playing = false
var touched = false

var images = []
var blankImages = []
var beams = []
var labelText = []
var valueString = [0, 0, 0, 0, 0, 0, 0, 0]

$(document).ready(function() {

    function initCanvas() {

        paper = Snap(getCanvasWidth(), getCanvasHeight())

        $("svg").appendTo("#canvas-placeholder")

        paper.attr({
            viewBox: '0 0 ' + getCanvasWidth() + " " + getCanvasHeight(),
            // preserveAspectRatio: "none"
        })

        $(window).resize(function() {
            paper.attr({
                width: getCanvasWidth(),
                height: getCanvasHeight()
            })
        })
    }

    function initAudios() {
        audiosConf.forEach(function(audioConf) {
            audios.push(new Tone.Player(audioConf.path).toMaster())
        })

        Tone.Transport.bpm.value = 60
        Tone.Transport.loopEnd = '1m'
        Tone.Transport.loop = true

    }

    function initButtons() {

        // Play/Pause button
        $("#playButton").click(function() {
            if (playing) stop(); else play()
            playing = !playing
        })

    }

    function initImages() {
        imgWidth = getCanvasWidth()/10
        cx = imgWidth/0.8
        cy = getCanvasHeight()/2 - imgWidth

        for (var i = 0; i < valueString.length; i++) {
            var _i = i
            if(i % 2 == 0) {
                images[i] = paper.image("../_assets/svg/4R.svg", i*cx, cy, imgWidth, imgWidth*2)
                labelText[i] = paper.text(i*cx + imgWidth/4, cy + imgWidth * 2 + 75, valueString[i].toString())
                labelText[i].attr({'font-size':50})
            } else {
                images[i] = paper.image("../_assets/svg/blank.svg", i*cx, cy, imgWidth, imgWidth*2)
                labelText[i] = paper.text(i*cx + imgWidth/4, cy + imgWidth * 2 + 75, valueString[i].toString())
                labelText[i].attr({'font-size':50})
            }

            blankImages[i] = paper.image("../_assets/svg/blank.svg", i*cx, cy, imgWidth, imgWidth*2)
        }

        blankImages.forEach(function (element, index){
            assignRoles(element, index)
        });

        labelText.forEach(function (element, index){
            assignRoles(element, index)
        });


    }

    function addClickerEvent(index) {
        console.log("woo", index)
    }

    function initHelp() {

        $(".close-button").click(function() {
            console.log("clicked close button")
            showHelp(false)
        })

        $(".help").click(function() {
            console.log("help click")
            showHelp(true)
        })

        $(".modal").click(function() {
            showHelp(false)
        })

        if (Cookies.get("visited")) {
            console.log("returning visitor")
            // showHelp(true) // NOTE: uncomment for testing, to force help message
        } else {
            console.log("first time visitor")
            Cookies.set("visited", true, { expires: 365, path: "/" })
            showHelp(true)
        }

        // NOTE: Hide help if Escape key is pressed
        $(document).keyup(function(e) {
            if (e.keyCode == 27) showHelp(false)
        })

    }

    function initShake() {

        var shake = new Shake({ threshold: 15, timeout: 1000 }).start()

        function shakeHandler() {
            // alert("shake it")
            if (playing) $("#playButton").trigger("click")
            points.forEach(function(p){p.reset()})
        }

        window.addEventListener('shake', shakeHandler, false)
    }

    initCanvas()
    initAudios()
    initButtons()
    initImages()
    initHelp()
    initShake()
    StartAudioContext(Tone.context, "#playButton");

})

function getCanvasHeight() {
    var extra = $(".head").height() + $("footer").height()
    var slack = 80 // NOTE: don't try to use 100% of space, since it tends to add scroll bars, which we should avoid
    var diff = $(window).height() - extra - slack
    return Math.max(300, diff)
}

function getCanvasWidth() {
    var extra = $(".labels").width() + $(".playback").width()
    var slack = 5 // NOTE: don't try to use 100% of space, since it tends to add scroll bars, which we should avoid
    var diff = $(".main").width() - extra - slack
    return Math.max(300, diff)
}

function play() {

    // First schedule all events
    for (var i = 0; i < valueString.length; i++) {
        (function() {
            var _i = i
            Tone.Transport.schedule(function(t) {
                console.log("Playing 8th note number", _i)
                idx = valueString[_i] - 1
                animate(_i)
                if (idx >= 0 && idx <= 2) audios[idx].start(t)
            }, i + "*8n")
        })()
    }

    // And only then start, in order to guarantee syncronicity
    $("#playButton").text("Stop")
    Tone.Transport.start()

}

function draw() {

}

function stop() {
    $("#playButton").text("Play")
    points.forEach(function(point) { point.showDot(false) })
    for (var i = 0; i < valueString.length; i++) {
        labelText[i].attr("fill", "black")
    }
    Tone.Transport.stop()
}

function showHelp(state) {

    // NOTE: this should be binded more effectively.. but not using Angular just for this... but maybe Vue?

    if (state) {
        $(".modal").show()
        $(".help-icon").mouseover(function(){}).mouseout(function(){})
        $(".help-icon").first().css("color", "grey")
    } else {
        $(".modal").hide()
        $(".help-icon").first().css("color", "black")
        $(".help-icon")
            .mouseover(function() { $(this).css("color", "grey") })
            .mouseout(function() { $(this).css("color", "black") })
    }

}

function drawNotation() {

	var ht = windowHeight/4+50; // height
  	var iht = 100; //image height
  	rectMode(CENTER);

  	for(var i = 0; i < cycle/2; i++){
        var xSpot = windowWidth/5+0.16*windowWidth*i;
        var figWidth = windowWidth*0.04;
		if(clapPattern[i*2] == 1) {
	  		if(clapPattern[i*2 + 1] == 1) {
	  			image(img28, xSpot, ht, 3*figWidth, iht);
	  		} else {
	  			image(img8, xSpot, ht, figWidth, iht);
	  			image(img8r, xSpot+0.08*windowWidth, ht, figWidth, iht);
	  		}
	  	} else  if (clapPattern[i*2 + 1] == 0) {
	  		image(img4r, xSpot, ht, 2*figWidth, iht);
	  	} else {
	  		image(img8r, xSpot, ht, figWidth, iht);
	  		image(img8, xSpot+0.08*windowWidth, ht, figWidth, iht);
	  	}
	  }
}

$(function() {
    $('#bpmSlider').on('input', function () {
        document.getElementById('bpmVal').innerText = parseInt(document.getElementById('bpmSlider').value);
        bpmVal = parseInt(document.getElementById('bpmSlider').value);
        Tone.Transport.bpm.value = parseInt(document.getElementById('bpmSlider').value);
    })
})

function animate(index) {
    console.log("it's also playing", index)
    if(index == 0) {
        Tone.Master.volume.value = 0;
    } else {
        Tone.Master.volume.value = -7;
    }

    labelText[index].attr("fill", "red")
    for (var i = 1; i < valueString.length; i++) {
        labelText[(index+i)%8].attr("fill", "black")
    }
}

function assignRoles(element, index) {
    element.click(function(){
            if(valueString[index] == 0) {
                if(index % 2 == 0 && valueString[index+1] == 0) { // 0 0 to 1 0
                    images[index].node.href.baseVal = "../_assets/svg/8th.svg"
                    images[index + 1].node.href.baseVal = "../_assets/svg/8thR.svg"
                    valueString[index] = 1
                } else if(index % 2 == 0 && valueString[index+1] == 1) { // 0 1 to 1 0
                    images[index].node.setAttribute("width", imgWidth*2)
                    images[index].node.href.baseVal = "../_assets/svg/2x8.svg"
                    images[index + 1].node.href.baseVal = "../_assets/svg/blank.svg"
                    valueString[index] = 1
                } else if(index % 2 == 1 && valueString[index-1] == 0) { // 0 0 to 0 1
                    images[index].node.href.baseVal = "../_assets/svg/8th.svg"
                    images[index - 1].node.href.baseVal = "../_assets/svg/8thR.svg"
                    valueString[index] = 1
                } else if(index % 2 == 1 && valueString[index-1] == 1) { // 1 0 to 1 1
                    images[index].node.href.baseVal = "../_assets/svg/blank.svg"
                    images[index-1].node.setAttribute("width", imgWidth*2)
                    images[index-1].node.href.baseVal = "../_assets/svg/2x8.svg"
                    valueString[index] = 1
                }


            } else { /* if point is going to 0 */
                if(index % 2 == 0 && valueString[index+1] == 0) { // 1 0 to 0 0
                    images[index].node.href.baseVal = "../_assets/svg/4R.svg"
                    images[index + 1].node.href.baseVal = "../_assets/svg/blank.svg"
                    valueString[index] = 0
                } else if(index % 2 == 0 && valueString[index+1] == 1) { // 1 1 to 0 1
                    images[index].node.setAttribute("width", imgWidth)
                    images[index].node.href.baseVal = "../_assets/svg/8thR.svg"
                    images[index + 1].node.href.baseVal = "../_assets/svg/8th.svg"
                    valueString[index] = 0
                } else if(index % 2 == 1 && valueString[index-1] == 0) { // 0 1 to 0 0
                    images[index].node.href.baseVal = "../_assets/svg/blank.svg"
                    images[index - 1].node.href.baseVal = "../_assets/svg/4R.svg"
                    valueString[index] = 0
                } else if(index % 2 == 1 && valueString[index-1] == 1) { // 1 1 to 1 0
                    images[index].node.href.baseVal = "../_assets/svg/8thR.svg"
                    images[index-1].node.setAttribute("width", imgWidth)
                    images[index-1].node.href.baseVal = "../_assets/svg/8th.svg"
                    valueString[index] = 0
                }
            }

        labelText[index].attr({text: valueString[index].toString()})
    });
}

