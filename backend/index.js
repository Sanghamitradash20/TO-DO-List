const express = require("express");
const { createTodo, updateTodo } = require("./type");
const { todo } = require("./db");
const cors = require("cors");
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: 'https://669c0f4359d015228860b485--darling-biscochitos-9e2246.netlify.app/',
    optionsSuccessStatus: 200,
  };
 
  app.use(cors(corsOptions));

// Add this function to read user credentials
const getUserCredentials = () => {
    const filePath = path.join(__dirname, 'users.json');
    console.log(filePath);
    const rawData = fs.readFileSync(filePath);
    return JSON.parse(rawData);
  };

//   Add this route for login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = getUserCredentials();
    console.log(users);
  
    const user = users.find(u => u.username === username && u.password === password);
  
    if (user) {
      res.json({ success: true, user: { id: user.id, username: user.username } });
      
    } else {
      res.json({ success: false });
    }
  });


app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    console.log("Received payload:", createPayload);
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        console.error("Validation error:", parsedPayload.error);
        res.status(411).json({
            msg: "You sent the wrong inputs",
            error: parsedPayload.error
        });
        return;
    }
    try {
        const newTodo = await todo.create({
            title: createPayload.title,
            // description: createPayload.description,
            user_id: createPayload.user_id,
            completed: false
        });
        console.log("Created todo:", newTodo);
        res.json({
            msg: "Todo created",
            todo: newTodo
        });
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
});



app.get("/todos/:user_id", async function(req, res) {
    const todos = await todo.find({"user_id":req.params.user_id});
    res.json({
        todos
    });
});


app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        });
        return;
    }
    try {
        const todoToUpdate = await todo.findById(req.body.id);
        if (!todoToUpdate) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        todoToUpdate.completed = !todoToUpdate.completed;
        await todoToUpdate.save();
        res.json({
            msg: "Todo completion status updated",
            todo: todoToUpdate
        });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});



// Update Todo
app.put("/todo/:id", async function(req, res) {
    const { id } = req.params;
    // const { title, description } = req.body;
    const { title } = req.body;
    try {
        const updatedTodo = await todo.findByIdAndUpdate(id, 
            // { title, description },
            { title },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.json({ msg: "Todo updated", todo: updatedTodo });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Delete Todo
app.delete("/todo/:id", async function(req, res) {
    const { id } = req.params;
    try {
        const deletedTodo = await todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        res.json({ msg: "Todo deleted", todo: deletedTodo });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});


app.listen(3000);






