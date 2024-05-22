const{default:ollama} = require ('ollama');
var express = require("express");
var cors = require("cors");
const multer = require("multer");

var app = express();
app.use(cors());

app.listen(5093, () => {
    console.log('listening');
});







app.get('/OllamaAPI/AtrocityWatch/GetResponse', (request, response) => {
    var result;
    //const message = { role: 'user', content: 'Why is the sky blue?' }
    ollama.chat({ model: 'llama2', messages:  { role: 'user', content: 'Why is the sky blue?' }, stream: true }).then((res) => {
        console.log(res + " testicles");
        response.send(res);
       
      });
      
    
});
