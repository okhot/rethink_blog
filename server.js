require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authors = require("./routes/author");
const blogs = require("./routes/blog");
const comment = require("./routes/comment")

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

app.use("/authors", authors);
app.use("/blogs", blogs);
app.use("/comments", comment)

app.listen(3000, () => console.log("Server is running on port 3000"));
