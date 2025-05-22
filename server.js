const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const Eletricity_meter = require('./router/electricity_meter');
const User_location = require('./router/user_location_id');
const User_login = require('./router/user_login');
const User_id = require('./router/user_id_file/user_id');
const Worker_daily_post = require('./router/worker_daily_file/daily_post');
const { Client } = require('pg');
const cookieParser = require('cookie-parser');

const app = express();

app.use(morgan('dev'));
app.use(cors(
  {
    origin : "http://localhost:5173",
    credentials : true
  }
));
app.use(express.json());
app.use(cookieParser());

const client = new Client({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD || "shwethe1230",
  database: process.env.DB_DATABASE || 'mydb'
});

client.connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
    console.log("Successfully connected to database!");
  })
  .catch(err => console.error('Connection error', err.stack));

app.use(Eletricity_meter);
app.use(User_location);
app.use(User_login);
app.use(User_id);
app.use(Worker_daily_post);