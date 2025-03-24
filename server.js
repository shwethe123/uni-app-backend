const express = require('express');
const cors = require('cors');
require('dotenv').config();
const morgan = require('morgan');
const Eletricity_meter = require('./router/electricity_meter');
const { Client } = require('pg');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER ,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
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