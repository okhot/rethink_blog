const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  meta: {
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  authors: [{ type: mongoose.Schema.ObjectId, ref: "Author" }],
});

blogSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "blog",
});

blogSchema.set("toObject", { virtuals: true });
blogSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("blog", blogSchema);
