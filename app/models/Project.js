const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const project = {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    }, 
    directLink: {
        type: String
    },
    img: {
        type: String,
    }
}

const ProjectSchema = new Schema(project)

module.exports = mongoose.model("projects",ProjectSchema);