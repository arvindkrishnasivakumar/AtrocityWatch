var Express = require("express");
var MongoClient=require("mongodb").MongoClient;
var cors = require("cors");
const multer=require("multer");

var app=Express();
app.use(cors());
var CONNECTION_STRING = "mongodb+srv://aryandasus:BklpW7dQmj7O0kvm@cluster0.ibbon6l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASEMNAME="AtrocityWatchDB";
var database;
app.listen(5083,()=>{
    MongoClient.connect(CONNECTION_STRING,(error,client)=>{
        database=client.db(DATABASEMNAME);
        console.log("connected to mongodb");

    })
})
app.get('/db_api/AtrocityWatch/GetNotes', (request,response)=>{
    database.collection("Stories").find({}).toArray((error,result)=>{
        response.send(result);
    }) 
})

app.post('/db_api/AtrocityWatch/AddNotes',multer().none(), (request,response)=>{
    database.collection("Stories").count({},function(error,numOfDocs){
        database.collection("Stories").insertOne({
            id:(numOfDocs + 1).toString(),
            description:request.body.newNotes
        })
        response.json("Added Succesfully");
    })
})
app.delete('/adb_apipi/AtrocityWatch/DeleteNotes', (request,response)=>{
    database.collection("Stories").deleteOne({
        id:request.query.id
    })
    response.json("Deleted Succesfully");

})
