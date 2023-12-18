const path = require('path');
// c,
// onst e,ntry = require('./index')

module.exports = {
    entry:{
        main: './index.js'
    },
    output: {
        path: path.join(__dirname, 'prod-build'), // Output directory
        publicPath: '/',
        filename: '[name].js', // Output bundle file name
        clean: true
    },
    mode: 'production',
    target: 'node',
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};
