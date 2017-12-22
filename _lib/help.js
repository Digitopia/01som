var HELP = {

    init: function() {

        var self = this

        $(".close-button").click(function() {
            self.show(false)
        })

        $(".help").click(function() {
            self.show(true)
        })

        $(".modal").click(function() {
            console.log("clicked modal")
            self.show(false)
        })

        if (Cookies.get("visited")) {
            console.debug("returning visitor")
            // self.show(true) // NOTE: uncomment for testing, to force help message
        } else {
            console.log("first time visitor")
            Cookies.set("visited", true, { expires: 365, path: "/" })
            self.show(true)
        }

        // NOTE: Hide help if Escape key is pressed
        $(document).keyup(function(e) {
            if (e.keyCode == 27) self.show(false)
        })
    },

    show: function(state) {

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

}
