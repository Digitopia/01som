class Utils {

    static setVisible(elem, bool) {
        let visibility = bool ? "visible" : "hidden"
        elem.attr({ visibility: visibility })
    }

    static hide(elem) {
        return this.setVisible(elem, false)
    }

    static show(elem) {
        return this.setVisible(elem, true)
    }

    static zeros(rows, cols) {
        let matrix = new Array(rows)
        for (let i = 0; i < rows; i++) {
            matrix[i] = []
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = 0
            }
        }
        return matrix
    }

    static isPortrait() {
        return $("#svg").height() <= $("#svg").width()
    }

    static isLandscape() {
        return !this.isPortrait()
    }

    static hideLoader() {
        $("#loader").hide()
        $("#wrapper").css("display", "flex")
    }

    static getBodyFontSize() {
        return parseInt($("body").css("font-size"), 10)
    }

}
