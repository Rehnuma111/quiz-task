const express = require('express');
const app = express();
const Quiz = require('../model/quizSchema')

// Create a new quiz

app.post('/', async (req, res) => {
    try {
      const { question, options, rightAnswer, startDate, endDate } = req.body;
      const now = new Date();
      const quiz = new Quiz({
        question,
        options,
        rightAnswer,
        startDate,
        endDate,
        status: (now >= new Date(startDate) && now <= new Date(endDate)) ? 'active' : 'inactive'
      });
      await quiz.save();
      res.send(quiz);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  

// Get the active quiz
app.get('/active', async (req, res) => {
  try {
    const now = new Date();
    const quiz = await Quiz.find({
      status: 'active',
 
    });
    if (!quiz) {
      res.status(404).send('No active quiz found');
    } else {
      res.send(quiz);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get the result of a quiz by ID
app.get('/:id/result', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      res.status(404).send('Quiz not found');
    } else if (quiz.status !== 'finished') {
      res.status(400).send('Quiz result is not available yet');
    } else {
      res.send({ rightAnswer: quiz.rightAnswer });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Get all quizzes
app.get('/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.send(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = app;