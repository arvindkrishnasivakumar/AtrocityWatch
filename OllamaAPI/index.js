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
    console.log(request.query.text);
    const result = await ollama.chat({
        model: 'llama3',
        messages: [{ role: 'user', content: warCrimePrompt + request.query.text}],
    })

    console.log(result.message.content);
    try{
      response.json(JSON.parse(result.message.content.replaceAll("(", "{").replaceAll(")","}")));
    }
    catch (error){
      try{
        response.json(JSON.parse(result.message.content.replaceAll("(", "{").replaceAll(")","}").replace('country', '"country"').replace('severity', '"severity"').replace('reasons', '"reasons"')));
      }catch(_error){
        console.log(_error);
        response.send("nah bruh");
      }
      
    }
     
     
});
