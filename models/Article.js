const { Schema, model } = require("mongoose");

const ArticleSchema = Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: "default.png"
    }
})

//export with 3 params; name to export, item to export, (opt:) the collection on the db
model.exports = model("Article", ArticleSchema, articles)
