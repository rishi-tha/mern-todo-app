import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Todo from './components/Todo'; // Imported your new component
import './index.css';

const API_BASE_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setTodos(response.data);
    } catch (err) { console.error(err); }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    try {
      if (editId) {
        await axios.put(`${API_BASE_URL}/${editId}`, { text: taskText });
        setEditId(null);
      } else {
        await axios.post(API_BASE_URL, { text: taskText });
      }
      setTaskText('');
      fetchTodos();
    } catch (err) { console.error(err); }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, { completed: !currentStatus });
      fetchTodos();
    } catch (err) { console.error(err); }
  };

  const handleStartEdit = (todo) => {
    setEditId(todo._id);
    setTaskText(todo.text);
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchTodos();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="app-container">
      <div className="todo-box">
        <h2>📋 Task Manager</h2>
        <form onSubmit={handleFormSubmit} className="input-row">
          <input 
            type="text" 
            placeholder="Add a new task..." 
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button type="submit" className={editId ? "btn-edit-mode" : "btn-add-mode"}>
            {editId ? 'Update' : 'Create'}
          </button>
        </form>

        <div className="list-wrapper">
          {todos.length === 0 ? (
            <p className="empty-msg">No tasks found. Create one above!</p>
          ) : (
            todos.map((todo) => (
              <Todo 
                key={todo._id} 
                todo={todo} 
                onToggle={handleToggleComplete} 
                onEdit={handleStartEdit} 
                onDelete={handleDeleteTodo} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;