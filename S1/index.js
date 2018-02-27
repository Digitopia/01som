// NOTE: Make app globally available for easier console debugging
var app

// NOTE: Start experimenting with service workers to try and get offline capabilities
// function initServiceWorker() {
//     console.log("init service worker")
//     if ('serviceWorker' in navigator) {
//       window.addEventListener('load', function() {
//         navigator.serviceWorker.register('./../sw.js').then(function(registration) {
//           console.log('ServiceWorker registration successful with scope: ', registration.scope);
//         }, function(err) {
//           console.log('ServiceWorker registration failed: ', err);
//         });
//       });
//     }
// }
// initServiceWorker()

$(window).on("load", function() {

    Utils.hideLoader()

    var em = Utils.getBodyFontSize()

    app = new App({
        paths: App.defaults.paths.percussive,
        spatial: false,
        debug: false,
        pointRadius: 1.8*em,
        paddingFactor: 1
    })

    app.addCircle({
        xFunc: function() { return app.width/2 },
        yFunc: function() { return app.height/2 },
        rFunc: function() { return Math.min(250, Math.min(app.width, app.height)/2 - app.padding - app.pointRadius) },
        // rFunc: Circle.defaults.rFunc,
        options: Circle.defaults.options.percussive,
        shake: true,
    })

})
