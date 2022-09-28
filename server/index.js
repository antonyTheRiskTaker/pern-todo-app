require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// (Three lines below) setup for database queries
const knex = require('knex');
const dbConfig = require('./knexfile').development;
const db = knex(dbConfig);

// Middleware
app.use(cors());
// A full-stack application needs to get data from the client side and the only way to do this is that we have to get it from the `request.body` object.
app.use(express.json());

/* ROUTES */

// Create a todo

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

// Get a todo

// Update a todo

// Delete a todo

app.listen(5000, () => {
  console.log(`server has started on port 5000`);
});