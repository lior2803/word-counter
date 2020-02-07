const express = require('express');
const bodyParser = require('body-parser');
const wordCounter = require('./wordCounter');

const app = express();
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/words/count', (req, res) => {
    let input = req.body.input;
    let type = req.body.type;

    let handleResponse = (err) => {
        if (err){
            res.status(500).send("Error message: " + err);
        } else {
            res.sendStatus(200);
        }
    };

    switch(type.toLowerCase()) {
      case "file":
        wordCounter.countWordsInFile(input, handleResponse);
        break;
      case "url":
        wordCounter.countWordsInURL(input, handleResponse);
        break;
      case "string":
        wordCounter.countWordsInString(str);
        res.sendStatus(200);
        break;
      default:
        res.status(400).send({error: "Unsupported type of input: " + type});
    }
});

app.get('/words/stats/:word', (req, res) => {
    let response = {};

    let word = req.params.word.toLowerCase();
    let count = wordCounter.getStats(word);
    response[word] = count;

    res.status(200).send(response);
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
