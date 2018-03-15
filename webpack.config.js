const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const webpack = require('webpack')
let path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].css",
    disable: false
});

const extractPug = new ExtractTextPlugin({
    filename: "circle.pug",
    disable: false
});

let config = {
    performance: {
        hints: false
    },
    entry: "./_js/circle.js",
    output: {
        path: path.resolve(__dirname, "_js"),
        filename: "bundle.js",
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }, {
            test: /\.pug$/,
            use: extractPug.extract({
                use: [{
                    loader: "pug-loader"
                }],
            })
        }]
    },
    plugins: [
        extractSass,
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new UglifyJSPlugin({ })
    ]
};

module.exports = config
