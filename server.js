const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Todo = require('./models');
const { PORT, DATABASE_URL } = require('./config');

const seedData = require('./db/todos.json');

const app = express(); 
app.use(express.static('public'));
app.use(express.json());

app.get('/v1/todos', (req, res, next) => {
  Todo.find()
    .then(todos => res.json(todos.map(todo => todo.serialize())))
    .catch(next);
});

app.get('/v1/todos/:id', (req, res, next) => {
  const id = req.params.id;
  Todo.findById(id)
    .then(item => {
      if (item) {
        res.json(item.serialize());
      } else { 
        next();
      }
    }) 
    .catch(next);
});

app.post('/v1/todos', (req, res, next) => {
  const { title } = req.body;

  /***** Never trust users - validate input *****/
  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  
  // Using promises
  Todo.create({title})
    .then(newItem => {
      res.status(201)
        .location(`${req.originalUrl}/${newItem.id}`)
        .json(newItem.serialize());
  })
    .catch(next);

});

app.put('/v1/todos/:id', (req, res, next) => {
  const id = req.params.id;
  /***** Never trust users - validate input *****/
  const updateItem = {};
  const updateableFields = ['title', 'completed'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updateItem[field] = req.body[field];
    }
  });
  /***** Never trust users - validate input *****/
  if (!updateItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  // Using promises
  Todo.findByIdAndUpdate(id, updateItem, { new: true })
    .then(item => {
      if (item) {
        res.json(item.serialize());
      } else {
        next();
      }
    })
    .catch(next);
});

app.delete('/v1/todos/:id', (req, res, next) => {
  const id = req.params.id;
  // Using promises
  Todo.findByIdAndRemove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        next();
      }
    })
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
  
  mongoose.connect(DATABASE_URL, { useMongoClient: true })
    .then(() => {
      Todo.insertMany(seedData);  
    })
    .catch(err => {
      console.error('ERROR: Mongoose failed to connect! Is the database running?');
      console.error(err);
    });  
  
  const server = app.listen(PORT, function () {
    console.log('Your app is listening on port ' + server.address().port);
  });
}

module.exports = app; // Export for testing
