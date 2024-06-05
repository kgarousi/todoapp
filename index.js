const { render } = require("ejs");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");

dotenv.config();

app.use("/static", express.static("public"));

app.set("view engine", "ejs");

app.get('/',(req, res) => {
    res.render('todo.ejs');
    });

app.use(express.urlencoded({ extended: true }));

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
