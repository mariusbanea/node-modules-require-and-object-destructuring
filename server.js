const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Todo = require('./models');
const { PORT, DATABASE_URL } = require('./config');

const app = express(); 

app.use(express.json()); // Parse JSON body

/**
 * ADD ENDPOINTS HERE
 */
app.get('/v1/todos', (req, res, next) => {
  Todo.find()
    .then(list => res.json(list.serialize()))
    .catch(next); // error handler

});

app.post('/v1/todos', (req, res, next) => {
  const { title } = req.body;

  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err); // error handler
  }
  const newItem = { title };
  newItem.completed = false;
  
  // Using promises
  todos.create(newItem)
    .then(item => res.location(`/items/${item.id}`).status(201).json(item))
    .catch(next); // error handler

});

app.get('/v1/todos/:id', (req, res, next) => {
  const id = req.params.id;

  // Using promises
  todos.findById(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next(); // 404 handler
      }
    })
    .catch(next); // error handler

});

app.put('/v1/todos/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const replaceItem = {};
  const updateableFields = ['title', 'completed'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      replaceItem[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!replaceItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err); // error handler
  }

  // Using promises
  app.findByIdAndUpdate(id, replaceItem)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next(); // 404 handler
      }
    })
    .catch(next); // error handler

});

app.delete('/v1/todos/:id', (req, res, next) => {
  const id = req.params.id;

  // Using promises
  todos.findByIdAndRemove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        next(); // 404 handler
      }
    })
    .catch(next); // error handler
    
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
