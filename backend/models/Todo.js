const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Task string cannot be empty'],
    trim: true
  },
  iscompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true }); // Automatically creates createdAt and updatedAt tracking values

module.exports = mongoose.model('Todo', TodoSchema);