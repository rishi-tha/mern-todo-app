import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = "https://mern-todo-app-6biz.onrender.com/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!input) return;
    const res = await axios.post(API_URL, { text: input });
    setTodos([...todos, res.data]);
    setInput('');
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
  };

  const editTodo = async (id) => {
    const newText = prompt("Edit your task:");
    if (newText) {
      const res = await axios.put(`${API_URL}/${id}`, { text: newText });
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    }
  };

  return (
    <div className="App">
      <h1>MERN To-Do List</h1>
      <div className="input-container">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a task..." />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''}>
             <div className="task-text-container">
        {/* Visual Checkbox to show completion status */}
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={() => toggleComplete(todo._id, todo.completed)} 
          className="todo-checkbox"
        />
        <span onClick={() => toggleComplete(todo._id, todo.completed)}>
          {todo.text}
        </span>
      </div>
            <div className="action-buttons">
              <button onClick={() => editTodo(todo._id)}>Edit</button>
              <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;