const config = require('../../configs/generateWebpackConfig')(__dirname, '/subtitles');

 module.exports = {
     ...config,
     module: {
         ...config.module,
         rules: config.module.rules.concat({
            test: /\.srt$/i,
            use: 'raw-loader',
         })
     }
 }