const express = require("express");
const router = express.Router();
const Comment = require("../models/commentSchema");

router.get("/", async (req, res) => {
  try {
    const comment = await Comment.find().populate("blog");
    res.send(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id }).populate(
      "blog"
    );
    res.send(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const saveComment = await comment.save();
    res.send(saveComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    comment.content = req.body.content;
    comment.userInfo = req.body.userInfo;
    comment.blog = req.body.blog;
    comment.likes = req.body.likes;
    comment.dislikes = req.body.dislikes;
    await comment.save();
    res.send(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    Object.keys(req.body).forEach((key) => {
      comment[key] = req.body[key];
    });
    await comment.save()
    res.send(comment)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete("/:id", async(req, res) => {
    try{
            const comment = await Comment.findOne({_id: req.params.id})
    comment.deleteOne()
    res.status(200).send()
    } catch (err) {
        res.status(500).json(err)
    }

});

module.exports = router;
