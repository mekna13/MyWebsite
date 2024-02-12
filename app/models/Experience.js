const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const experience = {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: [String]
    },
    img: {
        type: String,
    }
}

const ExperienceSchema = new Schema(experience)

module.exports = mongoose.model("experience",ExperienceSchema);