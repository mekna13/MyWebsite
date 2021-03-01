require("dotenv").config();
const Admin = require('./app/models/Admin')
const bcrypt = require('bcrypt')
const password_given = process.env.ADMIN_KEY
const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB Connected');
}).catch(err => {
    console.log('Connection Failed');
});

async function seedAdmin(password_given){

    const password = await bcrypt.hash(password_given,10)
    const admin_name = "mekna"
    const admin = new Admin({
        admin_name,
        password
    })

    admin.save().then((admin) => {
        console.log(admin)
    }).catch(err =>{
        console.log(err)
    })
}

seedAdmin(password_given)
