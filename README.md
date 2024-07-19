# Todo Application

This is a full-stack Todo application built with React for the frontend and Express for the backend. The application allows users to sign in, create, read, update, and delete todos. Users can also search and filter todos based on their status (all, active, completed).

## Features

- User Authentication: Login functionality to authenticate users.
- Create Todo: Add new todos with a title and description.
- Read Todos: View all todos associated with the logged-in user.
- Update Todo: Edit the title and description of existing todos.
- Delete Todo: Remove todos from the list.
- Toggle Completion: Mark todos as completed or incomplete.
- Search Todos: Search todos based on title or description.
- Filter Todos: Filter todos based on their completion status (all, active, completed).

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm or yarn
- MongoDB (for storing todos)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
Install dependencies for both client and server:
bash
Copy code
cd client
npm install
cd ../server
npm install
Setup
Backend: Set up the server.

Create a users.json file in the server directory to store user credentials for authentication. Example:

json
Copy code
[
  {
    "id": "1",
    "username": "user1",
    "password": "password1"
  },
  {
    "id": "2",
    "username": "user2",
    "password": "password2"
  }
]
Ensure MongoDB is running on your local machine or update the database connection in db.js.

Frontend: Set up the React client.

Update the API endpoints if your backend server is not running on http://localhost:3000.
Running the Application
Start the backend server:

bash
Copy code
cd server
node index.js
Start the frontend development server:

bash
Copy code
cd client
npm start
Open your browser and navigate to http://localhost:3000.

Project Structure
Client
public: Contains the static assets.
src: Contains the React components and CSS files.
components: Contains individual component files (LoginPage.js, TodoForm.js, TodoList.js, SearchAndFilter.js).
App.js: Main application component.
index.js: Entry point of the React application.
App.css: Styling for the application.
Server
db.js: MongoDB connection setup.
type.js: Zod schemas for validating request payloads.
index.js: Main server file containing API routes.
API Endpoints
POST /api/login: Authenticate user.

Request: { "username": "user1", "password": "password1" }
Response: { "success": true, "user": { "id": "1", "username": "user1" } }
POST /todo: Create a new todo.

Request: { "title": "New Todo", "description": "Todo description", "user_id": "1" }
Response: { "msg": "Todo created", "todo": { ... } }
GET /todos/
: Get all todos for a user.

Response: { "todos": [ ... ] }
PUT /completed: Toggle the completion status of a todo.

Request: { "id": "todo_id" }
Response: { "msg": "Todo completion status updated", "todo": { ... } }
PUT /todo/
: Update a todo.

Request: { "title": "Updated Title", "description": "Updated Description" }
Response: { "msg": "Todo updated", "todo": { ... } }
DELETE /todo/
: Delete a todo.

Response: { "msg": "Todo deleted", "todo": { ... } }
Contributing
Contributions are welcome! Please open an issue or submit a pull request.