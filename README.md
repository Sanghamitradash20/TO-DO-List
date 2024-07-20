
# Todo Application

This is a full-stack Todo application built with React for the frontend and Express for the backend. The application allows users to log in, create, read, update, and delete todos. Users can also search and filter todos based on their status (all, active, completed).

## Features

- **User Authentication**: Login functionality to authenticate users.
- **Create Todo**: Add new todos with a title and description.
- **Read Todos**: View all todos associated with the logged-in user.
- **Update Todo**: Edit the title and description of existing todos.
- **Delete Todo**: Remove todos from the list.
- **Toggle Completion**: Mark todos as completed or incomplete.
- **Search Todos**: Search todos based on title or description.
- **Filter Todos**: Filter todos based on their completion status (all, active, completed).

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm or yarn
- MongoDB (for storing todos)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Sanghamitradash20/TO-DO-List.git
    cd TO-DO-List
    ```

2. **Install dependencies for both frontend and backend:**

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. **Setup**

    **Backend: Set up the server.**

    - Create a `users.json` file in the `backend` directory to store user credentials for authentication. Example:

        ```json
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
        ```

    - Ensure MongoDB is running on your local machine or update the database connection in `backend/db.js`.

    **Frontend: Set up the React client.**

    - Update the API endpoints in `frontend/src/App.js` if your backend server is not running on `http://localhost:3000`.

### Running the Application

1. **Start the backend server:**

    ```bash
    cd backend
    node index.js
    ```

2. **Start the frontend development server:**

    ```bash
    cd ../frontend
    npm start dev
    ```

3. **Open your browser and navigate to** `http://localhost:3000`.

## Project Structure

**Frontend**

- `public`: Contains the static assets.
- `src`: Contains the React components and CSS files.
  - `components`: Contains individual component files (`LoginPage.js`, `TodoForm.js`, `TodoList.js`, `SearchAndFilter.js`).
  - `App.js`: Main application component.
  - `index.js`: Entry point of the React application.
  - `App.css`: Styling for the application.

**Backend**

- `db.js`: MongoDB connection setup.
- `type.js`: Zod schemas for validating request payloads.
- `index.js`: Main server file containing API routes.

## API Endpoints

- **POST /api/login**: Authenticate user.

    **Request:**

    ```json
    { "username": "user1", "password": "password1" }
    ```

    **Response:**

    ```json
    { "success": true, "user": { "id": "1", "username": "user1" } }
    ```

- **POST /todo**: Create a new todo.

    **Request:**

    ```json
    { "title": "New Todo", "description": "Todo description", "user_id": "1" }
    ```

    **Response:**

    ```json
    { "msg": "Todo created", "todo": { ... } }
    ```

- **GET /todos/:user_id**: Get all todos for a user.

    **Response:**

    ```json
    { "todos": [ ... ] }
    ```

- **PUT /completed**: Toggle the completion status of a todo.

    **Request:**

    ```json
    { "id": "todo_id" }
    ```

    **Response:**

    ```json
    { "msg": "Todo completion status updated", "todo": { ... } }
    ```

- **PUT /todo/:id**: Update a todo.

    **Request:**

    ```json
    { "title": "Updated Title", "description": "Updated Description" }
    ```

    **Response:**

    ```json
    { "msg": "Todo updated", "todo": { ... } }
    ```

- **DELETE /todo/:id**: Delete a todo.

    **Response:**

    ```json
    { "msg": "Todo deleted", "todo": { ... } }
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
