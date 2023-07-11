const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  datCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Author", authorSchema);
