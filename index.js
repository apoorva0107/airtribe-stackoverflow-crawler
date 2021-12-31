require('./database');
const {webCrawler} = require('./scripts/data-crawler');
const generateCsv = require('./generate-csv');

webCrawler();
process.on("SIGINT", generateCsv.saveFile);