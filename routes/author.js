const express = require("express");
const router = express.Router();
const Author = require("../models/authorsSchema");
const authors = require("../models/authorsSchema");

router.get("/", async (req, res) => {
  try {
    const authors = await Author.find().populate("blogs");
    res.send(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findOne({ _id: req.params.id }).populate(
      "blogs"
    );
    console.log(author);
    res.send(author);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const NewAuthor = await new Author(req.body);
    const saveAuthor = await NewAuthor.save();
    res.status(201).json(saveAuthor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const author = await Author.findOne({ _id: req.params.id });
    author.name = req.body.name;
    author.email = req.body.email;
    await author.save();
    res.send(author);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const author = await Author.findOne({ _id: req.params.id });
    Object.keys(req.body).forEach((key) => {
      author[key] = req.body[key];
    });
    await author.save();
    res.send(author);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const author = await Author.findOne({ _id: req.params.id });
    author.deleteOne();
    res.send().status(200);
  } catch (err) {
    res.send(500).json(err);
  }
});

module.exports = router;
