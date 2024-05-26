const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const storySchema = new Schema({
  title: { type: String, required: true, index: true, unique: true },
  rating: {type: Number},
  img: {type: String},
  reasons: {type: [String]},
  perpetrator : {type: [String]},
});

const Story = model('Story', storySchema);
module.exports = Story;