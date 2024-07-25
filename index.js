const { render } = require("ejs");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");

dotenv.config();

app.use("/static", express.static("public"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

//Create
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
    await todoTask.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
});

//Read
app.get('/', async(req, res) => {
  try{
    tasks = await TodoTask.find() 
    res.render("todo.ejs", { todoTasks: tasks })
  }
  catch(err){
    console.log("can't retrieve values")
  }
});

//Update
app
.route("/edit/:id")
.get( async (req, res) => {
  const id = req.params.id;
  try{
    tasks = await TodoTask.find()
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
  }
  catch(err){
    console.log("can't retrieve task")
  }
})
.post(async (req, res) => {
  const id = req.params.id;
  try{
    await TodoTask.findByIdAndUpdate(id, { content: req.body.content })
    res.redirect("/")
  }
  catch(err){
      console.log("can't update task")
  }
});


//connection to db

const connectToMongo = async () => {
    try {
      mongoose.connect(process.env.DB_CONNECT);
      app.listen(3000, () => console.log("Server Up and running"));
      console.log("Connected to Mongo Successfully!");
    } catch (error) {
      console.log(error);
    }
  };
 
connectToMongo();
