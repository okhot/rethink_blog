/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - authors
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the author
 *         title:
 *           type: string
 *           description: Title of the blog post
 *         content:
 *           type: string
 *           description: Content of the blog post
 *         authors:
 *            type: array
 *            description: The author(s) of the blog
 *         comments:
 *            type: array
 *            description: Get all comments for blog
 *       example:
 *         id: 64af07049dc0d6e8b22f3766
 *         title: How to become rich
 *         content: There's no recipe just work hard
 *         authors: ["64af06219dc0d6e8b22f375f"]
 *         comments: ["64afd24347a8002ab5b3efc7"]
 */

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
 *         meta: {likes: 0, views: 0}
 */

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: The blog managing API
 * /blogs:
 *   get:
 *     summary: Lists all the blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: The list of the blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/component/schemas/Blog'
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The created blog.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Some server error
 * /blogs/{id}:
 *   get:
 *     summary: Get the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *     responses:
 *       200:
 *         description: The blog response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: The blog was not found
 *   put:
 *    summary: Update the blog by the id
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Blog'
 *    responses:
 *      200:
 *        description: The blog was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened
 *   patch:
 *    summary: Update the blog by the id
 *    tags: [Blogs]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Blog'
 *    responses:
 *      200:
 *        description: The blog was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Blog'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the blog by id
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The blog id
 *
 *     responses:
 *       200:
 *         description: The blog was deleted
 *       404:
 *         description: The blog was not found
 */

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: The Likes managing API
 * /blogs/{id}/like:
 *   put:
 *    summary: Update the blog likes by the id
 *    tags: [Likes]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog likes id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *        description: The blog likes were updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened
 */

/**
 * @swagger
 * tags:
 *   name: Views
 *   description: The Views managing API
 * /blogs/{id}/view:
 *   put:
 *    summary: Update the blog views by the id
 *    tags: [Views]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The blog views id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *        description: The blog views were updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      404:
 *        description: The blog was not found
 *      500:
 *        description: Some error happened
 */

const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema");

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("comments").populate("authors");
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
    res.send(blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newBlog = (await new Blog(req.body).populate("authors")).populate(
      "comments"
    );
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

router.put("/:id/like", async (req, res) => {
  try {
    await Blog.updateOne({ _id: req.params.id }, { $inc: { "meta.likes": 1 } });
    res.send(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id/view", async (req, res) => {
  try {
    await Blog.updateOne({ _id: req.params.id }, { $inc: { "meta.views": 1 } });
    res.send(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
