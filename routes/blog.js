const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author");
    res.send(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", (req, res) => {});

router.post("/", async (req, res) => {
  try {
    const newBlog = await new Blog(req.body);
    console.log(req.body);
    const saveBlog = await newBlog.save();
    res.status(201).json(saveBlog);
  } catch (err) {
    res.send(console.log(err));
  }
});

module.exports = router;
