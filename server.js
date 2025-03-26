const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const Eletricity_meter = require('./router/electricity_meter');
const User_location = require('./router/user_location_id');
const User_login = require('./router/user_login');
const { Client } = require('pg');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

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