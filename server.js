const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Todo = require('./models');
const { PORT, DATABASE_URL } = require('./config');

const seedData = require('./db/todos.json');

const app = express(); 

app.use(express.json()); // Parse JSON body

/**
 * ADD ENDPOINTS HERE
 */
app.get('/v1/todos', (req, res, next) => {
  Todo.find()
    .then(todos => res.json(todos.map(todo => todo.serialize())))
    .catch(next); // error handler
});

app.get('/v1/todos/:id', (req, res, next) => {
  const id = req.params.id;
  Todo.findById(id)
    .then(item => {
      if (item) {
        res.json(item.serialize());
      } else {
        next(); // 404 handler
      }
    })
    .catch(next); // error handler
});

// app.put('/v1/todos/:id', (req, res, next) => {
//   const id = req.params.id;
//   /***** Never trust users - validate input *****/
//   const replaceItem = {};
//   const updateableFields = ['title', 'completed'];
//   updateableFields.forEach(field => {
//     if (field in req.body) {
//       replaceItem[field] = req.body[field];
//     }
//   });
//   /***** Never trust users - validate input *****/
//   if (!replaceItem.title) {
//     const err = new Error('Missing `title` in request body');
//     err.status = 400;
//     return next(err); // error handler
//   }
//   // Using promises
//   app.findByIdAndUpdate(id, replaceItem)
//     .then(item => {
//       if (item) {
//         res.json(item);
//       } else {
//         next(); // 404 handler
//       }
//     })
//     .catch(next); // error handler
// });

// app.delete('/v1/todos/:id', (req, res, next) => {
//   const id = req.params.id;
//   // Using promises
//   todos.findByIdAndRemove(id)
//     .then(count => {
//       if (count) {
//         res.status(204).end();
//       } else {
//         next(); // 404 handler
//       }
//     })
//     .catch(next); // error handler
// });

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
