const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const pool = require("./util/database");

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


//test route
app.get('/v1', (req, res, next) => {
  res.send('Hello World');
});

//CRUD routes
app.use('/v1', require('./routes/todo_routes'));


//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});


app.listen(3000, ()=>{
  console.log("Sever is now listening at port 3000");
})


pool.connect();

pool.on('connect', () => {
  console.log('connected to the db');
});
