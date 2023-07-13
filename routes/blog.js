const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema");
const { findOne } = require("../models/authorsSchema");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("authors").populate("comments");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id })
      .populate("comments")
      .populate("authors");
    blog.views += 1;
    await blog.save();
    res.send(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const saveBlog = await newBlog.save();
    res.status(201).json(saveBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.views = req.body.views;
    blog.likes = req.body.likes;
    blog.authors = req.body.authors;
    await blog.save();
    res.send(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    Object.keys(req.body).forEach((key) => {
      author[key] = req.body[key];
    });
    await blog.save();
    res.send(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    blog.deleteOne();
    res.status(200).send();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
