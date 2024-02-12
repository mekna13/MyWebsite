const Experience = require("../../models/Experience")


function experienceController(){

    return{

        addExperience(req,res){
            res.render('addExperience')
        },
        async addExperiencePost(req,res,next){

            const title = req.body.title
            const description = req.body.description
            const img = req.file.filename

            const skills = req.body?.skills ? req.body.skills.split(',') : []
    

            if(!title || !description  || !img){
                req.flash('error',"All fields Required")
                req.flash('title',title)
                req.flash('description',description)
    
    
                return res.redirect('/addProject')
            }
            const newExperience = await new Experience({
                title,
                description,
                skills,
                img
            });

            newExperience.save().then((newExperience) => {
                const id = newExperience._id
                return res.redirect(`experience/${ id }`)
            }).catch((err) => {
                req.flash("Something Went Wrong")
                res.send(err)
            })
        },
        async singleExperience(req, res){

            const experience = await Experience.findById(req.params.id)
            return res.render('experience',{ experience : experience })
        },
        async editExperience(req,res){

            const experience = await Experience.findById(req.params.id)

            return res.render('editExperience',{ experience: experience })
        },
        async editExperienceUpdate(req,res){

            const id = req.params.id
            const title = req.body.title
            const description = req.body.description
            const skills = req.body?.skills ? req.body.skills.split : []

            const img = req.file.filename

            if(!title || !description  || !img){

                req.flash('error',"All fields Required")
                req.flash('title',title)
                req.flash('description',description)
                req.flash('img',img)
    
                return res.redirect('/addExperience')
            }

            const experience = await Experience.findByIdAndUpdate(
                id,
                {
                    title: title,
                    description: description,
                    img: img,
                    skills: skills
                },
                function(err){
                    if(err){
                        console.log(err);
                        return res.send(err);
                    }

                    return res.redirect(`/experience/${ id }`)
                }
            )
        },
        async editExperienceDelete(req,res){
            const id = req.params.id;

            const experience = await Experience.findByIdAndDelete(
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

module.exports = experienceController;