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
        return this.fill(row, cols, 0)
    }

    static fill(rows, cols, value) {
        let matrix = new Array(rows)
        for (let i = 0; i < rows; i++) {
            matrix[i] = []
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = value
            }
        }
        return matrix
    }

    static isPortrait() {
        return $("#svg").height() >= $("#svg").width()
    }

    static isLandscape() {
        return !this.isPortrait()
    }

    static hideLoader() {
        $("#loader").remove()
        $("#wrapper").css("display", "flex")
    }

    static getBodyFontSize() {
        return parseInt($("body").css("font-size"), 10)
    }

}
