const Book = require('../../models/Book')
const Project = require('../../models/Project')
const passport = require('passport')
const path = require('path')

function homeController(){
    return{
        async index(req,res){
        
            const projects = await Project.find()
            const books = await Book.find();
     
            res.render('home',{ projects: projects, books: books })    
        },

        adminLogin(req,res){
            res.render('login')
        },
        
        adminLoginPost(req ,res ,next){

            const admin_name = req.body.admin_name
            const password = req.body.password

            if(!admin_name || !password){
                req.flash('error','All fields are Required')
                return res.redirect('/adminLogin')
            }

            passport.authenticate('local', (err,user,info) => {
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }

                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('/adminLogin')
                }

                req.logIn(user, (err) => {
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req,res,next)
        },
        logout(req, res){
            req.logout()
            return res.redirect('/')
        }
    }
}


module.exports = homeController;