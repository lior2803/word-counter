# word-counter

### Implementation Details
The project is comprised of one component, a backend server based on node.js.

#### Dependencies
* body-parser
* event-stream
* express
* fs
* request

#### Endpoints
1. Word-Counter: Receives an input and a type of input and counts the number of appearances for each word in the input. 
Method: POST  
Path: http://localhost:3000/words/count  
Body: A JSON with an input and a type.  
The endpoint accepts the input in 3 ways:
- vv
