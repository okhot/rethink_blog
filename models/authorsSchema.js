const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

authorSchema.virtual("blogs", {
  ref: "blog",
  localField: "_id",
  foreignField: "authors",
});

authorSchema.set("toObject", { virtuals: true });
authorSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Author", authorSchema);
