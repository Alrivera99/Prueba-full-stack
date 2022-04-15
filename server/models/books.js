const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchame = Schema({
    title: String,
    author: String,
    year: String,
    genre: String,
    active: Boolean,
    avatar: String
})

module.exports = mongoose.model("Books", bookSchame)