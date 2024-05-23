const{default:ollama} = require ('ollama');
var express = require("express");
var cors = require("cors");
const multer = require("multer");
const warCrimePrompt = require('./prompt');

var app = express();
app.use(cors());

app.listen(5093, () => {
    console.log('listening');
});

app.get('/OllamaAPI/AtrocityWatch/GetResponse', async (request, response) => {
    // Data should be passed like request.query.text.
    // I hardcoded a random instance of a warcrime to test code
    const result = await ollama.chat({
        model: 'llama3',
        messages: [{ role: 'user', content: warCrimePrompt + "bombing of nagasaki"  }],
      })
      console.log(result.message.content);
        response.json(result.message.content);
});
