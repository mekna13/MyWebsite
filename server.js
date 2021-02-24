const express = require('express')
const app = express()
const PORT = process.env.PORT || 3300 
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


//database connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true })
.then(() => {
    console.log("Mongo Connection Successful !");
})
.catch( err => console.log(err));

//set Template Engine
app.use(expressLayout)
app.use(express.static(__dirname+'/public/'))
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')


app.get("/",(req,res) => {
    res.render('home');
})
app.get("/project",(req,res) => {
    res.render('project');
})
app.get("/book",(req,res) => {
    res.render('book');
})
app.get("/addProject",(req,res) => {
    res.render("addProject")
})


const server = app.listen(PORT, () => {
    console.log(`Starting PORT ${PORT}`)
});
