const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('./models');
const { PORT } = require('./config');

const app = express(); 

app.use(express.json()); // Parse JSON body

app.get('/users', (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users.map(user => user.serialize()));
    })
    .catch(next);
});

app.get('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.json(user.serialize()))
    .catch(next);
});

app.post('/users', (req, res, next) => {
  const {fullname, username, password} = req.body; 
  
  User.create({fullname, username, password})
    .then(user => res.status(201).json(user.serialize()))
    .catch(next);
});

app.put('/users', (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.status(204).end())
    .catch(next);
});

app.delete('/user/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(next);
});

// 404 catch-all
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: (process.env.NODE_ENV === 'development') ? err : {}
  });
});


if (require.main === module) {
  const server = app.listen(PORT, function () {
    console.log('Your app is listening on port ' + server.address().port);
  });
}

module.exports = app; // Export for testing
