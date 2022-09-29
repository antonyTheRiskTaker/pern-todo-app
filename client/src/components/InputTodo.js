import React, { Fragment, useState } from "react";
import axios from 'axios';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };

      // (Lines below) using axios
      const response = await axios.post('http://localhost:5000/todos', 
      {description: JSON.stringify(body)}, 
      {headers: {'Content-Type': 'application/json'}}
      );

      // (Lines below) using fetch
      // const response = await fetch('http://localhost:5000/todos', {
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
