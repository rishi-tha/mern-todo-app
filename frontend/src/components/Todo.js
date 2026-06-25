import React from 'react';

function Todo({ todo, onToggle, onEdit, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? 'is-completed' : ''}`}>
      <span className="todo-text" onClick={() => onToggle(todo._id, todo.completed)}>
        {todo.text}
      </span>
      <div className="action-buttons">
        <button className="btn-action edit" onClick={() => onEdit(todo)}>Edit</button>
        <button className="btn-action delete" onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </div>
  );
}

export default Todo;