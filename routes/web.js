//Controllers
const bookController = require('../app/http/controllers/bookController')
const homeController = require('../app/http/controllers/homeController')
const projectController = require('../app/http/controllers/projectController')
const experienceController = require('../app/http/controllers/experienceController')
//Middlewares
const upload = require('../app/http/middlewares/upload')
//restricts guests from admin pages
const guest = require('../app/http/middlewares/guest')
//restricts admin from login page after login
const auth = require('../app/http/middlewares/auth')
//Routes
function initRoutes(app){
    //home route
    app.get('/',homeController().index);

     //admin login
     app.get('/adminLogin',auth,homeController().adminLogin)
     app.post('/adminLogin',auth,homeController().adminLoginPost)
     app.post('/logout',guest,homeController().logout)
    //books route
    app.get('/addBook',guest,bookController().addBook)
    app.post('/addBook',bookController().postBook)
    app.get('/book/:id',bookController().singleBook)
    app.get('/editBook/:id',guest,bookController().editBook)
    app.put('/editBook/:id',guest,bookController().editBookUpdate)
    app.delete('/editBook/:id',guest,bookController().editBookDelete)
    //projects route
    app.get('/addProject',guest,projectController().addProject)
    app.post('/addProject',guest,upload,projectController().addProjectPost)
    app.get('/project/:id',projectController().singleProject)
    app.get('/editProject/:id',guest,projectController().editProject)
    app.put('/editProject/:id',guest,upload,projectController().editProjectUpdate)
    app.delete('/editProject/:id',guest,projectController().editProjectDelete)

    //experience routes
    app.get('/addExperience',guest,experienceController().addExperience)
    app.post('/addExperience',guest,upload,experienceController().addExperiencePost)
    app.get('/experience/:id',experienceController().singleExperience)
   
}

module.exports = initRoutes;