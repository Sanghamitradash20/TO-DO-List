const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolist")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

const todoSchema = mongoose.Schema({
    user_id: String,
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('todos', todoSchema);
module.exports = {
    todo
};