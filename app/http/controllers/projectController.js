const Project = require("../../models/Project")


function projectController(){

    return{

        addProject(req,res){
            res.render('addProject')
        },
        async addProjectPost(req,res,next){

            const title = req.body.title
            const description = req.body.description
            const github = req.body.github
            const img = req.file.filename
            const directLink = req.body.directLink

            if(!title || !description || !github || !img){

                req.flash('error',"All fields Required")
                req.flash('title',title)
                req.flash('description',description)
                req.flash('github',github)
    
    
                return res.redirect('/addProject')
            }
            const newProject = await new Project({
                title,
                description,
                github,
                directLink,
                img
            });

            newProject.save().then((newProject) => {
                const id = newProject._id
                return res.redirect(`project/${ id }`)
            }).catch((err) => {
                req.flash("Something Went Wrong")
                res.send(err)
            })
        },
        async singleProject(req, res){

            const project = await Project.findById(req.params.id)
            return res.render('project',{ project : project })
        },
        async editProject(req,res){

            const project = await Project.findById(req.params.id)

            return res.render('editProject',{ project: project })
        },
        async editProjectUpdate(req,res){

            const id = req.params.id
            const title = req.body.title
            const description = req.body.description
            const github = req.body.github
            const img = req.file.filename
            const directLink = req.body.directLink

            if(!title || !description || !github || !img){

                req.flash('error',"All fields Required")
                req.flash('title',title)
                req.flash('description',description)
                req.flash('github',github)
                req.flash('img',img)
    
                return res.redirect('/addProject')
            }

            const project = await Project.findByIdAndUpdate(
                id,
                {
                    title: title,
                    description: description,
                    github: github,
                    directLink: directLink,
                    img: img
                },
                function(err){
                    if(err){
                        console.log(err);
                        return res.send(err);
                    }

                    return res.redirect(`/project/${ id }`)
                }
            )
        },
        async editProjectDelete(req,res){
            const id = req.params.id;

            const project = await Project.findByIdAndDelete(
                id,
                function(err){
                    if(err){
                        res.send(err)
                    }

                    return res.redirect('/');
                }
            )
        }
        
    }
}

module.exports = projectController;