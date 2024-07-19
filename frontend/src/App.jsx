import React, { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SearchAndFilter from './components/SearchAndFilter';
import LoginPage from './components/LoginPage'; 


function App() {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {
    if (user) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [user]);

  useEffect(() => {
    filterTodos();
  }, [todos, searchTerm, filterStatus]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/todos/${localStorage.getItem("user_id")}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTodos(data.todos || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  };
  const filterTodos = () => {
    let result = todos;

    if (searchTerm) {
      result = result.filter(todo => 
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      result = result.filter(todo => 
        (filterStatus === 'completed' && todo.completed) ||
        (filterStatus === 'active' && !todo.completed)
      );
    }

    setFilteredTodos(result);
  };

  const addTodo = async (newTodo) => {
    setIsLoading(true);
    try {
      newTodo.user_id = localStorage.getItem("user_id");
      console.log(localStorage.getItem("user_id"))
      const response = await fetch(`http://localhost:3000/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTodos(prevTodos => [...prevTodos, data.todo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      if (response.ok) {
        fetchTodos();
      } else {
        console.error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos(todos.filter(todo => todo._id !== id));
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/completed", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setTodos(prevTodos => prevTodos.map(todo => 
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      } else {
        console.error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  
  return (
    <div className="App">
      {user ? (
        <>
          <h1>Todo App</h1>
          <TodoForm addTodo={addTodo} />
          <SearchAndFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          {isLoading ? (
            <p>Loading todos...</p>
          ) : (
            <TodoList 
              todos={filteredTodos} 
              toggleComplete={toggleComplete}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          )}
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;