
// TODO:
// - Find a good way of sharing the HTML between sessions
// - Add loading screen and add listener for when sounds stop loading
// - Try and experiment with Vue.js to improve some variable binding?
// - Experiment with Babel.js so that can use ES6 features, while still guaranteeing backwards compatibility
// - Experiment with jsdoc for classes, just because

// NOTE: Make app globally available for easier console debugging
var app

$(function() {

    app = new App({
        paths: App.defaults.paths.percussive,
        spatial: false
    })

    app.addCircle({
        xFunc: function() { return app.width/2 },
        yFunc: function() { return app.height/2 },
        options: Circle.defaults.options.percussive,
        shake: true,
        binary: "binary-placeholder"
    })

})
