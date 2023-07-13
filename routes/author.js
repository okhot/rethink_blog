/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the author
 *         name:
 *           type: string
 *           description: Author of the post
 *         email:
 *           type: string
 *           description: Email of the author
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The the author was created
 *       example:
 *         id: 64af06219dc0d6e8b22f375f
 *         name: John Doe
 *         email: johndoe@gmail.com
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: The author managing API
 * /authors:
 *   get:
 *     summary: Lists all the books
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/component/schemas/Author'
 *   post:
 *     summary: Create a new book
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       500:
 *         description: Some server error
 * /authors/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The book was not found
 *   put:
 *    summary: Update the book by the id
 *    tags: [Authors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Author'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   patch:
 *    summary: Update the book by the id
 *    tags: [Authors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Author'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */

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
