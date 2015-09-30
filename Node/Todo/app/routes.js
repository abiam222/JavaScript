// app/routes.js

// load the todo model
var Todo = require('./models/todo');


// expose the routes to our app with module.exports
module.exports = function(Todo,app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function(req, res) {

       // ...
      // db.todo.find();
       var query = {
           name: 'Nitro'
       };

      // Todo.find(query, function(err,todos){ //books is my model from bookModel
      //if(err)
        //res.status(500).send(err);
      //else
       // res.json(req.todos);
    //});
       Todo.find(query, function(err, todos) {

           res.json(todos);
       })
      // res.send("welcom to my todo api");
      

    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {

      //  ...
   
     // res.status(201);
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function(req, res) {

       // ...

    });

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};