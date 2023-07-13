/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - blogs
 *         - content
 *         - userInfo
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the author
 *         content:
 *           type: string
 *           description: Content of the comment post
 *         userInfo:
 *            type: object
 *            description: The info of the commenter
 *         blog:
 *            type: string
 *            description: Get all comments for blog
 *       example:
 *         id: 64afd24347a8002ab5b3efc7
 *         content: This is a comment
 *         userInfo: {name: "Redneck Joe", email: "joered@gmail.com"}
 *         blog: "64af06219dc0d6e8b22f375f"
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The comment managing API
 * /comments:
 *   get:
 *     summary: Lists all the Comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: The list of the Comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/component/schemas/Comment'
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The created comment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Some server error
 * /comments/{id}:
 *   get:
 *     summary: Get the comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: The comment was not found
 *   put:
 *    summary: Update the comment by the id
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The comment id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *        description: The comment was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comments'
 *      404:
 *        description: The comment was not found
 *      500:
 *        description: Some error happened
 *   patch:
 *    summary: Update the comment by the id
 *    tags: [Comments]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The comment id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *        description: The comment was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      404:
 *        description: The comment was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the comment by id
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *
 *     responses:
 *       200:
 *         description: The comment was deleted
 *       404:
 *         description: The comment was not found
 */

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
    await comment.save();
    res.send(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id });
    comment.deleteOne();
    res.status(200).send();
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
