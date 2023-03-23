const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const postSchema = new Schema(
    {
        author: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
