const fs = require('fs');
const eventStream = require('event-stream');
const request = require('request');

let wordCounts = {};

const countWordsInString = (str) => {
    let wordsArr = str.toLowerCase().trim().split(/\s+/);
    wordsArr.forEach((word) => {
        if (!wordCounts[word]) {
            wordCounts[word] = 1;
        } else {
            wordCounts[word]++;
        }
    });
};

const countWordsInFile = (path, callback) => {
    fs.createReadStream(path)
    .on('error', function(err) {
        callback(err);
    })
    .pipe(eventStream.split())
    .pipe(eventStream.mapSync(function(line) {
           countWordsInString(line);
        })
        .on('error', function(err) {
            callback(err);
        })
        .on('end', function() {
            callback();
        }),
    );
};

const countWordsInURL = (url, callback) => {
    let path = 'fromURL.txt';
    let ws = request.get(url)
    .on('error', function(err) {
        callback(err);
    })
    .pipe(fs.createWriteStream(path));
    ws.on('finish', function(){
          countWordsInFile(path, callback);
    });
};

const getStats = (word) => {
    if (!wordCounts[word]) return 0;
    return wordCounts[word];
}

module.exports = {
    countWordsInString: countWordsInString,
    countWordsInFile: countWordsInFile,
    countWordsInURL: countWordsInURL,
    getStats: getStats
};
