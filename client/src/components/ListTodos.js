import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';

const ListTodos = () => {
  
  const [todos, setTodos] = useState([]);

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

  console.log(todos);
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
            <tr>
              <td>{todo.description}</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
