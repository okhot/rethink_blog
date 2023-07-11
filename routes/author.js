const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const Author = require("../models/authors");

//Get a single author
router.get("/", async (req, res) => {
  try {
    const authors = await Author.find();
    res.send(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const getOneAuhor = await Author.findOne({ name: req.params.id });
    res.send(getOneAuhor);
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

router.patch("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
