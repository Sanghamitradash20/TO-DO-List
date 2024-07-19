import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo({ title, description });
    setTitle('');
    setDescription('');
  };

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input
  //       type="text"
  //       value={title}
  //       onChange={(e) => setTitle(e.target.value)}
  //       placeholder="Title"
  //       required
  //     />
  //     <input
  //       type="text"
  //       value={description}
  //       onChange={(e) => setDescription(e.target.value)}
  //       placeholder="Description"
  //     />
  //     <button type="submit">Add Todo</button>
  //   </form>
  // );

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;