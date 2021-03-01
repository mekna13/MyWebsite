const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const book = {
    title:{
        type: String,
        required: true
    },
    review:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    bookCoverLink: {
        type: String,
        required: true
    }
};

const BookSchema = new Schema(book);

module.exports = mongoose.model("books",BookSchema);
