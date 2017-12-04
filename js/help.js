function setupHelp() {

    $(".close-button").click(function() {
        showHelp(false)
    })

    $(".help").click(function() {
        showHelp(true)
    })

    $(".modal").click(function() {
        console.log("clicked modal")
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

function showHelp(state) {

    // NOTE: this should be binded more effectively.. but not using Angular just for this...

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