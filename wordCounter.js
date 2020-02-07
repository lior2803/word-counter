const fs = require('fs');
const eventStream = require('event-stream');

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

const countWordsInFile = (str, path, callback) => {
    if (str){
        countWordsInString(str);
        callback();
        return;
    }
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

const getStats = (word) => {
    if (!wordCounts[word]) return 0;
    return wordCounts[word];
}

module.exports = {
    countWordsInString: countWordsInString,
    countWordsInFile: countWordsInFile,
    getStats: getStats
};
