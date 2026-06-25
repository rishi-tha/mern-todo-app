const Todo = require('../models/Todo');

// Get all tasks
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a task
exports.createTodo = async (req, res) => {
  try {
    const newTodo = new Todo({ text: req.body.text });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update task text or status
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a task
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ error: 'Todo not found' });
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};