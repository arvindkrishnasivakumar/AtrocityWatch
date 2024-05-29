var CONNECTION_STRING = "mongodb+srv://admin:testPwd@cluster0.ibbon6l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASEMNAME="AtrocityWatchDB";
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Story = require('./models/Story');
var cors = require("cors");

app.use(cors());

mongoose.connect(CONNECTION_STRING);
const db = mongoose.connection;
db.on('error',(error)=> console.error(error));
db.once('open', () => console.log('connected to database'));

app.use(express.json());




app.listen(3000,()=>{
    console.log("listening");
})

app.post('/', async (req, res) => {
    console.log('bruh');
    const story = new Story({
        title : req.query.title,
        rating : req.query.rating,
        img : req.query.img,
        reasons : req.query.reasons, 
        perpetrator : req.query.perpetrator,
        date : req.query.date,
    });
    console.log(story);
    try{
        await story.save();
        res.send(story + "Updated");
        console.log(story + "Updated");
    }
    catch (error){
        res.send(error);
        console.log(error);
    }
   
    // db.stories.aggregate([
    //     {
    //         "$group": {
    //             _id: {title: "$title"},
    //             titles: { $addToSet: "$_id" } ,
    //             count: { $sum : 1 }
    //         }
    //     },
    //     {
    //         "$match": {
    //             count: { "$gt": 1 }
    //         }
    //     }
      
    // ]).forEach(function(doc) {
    //         doc.titles.shift();
    //         db.table.remove({
    //           _id: {$in: doc.titles}
    //         });
    // })

})

app.get('/', async(req,res) => {
    const stories = await Story.find().sort('-date')
    .limit(10);
    var out = [];
    for await (const doc of stories) {
        out.push(doc); // Prints documents one at a time
      //  console.log(doc);
      }
    res.send(out);
})



 
