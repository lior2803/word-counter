# word-counter

## Implementation Details
The project is comprised of one component, a backend server based on node.js.

#### Dependencies
* body-parser
* event-stream
* express
* fs
* request

## Endpoints
#### Word-Counter
Receives an input and a type of an input and counts the number of appearances for each word in the input.  
The input should be a valid string / path to file / URL to file.  
The words count is case insensitive, dashes and commas are part of the word and digits are ignored.
The words are seperated by EOL, tab and spaces.

* Method: POST
* Path: http://localhost:3000/words/count
* Body: A JSON with an input and a type.  
The endpoint accepts the input in 3 ways:
    - A string:
        ```json
        {
          "type": "string", //case insensitive
          "input": "Some string"
        }
        ```
    - A file:
        ```json
        {
          "type": "file", //case insensitive
          "input": "./files/big-file.txt" //file path
        }
        ```
    - A URL:
        ```json
        {
          "type": "url", //case insensitive
          "input": "https://www.w3.org/TR/PNG/iso_8859-1.txt" //URL path
        }
        ```
* Response:
    - 200 OK - in case of success
    - 500 Internal server error - in case of an error (for example: when a path is invalid)
    - 400 Bad request - in case of an unsupported type of input

#### Word-Statistics
Receives a word and returns the number of times the word appeared so far (in all previous calls).

* Method: GET
* Path: http://localhost:3000/words/stats/[WORD]
* Path parameter: The word 
* Response:
    - 200 OK - A JSON with the number of appearances (in case the word doesn't appear 0 will be returned)
        ```json
        {
          "the": 62
        }
        ```
    - 500 Internal server error - in case of an error
    
## Instructions
** Assuming npm is installed.

1. Clone or download the [word-counter](https://github.com/lior2803/word-counter) repository.
2. From the project root folder run `npm install` and then `npm start`.
