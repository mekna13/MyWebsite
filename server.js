require("dotenv").config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3300 
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const bodyParser = require("body-parser");
const methodOverride = require('method-override')

const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const mongoose = require("mongoose");
const MongoDbStore = require('connect-mongo').default
mongoose.set('useFindAndModify', false);

//database connection
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB Connected');
}).catch(err => {
    console.log('Connection Failed');
});


//set Template Engine
app.use(expressLayout)
app.use(express.static(__dirname+'/public/'))
app.use(methodOverride('_method'))
app.use(flash())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

//Session Config
app.use(session({
    resave: false,
    secret: process.env.SECRET,
    store: MongoDbStore.create({ mongoUrl: MONGO_URI }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hours
}))

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

//global middleware
app.use(( req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})
//setting the routes to another file
require('./routes/web')(app)

app.use((req,res) => {
    res.status(404).render('404')
})
const server = app.listen(PORT, () => {
    console.log(`Starting PORT ${PORT}`)
});
