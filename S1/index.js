// TODO:
// - Find a good way of sharing the HTML between sessions
// - Add loading screen and add listener for when sounds stop loading
// - Try and experiment with Vue.js to improve some variable binding?
// - Experiment with Babel.js so that can use ES6 features, while still guaranteeing backwards compatibility
// - Experiment with jsdoc for classes, just because

var app

$(function() {

    app = new App({
        paths: App.defaults.paths.percussive,
        spatial: false
    })

    app.addCircle({
        x: function() { return Utils.vw()/2 },
        y: function() { return Utils.vh()/2 },
        options: Circle.defaults.options.percussive,
        shake: true
    })

})
