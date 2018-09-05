"use strict";
const path = require('path');
let prod = process.env.NODE_ENV === 'production';

module.exports = {
  "wpyExt": ".wpy",
  "compilers": {
    pug: {},
    less: {
      "compress": true
    },
    babel: {
      "presets": [
        "es2015",
        "stage-1"
      ],
      "plugins": [
        "transform-export-extensions",
        "syntax-export-extensions"
      ]
    }
  },
  "plugins": {}
};


if (prod) {

  // 压缩less
  module.exports['less'] = {"compress": true};

  // 压缩js
  module.exports.plugins = {
    'autoprefixer': {
      filter: /\.wxss$/,
      config: {
        browsers: ['last 11 iOS versions']
      }
    },
    'imagemin': {
      filter: /\.(jpg|png|jpge)$/,
      config: {
        'jpg': {
          quality: 30
        },
        'png': {
          quality: 80
        }
      }
    }
  };
}

