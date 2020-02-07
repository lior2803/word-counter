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

    let onSuccess = () => {
        res.sendStatus(200);
    };
    try {
        switch(type.toLowerCase()) {
          case "file":
            wordCounter.countWordsInFile(input, onSuccess);
            break;
          case "url":
            wordCounter.countWordsInURL(input, onSuccess);
            break;
          case "string":
            wordCounter.countWordsInString(input);
            res.sendStatus(200);
            break;
          default:
            res.status(400).send({error: "Unsupported type of input: " + type});
        }
    } catch(err) {
        res.status(500).send("Error message: " + err);
    }
});

app.get('/words/stats/:word', (req, res) => {
    try {
        let response = {};

        let word = req.params.word.toLowerCase();
        let count = wordCounter.getStats(word);
        response[word] = count;

        res.status(200).send(response);
    } catch(err) {
        res.status(500).send("Error message: " + err);
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
