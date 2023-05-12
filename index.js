const express = require('express');
const mongoose = require('mongoose');
const quizRouter = require('./router/quizRouter');


const app = express();
const port = 3000;

const dotenv = require("dotenv").config();

// Connect to MongoDB
mongoose.connect(  process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


// Middleware to parse request body as JSON
app.use(express.json());


app.use("/quizzes" ,quizRouter)
// Start the server
app.listen(port, () => {
  console.log(`Quiz app listening at http://localhost:${port}`);
});
