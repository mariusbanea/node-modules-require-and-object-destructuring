const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: String,
  completed: Boolean
});

todoSchema.methods.serialize = function() {
  return {
    id: this._id,
    title: this.title,
    completed: this.completed
  };
};

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;


