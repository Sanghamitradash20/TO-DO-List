import React, { useState } from 'react';

function TodoList({ todos, toggleComplete, updateTodo, deleteTodo }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleUpdate = (id) => {
    updateTodo(id, { title: editTitle, description: editDescription });
    setEditId(null);
  };

  if (todos.length === 0) {
    return <p>No todos found.</p>;
  }

  // return (
  //   <ul>
  //     {todos.map((todo) => (
  //       <li key={todo._id}>
  //         {editId === todo._id ? (
  //           <>
  //             <input
  //               type="text"
  //               value={editTitle}
  //               onChange={(e) => setEditTitle(e.target.value)}
  //             />
  //             <input
  //               type="text"
  //               value={editDescription}
  //               onChange={(e) => setEditDescription(e.target.value)}
  //             />
  //             <button onClick={() => handleUpdate(todo._id)}>Save</button>
  //             <button onClick={() => setEditId(null)}>Cancel</button>
  //           </>
  //         ) : (
  //           <>
  //             <span
  //               style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
  //             >
  //               {todo.title} - {todo.description}
  //             </span>
  //             <button onClick={() => toggleComplete(todo._id)}>
  //               {todo.completed ? "Mark Incomplete" : "Mark Complete"}
  //             </button>
  //             <button onClick={() => handleEdit(todo)}>Edit</button>
  //             <button onClick={() => deleteTodo(todo._id)}>Delete</button>
  //           </>
  //         )}
  //       </li>
  //     ))}
  //   </ul>
  // );

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo._id} className="todo-item">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo._id)}
          />
          <span className="todo-text">{todo.title}</span>
          <div className="todo-actions">
            <button onClick={() => updateTodo(todo._id, { ...todo, title: prompt('Update todo:', todo.title) })}>
              Edit
            </button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;