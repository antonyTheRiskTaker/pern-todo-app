require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// (Three lines below) setup for database queries
const knex = require('knex');
const dbConfig = require('./knexfile').development;
const db = knex(dbConfig);

// Middleware
app.use(cors());
// A full-stack application needs to get data from the client side and the only way to do this is that we have to get it from the `request.body` object.
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  // Server static content
  // npm run build (run this command to create a build file; in this case, I'm using yarn so the command should be `yarn build`)
  app.use(express.static(path.join(__dirname, 'client/build')));
} 

/* ROUTES */

// Create a todo

// (Line below) async keyword is used because accessing a database is an asynchronous operation
app.post('/todos', async (req, res) => {
  try {
    // console.log(req.body);
    const { description } = req.body;
    const newTodo = await db('todo')
      .returning('*')
      .insert({ description: description });
    // (Line below) 'returning('*')' is used whenever you're inserting, updating or deleting 
    res.json(newTodo[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Get all todos

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await db
      .select() // Defaulting to '*' when there is no argument
      .from('todo');
    res.json(allTodos);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a todo

// (Line below) ':id' allows the url to be dynamic. It also gives the API access to 'req.params'
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await db
      .select()
      .from('todo')
      .where({ 'todo_id': id });
    res.json(todo[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a todo

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await db('todo')
      .where({ todo_id: id })
      .update({ 
        description: description 
      }, ['description']);
      // (Line above) the returning array holding 'description' is a shortcut for the returning method
    
    res.json("Todo was updated!");
  } catch (err) {
    console.log(err.message);
  }
});

// Delete a todo

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await db('todo')
      .where({ 'todo_id': id })
      .del();
    res.json('Todo was deleted!');
  } catch (err) {
    console.log(err.message);
  }
});

// (Lines below) a catch-all method
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});