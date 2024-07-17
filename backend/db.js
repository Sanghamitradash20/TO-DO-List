const mongoose = require("mongoose");

//mongodb://localhost:27017//todolist
//.env
mongoose.connect("mongodb://localhost:27017/todolist")
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo=mongoose.model('todos',todoSchema);
module.exports = {
    todo
}