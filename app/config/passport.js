const LocalStrategy = require('passport-local').Strategy
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')

function init(passport){
    passport.use(new LocalStrategy({ usernameField: 'admin_name'}, async(admin_name,password,done) => {

        const admin = await Admin.findOne({ admin_name : admin_name })

        if(!admin){
            return done(null,false,{ message: 'No admin found'})
        }
        // bcrypt.hash(password, 10, function(err, hash) {
        //     console.log("PASSWORD HASH THIS",hash)
        // });
        bcrypt.compare(password, admin.password).then(match => {
            if(match){
                return done(null,admin,{ message: 'Logged in Successfully'})
            }
            return done(null,false,{ message: 'Incorrect Admin Name or Password'})
        }).catch(err => {
            return done(null,false,{ message: 'Something Went Wrong'})
        })
    }))

    passport.serializeUser((admin,done) => {
        done(null, admin._id)
    });

    passport.deserializeUser((id,done) =>{
        Admin.findById(id, (err,user) => {
            done(err,user)
        })
    })
}

module.exports = init