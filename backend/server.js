const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Middleware and routes setup

const mongoURI = 'mongodb://localhost:27017/sales-record-app'; // Replace with your MongoDB URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
