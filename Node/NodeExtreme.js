
var express = require("express");
var app = express();

app.get('/',function(req,res){
	res.send("Hello World Abiam");
})

app.get('/home',function(req,res){
	res.send("Papiiii");
})

app.listen(3000);



/* #1 */
/*
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");

mongoose.connect('mongodb://localhost/simple')

var personSchema = {
	firstName: String,
	lastName: String,
	email: String
}

var Person = mongoose.model('Person',personSchema, 'people');
var app = express()

app.get('/people',function(req, res){
	Person.findOne(function(err,doc){
		...
	})
})

app.listen(3000);
*/

/* #2 */
//define model
var Todo = mongoose.model('Todo', {
	text: String//this is my schema(object)
});


//routes

//api
//get all todos
app.get('/api/todos', function(req,res){
	//use mongoose to get all todos in the database
	Todo.find(function(err,todos){
	//if there is an error retrieving, send the error.
		if(err)
			res.send(err)
		res.json(todos);//return all todos in JSON format
	});
});

  //create todo and send back all todos after creation
  app.post('/api/todos',function(req,res){

  	 //create a todo, info comes from AJAX request from Angular
  	 Todo.create({
  	 	text: req.body.text,
  	 	done: false
  	 }, function(err, todo){
  	 	if(err)
  	 		res.send(err);

  	 	//get and return all the todos after you create another
  	 	Todo.find(function(err,todos){
  	 		if(err)
  	 			res.send(err)
  	 		res.json(todos);
  	 	});
  	 });
  });

  //delete a todo
  app.delete('/api/todos/:todo_id', function(req,res){
  	Todo.remove({
  		_id : req.params.todo_id
  	}, function(err, todo){
  		if(err)
  			res.send(err);

  		//get and return all the todos after you create another
  		Todo.find(function(err,todos){
  			if(err)
  				res.send(err)
  			res.json(todos);
  		});
  	});
  });