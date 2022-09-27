const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
// A full-stack application needs to get data from the client side and the only way to do this is that we have to get it from the `request.body` object.
app.use(express.json());

app.listen(5000, () => {
  console.log(`server has started on port 5000`);
});