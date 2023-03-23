const Post = require("../models/postModel");
const mongoose = require("mongoose");

// get all posts
const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 });

    res.status(200).json(posts);
};

// get a single post
const getPost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not a valid post id" });
    }

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({ error: "no such post found" });
    }

    res.status(200).json(post);
};

// create a post
const createPost = async (req, res) => {
    const { author, title, body } = req.body;

    // add document to db
    try {
        const post = await Post.create({ author, title, body });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete a post
const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not a valid post id" });
    }

    const post = await Post.findByIdAndDelete(id);

    if (!post) {
        res.status(400).json({ error: "no such post" });
    }
    res.status(200).json(post);
};

// update a post
const updatePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Not a valid post id" });
    }

    const post = await Post.findOneAndUpdate(
        { _id: id },
        {
            ...req.body,
        }
    );

    if (!post) {
        res.status(400).json({ error: "no such post" });
    }

    res.status(200).json(post);
};

module.exports = { createPost, getPosts, getPost, deletePost, updatePost };
