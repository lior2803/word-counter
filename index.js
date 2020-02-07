const express = require('express');
const app = express();
const request = require('request');
//request('https://www.w3.org/TR/PNG/iso_8859-1.txt').pipe(fs.createWriteStream('fromURL.txt'));

///
const fs = require('fs');
const es = require('event-stream');

let wordCounts = {};

let countWordsInString = (str) => {
    let wordsArr = str.toLowerCase().trim().split(/\s+/);
    wordsArr.forEach((word) => {
        if (!wordCounts[word]) {
            wordCounts[word] = 1;
        } else {
            wordCounts[word]++;
        }
    });
};

let countWordsInFile = (path, callback) => {
    fs.createReadStream(path)
    .pipe(es.split())
    .pipe(es.mapSync(function(line) {
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

app.get('/', (req, res) => {
    countWordsInFile('./testFiles/s1.txt', (err) => {
        if (err){
            res.status(500).send({error: err});
        }
        res.json({"wordCounts": wordCounts});
        //            res.sendStatus(200);
    });
});

//app.get('/', (req, res) => {
//    fs.createReadStream('sample.txt')
//    .pipe(es.split())
//    .pipe(es.map(function(line, callback) {
//           totalLines++;
//           callback(null, countWords(line));
//        })
//    ).pipe(res.json({"totalLines": totalLines, "the": wordCounts["the"]}));
//});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
