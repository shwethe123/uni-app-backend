const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const morgan = require('morgan');
const Eletricity_meter = require('./router/electricity_meter');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json())

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,               // MongoDB URI ကိုအသစ်သော format ဖြင့် parse လုပ်ရန်
  // useUnifiedTopology: true,           // MongoDB connection pooling နဲ့ ဆိုင်တဲ့ feature တစ်ခု
  // poolSize: 10,                       // connection pool ရဲ့ အရေအတွက် (တစ်ခါတည်း MongoDB နဲ့ ချိတ်ဆက်တဲ့ connection အရေအတွက်)
  minPoolSize: 5,                     // pool ထဲမှာ အနည်းဆုံးရှိရမယ့် connection အရေအတွက်
  maxPoolSize: 20,                    // pool ထဲမှာ အများဆုံးရှိနိုင်တဲ့ connection အရေအတွက်
  waitQueueTimeoutMS: 2500,           // connection pool မှာ connection ရရန် သင်တောင်းဆိုပြီး ၂.၅စက္ကန့်အတွင်း မရလျှင် timeout ဖြစ်စေမည့် ကန့်သတ်စဉ်
 })
  .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
      });
    console.log("Successfully connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(Eletricity_meter);
