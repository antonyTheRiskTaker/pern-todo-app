import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  // Delete todo function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await axios
        .delete(`http://localhost:5000/todos/${id}`);
      
      // console.log(deleteTodo);
      
      // (Line below) the filter method only keeps any todo whose id doesn't match that of the deleted todo. The setTodos then resets the state and the component rerenders
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  const getTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      // (Line below) parsing data into JSON format is an asynchronous operation
      // (Line below) this line is not necessary unless you use fetch to http requests
      // const jsonData = await response.json();

      // console.log(response);
      setTodos(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // (Lines below) 'useEffect' is going to make a http request to our RESTful API every time this component is rendered
  useEffect(() => {
    getTodos();
  }, []);
  // (Line above) the empty array makes sure the useEffect only makes one request until any changes occur and the component renders

  // console.log(todos);
  return (
    <Fragment>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr>*/}
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteTodo(todo.todo_id)}
                >Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
