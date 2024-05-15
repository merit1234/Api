const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  state: {
    type: String, required: true, default: "draft", validate: {
      validator: function (value) {
        // Ensure that the state is either "draft" or "published"
        return value === "draft" || value === "published";
      },
      message: props => `${props.value} is not a valid state. State must be either "draft" or "published".`
    }
  },
  readCount: { type: Number, default: 0 },
  readingTime: { type: String, required: true },
  tags: [{ type: String }],
  body: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = articleSchema;
