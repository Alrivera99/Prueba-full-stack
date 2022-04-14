const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransSchame = Schema({
    title: String,
    author: String,
    year: String,
    genre: String,
    active: Boolean,
    avatar: String
})

module.exports = mongoose.model("Books", TransSchame)