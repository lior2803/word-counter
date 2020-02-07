const express = require('express');
const bodyParser = require('body-parser');
const wordCounter = require('./wordCounter');
const request = require('request');
const fs = require('fs');

const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/words/count', (req, res) => {
    let input = req.body.input;
    let type = req.body.type;
    let path = "";
    let str = "";
    switch(type.toLowerCase()) {
      case "file":
        path = input;
        wordCounter.countWordsInFile(str, path, (err) => {
                          if (err){
                              res.status(500).send("Error message: " + err);
                          } else {
                  //        res.json({"wordCounts": wordCounts});
                              res.sendStatus(200);
                          }
                      });
        break;
      case "url":
        path = './testFiles/fromURL.txt';
        let ws = request(input).pipe(fs.createWriteStream(path));
        ws.on('finish', function(){
              wordCounter.countWordsInFile(str, path, (err) => {
                  if (err){
                      res.status(500).send("Error message: " + err);
                  } else {
                      res.sendStatus(200);
                  }
              });
        });
        break;
      case "string":
        str = input;
        break;
      default:
        res.status(400).send({error: "Unsupported type of input: " + type});
    }

//    wordCounter.countWordsInFile(str, path, (err) => {
//        if (err){
//            res.status(500).send({error: err});
//        }
////        res.json({"wordCounts": wordCounts});
//            res.sendStatus(200);
//    });
});

app.get('/words/stats/:word', (req, res) => {
    let response = {};

    let word = req.params.word.toLowerCase();
    let count = wordCounter.getStats(word);
    response[word] = count;

    res.status(200).send(response);
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
