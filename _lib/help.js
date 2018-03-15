class Help {

    static init() {

        $(".close-button").click(() => this.show(false))
        $(".help-icon").click(() => this.show(true))
        $(".modal").click(() => this.show(false))

        if (!Cookies.get("visited")) {
            // console.log("first time visitor")
            Cookies.set("visited", true, { expires: 365, path: "/" })
            this.show()
        } else {
            // console.debug("returning visitor")
            // this.show(true) // NOTE: uncomment for testing, to force help message
        }

        // Hide help if Escape key is pressed
        $(document).keyup(e => {
            if (e.keyCode === 27) this.hide()
        })
    }

    static setVisible(bool) {

        if (bool) {
            $(".modal").show()
            $(".help-icon").mouseover(function() {}).mouseout(function() {})
            $(".help-icon").first().css("color", "grey")
        } else {
            $(".modal").hide()
            $(".help-icon").first().css("color", "black")
            $(".help-icon")
                .mouseover(function() { $(this).css("color", "grey") })
                .mouseout(function() { $(this).css("color", "black") })
        }

    }

    static show() {
        return this.setVisible(true)
    }

    static hide() {
        return this.setVisible(false)
    }

}
