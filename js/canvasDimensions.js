function canvasHeight() {
    var extra = ( $(".head").height() + $("#bpmButtons").height() + $("footer").height() )
    var slack = 20 // NOTE: don't try to use 100% of space, since it tends to add scroll bars, which we should avoid
    var diff = windowHeight - extra - slack
    return (diff < 300) ? 300 : diff
}

function canvasWidth() {
    var extra = ( $(".labels").width() + $(".playback").width() )
    var slack = 5
    var diff = $(".main").width() - extra - slack
    return (diff < 300) ? 300 : diff
}