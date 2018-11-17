const convert = require('../convert');
const path = require('path');
const pathIn = path.resolve(__dirname, 'sample.jsx');
const pathOut = path.resolve(__dirname, 'sample.js');
convert(pathIn, pathOut);
