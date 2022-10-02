import React, { Fragment, useState } from "react";
import axios from 'axios';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // (Line below) the body is an object that has a key called 'description' and its corresponding the content of the todo description
      const body = { description };

      // (Lines below) using axios
      // (Line below) proxy is only used in development so it will be ignored in production. So if there is no http://localhost:5000 (or url of any local server) then by default it is going to use heroku domain. Remember this heroku domain is just our server serving the build static content and also building the RESTful API.
      const response = await axios.post('/todos', 
      body, 
      {headers: {'Content-Type': 'application/json'}}
      );

      // (Lines below) using fetch
      // const response = await fetch('/todos', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(body)
      // });

      // (Line below) redirect back to the homepage where the changes can be seen
      window.location = '/';
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form 
        className="d-flex mt-5"
        onSubmit={onSubmitForm}
      >
        <input 
          type="text" 
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
          />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
